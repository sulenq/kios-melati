import { create } from "zustand";

export type OrderItem = {
  id: number;
  code: string;
  name: string;
  price: number;
  qty: number;
  totalPrice: number;
  stock: number;
  category: string;
};

type Order = {
  orderList: OrderItem[] | [];
  orderTotal: number;
  pay: number;
  change: number;
  order: {
    orderList: OrderItem[] | [];
    total: number;
    pay: number;
    change: number;
  };
};

type Actions = {
  setOrder: (orderItem: OrderItem) => void;
  addOrder: (orderItem: OrderItem) => void;
  setQty: (id: number, newQty: number) => void;
  deleteOrder: (id: number) => void;
  resetOrder: () => void;
  setPay: (pay: number) => void;
};

const useOrder = create<Order & Actions>((set) => ({
  orderList: [],
  orderTotal: 0,
  pay: 0,
  change: 0,

  order: { orderList: [], total: 0, pay: 0, change: 0 },

  setOrder: (newOrderItem) =>
    set((state) => {
      const curentTotal = state.order.total;
      const existingOrderItemIndex = state.order.orderList.findIndex(
        (o) => o.id === newOrderItem.id
      );
      if (existingOrderItemIndex !== -1) {
        const updatedItem = {
          ...state.order.orderList[existingOrderItemIndex],
          qty:
            state.order.orderList[existingOrderItemIndex].qty +
            newOrderItem.qty,
          totalPrice:
            state.order.orderList[existingOrderItemIndex].totalPrice +
            newOrderItem.totalPrice,
        };

        const updatedOrderList = [...state.order.orderList];
        updatedOrderList[existingOrderItemIndex] = updatedItem;

        return {
          order: {
            orderList: updatedOrderList,
            total: curentTotal + newOrderItem.totalPrice,
            pay: state.order.pay,
            change: state.order.change,
          },
        };
      } else {
        return {
          order: {
            orderList: [...state.order.orderList, newOrderItem],
            total: curentTotal + newOrderItem.totalPrice,
            pay: state.order.pay,
            change: state.order.change,
          },
        };
      }
    }),

  addOrder: (newOrderItem) =>
    set((state) => {
      const curentTotal = state.orderTotal;
      const existingOrderItemIndex = state.orderList.findIndex(
        (o) => o.id === newOrderItem.id
      );

      if (existingOrderItemIndex !== -1) {
        const updatedItem = {
          ...state.orderList[existingOrderItemIndex],
          qty: state.orderList[existingOrderItemIndex].qty + newOrderItem.qty,
          totalPrice:
            state.orderList[existingOrderItemIndex].totalPrice +
            newOrderItem.totalPrice,
        };

        const updatedOrderList = [...state.orderList];
        updatedOrderList[existingOrderItemIndex] = updatedItem;

        return {
          orderList: updatedOrderList,
          orderTotal: curentTotal + newOrderItem.totalPrice,
          pay: state.pay,
          change: state.change,
        };
      } else {
        return {
          orderList: [...state.orderList, newOrderItem],
          orderTotal: curentTotal + newOrderItem.totalPrice,
          pay: state.pay,
          change: state.change,
        };
      }
    }),

  setQty: (id, newQty) =>
    set((state) => {
      const index = state.orderList.findIndex((o) => o.id === id);
      const curentTotal = state.orderTotal;
      const newTotalPrice = state.orderList[index].price * newQty;
      const qtyBefore = state.orderList[index].qty;
      const updatedTotal =
        curentTotal - state.orderList[index].price * qtyBefore;
      const updatedItem = {
        ...state.orderList[index],
        qty: newQty,
        totalPrice: newTotalPrice,
      };

      const updatedOrderList = [...state.orderList];
      updatedOrderList[index] = updatedItem;

      return {
        orderList: updatedOrderList,
        orderTotal: updatedTotal + newTotalPrice,
        pay: state.pay,
        change: state.change,
      };
    }),

  deleteOrder: (id) =>
    set((state) => {
      const index = state.orderList.findIndex((o) => o.id === id);
      const curentTotal = state.orderTotal;
      const totalPriceBefore = state.orderList[index].totalPrice;
      const updatedOrderList = [...state.orderList];
      updatedOrderList.splice(index, 1);

      return {
        orderList: updatedOrderList,
        orderTotal: curentTotal - totalPriceBefore,
        pay: state.pay,
        change: state.change,
      };
    }),

  resetOrder: () =>
    set(() => ({ orderList: [], orderTotal: 0, pay: 0, change: 0 })),

  setPay: (pay) =>
    set((state) => {
      return {
        orderList: [...state.orderList],
        orderTotal: state.orderTotal,
        pay: pay,
        change: state.pay - state.orderTotal,
      };
    }),
}));

export default useOrder;
