import { create } from "zustand";

type RequireRole = {
  isVerified: boolean;
};

type Actions = {
  setIsVerified: (search: RequireRole["isVerified"]) => void;
};

const useRequireRole = create<RequireRole & Actions>((set) => ({
  isVerified: false,
  setIsVerified: (verifiedTerm) => set(() => ({ isVerified: verifiedTerm })),
}));

export default useRequireRole;
