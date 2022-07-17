import { Button, Table } from "flowbite-react";

export default function Tabla({ productos, eliminarProducto }) {
  return (
    <Table striped={true} className="rounded-md">
      <Table.Head>
        <Table.HeadCell>
          ID
        </Table.HeadCell>
        <Table.HeadCell>
          Nombre
        </Table.HeadCell>
        <Table.HeadCell>
          Precio
        </Table.HeadCell>
        <Table.HeadCell>
          Cantidad
        </Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">
            Acciones
          </span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y ">
        {productos && productos.map(producto => (
          <Table.Row key={producto.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
            <Table.Cell>
              {producto.idproducto}
            </Table.Cell>
            <Table.Cell>
              {producto.nombre}
            </Table.Cell>
            <Table.Cell>
              {producto.precio}
            </Table.Cell>
            <Table.Cell>
              {producto.cantidad}
            </Table.Cell>
            <Table.Cell>
              <Button
                onClick={() => eliminarProducto(producto.id)}
                color="failure"
              >
                Eliminar
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}