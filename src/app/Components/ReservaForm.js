export default function reservaForm() {
  return (
    <div>
      <form className="grid gap-4 justify-self-center text-gray-600">
        <label>
          <span className="flex-none block mb-1">Nombre del evento</span>
          <input type="text" className="form-input rounded-md w-full" />
        </label>

        <div className="flex">
          <label className="mr-4">
            <span className="flex-none block mb-1">Externo responsable</span>
            <select className="form-select rounded-md">
              {/* <select multiple className="form-multiselect rounded-md"> */}
              <option default value="0" key="0">
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
          <div className="bg-slate-200 grow">
            <label>
              <input type="checkbox" className="form-checkbox mr-1" />
              <span>Evento con más externos</span>
            </label>
            <div className="flex">
              <img
                className="inline-block h-30 w-10 rounded-full ring-2 ring-blue m-2"
                src="./gita.jpg"
              />
              <img
                className="inline-block h-30 w-10 rounded-full ring-2 ring-blue m-2"
                src="./nayat.png"
              />
            </div>
          </div>
        </div>

        <label>
          <span className="flex-none block mb-1">Cliente</span>
          <input type="text" className="form-input rounded-md" />
          <label className="flex-none block mt-1">
            <input type="checkbox" className="form-checkbox mr-1" />
            <span>Evento con varios asistentes</span>
          </label>
        </label>

        {/* Falta conficional del checkbox */}
        <div className="hidden">
          <label className="flex-none block mb-2">
            <span className="flex-none block mb-1">Cantidad de asistentes</span>
            <input type="number" className="form-input rounded-md" />
          </label>
          <label className="flex-none block mb-1">
            <span className="flex-none block mb-1">
              ¿Por qué canal se ha enviado la lista de asistentes?
            </span>
            <select className="form-select rounded-md">
              <option>Whatsapp</option>
              <option>Correo</option>
              <option>Tel'efono</option>
            </select>
          </label>
        </div>

        <label>
          <span className="flex-none block mb-1">Ambiente</span>
          <select className="form-select rounded-md">
            <option default value="0" key="0">
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

        <label>
          <span>Fecha del evento</span>
          <input type="date" className="form-input rounded-md mx-1" />
        </label>
        <div className="flex">
          <label>
            <span>Hora de inicio</span>
            <input type="time" className="form-input rounded-md ml-1" />
          </label>

          <label>
            <span>Hora de fin</span>
            <input type="time" className="form-input rounded-md ml-1" />
          </label>
        </div>

        <label>
          <span className="flex-none block mb-1">Implementos</span>
          <select className="form-select rounded-md">
            <option>Hojas bond</option>
            <option>Lapicero</option>
            <option>Colores</option>
            <option>Papel toalla</option>
            <option>Sillas en circulo</option>
            <option>Sillas en fila</option>
          </select>
        </label>
        {/* 
        </div>

        

        <div>
          <label>Implementos</label>
          <select multiple className="form-multiselect px-10 py-3 simple">
            <option default value="0" key="0">
              Seleccionar
            </option>
            <option value="1" key="1">
              Hojas bond
            </option>
            <option value="2" key="2">
              Lapicero
            </option>
            <option value="3" key="3">
              Colores
            </option>
            <option value="4" key="4">
              Papel toalla
            </option>
            <option value="5" key="5">
              Sillas en circulo
            </option>
            <option value="6" key="6">
              Sillas en fila
            </option>
            <input type="text" />
            <textarea cols="30" rows="10"></textarea>
          </select>
        </div>

        <div>
          <label>Otros implementos</label>
          <input type="text" />
        </div> */}

        {/* <br />
        <input type="text" list="implementos" placeholder="Seleccionar" />
        <datalist id="implementos">
          <option>Hojas bond</option>
          <option>Lapicero</option>
          <option>Colores</option>
          <option>Papel toalla</option>
          <option>Sillas en circulo</option>
          <option>Sillas en fila</option>
        </datalist> */}
      </form>
    </div>
  );
}
