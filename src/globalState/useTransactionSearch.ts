import { create } from "zustand";

type TransactionSearch = {
  transactionSearch: string;
};

type Actions = {
  setProductSearch: (search: TransactionSearch["transactionSearch"]) => void;
};

const useTransactionSearch = create<TransactionSearch & Actions>((set) => ({
  transactionSearch: "",
  setProductSearch: (search) => set(() => ({ transactionSearch: search })),
}));

export default useTransactionSearch;
