import { Alert } from "flowbite-react";

export default function CustomAlert({ titulo, mensaje, tipo, icon = "" }) {
  return (
    <div className="abolute t-10">
      <Alert
        color={tipo}
        icon={icon}
      >
        <span>
          <span className="font-medium">
            {titulo}
          </span>
          {' '}{mensaje}
        </span>
      </Alert>
    </div>
  )
}