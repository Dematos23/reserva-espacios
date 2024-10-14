import { useState } from "react";
import { Reservation, Office, ReservationState } from "../types/types";

interface Data {
  id: String | undefined;
  [key: string]: any;
}

interface CardsProps<C> {
  data: C[];
  isCardButton?: boolean;
  cardButtonFunction?: (item: C) => void;
}

export default function CardsViews<C extends Data>({
  data,
  isCardButton,
  cardButtonFunction,
}: CardsProps<C>) {

  
  return (
    <div className="flex flex-row flex-wrap m-8 gap-4 justify-between text-sm">
      {data.map((item) => (
        <div className="shadow-lg card grid grid-cols-4 gap-3 justify-between rounded-md ring-1 ring-inset ring-gray-100">
          <p className="text-lg col-span-3">{item.name}</p>
          {isCardButton && cardButtonFunction ? (
            <button
            className="col-span-1 w-3/4 justify-self-end rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline h-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => cardButtonFunction(item)}
          >
            Editar
          </button>
          ): <></>}
          
          <div className="col-span-full grid grid-cols-3 gap-2">
            <div className="col-span-1">
              <p className="mb-1">Fecha</p>
              <p className="rounded-md p-1.5 ring-1 ring-inset ring-gray-100">{item.date}</p>
            </div>
            <div className="col-span-1">
              <p className="mb-1">Inicio</p>
              <p className="rounded-md p-1.5 ring-1 ring-inset ring-gray-100">{item.startTime}</p>
            </div>
            <div className="col-span-1">
              <p className="mb-1">Fin</p>
              <p className="rounded-md p-1.5 ring-1 ring-inset ring-gray-100">{item.endTime}</p>
            </div>
          </div>
          <div className="col-span-2">
            <p className="mb-1">Sala</p>
            <p className="rounded-md p-1.5 ring-1 ring-inset ring-gray-100">{item.office}</p>
          </div>
          <div className="col-span-2">
            <p className="mb-1">Estado</p>
            <p className="rounded-md p-1.5 ring-1 ring-inset ring-gray-100">{item.state}</p>
          </div>
          <div className="col-span-full">
            <p className="mb-1">Terapeuta</p>
            <div>
              {item.users.map((item: C) => (
                <p className="rounded-md p-1.5 ring-1 ring-inset ring-gray-100">{`${item.name} ${item.lastname}`}</p>
              ))}
            </div>
          </div>
          <div className="col-span-2">
            <p className="mb-1">Implementos</p>
            <p className="rounded-md p-1.5 ring-1 ring-inset ring-gray-100">
              {item.implementos}
            </p>
          </div>
          <div className="col-span-2">
            <p className="mb-1">Observaciones</p>
            <p className="rounded-md p-1.5 ring-1 ring-inset ring-gray-100">
              {item.observation}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
