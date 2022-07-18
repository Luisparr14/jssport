import { Button } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function FormAdminPanel({ onSubmit, onChange, campos, buttonLabel, formTitle }) {
  return (
    <>
      <p className="text-black text-center text-3xl p-3 font-bold">{formTitle}</p>
      <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>

        {
          campos.map(campo => {
            return (
              <div className="mb-4" key={campo.id}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={campo.id}>
                  {campo.label}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={campo.id}
                  type={campo.type}
                  name={campo.name}
                  onChange={onChange}
                  value={campo.value}
                  placeholder={campo.label}
                  disabled={campo.disabled}
                />
              </div>
            );
          })
        }
        <div className="flex flex-col items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            {buttonLabel}
          </button>
        </div>
      </form>
    </>
  )
}