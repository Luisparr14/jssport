import axios from "axios";
import { Spinner } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomAlert from "../../components/CustomAlert";
import NavBar from "../../components/NavBar";
import RegisterForm from "../../components/RegisterForm";
const initialState = {
  nombre: "Andrea",
  primerapellido: "Barrios",
  segundoapellido: "Montes",
  celular: "3123233432",
  correo: "andrea@gmail.com",
  usuario: "andrea",
  contrasena: "123456",
  contrasenaconfirmacion: "123456"
}
export default function Registro() {
  const [sesion, setSesion] = useState(undefined);
  const [registroInfo, setRegistroInfo] = useState(initialState);

  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("failure");

  const router = useRouter();
  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      router.push("/perfil");
    } else {
      setSesion(false);
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
        <div className="w-[90%] mx-auto rounded-3xl max-w-xs my-3 sm:my-px shadow-sm bg-white ">
          <RegisterForm
            registroInfo={registroInfo}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
          <p className="text-center text-gray-500 text-xs">
            JSSPORT
          </p>
        </div>
      </main>
    </>
  )
}