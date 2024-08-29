import axios from "axios";
import { User } from "../types/types";

const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "content-type": "application/json",
  },
});

const getUsers = async (): Promise<User[]> => {
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

const updateUser = async (userId: string, updatedData: Partial<User>): Promise<User> => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }
  try {
    const res = await api.put<User>(`/users/${userId}`, updatedData);
    return res.data;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

export { getUsers, updateUser };
