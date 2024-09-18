import axios from "axios";
import { User, NewUser } from "../types/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
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

const updateUser = async (payload: Partial<User>): Promise<User> => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const res = await api.put<User>("/users", payload);
    return res.data;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

const resetPassword = async (payload: Partial<User>): Promise<NewUser> => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const res = await api.put<NewUser>("/reset-password", payload);
    return res.data;
  } catch (error) {
    throw new Error("Error reseting user password");
  }
};

const createUser = async (payload: Partial<User>): Promise<NewUser> => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const res = await api.post<NewUser>("/users", payload);
    return res.data;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

export { getUsers, updateUser, createUser, resetPassword };
