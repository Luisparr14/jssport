import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import Tabla from "../../components/Tabla";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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
      setProductos(productos || []);
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

  const eliminarProducto = id => {
    let productos = JSON.parse(localStorage.getItem("cart"));
    let index = productos.findIndex(item => item.id == id);
    MySwal.fire({
      title: '¿Estas seguro?',
      text: "Tendrás que agregarlo de nuevo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!'
    }).then((result) => {
      if (result.value) {
        productos.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(productos));
        setProductos(productos);
        MySwal.fire(
          'Eliminado!',
          'El producto ha sido eliminado del carrito.',
          'success'
        )
      }
    })
  }

  const comprar = async () => {
    try {
      const response = await axios.post("/api/compras/pagar", {
        productos: productos,
        usuario: userInfo.nombreusuario,
        celular: userInfo?.persona?.celular
      });
      const { data } = response;
      if (data.ok) {
        localStorage.removeItem("cart");
        setProductos([]);
        MySwal.fire({
          title: "Compra realizada",
          text: data.message,
          icon: "success",
          didClose: () => {
            router.push("/perfil");
          }
        });
      }
    } catch (error) {
      const { response } = error;
      const { data } = response;
      MySwal.fire({
        title: 'Error',
        text: data.message,
        icon: 'error'
      })
    }
  }

  const vaciarCarrito = async () => {
    if (productos.length > 0) {
      localStorage.removeItem("cart");
      setProductos([]);
      MySwal.fire({
        title: 'El carrito se ha vaciado',
        icon: 'error'
      })
    } else {
      MySwal.fire({
        title: 'El carrito yá esta vacio',
        icon: 'error'
      })
    }
  }

  return (
    <>
      <NavBar
        session={isSessionActive}
        setSession={setIsSessionActive}
      />
      <main className="h-[calc(100vh-88px)] md:h-[calc(100vh-56px)] p-2 overflow-y-auto md:p-10">
        <h1 className="text-2xl font-bold my-5 text-white">Carrito</h1>
        <Tabla
          productos={productos}
          eliminarProducto={eliminarProducto}
        />
        <Button
          onClick={vaciarCarrito}
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