import bcrypt from "bcryptjs";

// initial testing users db

const users = [
  {
    name: "Admin User",
    email: "admin@exapmle.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@exapmle.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "Jane@exapmle.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
