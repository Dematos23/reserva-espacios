import { backendApi } from "./api/backend.api";
import { Reservation } from "@/types/types";

const getReservations = async (): Promise<Reservation[]> => {
  try {
    const res = await backendApi.get<Reservation[]>("/reservations");
    return res.data;
  } catch (error) {
    throw new Error();
  }
};

const postReservation = async (payload: Partial<Reservation>): Promise<Reservation> => {
  try {
    const res = await backendApi.post<Reservation>("/reservations", payload);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.content);
  }
};

export { getReservations, postReservation };
