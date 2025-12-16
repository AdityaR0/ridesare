// import api from "./axios";
import api from "../utils/axios";


export const registerUser = async ({ name, email, phone, password, role }) => {
  const res = await api.post("/auth/register", {
    name,
    email,
    phone,
    password,
    role,
  });
  return res.data;
};

export const loginUser = async ({ email, password, role }) => {
  const res = await api.post("/auth/login", {
    email,
    password,
    role,
  });
  return res.data;
};
