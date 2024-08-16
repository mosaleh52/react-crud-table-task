import { orderType, updatedOrderType } from "../types/order.type";

export default function OrderForm({
  addFn,
  updateFn,
  endFn,
  preFilledData,
}: {
  preFilledData: orderType | null;
  addFn: (newOrder: orderType) => void;
  endFn: () => void;
  updateFn: (updatedOrder: updatedOrderType) => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        //@ts-expect-error until find a way to satisfy compiler
        const data = Object.fromEntries(
          //@ts-expect-error until find a way to satisfy compiler
          new FormData(e.target),
        ) as updatedOrderType;
        console.log("data in form", data);
        data.id === "" ? addFn(data) : updateFn(data);
        endFn();
      }}
    >
      <input type="text" name="id" defaultValue={preFilledData?.id} hidden />
      <input
        type="text"
        name="customerName"
        placeholder="customerName"
        defaultValue={preFilledData?.customerName}
      />
      <input
        type="number"
        name="quantity"
        placeholder="quantity"
        defaultValue={preFilledData?.quantity}
      />
      <input
        type="text"
        name="status"
        placeholder="status"
        defaultValue={preFilledData?.status}
      />
      <input type="submit" />
    </form>
  );
}
