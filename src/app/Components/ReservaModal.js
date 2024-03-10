import ReservaForm from "./ReservaForm.js";

export default function ReservaModal() {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      {/* Red 500 */}
      <div className="fixed inset-0 z-10 w-screen lg:w-1/2 md:w-1/2 overflow-y-auto place-self-center">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {/* Parte de arriba */}
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-full lg:max-w-xl mx-10">
            {/* Verde */}
            <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              {/* Rojo fuerte */}
              <div className="sm:items-start grid grid-cols-1">
                {/* Azul- Reserva de Sala */}
                <div className="text-left">
                  <h1
                    className="text-xl font-semibold leading-10"
                  >
                    Reserva de sala
                  </h1>
                </div>
                {/* Rojo suave */}
                <div className="mt-2 w-full">
                  {/* <p className="text-sm text-gray-500">Llenar el formulario</p> */}

                  <ReservaForm />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
              >
                Enviar
              </button>
              <button className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
