import { Button, Tooltip } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function NavBar({ session, setSession }) {
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (session) {
      setSession(true);
    } else {
      setSession(false);
    }
  }, [setSession]);

  const toggle = () => {
    menuRef.current.classList.toggle("hidden");
  };

  const active = (path) => {
    return router.pathname === path ? "font-semibold text-black" : "";
  }

  const logoutButton = () => (
    <Button color={session ? "failure" : ""}
      onClick={logout}
      size="sm"
      pill={true}
    >
        Cerrar sesión
    </Button>
  )

  const logout = () => {
    MySwal.fire({
      title: "¿Estás seguro de cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cerrar sesión",
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem("session");
        setSession(false);
        router.push("/perfil");
      }
    })
  }  

  return (
    <nav className="bg-white shadow-lg h-[88px] md:h-[56px]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7 w-full">
            <div>
              <Link href="/">
                <a className={`flex items-center py-2 px-2 gap-4`}>
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={72}
                    height={72}
                  />
                  <span className="font-semibold text-gray-500 text-lg">
                    JSPORT
                  </span>
                </a>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-1 m-auto w-full justify-around overflow-auto">
              <Link href="/">
                <a className={`py-4 px-2 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300 ${active("/")}`}>
                  Inico
                </a>
              </Link>
              <Link href="/elementos">
                <a className={`py-4 px-2 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300" ${active("/elementos")}`}>
                  Elementos
                </a>
              </Link>
              <Link href="/servicios">
                <a className={`py-4 px-2 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300 ${active("/servicios")}`}>
                  Servicios
                </a>
              </Link>
              <Link href="/perfil">
                <a className={`py-4 px-2 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300 ${active("/perfil")}`}>
                  Perfil
                </a>
              </Link>
              <Link href="/#">
                <a className={`py-4 px-2 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300 ${active("/entrenadores")}`}>
                  Entrenadores
                </a>
              </Link>
              <Link href="/#">
                <a className={`py-4 px-2 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300 ${active("/contacto")}`}>
                  Contacto
                </a>
              </Link>
              <Link href="/#">
                <a className={`py-4 px-2 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300 ${active("/horario")}`}>
                  Horario
                </a>
              </Link>
              {session && (
                <Link href="#">
                  <a className={`py-2 min-w-[130px] text-gray-500 font-semibold hover:text-yellow-200 transition duration-300 ${active("/horario")}`}>
                    {logoutButton()}
                  </a>
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggle}
              className="outline-none mobile-menu-button"
            >
              <svg
                className="w-6 h-6 text-gray-500 hover:text-yellow-200"
                x-show="!showMenu"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div ref={menuRef} className="hidden mobile-menu bg-yellow-200 h-[100vh] z-[99999] relative md:hidden">
        <ul className="">
          <li className="">
            <Link href="/">
              <a className={`block text-sm px-2 py-4 hover:bg-yellow-200 ${active('/')}`}>
                Inicio
              </a>
            </Link>
          </li>
          <li>
            <Link href="/elementos">
              <a className={`block text-sm px-2 py-4 hover:bg-yellow-200 ${active('/elementos')}`}>
                Elementos
              </a>
            </Link>
          </li>
          <li>
            <Link href="/servicios">
              <a className={`block text-sm px-2 py-4 hover:bg-yellow-200 ${active('/servicios')}`}>
                Servicio
              </a>
            </Link>
          </li>
          <li>
            <Link href="/perfil">
              <a className={`block text-sm px-2 py-4 hover:bg-yellow-200 ${active('/perfil')}`}>
                Perfil
              </a>
            </Link>
          </li>
          <li>
            <Link href="/#">
              <a className={`block text-sm px-2 py-4 hover:bg-yellow-200 ${active('/entrenadores')}`}>
                Entrenadores
              </a>
            </Link>
          </li>
          <li>
            <Link href="/#">
              <a className={`block text-sm px-2 py-4 hover:bg-yellow-200 ${active('/contacto')}`}>
                Contacto
              </a>
            </Link>
          </li>
          <li>
            <Link href="/#">
              <a className={`block text-sm px-2 py-4 hover:bg-yellow-200 ${active('/horarios')}`}>
                Horario
              </a>
            </Link>
          </li>
          <li className="flex justify-center">
            {session && (
              logoutButton()
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
