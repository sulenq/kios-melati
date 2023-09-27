import { ShoppingCartSimple, Receipt, User } from "@phosphor-icons/react";

type AdminNav = {
  name: string;
  icon: any;
  link: string;
};

const adminNav: AdminNav[] = [
  { name: "Cashiering", icon: ShoppingCartSimple, link: "/cashier" },
  { name: "Transaction", icon: Receipt, link: "/cashier/transaction" },
  { name: "Profile", icon: User, link: "/cashier/profile" },
];

export default adminNav;
