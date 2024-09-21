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
  createdAt: Date;
  updatedAt: Date;
  name: string;
  lastname: string;
  dni?: string | null;
  email?: string | null;
  phone?: string | null;
  emergencyContact?: string | null;
  district?: string | null;
  reservations?: Reservation[];
}

export interface Reservation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  startTime: Date;
  endTime: Date;
  implementos?: string | null;
  observation?: string | null;
  // office?: Office | null; // Suponiendo que 'Office' es otro modelo en Prisma
  // state: ReservationState; // 'ReservationState' es un enum o tipo definido en Prisma
  clients: Client[];
  // users: User[];     // Suponiendo que tienes un tipo 'User' ya definido
}
