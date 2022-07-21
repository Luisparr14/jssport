import axios from "axios";
import { Spinner } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "../../../components/NavBar";
import TablaFacturas from "../../../components/TablaFacturas";

export default function Facturas({ pagos, usuario }) {
  const [sesion, setSesion] = useState(undefined);

  const router = useRouter();
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      let usuarioSession = JSON.parse(session);
      if(!(usuarioSession.nombreusuario === usuario)){
        router.push("/perfil");
      }else{
        setSesion(true);
      }
    } else {
      setSesion(false);
      router.push("/perfil");
    }
    
  }, [router, usuario]);


  if (sesion == undefined) {
    return (
      <main className="h-[calc(100vh)] flex flex-col sm:flex-row sm:items-center justify-center overflow-y-auto">
        <Spinner
          size="xl"
        />
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>Registro</title>
        <meta name="description" content="Registro" />
      </Head>
      <NavBar
        session={sesion}
        setSession={setSesion}
      />
      <main className="relative h-[calc(100vh-88px)] sm:h-[calc(100vh-56px)] flex flex-col overflow-auto py-4">
        <div className="w-[90%] mx-auto rounded-3xl my-3 sm:my-px shadow-sm bg-white ">
          <TablaFacturas
            pagos={pagos}
          />
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context;
  let pagos = [];
  let usuario = null;
  const { nombreusuario } = query;
  try {
    const response = await axios.get(`${process.env.API_URL}/api/pagos/${nombreusuario}`);
    const { data } = response;
    if (data.ok) {
      pagos = data.data;
      usuario = data.usuario;
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      pagos,
      usuario
    }
  };
}