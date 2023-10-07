type AdminUser = {
  id: string;
  idPublic: string;
  username: string;
  password: string;
  role: "admin";
  name: string;
  age: number;
  gender: "Male" | "Female";
  address: string;
  status: boolean;
  phone: string;
  storeName: string;
};

const adminUsers: AdminUser[] = [
  {
    id: "ec5301c9-2ffb-4bec-9c99-ed48249b15ec",
    idPublic: "a1",
    username: "admin",
    password: "admin",
    role: "admin",
    name: "Alber Leo",
    age: 21,
    gender: "Male",
    address: "Jalan jalan ke kota sumedang, pulangnya bawa gedang",
    status: true,
    phone: "08584543151",
    storeName: "Kios Melati",
  },
];

export default adminUsers;
