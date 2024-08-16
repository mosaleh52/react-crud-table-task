import useSWR from "swr";
import { orderType, orderIdType, updatedOrderType } from "../types/order.type";
import {
  addOrder,
  deleteOrder,
  updateOrder,
  getOrders,
  apiUrl,
} from "../api/orders";
import {
  addOrderOptions,
  deleteOrderOptions,
  updateOrderOptions,
} from "../api/ordersOptions";

const useOrderHook = () => {
  const { isLoading, error, data, mutate } = useSWR(apiUrl, getOrders);

  const addOrderMutation = async (newOrder: orderType) => {
    delete newOrder.id;
    try {
      await mutate(addOrder(newOrder), addOrderOptions(newOrder));
    } catch (err: any) {
      if (err instanceof Error) {
        console.error(`Failed to add the new todo: ${err.message}`, {
          duration: 1000,
        });
      }
    }
  };

  const updateOrderMutation = async (updatedOrder: updatedOrderType) => {
    try {
      await mutate(updateOrder(updatedOrder), updateOrderOptions(updateOrder));
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Failed to update the todo: ${err.message}`, {
          duration: 1000,
        });
      }
    }
  };

  const deleteOrderMutation = async (orderId: orderIdType) => {
    try {
      await mutate(deleteOrder(orderId), deleteOrderOptions(orderId));
    } catch (err) {
      if (err instanceof Error) {
        console.error(`Failed to delete todo: ${err.message}`, {
          duration: 1000,
        });
      }
    }
  };

  return {
    isLoading,
    error,
    orders: data,
    updateOrderMutation,
    deleteOrderMutation,
    addOrderMutation,
  };
};

export default useOrderHook;
