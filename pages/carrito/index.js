import axios from "axios";
import { Button, Spinner, Hin } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomAlert from "../../components/CustomAlert";
import NavBar from "../../components/NavBar";
import Tabla from "../../components/Tabla";

export default function Carrito() {
  const router = useRouter();
  const [isSessionActive, setIsSessionActive] = useState(undefined);
  const [productos, setProductos] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("failure");

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      let productos = JSON.parse(localStorage.getItem("cart"));
      setProductos(productos);
      setIsSessionActive(true);
      setUserInfo(JSON.parse(session));
    } else {
      setIsSessionActive(false);
      router.push("/perfil");
    }
  }, [isSessionActive, router]);

  if (isSessionActive == undefined) {
    return (
      <main className="h-[calc(100vh)] flex flex-col sm:flex-row sm:items-center justify-center overflow-y-auto">
        <Spinner
          size="xl"
        />
      </main>
    );
  }

  const resetAlert = () => {
    setTimeout(() => {
      setAlert(false);
      setAlertTitle("");
      setAlertMessage("");
      setAlertType("failure");
    }, 3000);
  }

  const eliminarProducto = id => {
    let productos = JSON.parse(localStorage.getItem("cart"));
    let index = productos.findIndex(item => item.id == id);
    productos.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(productos));
    setProductos(productos);
  }

  const comprar = async () => {
    try {
      if (productos) {
        if (productos.length > 0) {
          const response = await axios.post("/api/compras/pagar", {
            productos: productos,
            usuario: userInfo.nombreusuario,
            celular: userInfo?.persona?.celular
          });
          console.log(response);
          const { data } = response;
          console.log(data);
          if (data.ok) {
            localStorage.removeItem("cart");
            setProductos([]);
            setAlertTitle("Compra realizada");
            setAlertMessage(data.message);
            setAlertType("success");
            setAlert(true);
            resetAlert();
            setTimeout(() => {
              router.push("/perfil");
            }, 3000);
          } else {
            setAlert(true);
            setAlertTitle("Error");
            setAlertMessage(data.message);
            setAlertType("failure");
            resetAlert();
          }
        } else {
          setAlert(true);
          setAlertTitle("Fallo");
          setAlertMessage("No hay productos en el carrito");
          setAlertType("failure");
          resetAlert();
        }
      } else {
        setAlert(true);
        setAlertTitle("Fallo");
        setAlertMessage("No hay productos en el carrito");
        setAlertType("failure");
        resetAlert();
      }
    } catch (error) {
      console.log(error);
      setAlert(true);
      setAlertTitle("Error");
      setAlertMessage("Error del servidor");
      setAlertType("failure");
      resetAlert();
    }
  }

  return (
    <>
      <NavBar
        session={isSessionActive}
        setSession={setIsSessionActive}
      />
      <main className="h-[calc(100vh-88px)] md:h-[calc(100vh-56px)] p-2 overflow-y-auto md:p-10">
        {
          alert && (
            <CustomAlert
              titulo={alertTitle}
              mensaje={alertMessage}
              tipo={alertType}
            />
          )
        }
        <h1 className="text-2xl font-bold my-5 text-white">Carrito</h1>
        <Tabla
          productos={productos}
          eliminarProducto={eliminarProducto}
        />
        <Button
          onClick={() => {
            localStorage.removeItem("cart");
            setProductos([]);
          }
          }
          color="failure"
          style={{
            margin: "1rem 0",
            width: "200px"
          }}
        >
          Vaciar carrito
        </Button>
        <Button
          onClick={comprar}
          style={{
            margin: "1rem 0",
            width: "200px"
          }}
        >
          Comprar
        </Button>
        <Button
          onClick={() => {
            router.push("/perfil");
          }}
        >
          Volver
        </Button>
      </main>
    </>
  );
}