import Image from "../../../node_modules/next/image";

export default function Formulario() {
  return (
    <div className="grid">
      <form className="grid gap-4 w-1/2 justify-self-center my-10 text-gray-600">
        {/* Nombre del evento */}
        <label>
          <span className="flex-none block mb-1">Nombre del evento</span>
          <input type="text" className="form-input rounded-md w-full" />
        </label>

        {/* Externo responsable */}
        <div className="flex">
          <label className="mr-4">
            <span className="flex-none block mb-1">Externo responsable</span>
            <select className="form-select rounded-md">
              <option value="0" key="0">
                Seleccionar
              </option>
              <option value="1" key="1">
                Alessandra
              </option>
              <option value="2" key="2">
                Daniel
              </option>
              <option value="3" key="3">
                Hugo
              </option>
              <option value="4" key="4">
                Katherine
              </option>
              <option value="5" key="5">
                Lissette
              </option>
              <option value="6" key="6">
                Maria Fe
              </option>
              <option value="7" key="7">
                Mari Rosales
              </option>
              <option value="8" key="8">
                Roseling
              </option>
              <option value="9" key="9">
                Nora
              </option>
              <option value="10" key="10">
                Aldo
              </option>
            </select>
          </label>
          <div className=" grow">
            <label>
              <input type="checkbox" className="form-checkbox mr-1" />
              <span>Evento con más externos</span>
            </label>
            <div className="flex">
              <Image
                className="inline-block h-30 w-10 rounded-full ring-2 ring-blue m-2"
                src="/gita.png"
                alt="Gita"
                width={25}
                height={25}
              />
              <Image
                className="inline-block h-30 w-10 rounded-full ring-2 ring-blue m-2"
                src="/nayat.png"
                alt="Nayat"
                width={25}
                height={25}
              />
            </div>
          </div>
        </div>

        {/* Nombre del cliente */}
        <label>
          <span className="flex-none block mb-1">Cliente</span>
          <input type="text" className="form-input rounded-md w-full" />
          <label className="flex-none block mt-1">
            <input type="checkbox" className="form-checkbox mr-1" />
            <span>Evento con varios asistentes</span>
          </label>
        </label>

        {/* Condicional de varios clientes*/}
        <div className="">
          <label className="flex-none block mb-2">
            <span className="flex-none block mb-1">Cantidad de asistentes</span>
            <input type="number" className="form-input rounded-md" />
          </label>
          <label className="flex-none block mb-1">
            <span className="flex-none block mb-1">
              ¿Por qué canal se ha enviado la lista de asistentes?
            </span>
            <select className="form-select rounded-md">
              <option>Seleccionar</option>
              <option>Whatsapp</option>
              <option>Correo</option>
              <option>Teléfono</option>
            </select>
          </label>
        </div>

        {/* Ambiente */}
        <label>
          <span className="flex-none block mb-1">Ambiente</span>
          <select className="form-select rounded-md">
            <option value="0" key="0">
              Seleccionar
            </option>
            <option value="1" key="1">
              Salon principal
            </option>
            <option value="2" key="2">
              Salon espejo
            </option>
            <option value="3" key="3">
              Sala 1
            </option>
            <option value="4" key="4">
              Consultorio 1
            </option>
            <option value="5" key="5">
              Consultorio 2
            </option>
          </select>
        </label>

        {/* Fecha y hora del evento */}
        <div className="flex justify-between">
          <label>
            <span className="felx-none block mb-1">Fecha del evento</span>
            <input type="date" className="form-input rounded-md" />
          </label>
          <label>
            <span className="felx-none block mb-1">Hora de inicio</span>
            <input type="time" className="form-input rounded-md ml-1" />
          </label>

          <label>
            <span className="felx-none block mb-1">Hora de fin</span>
            <input type="time" className="form-input rounded-md ml-1" />
          </label>
          <div className="w-1/4"></div>
        </div>

        {/* Implementos */}
        <label>
          <span className="flex-none block mb-1">Implementos</span>
          <select className="form-select rounded-md">
            <option>Seleccionar</option>
            <option>Hojas bond</option>
            <option>Lapicero</option>
            <option>Colores</option>
            <option>Papel toalla</option>
            <option>Sillas en circulo</option>
            <option>Sillas en fila</option>
          </select>
        </label>
      </form>
      <div className="w-1/2 justify-self-center mb-5 flex justify-end">
        <button className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
          Cancelar
        </button>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
