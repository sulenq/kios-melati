import { create } from "zustand";

type OrderItem = {
  id: number;
  code: string;
  name: string;
  price: number;
  totalPrice: number;
  stock: number;
  category: string;
};

type Order = {
  order: {
    orderList: OrderItem[] | [];
    total: number;
    pay: number;
    change: number;
  };
};

type Actions = {
  setOrder: (orderItem: OrderItem) => void;
  setPay: (pay: number) => void;
};

const useOrder = create<Order & Actions>((set) => ({
  order: { orderList: [], total: 0, pay: 0, change: 0 },
  setOrder: (orderItem) =>
    set((state) => {
      const curentTotal = state.order.total;

      return {
        order: {
          orderList: [...state.order.orderList, orderItem],
          total: curentTotal + orderItem.totalPrice,
          pay: state.order.pay,
          change: state.order.change,
        },
      };
    }),
  setPay: (pay) =>
    set((state) => {
      return {
        order: {
          orderList: [...state.order.orderList],
          total: state.order.total,
          pay: pay,
          change: state.order.pay - state.order.total,
        },
      };
    }),
}));

export default useOrder;
