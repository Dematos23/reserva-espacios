"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Reservation, Office, ReservationState, Client } from "@/types/types";
import { getClients } from "@/services/clients.service";
import { postReservation } from "@/services/reservations.service";
import { Combobox } from "@headlessui/react";
import Loading from "@/components/Loading";

export default function NewReservationModal({
  onClose,
  open,
  updateParent,
  //   onSuccess,
  storeNewReservation,
}: {
  onClose: () => void;
  open: boolean;
  updateParent: () => void;
  //   onSuccess: () => void;
  storeNewReservation: (newReservation: Reservation) => void;
}) {
  const onCancel = () => {
    updateParent();
    onClose();
  };

  const initialReservationState: Reservation = {
    id: "",
    name: "",
    startTime: new Date(),
    endTime: new Date(),
    implementos: "",
    observation: "",
    office: "",
    state: ReservationState.EVALUACION,
    clients: [],
    users: [],
  };
  const [newReservation, setNewReservation] = useState<Reservation>(initialReservationState);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setNewReservation({ ...newReservation, name: newName });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(event.target.value);
    setNewReservation({ ...newReservation, startTime: newDate, endTime: newDate });
  };

  const handleStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = event.target.value.split(":").map(Number);
    const newDate = newReservation.startTime;
    newDate.setHours(hours, minutes);
    setNewReservation({ ...newReservation, startTime: newDate });
  };

  const handleEndTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = event.target.value.split(":").map(Number);
    const newDate = newReservation.endTime;
    newDate.setHours(hours, minutes);
    setNewReservation({ ...newReservation, endTime: newDate });
    console.log(newReservation.office);
  };

  const [selectValue, setSelectValue] = useState<string | Office>("Select");

  const handleOfficeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(event.target.value);
    setNewReservation({ ...newReservation, office: event.target.value as Office });
  };

  const [clients, setClients] = useState<Client[]>([]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!newReservation?.name?.trim()) {
      e.preventDefault();
      return;
    }

    const payload: Partial<Reservation> = {
      name: newReservation.name,
      startTime: newReservation.startTime,
      endTime: newReservation.endTime,
      implementos: newReservation.implementos,
      observation: newReservation.observation,
      office: newReservation.office,
      state: newReservation.state,
      clients: newReservation.clients,
      users: newReservation.users,
    };

    const createdReservation = await postReservation(payload);
    updateParent();
    storeNewReservation(createdReservation);
    //   onSuccess();
    onClose();
  };

  const handleClients = async () => {
    try {
      const data = await getClients();
      setClients(data);
    } catch (error) {
      throw new Error();
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   handleClients();
  // }, []);

  const [selectedClient, setSelectedClient] = useState<string>("");

  const handleSelectedClients = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClient(event.target.value);
  };

  const [query, setQuery] = useState("");

  const filteredClients =
    query === ""
      ? clients
      : clients.filter((client) => {
          return client.name.toLowerCase().includes(query.toLowerCase());
        });

  if (loading) return <Loading loading={loading} />;

  return (
    <Transition show={open}>
      {/* <Dialog.Overlay className="fixed inset-0 z-40 bg-black bg-opacity-75" /> */}
      <Dialog open={open} onClose={onCancel} className="relative z-10">
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
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Nueva Reserva
                      </Dialog.Title>

                      {/* formulario */}
                      <div className="mt-2">
                        <form className="h-full flex flex-col pb-6">
                          {/* NOMBRE */}
                          <div className="mt-5 grid grid-cols-12">
                            <div className="col-span-12">
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
                          </div>
                          {/* FECHA Y HORAS */}
                          <div className="mt-5 grid grid-cols-12 gap-y-8">
                            <div className="col-span-5">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Fecha
                              </label>
                              <input
                                type="date"
                                className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                onChange={handleDateChange}
                              />
                            </div>
                            <div className="col-span-6 grid grid-cols-12 gap-x-6 gap-y-8">
                              <div className="col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                  Inicio
                                </label>
                                <input
                                  type="time"
                                  className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                  onChange={handleStartTimeChange}
                                />
                              </div>
                              <div className="col-span-6">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                  Fin
                                </label>
                                <input
                                  type="time"
                                  className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                  onChange={handleEndTimeChange}
                                />
                              </div>
                            </div>
                          </div>
                          {/* SALA Y CLIENTE */}
                          <div className="mt-5 grid grid-cols-12 gap-x-6">
                            <div className="col-span-5">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Sala
                              </label>
                              <select
                                value={selectValue}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                onChange={handleOfficeSelect}
                              >
                                <option value="Select" disabled>
                                  Seleccionar
                                </option>
                                {Object.values(Office).map((office, index) => (
                                  <option key={index} value={office}>
                                    {office}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-span-7">
                              <label className="block text-sm font-medium leading-6 text-gray-900">
                                Cliente
                              </label>
                              <Combobox
                                as="div"
                                value={selectedClient}
                                // onChange={handleSelectedClients}
                              >
                                <Combobox.Input
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                  onChange={(event) => setQuery(event.target.value)}
                                  // displayValue={(client) => client?.name}
                                />
                                <Combobox.Options
                                  // anchor="bottom"
                                  className="border empty:invisible z-100"
                                >
                                  {filteredClients.map((client) => (
                                    <Combobox.Option
                                      key={client.id}
                                      value={client}
                                      className="data-[focus]:bg-blue-100 z-100"
                                    >
                                      {`${client.name} ${client.lastname}`}
                                    </Combobox.Option>
                                  ))}
                                </Combobox.Options>
                              </Combobox>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* BOTONES */}
                <div className="bg-gray-50 px-6 py-3 flex justify-end gap-x-6">
                  <button
                    type="button"
                    data-autofocus
                    onClick={onCancel}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  >
                    Guardar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
