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
    // clients: Client[]; // Suponiendo que tienes un tipo 'Client' ya definido
    // users: User[];     // Suponiendo que tienes un tipo 'User' ya definido
  }