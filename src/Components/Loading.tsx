"use client";

import Image from "next/image";

type LoadingProps = {
  loading: boolean;
};

export default function Loading({ loading }: LoadingProps) {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <Image className="h-15 w-auto" src="/logoMini.png" width={100} height={100} alt="Jyotir" />
        <div className="loading-dots mt-4">
          <span className="text-xl">Cargando</span>
          <span className="text-xl">.</span>
          <span className="text-xl">.</span>
          <span className="text-xl">.</span>
        </div>
      </div>
    </div>
  );
}
