"use client";

import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getClients } from "@/services/clients.service";
import { getPropertyIndex } from "@/utils/getPropertyIndex";
import { Client } from "@/types/types";
import Table from "@/components/Table";

export default function Clients() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);

  const [clients, setClients] = useState<Client[]>([]);
  const [headers, setHeaders] = useState<{ head: string; location: number | undefined }[]>([]);
  const [thInRowHeaders, setTnInRowHeaders] = useState<
    {
      head: string;
      location: number | undefined;
    }[]
  >([]);

  const handleClients = async () => {
    try {
      const data = await getClients();
      const Headers = [
        { head: "Dni", location: getPropertyIndex(data[0], "dni") },
        { head: "Email", location: getPropertyIndex(data[0], "email") },
        { head: "Teléfono", location: getPropertyIndex(data[0], "phone") },
        { head: "Distrito", location: getPropertyIndex(data[0], "district") },
      ];
      setHeaders(Headers);
      const ThInRow = [
        { head: "Nombre", location: getPropertyIndex(data[0], "name") },
        { head: "Apellido", location: getPropertyIndex(data[0], "lastname") },
      ];
      setTnInRowHeaders(ThInRow);

      data.map((client) => {
        if (client.dni === null) {
          client.dni = "";
        }
        if (client.email === null) {
          client.email = "";
        }
        if (client.phone === null) {
          client.phone = "";
        }
        if (client.district === null) {
          client.district = "";
        }
      });

      data.sort((a, b) => a.name.localeCompare(b.name));
      setClients(data);
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
    handleClients();
  }, [router]);

  if (loading) return <Loading loading={loading} />;

  return (
    <>
      <p>Filtros</p>
      <button
        className="mx-8 rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        // onClick={openNewUserOverlay}
      >
        Nuevo Cliente
      </button>
      <Table
        data={clients}
        headers={headers}
        isThInRow={true}
        thInRowHeaders={thInRowHeaders}
        isColumnButton={false}
        // columButtonFunction={handleEdit}
      />
    </>
  );
}
