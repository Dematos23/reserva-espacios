"use client";

import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getReservations, postReservation } from "@/services/reservations.service";
import { getPropertyIndex } from "@/utils/getPropertyIndex";
import { Reservation } from "@/types/types";
import Table from "@/components/Table";
import NewReservationModal from "@/components/NewReservationModal";

export default function Reservations() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [headers, setHeaders] = useState<{ head: string; location: number | undefined }[]>([]);
  const [thInRowHeaders, setTnInRowHeaders] = useState<
    {
      head: string;
      location: number | undefined;
    }[]
  >([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const handleReservations = async () => {
    try {
      const data = await getReservations();

      const dynamicHeaders = [
        { head: "Fecha", location: getPropertyIndex(data[0], "date") },
        { head: "Hora inicio", location: getPropertyIndex(data[0], "startTime") },
        { head: "hora fin", location: getPropertyIndex(data[0], "endTime") },
        { head: "Sala", location: getPropertyIndex(data[0], "office") },
        { head: "Estado", location: getPropertyIndex(data[0], "state") },
      ];
      setHeaders(dynamicHeaders);

      const ThInRow = [{ head: "Reserva", location: getPropertyIndex(data[0], "name") }];
      setTnInRowHeaders(ThInRow);

      data.sort((a, b) => a.name.localeCompare(b.name));
      setReservations(data);
    } catch (error) {
      throw new Error();
    } finally {
      setLoading(false);
    }
  };

  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const [newReservation, setNewReservation] = useState<Reservation | null>(null);

  const handleEdit = (reservation: Reservation | null) => {
    if (reservation) {
      // setShowOverlay(true);
      setSelectedReservation(reservation);
    }
  };

  const [showNewReservationModal, setShowNewReservationModal] = useState<boolean>(false);

  const openNewReservationModal = () => {
    setShowNewReservationModal(true);
  };

  const closeNewReservationModal = () => {
    setShowNewReservationModal(false);
  };

  // const storeNewUser = (newUser: NewUser) => {
  //   setNewUser(newUser);
  // };

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    if (
      storedUserRole !== "SUPER_ADMIN" &&
      storedUserRole !== "ADMIN" &&
      storedUserRole !== "DEV"
    ) {
      router.push("/");
    }
    handleReservations();
  }, [router]);

  if (loading) return <Loading loading={loading} />;

  return (
    <div>
      <button
        className="mx-8 rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={openNewReservationModal}
      >
        Crear Reserva
      </button>
      <Table
        data={reservations}
        headers={headers}
        isThInRow={true}
        thInRowHeaders={thInRowHeaders}
        isColumnButton={true}
        columButtonFunction={handleEdit}
      />
      <NewReservationModal
        onClose={closeNewReservationModal}
        open={showNewReservationModal}
        updateParent={handleReservations}
        storeNewReservation={setNewReservation}
      />
    </div>
  );
}
