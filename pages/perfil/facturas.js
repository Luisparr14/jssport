import axios from "axios";
import { Spinner } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfoTablaAdmin from "../../components/admin/InfoTablaAdmin";
import CustomAlert from "../../components/CustomAlert";
import NavBar from "../../components/NavBar";
import RegisterForm from "../../components/RegisterForm";
import TablaFacturas from "../../components/TablaFacturas";
export default function Facturas() {
  const [sesion, setSesion] = useState(undefined);
  const [facturas, setFacturas] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("failure");

  const router = useRouter();
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      setSesion(true);
    } else {
      setSesion(false);
      router.push("/perfil");
    }
  }, [router]);


  const resetAlert = () => {
    setTimeout(() => {
      setAlert(false);
      setAlertTitle("");
      setAlertMessage("");
      setAlertType("failure");
    }, 3000);
  }

  const handleChange = e => {
    setRegistroInfo({
      ...registroInfo,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/registro", registroInfo);
      const { data } = response;
      if (data.ok) {
        setAlertTitle("Registro");
        setAlertMessage(data.message);
        setAlertType("success");
        setAlert(true);
        resetAlert();
        setTimeout(() => {
          router.push("/perfil");
        }, 200);
      }
    } catch (error) {
      const { response } = error;
      const { data } = response;
      setAlertTitle("Error");
      setAlertMessage(data.message);
      setAlertType("failure");
      setAlert(true);
      resetAlert();
    }
  }

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
        {alert && (
          <CustomAlert
            titulo={alertTitle}
            mensaje={alertMessage}
            tipo={alertType}
          />
        )}
        <div className="w-[90%] mx-auto rounded-3xl my-3 sm:my-px shadow-sm bg-white ">
          <TablaFacturas
          />
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context;
  let facturas = [];
  const { nombreusuario } = query;
  try {
    const response = await axios.get(`${process.env.API_URL}/api/facturas/${nombreusuario}`);
    const { data } = response;
    if (data.ok) {
      facturas = data.data;
    }
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      facturas
    }
  };
}