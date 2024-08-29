"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usersService } from "../../services/users.service";

import { useRouter } from "next/navigation";
import UserOverlay from "../../components/UserOverlay";
import { User } from "../../types/types";

export default function users() {
  const headers = [
    { head: "Nombre" },
    { head: "Nombre espiritual" },
    { head: "Email" },
    { head: "Rol" },
    { head: "Estado" },
    { head: "" },
  ];

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const router = useRouter();

  const handleUsers = async () => {
    try {
      const data = await usersService();
      data.map((user) => {
        if (user.spiritualName === null) {
          user.spiritualName = "Sin nombre espiritual";
        }
      });
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

  if (loading) return <p>Loading...</p>;

  const handleEdit = (userId: string) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      setShowModal(true);
      setSelectedUser(user);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-8 overflow-y-hidden">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              {headers.map((header) => (
                <th scope="col" className="px-6 py-3">
                  {header.head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                key={user.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {`${user.name} ${user.lastname}`}{" "}
                </th>
                <td className="px-6 py-4">{user.spiritualName}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4">{user.state}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleEdit(user.id)}
                  >
                    Editar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedUser ? (
          <UserOverlay user={selectedUser} open={showModal} onClose={handleCloseModal} />
        ) : null}
      </div>
    </>
  );
}
