import { ShoppingCartSimple, Receipt, User } from "@phosphor-icons/react";

type CashierNav = {
  name: string;
  icon: any;
  link: string[];
};

const cashierNav: CashierNav[] = [
  {
    name: "Cashiering",
    icon: ShoppingCartSimple,
    link: ["/cashier", "/product-search", "/checkout"],
  },
  {
    name: "Transaction",
    icon: Receipt,
    link: ["/cashier/transaction", "/transaction/:id"],
  },
  { name: "Profile", icon: User, link: ["/cashier/profile"] },
];

export default cashierNav;
