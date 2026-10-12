"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Check, Copy, Download, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { createOrder, type PaymentDetails } from "@/lib/orders/queries";
import { formatPeso, MAX_QTY_PER_ITEM, useCart } from "./cart-context";
import { downloadOrderReceipt, orderRef, type SubmittedOrder } from "./order-receipt";

type Step = "cart" | "pay" | "done";

const MAX_RECEIPT_SIZE = 5 * 1024 * 1024;

export default function CheckoutSheet({ payment }: { payment: PaymentDetails | null }) {
    const { lines, itemCount, total, setQty, clear } = useCart();
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<Step>("cart");
    const [copied, setCopied] = useState(false);
    const [receiptName, setReceiptName] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState<SubmittedOrder | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleOpenChange = (next: boolean) => {
        // Closing mid-submit would hide the confirmation and invite a double payment.
        if (!next && isPending) return;
        setOpen(next);
        if (!next && step === "done") setStep("cart");
    };

    const copyNumber = async () => {
        if (!payment) return;
        try {
            await navigator.clipboard.writeText(payment.number);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error("Couldn't copy — please copy the number manually.");
        }
    };

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isPending || lines.length === 0) return;

        const data = new FormData(event.currentTarget);
        const receipt = data.get("receipt");
        if (receipt instanceof File && receipt.size > MAX_RECEIPT_SIZE) {
            toast.error("Receipt must be 5MB or smaller");
            return;
        }
        data.set("items", JSON.stringify(lines.map(({ id, qty }) => ({ id, qty }))));
        // The exact amount the buyer was shown; the server rejects the order if prices changed.
        data.set("expected_total_cents", String(Math.round(total * 100)));

        startTransition(async () => {
            const result = await createOrder(data);
            if (result.error) {
                toast.error(result.error);
                return;
            }
            // Snapshot the order before the cart is cleared so it can be downloaded.
            setSubmitted({
                orderId: result.orderId ?? crypto.randomUUID(),
                submittedAt: new Date(),
                buyerName: String(data.get("buyer_name") ?? ""),
                contact: String(data.get("contact") ?? ""),
                referenceNo: String(data.get("reference_no") ?? "").trim() || null,
                lines,
                total,
                payment,
            });
            clear();
            setReceiptName(null);
            setStep("done");
        });
    };

    return (
        <>
            {itemCount > 0 && (
                <button
                    type="button"
                    onClick={() => {
                        setStep("cart");
                        setOpen(true);
                    }}
                    className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-pd-green px-5 py-3 font-semibold text-[#0A0F0C] shadow-[0_8px_30px_rgba(74,238,152,0.35)] transition-transform motion-safe:hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label={`View cart, ${itemCount} items`}
                >
                    <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                    <span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>
                    <span className="font-[family-name:var(--font-jetbrains)]">{formatPeso(total)}</span>
                </button>
            )}

            <Sheet open={open} onOpenChange={handleOpenChange}>
                <SheetContent className="flex w-full flex-col gap-0 overflow-y-auto border-white/10 bg-[#0A0F0C] text-white sm:max-w-md">
                    {step === "cart" && (
                        <>
                            <SheetHeader>
                                <SheetTitle className="text-white">Your cart</SheetTitle>
                                <SheetDescription className="text-white/60">
                                    Review your items. You&apos;ll pay via GCash in the next step.
                                </SheetDescription>
                            </SheetHeader>

                            <ul className="flex-1 space-y-3 px-4">
                                {lines.map((line) => (
                                    <li key={line.id} className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
                                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-[#222C25]">
                                            {line.imageSrc && (
                                                <Image src={line.imageSrc} alt="" fill sizes="56px" className="object-cover" />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-semibold uppercase">{line.title}</p>
                                            <p className="font-[family-name:var(--font-jetbrains)] text-xs text-pd-green-accent">
                                                {formatPeso(line.price)} × {line.qty} = {formatPeso(line.price * line.qty)}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Button type="button" size="icon" variant="outline" className="h-7 w-7 bg-transparent" onClick={() => setQty(line.id, line.qty - 1)} aria-label={`Remove one ${line.title}`}>
                                                {line.qty === 1 ? <Trash2 className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                                            </Button>
                                            <span className="w-6 text-center text-sm tabular-nums">{line.qty}</span>
                                            <Button type="button" size="icon" variant="outline" className="h-7 w-7 bg-transparent" onClick={() => setQty(line.id, line.qty + 1)} disabled={line.qty >= MAX_QTY_PER_ITEM} aria-label={`Add one ${line.title}`}>
                                                <Plus className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                                {lines.length === 0 && <p className="text-white/60">Your cart is empty.</p>}
                            </ul>

                            <div className="space-y-3 border-t border-white/10 p-4">
                                <div className="flex items-center justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="font-[family-name:var(--font-jetbrains)] text-pd-green-accent">{formatPeso(total)}</span>
                                </div>
                                <Button type="button" className="w-full" disabled={lines.length === 0} onClick={() => setStep("pay")}>
                                    Proceed to payment
                                </Button>
                            </div>
                        </>
                    )}

                    {step === "pay" && (
                        <form onSubmit={submit} className="flex flex-1 flex-col">
                            <SheetHeader>
                                <SheetTitle className="text-white">Pay via GCash</SheetTitle>
                                <SheetDescription className="text-white/60">
                                    Send the exact total, then upload your receipt. Finance will confirm your payment.
                                </SheetDescription>
                            </SheetHeader>

                            <div className="flex-1 space-y-5 px-4">
                                <div className="rounded-xl border border-pd-green/40 bg-pd-green/5 p-4 text-center">
                                    <p className="text-xs uppercase tracking-wider text-white/60">Amount to pay</p>
                                    <p className="font-[family-name:var(--font-jetbrains)] text-3xl font-bold text-pd-green-accent">{formatPeso(total)}</p>
                                </div>

                                {payment ? (
                                    <div className="space-y-2 rounded-xl bg-white/5 p-4">
                                        <p className="text-xs uppercase tracking-wider text-white/60">1. Send to this GCash number</p>
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="font-[family-name:var(--font-jetbrains)] text-xl font-semibold">{payment.number}</p>
                                            <Button type="button" size="sm" variant="outline" className="bg-transparent" onClick={copyNumber}>
                                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                {copied ? "Copied" : "Copy"}
                                            </Button>
                                        </div>
                                        <p className="text-sm text-white/70">Account name: {payment.accountName}</p>
                                    </div>
                                ) : (
                                    <p className="rounded-xl bg-red-500/10 p-4 text-sm text-red-300">
                                        Payment details aren&apos;t set up yet. Please contact the Progden officers.
                                    </p>
                                )}

                                <div className="space-y-4">
                                    <p className="text-xs uppercase tracking-wider text-white/60">2. Tell us who paid &amp; upload your receipt</p>
                                    <div className="grid gap-2">
                                        <Label htmlFor="buyer_name">Full name</Label>
                                        <Input id="buyer_name" name="buyer_name" required maxLength={120} autoComplete="name" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="contact">Email or contact number</Label>
                                        <Input id="contact" name="contact" required maxLength={120} autoComplete="email" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="reference_no">GCash reference no. (optional)</Label>
                                        <Input id="reference_no" name="reference_no" maxLength={40} inputMode="numeric" />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="receipt">Payment receipt (screenshot, max 5MB)</Label>
                                        <Input
                                            id="receipt"
                                            name="receipt"
                                            type="file"
                                            accept="image/*"
                                            required
                                            onChange={(e) => setReceiptName(e.target.files?.[0]?.name ?? null)}
                                        />
                                        {receiptName && <p className="truncate text-xs text-white/60">{receiptName}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex gap-3 border-t border-white/10 p-4">
                                <Button type="button" variant="outline" className="bg-transparent" onClick={() => setStep("cart")} disabled={isPending}>
                                    Back
                                </Button>
                                <Button type="submit" className="flex-1" disabled={isPending || !payment}>
                                    {isPending ? "Submitting..." : "Submit receipt"}
                                </Button>
                            </div>
                        </form>
                    )}

                    {step === "done" && (
                        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pd-green/15">
                                <Check className="h-7 w-7 text-pd-green" aria-hidden="true" />
                            </div>
                            <SheetTitle className="text-white">Receipt submitted!</SheetTitle>
                            <SheetDescription className="text-white/70">
                                Thanks! Our finance team will verify your payment and your order will be confirmed once approved.
                            </SheetDescription>
                            {submitted && (
                                <p className="text-sm text-white/60">
                                    Order ref: <span className="font-[family-name:var(--font-jetbrains)] text-white">{orderRef(submitted.orderId)}</span>
                                </p>
                            )}
                            <div className="flex flex-wrap justify-center gap-3">
                                {submitted && (
                                    <Button type="button" variant="outline" className="bg-transparent" onClick={() => downloadOrderReceipt(submitted)}>
                                        <Download className="h-4 w-4" aria-hidden="true" /> Download receipt
                                    </Button>
                                )}
                                <Button type="button" onClick={() => handleOpenChange(false)}>Close</Button>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
}
