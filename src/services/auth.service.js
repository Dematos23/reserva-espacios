import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  headers: {
    "content-type": "application/json",
  },
});

const serviceLogin = async (userEmail, userPassword) => {
  const userData = {
    email: userEmail,
    password: userPassword,
  };
  try {
    const res = await api.post("/login", userData);
    return res;
  } catch (error) {
    throw Error("Login fallido");
  }
};

export { serviceLogin };
