"use client";

import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getReservations } from "@/services/reservations.service";
import { getPropertyIndex } from "@/utils/getPropertyIndex";
import { Reservation, ReservationState, Office } from "@/types/types";
import Table from "@/components/Table";
import NewReservationModal from "@/components/NewReservationModal";
import ReservationOverlay from "@/components/ReservationOverlay";
import Calendar from "@/components/CalendarView";
import CardsView from "@/components/CardsView";

export default function Reservations() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [headers, setHeaders] = useState<
    { head: string; location: number | undefined }[]
  >([]);
  const [thInRowHeaders, setTnInRowHeaders] = useState<
    {
      head: string;
      location: number | undefined;
    }[]
  >([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [view, setView] = useState<string>("Tarjetas");
  const viewOptions: string[] = ["Tabla", "Calendario", "Tarjetas", "Agenda"];

  const handleView = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setView(event.target.value as string);
  };

  const handleReservations = async () => {
    try {
      const data = await getReservations();

      const dynamicHeaders = [
        { head: "Fecha", location: getPropertyIndex(data[0], "date") },
        {
          head: "Hora inicio",
          location: getPropertyIndex(data[0], "startTime"),
        },
        { head: "hora fin", location: getPropertyIndex(data[0], "endTime") },
        { head: "Sala", location: getPropertyIndex(data[0], "office") },
        { head: "Estado", location: getPropertyIndex(data[0], "state") },
      ];
      setHeaders(dynamicHeaders);

      const ThInRow = [
        { head: "Reserva", location: getPropertyIndex(data[0], "name") },
      ];
      setTnInRowHeaders(ThInRow);

      data.sort((a, b) => a.name.localeCompare(b.name));
      setReservations(data);
      setLoading(false);
    } catch (error) {
      throw new Error();
    }
  };

  const initialReservationState: Reservation = {
    id: "",
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    office: "",
    implementos: "",
    state: ReservationState.EVALUACION,
    observation: "",
    clients: [],
    users: [],
  };
  const [selectedReservation, setSelectedReservation] = useState<Reservation>(
    initialReservationState
  );

  const [newReservation, setNewReservation] = useState<Reservation | null>(
    null
  );

  const [showReservationOverlay, setShowReservationOverlay] =
    useState<boolean>(false);

  const handleEdit = (reservation: Reservation) => {
    if (reservation) {
      setShowReservationOverlay(true);
      setSelectedReservation(reservation);
    }
  };

  const [showNewReservationModal, setShowNewReservationModal] =
    useState<boolean>(false);

  const closeReservationOverlay = () => {
    setShowReservationOverlay(false);
  };

  const openNewReservationModal = () => {
    setShowNewReservationModal(true);
  };

  const closeNewReservationModal = () => {
    setShowNewReservationModal(false);
  };

  // FILTROS
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(
    null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    if (
      storedUserRole !== "SUPER_ADMIN" &&
      storedUserRole !== "ADMIN" &&
      storedUserRole !== "DEV"
    ) {
      router.push("/");
    } else {
      handleReservations();
    }
  }, [router]);

  if (loading) return <Loading loading={loading} />;

  return (
    <div>
      <div className="flex justify-between grid-col-12 ">
        <div className="col-span-1">
          <button
            className="mx-8 rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={openNewReservationModal}
          >
            Crear Reserva
          </button>
        </div>
        <div className="col-span-1">Fecha</div>
        <div className="col-span-1">Office</div>
        <div className="col-span-1">Estado</div>
        <div className="col-span-1">Terapeutas</div>
        <div className="col-span-1">Clientes</div>
        <div className="col-span-1">
          <select
            value={view}
            onChange={handleView}
            className="mx-8 w-auto rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            {viewOptions.map((view) => {
              return (
                <option value={view} key={view}>
                  {view}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {(() => {
        switch (view) {
          case "Tabla":
            return (
              <Table
                data={reservations}
                headers={headers}
                isThInRow={true}
                thInRowHeaders={thInRowHeaders}
                isColumnButton={true}
                columnButtonFunction={handleEdit}
              />
            );
          case "Calendario":
            return <></>;
          // return <Calendar/>
          case "Tarjetas":
            return (
              <CardsView
                data={reservations}
                isCardButton={true}
                cardButtonFunction={handleEdit}
              />
            );
          default:
            break;
        }
      })()}

      <NewReservationModal
        onClose={closeNewReservationModal}
        open={showNewReservationModal}
        updateParent={handleReservations}
        storeNewReservation={setNewReservation}
      />
      <ReservationOverlay
        reservation={selectedReservation}
        onClose={closeReservationOverlay}
        open={showReservationOverlay}
        updateParent={handleReservations}
      />
    </div>
  );
}
