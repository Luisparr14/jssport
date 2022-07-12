/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Card from "../../components/CardElementos";
import NavBar from "../../components/NavBar";

export default function Elemetos() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="sm:h-[calc(100vh-88px)] md:h-[calc(100vh-56px)] flex flex-col flex-auto justify-center items-center p-10">
        <div className="gap-4 sm:grid sm:grid-cols-5 sm:grid-rows-4">
          <div className="col-span-2 row-span-2 bg-gray-50 rounded-3xl p-0.5 max-w-xs my-3 sm:my-px">
            <Card
              src="/images/elementos/eliptica.png"
              alt="Eliptica"
              subtitle="Maquinas para trabajar piernas y cardio"
            />
          </div>
          <div className="col-span-2 row-span-2 bg-blue-400 rounded-3xl p-0.5 max-w-xs my-3 sm:my-px">
            <Card
              src="/images/elementos/brazos.png"
              alt="Maquinas para brazos"
              subtitle="Maquinas para trabajar brazos"
            />
          </div>
          <div className="col-span-1 row-span-2 bg-yellow-200 rounded-3xl p-0.5 max-w-xs my-3 sm:my-px flex items-center">
            <p className="text-center">No digas más &quot;mañana&quot;.</p>
          </div>
          <div className="col-span-2 row-span-2 bg-red-600 rounded-3xl p-0.5 max-w-xs my-3 sm:my-px">
            <Card
              src="/images/elementos/pierna.png"
              alt="Maquinas para trabajar piernas"
              subtitle="Maquina para hacer Piernas y gluteos"
            />            
          </div>
          <div className="col-span-3 row-span-2 bg-fuchsia-400 rounded-3xl p-0.5 max-w-xs my-3 sm:my-px sm:max-w-full">
            <Card
              src="/images/elementos/abdomen.png"
              alt="Maquinas para trabajar abdomen"
              subtitle="Maquinas para trabajar abdomen"
            />
          </div>
        </div>
      </main>
    </>
  )
}