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
  cantidad: "",
}

export default function AñadirProducto() {
  const [isAdmin, setIsAdmin] = useState(undefined);
  const [infoProducto, setInfoProducto] = useState(initialState);

  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("failure");

  const router = useRouter();
  useEffect(() => {
    const session = localStorage.getItem("admin");
    if (!session) {
      router.push("/admin/login");
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
      const { idproducto, cantidad } = infoProducto;
      const response = await axios.post(`/api/productos/sumar-existencia/${idproducto}`, { cantidad });
      const { data } = response;
      if (data.ok) {
        MySwal.fire({
          title: 'Existencia actualizada',
          text: `La cantidad del producto ${data.data.nombre} ha sido actualizada con éxito`,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Volver a la lista',
          cancelButtonText: 'Añadir más cantidad a producto',
        }).then(async (result) => {
          if (result.value) {
            router.push("/admin/productos");
          } else {
            setInfoProducto(initialState);
          }
        })
      }
    } catch (error) {
      console.log(error);
      const { response } = error;
      const { data } = response;
      MySwal.fire({
          title: 'Error',
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
      label: "ID a sumar cantidad",
      type: "text",
      value: infoProducto.idproducto,
      onChange: handleChange
    },
    {
      name: "cantidad",
      label: "Cantidad",
      type: "number",
      value: infoProducto.cantidad,
      onChange: handleChange
    }
  ];

  return (
    <>
      <Head>
        <title>Añadir producto</title>
        <meta name="description" content="Registro" />
      </Head>
      <main className="relative h-[calc(100vh)] flex flex-col justify-center overflow-auto py-4">
        <AdminSide
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          router={router}
        />
        <div className="w-[90%] mx-auto rounded-3xl max-w-xs my-3 sm:my-px shadow-sm bg-white ">
          <FormAdminPanel
            formTitle="Sumar cantidad"
            buttonLabel={"Añadir producto"}
            onChange={handleChange}
            onSubmit={handleSubmit}
            campos={campos}
          />
          <p className="text-center text-gray-500 text-xs">
            JSSPORT
          </p>
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  let productos = []
  try {
    const response = await axios.get("localhost:3000/api/productos");
    const { data } = response;
    if (data.ok) {
      productos = data.data;
    }
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      productos
    }
  };
}