import { Spinner } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminSide from "../../../components/admin/AdminSideBar";
import InfoTablaAdmin from "../../../components/admin/InfoTablaAdmin";
import ItemsAdminPanel from "../../../components/admin/itemsAdminPanel";

export default function AdminProductos({ productos }) {
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
    }
  ];

  return (
    <main className="pt-14 h-[calc(100vh)] flex flex-col overflow-y-auto">
      <AdminSide
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
        router={router}
      />
      <h1 className="text-4xl text-white font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-white">Productos</h1>
      <div className="flex flex-col sm:flex-row sm:items-center mx-auto rounded-3xl p-5 my-3 sm:my-px shadow-sm bg-white md:w-full">
        <ItemsAdminPanel
          href="/admin/productos/nuevo"
          srcImg={"/images/admin/productos/agregar-producto.png"}
          bgColor={"bg-green-500"}
          titulo={"Agregar Producto"}
        />
        <ItemsAdminPanel
          href="/admin/productos/eliminar"
          srcImg={"/images/admin/productos/eliminar-producto.png"}
          bgColor={"bg-red-500"}
          titulo={"Eliminar Producto"}
        />
        <ItemsAdminPanel
          href="/admin/productos/editar"
          srcImg={"/images/admin/productos/editar-producto.png"}
          bgColor={"bg-blue-500"}
          titulo={"Editar Producto"}
        />
        <ItemsAdminPanel
          href="/admin/productos/anadir"
          srcImg={"/images/admin/productos/anadir-cantidad.png"}
          bgColor={"bg-blue-500"}
          titulo={"Añadir cantidad a producto"}
        />
      </div>
      <div className="p-3 pt-5 md:px-20 flex-row sm:items-center rounded-3xl my-3 sm:my-px shadow-sm">
        <InfoTablaAdmin
          columnas={columnasProductos}
          items={productos}
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