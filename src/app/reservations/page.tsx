"use client";

import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getReservations, postReservation } from "@/services/reservations.service";

export default function Reservations() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  const handleUsers = async () => {
    try {
      const data = await getReservations();
      const dynamicHeaders = [
        { head: "Reserva", location: getPropertyIndex(data[0], "name") },
        { head: "Fecha", location: getPropertyIndex(data[0], "startTime") },
        { head: "Hora inicio", location: getPropertyIndex(data[0], "startTime") },
        { head: "hora fin", location: getPropertyIndex(data[0], "endTime") },
      ];
      setHeaders(dynamicHeaders);
      const dynamixThInRow = [
        { head: "Nombre", location: getPropertyIndex(data[0], "name") },
        { head: "Apellido", location: getPropertyIndex(data[0], "lastname") },
      ];
      data.map((user) => {
        if (user.spiritualName === null) {
          user.spiritualName = "";
        }
        if (user.role === "SUPER_ADMIN") {
          user.role = "Super Administrador";
        }
        if (user.role === "ADMIN") {
          user.role = "Administrador";
        }
        if (user.role === "EXTERNO") {
          user.role = "Externo";
        }
        if (user.state === "ACTIVO") {
          user.state = "Activo";
        }
        if (user.state === "INACTIVO") {
          user.state = "Inactivo";
        }
      });
      setTnInRowHeaders(dynamixThInRow);
      data.sort((a, b) => a.name.localeCompare(b.name));
      setUsers(data);
    } catch (error) {
      console.log("Front: Error al hacer login", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    if (
      storedUserRole !== "SUPER_ADMIN" &&
      storedUserRole !== "ADMIN" &&
      storedUserRole !== "DEV"
    ) {
      router.push("/");
    }
    // handleReservations();
    setLoading(false);
  }, [router]);

  if (loading) return <Loading loading={loading} />;

  return (
    <>
      <p>Filtros</p>;
      {/* <Table
        data={users}
        headers={headers}
        isThInRow={true}
        thInRowHeaders={thInRowHeaders}
        isColumnButton={true}
        columButtonFunction={handleEdit}
      /> */}
    </>
  );
}
