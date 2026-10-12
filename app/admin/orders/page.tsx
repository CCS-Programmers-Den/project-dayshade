import { getOrders, getPaymentDetails } from "@/lib/orders/queries";
import OrdersAdmin from "@/components/sections/admin/orders/OrdersAdmin";

export default async function OrdersPage() {
  const [orders, payment] = await Promise.all([getOrders(), getPaymentDetails()]);
  return <OrdersAdmin orders={orders} payment={payment} />;
}
