"use client";

import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { NewUser } from "../types/types";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { createUser } from "../services/users.service";

export default function NewUserOverlay({
  onClose,
  open,
  updateParent,
  onSuccess,
  storeNewUser,
}: {
  onClose: () => void;
  open: boolean;
  updateParent: () => void;
  onSuccess: () => void;
  storeNewUser: (newUser: NewUser) => void;
}) {
  const initialUserState: NewUser = {
    id: "",
    name: "",
    lastname: "",
    spiritualName: undefined,
    email: "",
    role: "",
    state: "ACTIVO",
    password: "",
  };

  const [newUser, setNewUser] = useState<NewUser>(initialUserState);

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = event.target.value;
    if (newUser) {
      setNewUser({ ...newUser, role: newRole });
    }
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    if (newUser) {
      setNewUser({ ...newUser, name: newName });
    }
  };
  const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLastname = event.target.value;
    if (newUser) {
      setNewUser({ ...newUser, lastname: newLastname });
    }
  };
  const handleSpiritualNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSpiritualName = event.target.value;
    if (newUser) {
      setNewUser({ ...newUser, spiritualName: newSpiritualName });
    }
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    if (newUser) {
      setNewUser({ ...newUser, email: newEmail });
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onCancel = () => {
    updateParent();
    onClose();
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (
      !(
        newUser?.name?.trim() &&
        newUser?.lastname?.trim() &&
        newUser?.email?.trim() &&
        newUser?.role
      )
    ) {
      e.preventDefault();
      return;
    }

    if (newUser.email && !isValidEmail(newUser.email)) {
      return;
    }

    const payload: {
      name: string;
      lastname: string;
      email: string;
      spiritualName: string | undefined;
      role: string;
    } = {
      name: newUser?.name,
      lastname: newUser?.lastname,
      email: newUser?.email,
      spiritualName: undefined,
      role: newUser?.role,
    };

    if (newUser?.spiritualName && newUser.spiritualName.trim() !== "") {
      payload.spiritualName = newUser.spiritualName;
    }
    const createdUser = await createUser(payload);
    updateParent();
    storeNewUser(createdUser);
    onClose();
    onSuccess();

    return createdUser;
  };
  useEffect(() => {
    if (open) {
      setNewUser(initialUserState);
    }
  }, [open]);

  return (
    <Transition show={open}>
      <Dialog onClose={onCancel} className="relative z-50 flex flex-col h-screen">
        {/* CPAA OSCURA */}
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
                        Nuevo usuario
                      </Dialog.Title>
                      <div className="flex justify-center items-center gap-x-3">
                        <UserCircleIcon aria-hidden="true" className="h-3/4 w-3/4 text-gray-300" />
                      </div>
                    </div>

                    {/* FORMULARIO DE PERFIL */}
                    <div className="flex-1 overflow-y-auto scrollbar-hide px-4">
                      <form className="h-full flex flex-col border-b border-gray-900/10 pb-6">
                        {/* NOMBRE */}
                        <div className="mt-5 grid gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Nombre
                            </label>
                            <div className="mt-2">
                              <input
                                placeholder="Nombre"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                onChange={handleNameChange}
                              />
                            </div>
                          </div>
                          {/* APELLIDO  */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Apellido
                            </label>
                            <div className="mt-2">
                              <input
                                placeholder="Apellido"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                onChange={handleLastnameChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 grid gap-x-6 gap-y-8 sm:grid-cols-6">
                          {/* ROL */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Rol
                            </label>
                            <div className="mt-2">
                              <select
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                onChange={handleRoleChange}
                              >
                                <option value="" disabled selected>
                                  Seleccionar
                                </option>
                                <option value="EXTERNO">Externo</option>
                                <option value="ADMIN">Administrador</option>
                              </select>
                            </div>
                          </div>
                          {/* NOMBRE ESPIRITUAL */}
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Nombre espiritual
                            </label>
                            <div className="mt-2">
                              <input
                                placeholder="Nombre espiritual"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                onChange={handleSpiritualNameChange}
                              />
                            </div>
                          </div>
                        </div>
                        {/* EMAIL */}
                        <div className="mt-5 grid gap-x-6 gap-y-8">
                          <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                              Email
                            </label>
                            <div className="mt-2">
                              <input
                                placeholder="Email"
                                type="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                onChange={handleEmailChange}
                              />
                            </div>
                          </div>
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
