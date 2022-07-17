import { Button, Card } from "flowbite-react";

export default function Products({
  titulo,
  precio,
  addToCart,
  cantidad
}) {
  return (
    <div className="w-full my-4 lg:w-[90%] lg:mx-auto" >
      <Card
      >
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {titulo}
        </h5>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            $ {precio} COP
          </span>
        </div>
        <Button
          onClick={addToCart}
        >
          Agregar al carrito
        </Button>
        <span className="text-small font-bold text-gray-900 dark:text-white">
          Disponible: {cantidad}
        </span>
      </Card>
    </div>
  );
}