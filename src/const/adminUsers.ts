type AdminUser = {
  id: string;
  idPublic: number;
  username: string;
  password: string;
  role: "admin";
  name: string;
  age: number;
  phone: string;
  storeName: string;
};

const adminUsers: AdminUser[] = [
  {
    id: "ec5301c9-2ffb-4bec-9c99-ed48249b15ec",
    idPublic: 1,
    username: "admin",
    password: "admin",
    role: "admin",
    name: "Alber Leo",
    age: 21,
    phone: "08584543151",
    storeName: "Kios Melati",
  },
];

export default adminUsers;
