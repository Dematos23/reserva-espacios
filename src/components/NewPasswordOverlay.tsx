"use client";

import { Dialog } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { NewUser } from "../types/types";

interface OverlayProps {
  onClose: () => void;
  open: boolean;
  newUser: NewUser;
}

export default function NewPasswordOverlay({ onClose, open, newUser }: OverlayProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h1"
                    className="text-xl font-semibold leading-6 text-gray-900 text-center"
                  >
                    Contraseña reiniciada exitosamente
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      La nueva contraseña del usuario {newUser.name} {newUser.lastname} es:
                    </p>
                    <p className="text-xl font-semibold text-gray-800 bg-gray-100 p-1 my-4 rounded-md shadow-md text-center w-1/3 mx-auto">
                      {newUser.password}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Si olvidas la contraseña deberás generar una nueva desde el menu de Usuarios
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
