import { orderType } from "../types/order.type";
const fields = ["id", "customerName", "quantity", "data", "status"];
export default function Table({
  orders,
  deleteFn,
  startEditFn,
}: {
  orders: orderType[] | undefined;
  deleteFn: (id: string) => void;
  startEditFn: (order: orderType) => void;
}) {
  console.log("ttable ", orders, startEditFn);
  return (
    <table>
      <caption>caption</caption>
      <thead>
        <tr>
          {fields.map((filed) => (
            <th scope="col"> {filed}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orders?.map((order: orderType) => {
          return (
            <>
              <tr key={order.id}>
                {fields.map((field) => {
                  //@ts-expect-error until finding way to tell that the index should be correct
                  return <th>{order[field]}</th>;
                })}
              </tr>
              <button onClick={() => (order.id ? deleteFn(order.id) : "")}>
                delete
              </button>
              <button
                onClick={() => {
                  startEditFn(order);
                }}
              >
                {" "}
                edit
              </button>
              <br />
              <br />
            </>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row" colSpan={2}>
            Average age
          </th>
          <td>33</td>
        </tr>
      </tfoot>
    </table>
  );
}
