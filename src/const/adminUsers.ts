type AdminUser = {
  id: string;
  idPublic: number;
  username: string;
  password: string;
  role: "admin";
  storeName: string;
};

const adminUsers: AdminUser[] = [
  {
    id: "ec5301c9-2ffb-4bec-9c99-ed48249b15ec",
    idPublic: 1,
    username: "admin",
    password: "admin",
    role: "admin",
    storeName: "Kios Melati",
  },
  {
    id: "e3e15077-7ceb-44b4-bc19-3fdb22f8fce3",
    idPublic: 2,
    username: "admin2",
    password: "admin2",
    role: "admin",
    storeName: "Kios Mawar",
  },
];

export default adminUsers;
