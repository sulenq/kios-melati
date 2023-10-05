type CashierUser = {
  id: string;
  idPublic: string;
  username: string;
  password: string;
  role: "cashier";
  name: string;
  age: number;
  phone: string;
  storeName: string;
};

const cashierUsers: CashierUser[] = [
  {
    id: "7885ad23-da66-4987-aaf1-a23789b93397",
    idPublic: "c1",
    username: "cashier",
    password: "cashier",
    role: "cashier",
    name: "Jolitos Kurniawan",
    age: 22,
    phone: "08584223123",
    storeName: "Kios Melati",
  },
];

export default cashierUsers;
