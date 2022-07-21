/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm";
import NavBar from "../../components/NavBar";
import Products from "../../components/Products";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

export default function Perfil({ productos }) {
  const router = useRouter();
  const [isSessionActive, setIsSessionActive] = useState(undefined);
  const [userInfo, setUserInfo] = useState({});

  const [loginInfo, setLoginInfo] = useState({
    usuario: "",
    contrasena: ""
  });

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      setIsSessionActive(true);
      setUserInfo(JSON.parse(session));
    } else {
      setIsSessionActive(false);
    }
  }, [isSessionActive]);

  if (isSessionActive == undefined) {
    return (
      <main className="h-[calc(100vh)] flex flex-col sm:flex-row sm:items-center justify-center overflow-y-auto">
        <Spinner
          size="xl"
        />
      </main>
    );
  }


  const addToCart = producto => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartArray = JSON.parse(cart);
      let selectProduct = cartArray.find(item => item.idproducto == producto.idproducto);
      let index = cartArray.indexOf(selectProduct);

      if (index > -1) {
        if (selectProduct) {
          selectProduct.cantidad++;
        }
        cartArray[index] = selectProduct;
      } else {
        producto.cantidad = 1;
        cartArray.push(producto);
      }
      localStorage.setItem("cart", JSON.stringify(cartArray));
    } else {
      producto.cantidad = 1;
      localStorage.setItem("cart", JSON.stringify([producto]));
    }

    MySwal.fire({
      title: 'Producto agregado al carrito',
      icon: 'success'
    })
  }


  const handleChange = e => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/inicio-sesion", loginInfo);
      const { data } = response;
      if (data.ok) {
        const { data: user } = data;
        delete user.contrasena;
        setUserInfo(user);
        localStorage.setItem("session", JSON.stringify(user));
        MySwal.fire({
          title: `Bienvenido/a ${user.persona.nombre}`,
          icon: 'success',
          timer: 1500
        }).then(() => {
          setIsSessionActive(true);
        })
      } else {
        MySwal.fire({
          title: 'Errro al iniciar sesión',
          text: data.message,
          icon: 'error',
          confirmButtonText: 'Volver a intentar'
        })
      }
    } catch (error) {
      const { response } = error;
      const { data } = response;
      MySwal.fire({
        title: 'Error de inicio de sesión',
        text: data.message,
        icon: 'error',
        confirmButtonText: 'Volver a intentar'
      })
    }
  }

  return (
    <>
      <Head>
        <title>Perfil</title>
        <meta name="description" content="Perfil" />
      </Head>
      <NavBar
        session={isSessionActive}
        setSession={setIsSessionActive}
      />
      <main className="">
        {!isSessionActive && (
          <div className="sm:h-[calc(100vh-56px)] flex flex-col sm:flex-row sm:items-center overflow-y-auto">
            <div className="w-[90%] mx-auto rounded-3xl p-5 max-w-xs my-3 sm:my-px sm:max-h-52 shadow-sm">
              <p className="text-gray-50">Puedes contactarnos en nuestra pagina de instagram</p>
              <div className="my-5 flex flex-row justify-around">
                <ul className="font-bold text-gray-50 flex flex-col justify-center">
                  <li className="">@gyms_js</li>
                  <li className="">@cross_fir</li>
                  <li className="">@araca_fit</li>
                </ul>
                <figure>
                  <Image
                    src="/images/icons/instagram.png"
                    alt="Instagram"
                    width={75}
                    height={75}
                  />
                </figure>
              </div>
              <p className="text-gray-50 font-bold shadow-lg">
                Siguenos para que no te pierdas nada de nuestros descuentos y promociones
              </p>
            </div>

            <div className="w-[90%] mx-auto rounded-3xl p-5 max-w-xs my-3 sm:my-px shadow-sm bg-white">
              <LoginForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loginInfo={loginInfo}
              />
            </div>
          </div>
        )
        }
        {isSessionActive && (
          <div className="sm:h-[calc(100vh-56px)] flex flex-col sm:flex-row sm:items-center overflow-y-auto">
            <section className="w-[90%] h-[500px] md:h-[calc(90vh-88px)] mx-auto rounded-3xl p-5 max-w-xs lg:max-w-xl my-3 shadow-sm bg-gray-700 overflow-y-auto">
              <p className="text-gray-50">Aqui hay una lista de productos que puedes comprar</p>
              {
                productos.map(producto => (
                  <Products
                    key={producto.idproducto}
                    titulo={producto.nombre}
                    precio={producto.precio}
                    cantidad={producto.cantidad}
                    addToCart={() => addToCart(producto)}
                  />
                ))
              }
            </section>
            <section className="w-[90%] mx-auto rounded-3xl p-5 max-w-xs my-3 sm:my-px shadow-sm bg-gray-700">
              <h2 className="my-4 text-white font-bold text-center">Tu informacion personal</h2>
              <div className="flex flex-col justify-center">
                <p className="text-white my-3 font-bold">Nombre usuario: {userInfo?.nombreusuario}</p>
                <p className="text-white my-3 font-bold">Nombre: {userInfo?.persona?.nombre} {userInfo?.persona?.primer_apellido}</p>
                <p className="text-white my-3 font-bold">Celular: {userInfo?.persona?.celular}</p>
              </div>
              <div className="my-3 flex flex-col items-center w-full">
                <Button
                  onClick={() => {
                    router.push("/carrito");
                  }}
                >
                  Ver mi carrito
                </Button>
              </div>
              <div className="my-3 flex flex-col items-center w-full">
                <Button
                  onClick={() => {
                    router.push(`/perfil/facturas/${userInfo?.nombreusuario}`);
                  }}
                >
                  Ver facturas
                </Button>
              </div>
            </section>
          </div>
        )}
      </main >
    </>
  )
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