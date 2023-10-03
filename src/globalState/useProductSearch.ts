import { create } from "zustand";

type ProductSearch = {
  productSearch: string;
};

type Actions = {
  setProductSearch: (search: ProductSearch["productSearch"]) => void;
  resetProductSearch: () => void;
};

const useProductSearch = create<ProductSearch & Actions>((set) => ({
  productSearch: "",
  setProductSearch: (search) => set(() => ({ productSearch: search })),
  resetProductSearch: () => set(() => ({ productSearch: "" })),
}));

export default useProductSearch;
