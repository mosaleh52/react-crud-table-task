import { orderIdType, orderType, updatedOrderType } from "../types/order.type";

const addOrderOptions = (newOrder: orderType) => {
  return {
    optimisticData: (orders: orderType[]) => [...orders, newOrder],
    populateCache: (added: orderType, orders: orderType[]) => [
      ...orders,
      added,
    ],
    rollbackOnError: true,
    revalidate: false,
  };
};

const updateOrderOptions = (updatedOrder: updatedOrderType) => {
  return {
    optimisticData: (orders: orderType[]) => {
      //const prevOrders = orders.filter((item) => item.id !== updatedOrder.id);
      const newOrders = orders.map((item) =>
        item.id === updatedOrder.id ? updatedOrder : item,
      );
      //return [...prevOrders, updatedOrder];
      return newOrders;
    },
    populateCache: (updated: orderType, orders: orderType[]) => {
      //const prevOrders = orders.filter((item) => item.id !== updated.id);
      const newOrders = orders.map((item) =>
        item.id === updated.id ? updated : item,
      );
      //return [...prevOrders, updated];
      return newOrders;
    },
    rollbackOnError: true,
    revalidate: false,
  };
};

const deleteOrderOptions = (id: orderIdType) => {
  return {
    optimisticData: (orders: orderType[]) =>
      orders.filter((item) => item.id !== id),
    populateCache: (_: unknown, orders: orderType[]) =>
      orders.filter((item) => item.id !== id),
    rollbackOnError: true,
    revalidate: false,
  };
};

export { addOrderOptions, updateOrderOptions, deleteOrderOptions };
