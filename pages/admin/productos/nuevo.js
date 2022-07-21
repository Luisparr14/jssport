import axios from "axios";
import { Spinner } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminSide from "../../../components/admin/AdminSideBar";
import FormAdminPanel from "../../../components/admin/FormAdminPanel";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

const initialState = {
  idproducto: "",
  nombre: "",
  precio: "",
}

export default function AgregarProducto() {
  const [isAdmin, setIsAdmin] = useState(undefined);
  const [infoProducto, setInfoProducto] = useState(initialState);


  const router = useRouter();
  useEffect(() => {
    const session = localStorage.getItem("admin");
    if (!session) {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
  }, [router]);


  const handleChange = e => {
    setInfoProducto({
      ...infoProducto,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const admin = JSON.parse(localStorage.getItem("admin"));
    const datos = {
      ...infoProducto,
      admin
    }

    try {
      const response = await axios.post("/api/productos/agregar-nuevo", datos);
      const { data } = response;
      if (data.ok) {
        MySwal.fire({
          title: 'Producto agregado',
          text: `El producto ${data.data.nombre} ha sido agregado con éxito`,
          icon: 'success',
          confirmButtonText: 'Volver a la lista',
          showCancelButton: true,
          cancelButtonText: 'Agregar otro producto',
          cancelButtonColor: '#d33',
          confirmButtonColor: '#3085d6',
        }).then(async (result) => {
          if (result.value) {
            router.push("/admin/productos");
          } else {
            setInfoProducto(initialState);
          }
        })
      }
    } catch (error) {
      const { response } = error;
      const { data } = response;
      MySwal.fire({
        title: 'Error al agregar producto',
        text: data.message,
        icon: 'error',
        confirmButtonText: 'Entendido'
      })
    }
  }

  if (isAdmin == undefined) {
    return (
      <main className="h-[calc(100vh)] flex flex-col sm:flex-row sm:items-center justify-center overflow-y-auto">
        <Spinner
          size="xl"
        />
      </main>
    );
  }

  const campos = [
    {
      name: "idproducto",
      label: "ID",
      type: "text",
      value: infoProducto.idproducto,
      onChange: handleChange
    },
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      value: infoProducto.nombre,
      onChange: handleChange
    },
    {
      name: "precio",
      label: "Precio",
      type: "number",
      value: infoProducto.precio,
      onChange: handleChange
    }
  ];

  return (
    <>
      <Head>
        <title>Agregar producto</title>
        <meta name="description" content="Registro" />
      </Head>
      <main className="relative h-[calc(100vh)] flex flex-col justify-center overflow-auto py-4">
        <AdminSide
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          router={router}
        />
        {isAdmin && (
          <>
            <div className="w-[90%] mx-auto rounded-3xl max-w-xs my-3 sm:my-px shadow-sm bg-white ">
              <FormAdminPanel
                formTitle="Agregar producto"
                buttonLabel={"Agregar producto"}
                onChange={handleChange}
                onSubmit={handleSubmit}
                campos={campos}
              />
              <p className="text-center text-gray-500 text-xs">
                JSSPORT
              </p>
            </div>
          </>
        )}
      </main>
    </>
  )
}