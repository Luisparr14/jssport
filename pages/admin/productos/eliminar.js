import axios from "axios";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminSide from "../../../components/admin/AdminSideBar";
import InfoTablaAdmin from "../../../components/admin/InfoTablaAdmin";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Head from "next/head";

const MySwal = withReactContent(Swal)

export default function EliminarProductos({ productos }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(undefined);


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
      MySwal.fire({
        title: '¿Estas seguro?',
        text: "No podras revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.value) {
          const { idproducto } = producto;
          const url = `/api/productos/eliminar/${idproducto}`;
          const response = await axios.delete(url);
          const { data } = response;
          if (data.ok) {
            MySwal.fire({
              title: 'Eliminado!',
              text: data.message,
              icon: 'success',
              confirmButtonText: 'Entendido'
            }).then(() => {
              router.push("/admin/productos");
            })
          }
        }
      })
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

  return (
    <main className="pt-14 h-[calc(100vh)] flex flex-col overflow-y-auto">
      <Head>
        <title>Eliminar productos</title>
      </Head>
      <AdminSide
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        router={router}
      />
      {isAdmin && (
        <>
          <h1 className="text-4xl text-white font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-white">Eliminar Productos</h1>
          <div className="p-3 pt-5 md:px-20 flex-row sm:items-center rounded-3xl my-3 sm:my-px shadow-sm">
            <InfoTablaAdmin
              columnas={columnasProductos}
              items={productos}
              onDelete={handleEliminar}
            />
          </div>
        </>
      )}
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