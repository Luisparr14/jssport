import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function NavBar() {
  const menuRef = useRef(null);
  const toggle = () => {
    menuRef.current.classList.toggle("h-0");
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7 w-full">
            <div>
              <a href="index.html" className="flex items-center py-2 px-2 gap-4">
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
            </div>
            <div className="hidden md:flex items-center space-x-1 m-auto w-full justify-around">
            <Link href="/">
              <a className="py-4 px-2 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300">
                Inico
              </a>
            </Link>
            <Link href="/elementos">
              <a className="py-4 px-2 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300" >
                Elementos
              </a>
            </Link>
            <Link href="/servicios"> 
              <a className="py-4 px-2 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300">
              Servicios
              </a>
            </Link>
            <Link href="/perfil">
              <a className="py-4 px-2 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300">
                Perfil
              </a>
            </Link>
            <Link href="/entrenadores">
              <a className="py-4 px-2 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300">
                Entrenadores
              </a>
            </Link>
            <Link href="/contacto">
              <a className="py-4 px-2 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300">
                Contacto
              </a>
            </Link>
            <Link href="/horarios">
              <a className="py-4 px-2 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300">
                Horario
              </a>
            </Link>
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

      <div ref={menuRef} className="h-0 overflow-hidden mobile-menu sm:bg-yellow-500 transition-all">
        <ul className="">
          <li className="">
          <Link href="/">
            <a className="block text-sm px-2 py-4 hover:bg-yellow-200 font-semibold">
              Inicio
            </a>
          </Link>
          </li>
          <li>
          <Link href="/elementos">
            <a className="block text-sm px-2 py-4 hover:bg-yellow-200 transition duration-300">
              Elementos
            </a>
          </Link>
          </li>
          <li>
          <Link href="/servicios">
            <a className="block text-sm px-2 py-4 hover:bg-yellow-200 transition duration-300">
              Servicio
            </a>
          </Link>
          </li>
          <li>
          <Link href="/perfil">
            <a className="block text-sm px-2 py-4 hover:bg-yellow-200 transition duration-300">
              Perfil
            </a>
          </Link>
          </li>
          <li>
          <Link href="/entrenadores">
            <a className="block text-sm px-2 py-4 hover:bg-yellow-200 transition duration-300">
              Entrenadores
            </a>
          </Link>
          </li>
          <li>
          <Link href="/contacto">
            <a className="block text-sm px-2 py-4 hover:bg-yellow-200 transition duration-300">
              Contacto
            </a>
          </Link>
          </li>
          <li>
          <Link href="/horarios">
            <a className="block text-sm px-2 py-4 hover:bg-yellow-200 transition duration-300">
              Horario
            </a>
          </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
