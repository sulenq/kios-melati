import { create } from "zustand";

type TransactionSearch = {
  transactionSearch: string;
};

type Actions = {
  setTransactionSearch: (
    search: TransactionSearch["transactionSearch"]
  ) => void;
};

const useTransactionSearch = create<TransactionSearch & Actions>((set) => ({
  transactionSearch: "",
  setTransactionSearch: (search) => set(() => ({ transactionSearch: search })),
}));

export default useTransactionSearch;
