"use client";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { User, OverlayProps } from "../types/types";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function UserOverlay({
  user,
  onClose,
  open,
}: {
  user: User | null;
  onClose: () => void;
  open: boolean;
}) {
  const [isSpiritualName, setIsSpiritualName] = useState<boolean>(false);
  useEffect(() => {
    if (user.spiritualName !== "Sin nombre espiritual") {
      setIsSpiritualName(true);
    } else {
      setIsSpiritualName(false);
    }
  }, [user]);
  return (
    <Transition show={open}>
      <Dialog onClose={onClose} className="relative z-50 flex flex-col h-screen">
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
                    <div className="px-4 sm:px-6 border">
                      <Dialog.Title className="text-lg text-center font-semibold leading-4 text-gray-900">
                        Perfil del usuario
                      </Dialog.Title>
                      <div className="mb-2 flex justify-center items-center gap-x-3">
                        <UserCircleIcon aria-hidden="true" className="h-3/4 w-3/4 text-gray-300" />
                      </div>
                      <h1 className="text-base font-semibold leading-4 text-gray-900 mb-2">
                        {`${user.name} ${user.lastname}`}
                      </h1>
                      {isSpiritualName ? <h1>{`${user.spiritualName}`}</h1> : null}
                      <p>{`${user.email}`}</p>
                    </div>

                    {/* FORMULARIO DE PERFIL */}
                    <div className="mt-6 px-4">
                      <form>
                        <div className="border border-gray-900/10 pb-6">
                          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {/* TIPO DE USUARIO */}
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Tipo de usuario
                              </label>
                              <div className="mt-2">
                                <select
                                  id="country"
                                  name="country"
                                  autoComplete="country-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option>Externo</option>
                                  <option>Admin</option>
                                </select>
                              </div>
                            </div>
                            {/* Estado */}
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Estado
                              </label>
                              <div className="mt-2">
                                <select
                                  id="country"
                                  name="country"
                                  autoComplete="country-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                  <option>Activo</option>
                                  <option>Inactivo</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          {/* NOMBRE ESPIRITUAL */}
                          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Nombre espiritual
                              </label>
                              <div className="mt-2">
                                <input
                                  id="spiritualName"
                                  placeholder={user.spiritualName}
                                  name="first-name"
                                  type="text"
                                  autoComplete="given-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Nombre espiritual
                              </label>
                              <div className="mt-2">
                                <input
                                  id="spiritualName"
                                  placeholder={user.spiritualName}
                                  name="first-name"
                                  type="text"
                                  autoComplete="given-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Nombre espiritual
                              </label>
                              <div className="mt-2">
                                <input
                                  id="spiritualName"
                                  placeholder={user.spiritualName}
                                  name="first-name"
                                  type="text"
                                  autoComplete="given-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Nombre espiritual
                              </label>
                              <div className="mt-2">
                                <input
                                  id="spiritualName"
                                  placeholder={user.spiritualName}
                                  name="first-name"
                                  type="text"
                                  autoComplete="given-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Nombre espiritual
                              </label>
                              <div className="mt-2">
                                <input
                                  id="spiritualName"
                                  placeholder={user.spiritualName}
                                  name="first-name"
                                  type="text"
                                  autoComplete="given-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>

                    {/* BOTONES */}
                    <div className="mt-6 px-4 flex justify-end gap-x-6 border">
                      <button
                        type="button"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
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
