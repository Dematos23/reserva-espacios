"use client"

import Image from "../../../node_modules/next/image"
import { serviceLogin, test } from "../../services/auth.service"
import { useState } from "react"
// import { useRouter } from "next/router";

export default function login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const router = useRouter()
  
  const handleLogin = async (event) => {
    // event.preventDefault()
    try {
      const payload = await serviceLogin(email, password)
      // router.push('/')
    } catch (error) {
      console.log("Front Error al hacer login")
    }
  }
  
  const [data, setData] = useState("")

  const handleClick = async (e) => {
    await test()
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            src="/logoMini.png"
            alt="Jyotir"
            width={150}
            height={150}
            className="mx-auto h-25 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Ingresa a tu cuenta
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin} method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-blue-700 hover:text-blue-500"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Iniciar sesión
              </button>
              
              
            </div>
            <div>
              <button
                type="button"
              className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={handleClick}
              >
                TEST
            </button>
            
              <p>{ data}</p>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿Todavía no tienes cuenta?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-blue-700 hover:text-blue-500"
            >
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
