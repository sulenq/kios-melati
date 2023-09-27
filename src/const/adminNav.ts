import {
  ChartLine,
  ShoppingCartSimple,
  Package,
  HandCoins,
  CurrencyDollar,
  Scroll,
  Storefront,
  Receipt,
} from "@phosphor-icons/react";

type AdminNav = {
  name: string;
  icon: any;
  link: string;
};

const adminNav: AdminNav[] = [
  { name: "Dashboard", icon: ChartLine, link: "/admin" },
  { name: "Product", icon: Package, link: "/admin/product" },
  { name: "Debt", icon: HandCoins, link: "/admin/debt" },
  { name: "Expense", icon: CurrencyDollar, link: "/admin/expense" },
  { name: "Store", icon: Storefront, link: "/admin/store" },
  { name: "Report", icon: Scroll, link: "/admin/report" },
  { name: "Cashiering", icon: ShoppingCartSimple, link: "/admin/cashiering" },
  { name: "Transaction", icon: Receipt, link: "/admin/transaction" },
];

export default adminNav;
