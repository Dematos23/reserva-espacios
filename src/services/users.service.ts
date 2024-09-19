import { User, NewUser } from "../types/types";
import { backendApi } from "./api/backend.api";

const getUsers = async (): Promise<User[]> => {
  try {
    const res = await backendApi.get<User[]>("/users");
    return res.data;
  } catch (error) {
    throw Error;
  }
};

const updateUser = async (payload: Partial<User>): Promise<User> => {
  try {
    const res = await backendApi.put<User>("/users", payload);
    return res.data;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

const resetPassword = async (payload: Partial<User>): Promise<NewUser> => {
  try {
    const res = await backendApi.put<NewUser>("/reset-password", payload);
    return res.data;
  } catch (error) {
    throw new Error("Error reseting user password");
  }
};

const createUser = async (payload: Partial<User>): Promise<NewUser> => {
  try {
    const res = await backendApi.post<NewUser>("/users", payload);
    return res.data;
  } catch (error) {
    throw new Error("Error updating user");
  }
};

export { getUsers, updateUser, createUser, resetPassword };
