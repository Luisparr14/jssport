/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import { useEffect, useState } from "react";
import Card from "../../components/CardElementos";
import NavBar from "../../components/NavBar";

export default function Servicios() {
  const [isSessionActive, setIsSessionActive] = useState(undefined);
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      setIsSessionActive(true);
    } else {
      setIsSessionActive(false);
    }
  }, [isSessionActive]);
  return (
    <>
      <Head>
        <title>Servicios</title>
        <meta name="description" content="Servicios" />
      </Head>
      <NavBar
        session={isSessionActive}
        setSession={setIsSessionActive}
      />
      <main className="h-[calc(100vh-88px)] sm:h-[calc(100vh-56px)] flex flex-col sm:flex-row sm:items-center overflow-auto">
        <div className="m-auto bg-gray-50 rounded-3xl p-5 max-w-xs my-3 sm:my-px w-1/2 sm:max-h-52">
          <Card
            src="/images/servicios/entrenamiento-personal.png"
            alt="Entrenamiento Personal"
            subtitle="Entrenamiento Personal"
          />
        </div>
        <div className="m-auto bg-green-400 rounded-3xl p-5 max-w-xs my-3 sm:my-px w-1/2 sm:max-h-52">
          <Card
            src="/images/servicios/dieta-fitness.png"
            alt="Dieta Fitness"
            subtitle="Asesoria en Dieta Fitness"
          />
        </div>
      </main>
    </>
  )
}