import axios from "axios";
import { Spinner } from "flowbite-react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminSide from "../../../../components/admin/AdminSideBar";
import FormAdminPanel from "../../../../components/admin/FormAdminPanel";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function EditarProductoEspecifico({ producto }) {
  const [isAdmin, setIsAdmin] = useState(undefined);
  const [infoProducto, setInfoProducto] = useState(producto);


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
    const producto = {
      nombre: infoProducto.nombre,
      precio: infoProducto.precio,
    }

    try {
      MySwal.fire({
        title: '¿Estás seguro de editar este producto?',
        text: `El producto ${infoProducto.nombre} será editado`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, editarlo!',
        cancelButtonText: 'No, cancelar!'
      }).then(async (result) => {
        if (result.value) {
          const response = await axios.put(`/api/productos/editar/${infoProducto.idproducto}`, { producto });
          const { data } = response;
          if (data.ok) {
            MySwal.fire({
              title: 'Producto Editado',
              text: `El producto ha sido editado con éxito`,
              icon: 'success',
              confirmButtonText: 'Volver',
              confirmButtonColor: '#3085d6',
            }).then(() => {
              router.push("/admin/productos/editar/");
            })
          }
        }
      })
    } catch (error) {
      const { response } = error;
      const { data } = response;
      MySwal.fire({
        title: 'Error al editar producto',
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
      label: "ID",
      type: "text",
      value: infoProducto?.idproducto,
      disabled: true
    },
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      value: infoProducto?.nombre,
      onChange: handleChange
    },
    {
      name: "precio",
      label: "Precio",
      type: "number",
      value: infoProducto?.precio,
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
        <div className="w-[90%] mx-auto rounded-3xl max-w-xs my-3 sm:my-px shadow-sm bg-white ">
          <FormAdminPanel
            formTitle="Editar producto"
            buttonLabel={"Editar"}
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

EditarProductoEspecifico.getInitialProps = async ({ query }) => {
  let producto = {
    idproducto: "",
    nombre: "",
    precio: ""
  };
  const { idproducto } = query;
  console.log(query)
  try {
    const response = await axios.get(`/api/productos/obtener-producto/${idproducto}`);
    const { data } = response;
    if (data.ok) {
      producto = data.data;
    }
    return {
      producto
    }
  } catch (error) {    
    return {
      producto
    }
  }
}

// const { idproducto } = producto;
// const url = `/api/productos/eliminar/${idproducto}`;
// const response = await axios.delete(url);
// const { data } = response;
// if (data.ok) {
//   MySwal.fire({
//     title: 'Eliminado!',
//     text: data.message,
//     icon: 'success',
//     confirmButtonText: 'Entendido'
//   }).then(() => {
//     router.push("/admin/productos");
//   })
// }