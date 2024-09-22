export interface User {
  id: string;
  name: string;
  lastname: string;
  spiritualName: string | undefined;
  email: string;
  role: string;
  state: string;
  password?: string;
}
export interface NewUser {
  id: string;
  name: string;
  lastname: string;
  spiritualName: string | undefined;
  email: string;
  role: string;
  state: string;
  password: string;
}

export interface OverlayProps {
  onClose: () => void;
  open: boolean;
}

export interface Client {
  id: string;
  name: string;
  lastname: string;
  dni?: string | null;
  email?: string | null;
  phone?: string | null;
  emergencyContact?: string | null;
  district?: string | null;
  reservations?: Reservation[];
}

enum Office {
  SALON_PRINCIPAL = "Salon principal",
  SALON_ESPEJO ="Salon espejo",
  SALA_1="Sala 1",
  CONSULTORIO_1="Consultorio 1",
  CONSULTORIO_2="Consultorio 2"
}

enum ReservationState {
  APROBADO,
  EVALUACION,
  OBSERVACION,
  RECHAZADO
}

export interface Reservation {
  id: string;
  name: string;
  startTime: Date;
  endTime: Date;
  implementos?: string;
  observation?: string;
  office: Office;
  state: ReservationState; 
  clients: String[];
  users: String[];
}