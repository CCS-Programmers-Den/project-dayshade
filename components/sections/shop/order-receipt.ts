import type { CartLine } from "./cart-context";
import { formatPeso } from "./cart-context";
import type { PaymentDetails } from "@/lib/orders/queries";

export interface SubmittedOrder {
    orderId: string;
    submittedAt: Date;
    buyerName: string;
    contact: string;
    referenceNo: string | null;
    lines: CartLine[];
    total: number;
    payment: PaymentDetails | null;
}

/** Short, human-friendly order reference (matches the first block of the order id). */
export const orderRef = (orderId: string) => orderId.slice(0, 8).toUpperCase();

const WIDTH = 520;
const PAD = 32;
const SCALE = 2; // render at 2x so the PNG stays sharp on phones
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const SANS = "system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

function fit(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
    if (ctx.measureText(text).width <= maxWidth) return text;
    let t = text;
    while (t.length > 1 && ctx.measureText(`${t}…`).width > maxWidth) t = t.slice(0, -1);
    return `${t}…`;
}

/** Renders the order summary to a PNG and triggers a browser download. */
export function downloadOrderReceipt(order: SubmittedOrder) {
    const rows = 12 + order.lines.length + (order.referenceNo ? 1 : 0) + (order.payment ? 2 : 0);
    const height = 120 + rows * 30 + 70;

    const canvas = document.createElement("canvas");
    canvas.width = WIDTH * SCALE;
    canvas.height = height * SCALE;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");
    ctx.scale(SCALE, SCALE);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, WIDTH, height);
    ctx.fillStyle = "#0A0F0C";
    ctx.fillRect(0, 0, WIDTH, 84);

    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#4AEE98";
    ctx.font = `700 22px ${SANS}`;
    ctx.fillText("Progden Shop", PAD, 40);
    ctx.fillStyle = "#ffffff";
    ctx.font = `400 14px ${SANS}`;
    ctx.fillText("Order receipt", PAD, 64);

    let y = 120;
    const label = (text: string, value: string) => {
        ctx.fillStyle = "#6b7280";
        ctx.font = `400 13px ${SANS}`;
        ctx.fillText(text, PAD, y);
        ctx.fillStyle = "#111827";
        ctx.font = `500 14px ${SANS}`;
        ctx.textAlign = "right";
        ctx.fillText(fit(ctx, value, WIDTH - PAD * 2 - 120), WIDTH - PAD, y);
        ctx.textAlign = "left";
        y += 28;
    };
    const rule = () => {
        ctx.strokeStyle = "#e5e7eb";
        ctx.beginPath();
        ctx.moveTo(PAD, y - 12);
        ctx.lineTo(WIDTH - PAD, y - 12);
        ctx.stroke();
        y += 12;
    };

    label("Order ref", orderRef(order.orderId));
    label("Date", order.submittedAt.toLocaleString("en-PH"));
    label("Name", order.buyerName);
    label("Contact", order.contact);
    if (order.referenceNo) label("GCash ref no.", order.referenceNo);
    rule();

    for (const line of order.lines) {
        ctx.fillStyle = "#111827";
        ctx.font = `400 14px ${SANS}`;
        const amount = formatPeso(line.price * line.qty);
        ctx.textAlign = "right";
        ctx.font = `500 14px ${MONO}`;
        ctx.fillText(amount, WIDTH - PAD, y);
        const amountWidth = ctx.measureText(amount).width;
        ctx.textAlign = "left";
        ctx.font = `400 14px ${SANS}`;
        ctx.fillText(fit(ctx, `${line.qty} × ${line.title}`, WIDTH - PAD * 2 - amountWidth - 16), PAD, y);
        y += 28;
    }
    rule();

    ctx.fillStyle = "#111827";
    ctx.font = `700 18px ${SANS}`;
    ctx.fillText("Total", PAD, y + 4);
    ctx.textAlign = "right";
    ctx.font = `700 20px ${MONO}`;
    ctx.fillText(formatPeso(order.total), WIDTH - PAD, y + 4);
    ctx.textAlign = "left";
    y += 44;

    if (order.payment) {
        label("Paid via GCash to", order.payment.number);
        label("Account name", order.payment.accountName);
    }
    label("Status", "Pending verification");

    ctx.fillStyle = "#9ca3af";
    ctx.font = `400 12px ${SANS}`;
    ctx.fillText("Your order is confirmed once finance verifies your payment.", PAD, height - 24);

    canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `progden-order-${orderRef(order.orderId)}.png`;
        a.click();
        URL.revokeObjectURL(url);
    }, "image/png");
}
