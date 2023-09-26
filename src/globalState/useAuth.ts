import { create } from "zustand";

type Lang = {
  lang: "eng" | "ind";
};

type Actions = {
  setLang: (lang: Lang["lang"]) => void;
};

const useAuth = create<Lang & Actions>((set) => ({
  lang: "eng",
  setLang: (lang) => set(() => ({ lang: lang })),
}));

export default useAuth;
