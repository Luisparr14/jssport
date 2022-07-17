import { Button } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function LoginFormAdmin({adminData, onSubmit, onChange}) {
  return (
    <>
      <p className="text-black text-center font-bold">Inicio de sesión como administrador</p>
      <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="correo">
            Correo
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="correo" type="text" placeholder="Correo" name="correo" onChange={onChange} value={adminData.correo} />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={onChange} name="contrasena" value={adminData.contrasena} />
          {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
        </div>
        <div className="flex flex-col items-center justify-between">
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Iniciar Sesión
          </Button>
          <Link href={"#"}>
            <a className="my-2 inline-block align-baseline text-center font-bold text-sm text-blue-500 hover:text-blue-800">
              Comuniquese con un administrador si no tiene una cuenta admin
            </a>
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        JSSPORT ADMIN
      </p>
    </>
  )
}