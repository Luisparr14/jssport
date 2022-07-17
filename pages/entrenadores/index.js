import Head from "next/head"
import { useEffect, useState } from "react";
import CardEntrenadores from "../../components/CardEntrenadores"
import NavBar from "../../components/NavBar"

export default function Entrenadores() {
  const [isSessionActive, setIsSessionActive] = useState(undefined);
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      setIsSessionActive(true);
    } else {
      setIsSessionActive(false);
    }
  }, [isSessionActive]);
  let entrenadores = [
    {
      nombre: "Juan",
      imagen: "https://flowbite.com/docs/images/blog/image-1.jpg",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      nombre: "Luis",
      imagen: "https://flowbite.com/docs/images/blog/image-1.jpg",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      nombre: "Luis",
      imagen: "https://flowbite.com/docs/images/blog/image-1.jpg",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      nombre: "Luis",
      imagen: "https://flowbite.com/docs/images/blog/image-1.jpg",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ]
  return (
    <>
      <Head>
        <title>Entrenadores</title>
        <meta name="description" content="Servicios" />
      </Head>
      <NavBar
        session={isSessionActive}
        setSession={setIsSessionActive}
      />
      <main className="sm:h-[calc(100vh-88px)] md:h-[calc(100vh-56px)] flex gap-10 flex-row flex-wrap flex-auto justify-center items-center p-10 overflow-auto">
        {entrenadores.map(entrenador => (
          <CardEntrenadores key={entrenador.nombre} nombre={entrenador.nombre} imagen={entrenador.imagen} descripcion={entrenador.descripcion} />
        ))}
      </main>

    </>
  )
}