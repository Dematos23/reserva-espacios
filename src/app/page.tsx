import Image from "../../node_modules/next/image"
import Link from "../../node_modules/next/link"

// import ReservaModal from "./components/ReservaModal.js";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        <Image src="/logoH.png" alt="Jyotir" width={500} height={37} priority />
      </div>
      <Link href="/formulario">
        <button
          // type="button"
          className="mt-20 inline-flex w-full justify-center rounded-md bg-blue-700 px-3 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
        >
          Reservar una sala
        </button>
        <br />
      </Link>

    </main>
  )
}
