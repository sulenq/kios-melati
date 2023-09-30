import { create } from "zustand";

type SearchProduct = {
  productSearch: string;
};

type Actions = {
  setProductSearch: (search: SearchProduct["productSearch"]) => void;
  resetSearchProduct: () => void;
};

const useProductSearch = create<SearchProduct & Actions>((set) => ({
  productSearch: "",
  setProductSearch: (search) => set(() => ({ productSearch: search })),
  resetSearchProduct: () => set(() => ({ productSearch: "" })),
}));

export default useProductSearch;
