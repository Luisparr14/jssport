import { Card } from "flowbite-react";

export default function CardEntrenadores({nombre, imagen, descripcion}) {
  return (
    <div className="max-w-[18rem]">
      <Card imgSrc={imagen}>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {nombre}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {descripcion}
        </p>
      </Card>
    </div>
  );
}