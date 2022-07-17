import axios from "axios";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminSide from "../../../components/admin/AdminSideBar";
import InfoTablaAdmin from "../../../components/admin/InfoTablaAdmin";
import ItemsAdminPanel from "../../../components/admin/itemsAdminPanel";
import CustomAlert from "../../../components/CustomAlert";

export default function EliminarProductos({ productos }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(undefined);

  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("failure");

  const resetAlert = () => {
    setTimeout(() => {
      setAlert(false);
      setAlertTitle("");
      setAlertMessage("");
      setAlertType("failure");
    }, 3000);
  }

  useEffect(() => {
    const session = localStorage.getItem("admin");
    if (session) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [isAdmin]);

  if (isAdmin == undefined) {
    return (
      <main className="h-[calc(100vh)] flex flex-col sm:flex-row sm:items-center justify-center overflow-y-auto">
        <Spinner
          size="xl"
        />
      </main>
    );
  }

  const columnasProductos = [
    {
      id: 0,
      label: "ID",
      accessor: "idproducto",
    },
    {
      id: 1,
      label: "Nombre",
      accessor: "nombre",
    },
    {
      id: 2,
      label: "Precio",
      accessor: "precio",
    },
    {
      id: 3,
      label: "Cantidad",
      accessor: "cantidad",
    },
    {
      id: 4,
      label: "Eliminar",
      accessor: "eliminar",
    }
  ];

  const handleEliminar = async (producto) => {
    try {
      const { idproducto } = producto;
      const url = `/api/productos/eliminar/${idproducto}`;
      const response = await axios.delete(url);
      const { data } = response;
      if (data.ok) {
        setAlert(true);
        setAlertTitle("Producto eliminado");
        setAlertMessage("El producto ha sido eliminado correctamente");
        setAlertType("success");
        resetAlert();
        setTimeout(() => {
          router.push("/admin/productos");
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

  return (
    <main className="pt-14 h-[calc(100vh)] flex flex-col overflow-y-auto">
      {alert && (
        <CustomAlert
          titulo={alertTitle}
          mensaje={alertMessage}
          tipo={alertType}
        />
      )}
      <AdminSide
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        router={router}
      />
      <h1 className="text-4xl text-white font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-white">Eliminar Productos</h1>
      <div className="p-3 pt-5 md:px-20 flex-row sm:items-center rounded-3xl my-3 sm:my-px shadow-sm">
        <InfoTablaAdmin
          columnas={columnasProductos}
          items={productos}
          onDelete={handleEliminar}
        />
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const productos = []

  try {
    const response = await fetch(`${process.env.API_URL}/api/productos`);
    const resData = await response.json();
    const { data: resProductos, ok, message } = resData;
    if (ok) {
      productos.push(...resProductos);
    }
    return {
      props: {
        productos
      }
    }
  } catch (error) {
    console.log(error);
  }
}