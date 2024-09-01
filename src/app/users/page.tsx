"use client";

import { useEffect, useState } from "react";
import { getUsers } from "../../services/users.service";
import { useRouter } from "next/navigation";
import UserOverlay from "../../components/UserOverlay";
import Loading from "@/components/Loading";
import { User } from "../../types/types";
import { getPropertyIndex } from "../../utils/getPropertyIndex";
import Table from "@/components/Table";

export default function users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [headers, setHeaders] = useState<{ head: string; location: number | undefined }[]>([]);
  const [thInRowHeaders, setTnInRowHeaders] = useState<
    {
      head: string;
      location: number | undefined;
    }[]
  >([]);

  const router = useRouter();

  const handleUsers = async () => {
    try {
      const data = await getUsers();
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
      data.sort((a, b) => a.name.localeCompare(b.name));
      setUsers(data);
      const dynamicHeaders = [
        { head: "Nombre espiritual", location: getPropertyIndex(data[0], "spiritualName") },
        { head: "Email", location: getPropertyIndex(data[0], "email") },
        { head: "Rol", location: getPropertyIndex(data[0], "role") },
        { head: "Estado", location: getPropertyIndex(data[0], "state") },
      ];
      setHeaders(dynamicHeaders);
      const dynamixThInRow = [
        { head: "Nombre", location: getPropertyIndex(data[0], "name") },
        { head: "Apellido", location: getPropertyIndex(data[0], "lastname") },
      ];
      setTnInRowHeaders(dynamixThInRow);
    } catch (error) {
      console.log("Front: Error al hacer login", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    if (storedUserRole !== "SUPER_ADMIN" && storedUserRole !== "DEV") {
      router.push("/");
    }
    handleUsers();
  }, []);

  const handleEdit = (user: User | null) => {
    if (user) {
      setShowOverlay(true);
      setSelectedUser(user);
    }
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  if (loading) return <Loading loading={loading} />;

  return (
    <>
      <Table
        data={users}
        headers={headers}
        isThInRow={true}
        thInRowHeaders={thInRowHeaders}
        isColumnButton={true}
        columButtonFunction={handleEdit}
      />
      {selectedUser ? (
        <UserOverlay
          user={selectedUser}
          open={showOverlay}
          onClose={handleCloseOverlay}
          updateParent={handleUsers}
        />
      ) : null}
    </>
  );
}
