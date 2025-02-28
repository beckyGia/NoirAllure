import bcrypt from "bcryptjs";

const users = [
  {
    name: "Rosalinda Muller",
    email: "rosalinda_muller@email.com",
    password: bcrypt.hashSync("Abc12!", 10),
    role: "admin",
  },
  {
    name: "Augustine Wolf",
    email: "augustine@email.com",
    password: bcrypt.hashSync("Abc12!", 10),
    role: "admin",
  },
  {
    name: "Halle Bayer",
    email: "halle_bayer@email.com",
    password: bcrypt.hashSync("Abc12!", 10),
    role: "customer",
  },
  {
    name: "Victoria Bednar ",
    email: "victoria_bednar@email.com",
    password: bcrypt.hashSync("Abc12!", 10),
    role: "customer",
  },
  {
    name: "Ashlynn Block",
    email: "ashlynn_block@email.com",
    password: bcrypt.hashSync("Abc12!", 10),
    role: "customer",
  },
  {
    name: "Jaclyn Champlin",
    email: "jaclyn@email.com",
    password: bcrypt.hashSync("Abc12!", 10),
    role: "customer",
  },
];

export default users;
