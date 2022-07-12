/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Card from "../../components/CardElementos";
import NavBar from "../../components/NavBar";
import Slider from "../../components/Slider";

export default function Servicios() {
  return (
    <>
      <Head>
        <title>Servicios</title>
        <meta name="description" content="Servicios" />
      </Head>
      <NavBar />
      <main className="sm:h-[calc(100vh-88px)] md:h-[calc(100vh-56px)] flex gap-10 flex-row flex-auto justify-center items-center p-10">
        <div className="bg-gray-50 rounded-3xl p-5 max-w-xs my-3 sm:my-px w-1/2">
          <Card
              src="/images/servicios/entrenamiento-personal.png"
              alt="Entrenamiento Personal"
              subtitle="Entrenamiento Personal"
          />          
        </div>
        <div className="bg-green-400 rounded-3xl p-5 max-w-xs my-3 sm:my-px w-1/2">
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