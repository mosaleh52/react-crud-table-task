import { useState } from "react";
import "./App.css";
import OrderForm from "./components/orderForm";
import Table from "./components/Table";
import Dialog from "./components/Modal";
import useOrderHook from "./hooks/useOrdersHook";
import { orderType } from "./types/order.type";
function App() {
  const {
    isLoading,
    error,
    orders,
    updateOrderMutation,
    deleteOrderMutation,
    addOrderMutation,
  } = useOrderHook();
  const [eOrder, setEOrder] = useState<null | orderType>(null);
  const [editing, setEditing] = useState(false);
  if (error) {
    return <p>error</p>;
  }
  if (isLoading) {
    return <p>loading</p>;
  }
  console.log(editing);
  return (
    <>
      <Table
        orders={orders}
        deleteFn={deleteOrderMutation}
        startEditFn={(order) => {
          setEditing(true);
          setEOrder(order);
        }}
      />
      <button onClick={() => setEditing(true)}>add</button>

      {editing ? (
        <Dialog isOpen={editing} onClose={() => setEditing(false)}>
          <OrderForm
            addFn={addOrderMutation}
            updateFn={updateOrderMutation}
            preFilledData={eOrder}
            endFn={() => {
              setEditing(false);
              setEOrder(null);
            }}
          />
        </Dialog>
      ) : (
        ""
      )}
    </>
  );
}

export default App;
