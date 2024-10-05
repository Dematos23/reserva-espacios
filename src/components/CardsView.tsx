import { useState } from "react";

interface Data {
  id: String | undefined;
  [key: string]: any;
}

interface CardsProps<C> {
  data: C[];
}

export default function CardsViews<C extends Data>({ data }: CardsProps<C>) {
  return (
    <div className="flex flex-row">
      {data.map((item) => (
        <div className="shadow-lg basis-1/4">
          <h1>{item.name}</h1>
          <div>
            <p>Fecha</p>
            <p>{item.date}</p>
          </div>
          <div>
            <p>Inicio</p>
            <p>{item.startTime}</p>
          </div>
          <div>
            <p>Fin</p>
            <p>{item.endTime}</p>
          </div>
          <div>
            <p>Sala</p>
            <p>{item.office}</p>
          </div>
          <div>
            <p>Estado</p>
            <p>{item.state}</p>
          </div>
          <div>
            <p>Terapeuta</p>
            <div>
              {item.users.map((item) => (
                <p>{`${item.name} ${item.lastname}`}</p>
              ))}
            </div>
          </div>
          <div>
            <p>Implementos</p>
            <p>{item.implementos}</p>
          </div>
          <div>
            <p>Observaciones</p>
            <p>{item.observation}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
