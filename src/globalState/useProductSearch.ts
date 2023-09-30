import { create } from "zustand";

type SearchProduct = {
  productSearch: string;
};

type Actions = {
  setProductSearch: (search: SearchProduct["productSearch"]) => void;
  resetProductSearch: () => void;
};

const useProductSearch = create<SearchProduct & Actions>((set) => ({
  productSearch: "",
  setProductSearch: (search) => set(() => ({ productSearch: search })),
  resetProductSearch: () => set(() => ({ productSearch: "" })),
}));

export default useProductSearch;
