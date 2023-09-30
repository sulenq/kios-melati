import { create } from "zustand";

type SearchProduct = {
  searchProduct: string;
};

type Actions = {
  setSearchProduct: (search: SearchProduct["searchProduct"]) => void;
  resetSearchProduct: () => void;
};

const useProductSearch = create<SearchProduct & Actions>((set) => ({
  searchProduct: "",
  setSearchProduct: (search) => set(() => ({ searchProduct: search })),
  resetSearchProduct: () => set(() => ({ searchProduct: "" })),
}));

export default useProductSearch;
