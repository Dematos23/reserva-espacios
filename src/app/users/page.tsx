"use client";

import { useEffect, useState } from "react";
import { getUsers } from "../../services/users.service";
import { useRouter } from "next/navigation";
import UserOverlay from "../../components/UserOverlay";
import Loading from "@/components/Loading";
import NewUserOverlay from "@/components/NewUserOverlay";
import { User } from "../../types/types";
import { getPropertyIndex } from "../../utils/getPropertyIndex";
import Table from "@/components/Table";

export default function users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [showNewOverlay, setNewShowOverlay] = useState<boolean>(false);
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
    if (storedUserRole !== "SUPER_ADMIN" && storedUserRole !== "DEV") {
      router.push("/");
    }
    handleUsers();
  }, []);

  const openNewUserOverlay = () => {
    setNewShowOverlay(true);
  };
  const closeNewUserOverlay = () => {
    setNewShowOverlay(false);
  };

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
      <button
        className="mx-8 rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={openNewUserOverlay}
      >
        Nuevo Usuario
      </button>
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
      <NewUserOverlay
        open={showNewOverlay}
        onClose={closeNewUserOverlay}
        updateParent={handleUsers}
      />
    </>
  );
}
