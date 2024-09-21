"use client";

import Image from "../../node_modules/next/image";
// import Link from "../../node_modules/next/link";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // setLoading(true);
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) return <Loading loading={loading} />;

  return (
    <main className="flex flex-col items-center justify-between">
      <div>
        <Image
          className="homeLogo mt-8"
          src="/logoH.png"
          alt="Jyotir"
          width={500}
          height={37}
          priority
        />
      </div>
      {/* {loggedIn ? (
        <></>
      ) : (
        <Link href="/login" passHref>
          <button
            type="submit"
            // className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold  text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            className="mt-20 inline-flex w-full justify-center rounded-md bg-blue-700 px-3 py-2 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
          >
            Iniciar sesión
          </button>
        </Link>
      )} */}
    </main>
  );
}
