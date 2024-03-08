import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div
      // className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-00 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#ddd] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"
      >
        <Image src="/logoH.png" alt="Jyotir" width={500} height={37} priority />
      </div>
      <button
        // type="button"
        className="mt-20 inline-flex w-full justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
      >
        Reservar
      </button>
    </main>
  );
}
