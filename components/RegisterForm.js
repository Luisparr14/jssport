import { Button } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function RegisterForm({ onSubmit, onChange, registroInfo }) {

  return (
    <>
      <p className="text-black text-center text-3xl p-3 font-bold">Registrarse</p>
      <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
            Nombre
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nombre" type="text" placeholder="Nombre" name="nombre" value={registroInfo.nombre} onChange={onChange}/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="primer_apellido">
            Primer apellido
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="primer_apellido" type="text" placeholder="Primer Apellido" name="primerapellido" value={registroInfo.primerapellido} onChange={onChange}/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="segundo_apellido">
            Segundo apellido
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="segundo_apellido" type="text" placeholder="Segundo Apellido" name="segundoapellido" value={registroInfo.segundoapellido} onChange={onChange}/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="celular">
            Celular
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="celular" type="text" placeholder="Celular" name="celular" value={registroInfo.celular} onChange={onChange}/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Correo">
            Correo
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Correo" type="email" placeholder="Correo" name="correo" value={registroInfo.correo} onChange={onChange}/>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Usuario
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Usuario" name="usuario" value={registroInfo.usuario} onChange={onChange}/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" name="contrasena" value={registroInfo.contrasena} onChange={onChange}/>
          {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">
            Confirma Contraseña
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password2" type="password" placeholder="******************" name="contrasenaconfirmacion" value={registroInfo.contrasenaconfirmacion} onChange={onChange}/>
          {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="flex flex-col items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Registrarse
          </button>
          <Link href={"/perfil"}>
            <a className="my-2 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Volver
            </a>
          </Link>
        </div>
      </form>
    </>
  )
}