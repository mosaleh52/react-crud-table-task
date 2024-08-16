import { orderIdType, orderType } from "../types/order.type";
export const apiUrl = "http://localhost:3000/orders/";

export async function getOrders(): Promise<orderType[]> {
  const data = await fetch(apiUrl).then((res) => res.json());
  return data;
}
export async function addOrder(order: orderType) {
  console.log("from add", order);
  const data = await fetch(apiUrl + "?_sort=id", {
    method: "POST",
    body: JSON.stringify(order),
  }).then((res) => res.json());
  return data;
}
export async function updateOrder(order: Partial<orderType>) {
  const data = await fetch(apiUrl + order.id, {
    method: "PUT",
    body: JSON.stringify(order),
  }).then((res) => res.json());
  return data;
}
export async function deleteOrder(id: orderIdType) {
  const data = await fetch(apiUrl + id, {
    method: "DELETE",
  }).then((res) => res.json());
  return data;
}
