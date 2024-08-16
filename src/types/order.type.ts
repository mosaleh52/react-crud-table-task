export type orderIdType = string;

export interface orderType {
  id?: orderIdType;
  customerName: string;
  productName: string;
  quantity: number;
  data: Date;
  status: "completed" | "pending" | "canceled";
}
export type updatedOrderType = Required<orderType>;
