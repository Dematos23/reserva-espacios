import { Client } from "../types/types";
import { backendApi } from "./api/backend.api";

const getClients = async (): Promise<Client[]> => {
    try {
        const res = await backendApi.get<Client[]>("/clients")
        return res.data
    } catch (error) {
        throw new Error
    }
}

export { getClients }