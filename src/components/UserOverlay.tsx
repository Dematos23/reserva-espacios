"use client";

import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { User, NewUser } from "../types/types";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { updateUser, resetPassword } from "../services/users.service";

export default function UserOverlay({
  user,
  onClose,
  open,
  updateParent,
  onReset,
  storeNewUser,
}: {
  user: User | null;
  onClose: () => void;
  open: boolean;
  updateParent: () => void;
  onReset: () => void;
  storeNewUser: (newUser: NewUser) => void;
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(user);
  const [isSpiritualName, setIsSpiritualName] = useState<boolean>(false);

  useEffect(() => {
    if (user && user.spiritualName !== "Sin nombre espiritual") {
      setIsSpiritualName(true);
    } else {
      setIsSpiritualName(false);
    }
    if (user?.role === "Super Administrador") {
      user.role = "SUPER_ADMIN";
    }
    if (user?.role === "Administrador") {
      user.role = "ADMIN";
    }
    if (user?.role === "Externo") {
      user.role = "EXTERNO";
    }
    if (user?.state === "Activo") {
      user.state = "ACTIVO";
    }
    if (user?.state === "Inactivo") {
      user.state = "INACTIVO";
    }
    setCurrentUser(user);
  }, [user]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = event.target.value;
    if (currentUser) {
      setCurrentUser({ ...currentUser, role: newRole });
    }
  };
  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = event.target.value;
    if (currentUser) {
      setCurrentUser({ ...currentUser, state: newState });
    }
  };
  const handleSpiritualNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSpiritualName = event.target.value;
    if (currentUser) {
      setCurrentUser({ ...currentUser, spiritualName: newSpiritualName });
    }
  };
  const onCancel = () => {
    updateParent();
    onClose();
  };

  const handleSubmit = async () => {
    const payload: Partial<User> = {
      id: currentUser?.id,
      role: currentUser?.role,
      state: currentUser?.state,
      spiritualName: undefined,
    };
    if (currentUser?.spiritualName && currentUser.spiritualName.trim() !== "") {
      payload.spiritualName = currentUser.spiritualName;
    }
    const updatedUser = await updateUser(payload);
    updateParent();
    onClose();
    return updatedUser;
  };

  const handleResetPassword = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const payload: Partial<NewUser> = {
      id: currentUser?.id,
      email: currentUser?.email,
    };
    e.preventDefault();

    const updatedUser = await resetPassword(payload);
    updateParent();
    storeNewUser(updatedUser);
    onClose();
    onReset();
    return updatedUser;
  };

  return (
    <Transition show={open}>
      <Dialog onClose={onCancel} className="relative z-50 flex flex-col h-screen">
        {/* CAPA OSCURA */}
        <Transition.Child
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md flex flex-col h-full">
                  {/* ICONO DE "X" PARA CERRAR OVERLAY */}
                  <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4">
                    <button
                      type="button"
                      onClick={() => onClose()}
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none"
                    >
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>
                  {/* CONTENIDO DEL OVERLAY */}
                  <div className="flex flex-col h-screen bg-white py-6">
                    {/* INFO NO EDITABLE */}
                    <div className="flex-1 flex flex-col bg-white px-4">
                      <Dialog.Title className="text-lg text-center font-semibold leading-4 text-gray-900">
                        Perfil del usuario
                      </Dialog.Title>
                      <div className="mb-2 flex justify-center items-center gap-x-3">
                        <UserCircleIcon aria-hidden="true" className="h-3/4 w-3/4 text-gray-300" />
                      </div>
                      <h1 className="text-base font-semibold leading-4 text-gray-900 mb-2">
                        {currentUser ? `${currentUser.name} ${currentUser.lastname}` : null}
                      </h1>
                      {isSpiritualName && currentUser ? (
                        <h1>{`${currentUser.spiritualName}`}</h1>
                      ) : null}
                      <p>{currentUser ? `${currentUser.email}` : null}</p>
                    </div>

                    {/* FORMULARIO DE PERFIL */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide mt-6 px-4">
                      <form className="h-full flex flex-col border-b border-gray-900/10 pb-6">
                        <div className="grid gap-x-6 gap-y-8 sm:grid-cols-6">
                          {/* ROL */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Rol
                            </label>
                            <div className="mt-2">
                              <select
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                value={currentUser?.role}
                                onChange={handleRoleChange}
                              >
                                <option value="EXTERNO">Externo</option>
                                <option value="ADMIN">Administrador</option>
                                <option value="SUPER_ADMIN">Super Administrador</option>
                              </select>
                            </div>
                          </div>
                          {/* Estado */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Estado
                            </label>
                            <div className="mt-2">
                              <select
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                value={currentUser?.state}
                                onChange={handleStateChange}
                              >
                                <option value="ACTIVO">Activo</option>
                                <option value="INACTIVO">Inactivo</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        {/* NOMBRE ESPIRITUAL */}
                        <div className="mt-5 grid gap-x-6 gap-y-8">
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Nombre espiritual
                            </label>
                            <div className="mt-2">
                              <input
                                id="spiritualName"
                                placeholder={currentUser?.spiritualName}
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                onChange={handleSpiritualNameChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <button
                            type="submit"
                            className="rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                            onClick={handleResetPassword}
                          >
                            Reiniciar contraseña
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* BOTONES */}
                    <div className="mt-6 px-4 flex justify-end gap-x-6">
                      <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={onCancel}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        onClick={handleSubmit}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
