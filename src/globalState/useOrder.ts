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
  order: {
    orderList: OrderItem[] | [];
    total: number;
    pay: number;
    change: number;
  };
};

type Actions = {
  setOrder: (orderItem: OrderItem) => void;
  setQty: (index: number, newQty: number) => void;
  deleteOrder: (index: number) => void;
  resetOrder: () => void;
  setPay: (pay: number) => void;
};

const useOrder = create<Order & Actions>((set) => ({
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

  setQty: (index, newQty) =>
    set((state) => {
      const curentTotal = state.order.total;
      const newTotalPrice = state.order.orderList[index].price * newQty;
      const qtyBefore = state.order.orderList[index].qty;
      const updatedTotal =
        curentTotal - state.order.orderList[index].price * qtyBefore;
      const updatedItem = {
        ...state.order.orderList[index],
        qty: newQty,
        totalPrice: newTotalPrice,
      };

      const updatedOrderList = [...state.order.orderList];
      updatedOrderList[index] = updatedItem;

      return {
        order: {
          orderList: updatedOrderList,
          total: updatedTotal + newTotalPrice,
          pay: state.order.pay,
          change: state.order.change,
        },
      };
    }),

  deleteOrder: (index) =>
    set((state) => {
      const curentTotal = state.order.total;
      const totalPriceBefore = state.order.orderList[index].totalPrice;
      const updatedOrderList = [...state.order.orderList];
      updatedOrderList.splice(index, 1);

      return {
        order: {
          orderList: updatedOrderList,
          total: curentTotal - totalPriceBefore,
          pay: state.order.pay,
          change: state.order.change,
        },
      };
    }),

  resetOrder: () =>
    set(() => ({ order: { orderList: [], total: 0, pay: 0, change: 0 } })),

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
