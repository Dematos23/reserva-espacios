import axios from "axios";
import { User } from "../types/types";

// const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "content-type": "application/json",
  },
});

const usersService = async (): Promise<User[]> => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }
  try {
    const res = await api.get<User[]>("/users");
    return res.data;
  } catch (error) {
    throw Error;
  }
};

export { usersService };
