"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  deleteOrder,
  reviewOrder,
  updatePaymentDetails,
  type OrderStatus,
  type OrderWithReceipt,
  type PaymentDetails,
} from "@/lib/orders/queries";

const filters: (OrderStatus | "all")[] = ["pending", "approved", "rejected", "all"];

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  approved: "bg-green-500/15 text-green-600 dark:text-green-400",
  rejected: "bg-red-500/15 text-red-600 dark:text-red-400",
};

const peso = (amount: number) =>
  `₱${amount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function OrdersAdmin({
  orders,
  payment,
}: {
  orders: OrderWithReceipt[];
  payment: PaymentDetails | null;
}) {
  const [filter, setFilter] = useState<OrderStatus | "all">("pending");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const savePayment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    startTransition(async () => {
      const result = await updatePaymentDetails(data);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Payment details saved");
      router.refresh();
    });
  };

  const visible = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const pendingCount = orders.filter((o) => o.status === "pending").length;

  const review = (id: string, status: OrderStatus) => {
    const data = new FormData();
    data.set("id", id);
    data.set("status", status);
    startTransition(async () => {
      const result = await reviewOrder(data);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(`Order ${status === "pending" ? "moved back to pending" : status}`);
      router.refresh();
    });
  };

  const remove = (order: OrderWithReceipt) => {
    const warning =
      order.status === "approved"
        ? "This order is APPROVED. Deleting it permanently removes the order record and its receipt image. Continue?"
        : "Permanently delete this order and its receipt image?";
    if (!window.confirm(warning)) return;

    const data = new FormData();
    data.set("id", order.id);
    startTransition(async () => {
      const result = await deleteOrder(data);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Order deleted");
      router.refresh();
    });
  };

  return (
    <section className="space-y-6 p-6">
      <header>
        <h1 className="text-3xl font-bold text-primary">Shop Orders</h1>
        <p className="text-sm text-muted-foreground">
          Verify each GCash receipt against the amount and approve or reject the order.
          {pendingCount > 0 && ` ${pendingCount} awaiting review.`}
        </p>
      </header>

      <form onSubmit={savePayment} className="grid max-w-3xl gap-4 rounded-xl border bg-card p-6">
        <div>
          <h2 className="text-xl font-semibold">GCash payment details</h2>
          <p className="text-sm text-muted-foreground">
            Shown to buyers at checkout.{" "}
            {payment ? "Currently set." : "Not set yet — buyers can't submit orders until you add these."}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input name="gcash_number" defaultValue={payment?.number ?? ""} placeholder="GCash number, e.g. 0917 123 4567" required maxLength={20} inputMode="tel" />
          <Input name="gcash_account_name" defaultValue={payment?.accountName ?? ""} placeholder="Account name" required maxLength={120} />
        </div>
        <div>
          <Button type="submit" disabled={isPending}>{isPending ? "Saving..." : "Save payment details"}</Button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button key={f} type="button" size="sm" variant={filter === f ? "default" : "outline"} className="capitalize" onClick={() => setFilter(f)}>
            {f}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {visible.map((order) => (
          <article key={order.id} className="space-y-4 rounded-xl border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-semibold">{order.buyer_name}</h2>
                <p className="text-sm text-muted-foreground">{order.contact}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.created_at).toLocaleString("en-PH")}
                </p>
              </div>
              <Badge className={`capitalize ${statusStyles[order.status]}`}>{order.status}</Badge>
            </div>

            <ul className="space-y-1 text-sm">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between gap-3">
                  <span>{item.qty} × {item.title}</span>
                  <span className="tabular-nums">{peso(item.price * item.qty)}</span>
                </li>
              ))}
              <li className="flex justify-between border-t pt-2 font-semibold">
                <span>Total to verify</span>
                <span className="tabular-nums">{peso(order.total)}</span>
              </li>
            </ul>

            {order.reference_no && (
              <p className="text-sm">GCash ref: <span className="font-mono">{order.reference_no}</span></p>
            )}

            {order.receipt_url ? (
              <div className="space-y-2">
                <a href={order.receipt_url} target="_blank" rel="noopener noreferrer" className="block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={order.receipt_url} alt={`Receipt from ${order.buyer_name}`} className="max-h-72 w-full rounded-md border object-contain bg-muted" />
                </a>
                {order.receipt_download_url && (
                  <Button asChild type="button" size="sm" variant="outline">
                    <a href={order.receipt_download_url} download>
                      <Download className="h-4 w-4" aria-hidden="true" /> Download receipt
                    </a>
                  </Button>
                )}
              </div>
            ) : (
              <p className="text-sm text-destructive">Receipt image unavailable.</p>
            )}

            <div className="flex gap-2">
              {order.status === "pending" ? (
                <>
                  <Button type="button" onClick={() => review(order.id, "approved")} disabled={isPending}>Approve</Button>
                  <Button type="button" variant="destructive" onClick={() => review(order.id, "rejected")} disabled={isPending}>Reject</Button>
                </>
              ) : (
                <Button type="button" variant="outline" onClick={() => review(order.id, "pending")} disabled={isPending}>Move back to pending</Button>
              )}
              <Button type="button" variant="ghost" className="ml-auto text-destructive hover:text-destructive" onClick={() => remove(order)} disabled={isPending}>
                <Trash2 className="h-4 w-4" aria-hidden="true" /> Delete
              </Button>
            </div>
          </article>
        ))}
        {visible.length === 0 && <p className="text-muted-foreground">No {filter === "all" ? "" : filter} orders.</p>}
      </div>
    </section>
  );
}
