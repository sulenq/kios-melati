type CashierUser = {
  id: string;
  idPublic: number;
  username: string;
  // password: string;
  role: "cashier";
  storeName: string;
};

const cashierUsers: CashierUser[] = [
  {
    id: "7885ad23-da66-4987-aaf1-a23789b93397",
    idPublic: 1,
    username: "cashier",
    // password: "cashier",
    role: "cashier",
    storeName: "Kios Melati",
  },
  {
    id: "21531a53-7b38-4deb-90bb-6d4b2a26d873",
    idPublic: 2,
    username: "cashier2",
    // password: "cashier2",
    role: "cashier",
    storeName: "Kios Melati",
  },
];

export default cashierUsers;
