import { Button, Table } from "flowbite-react";

const columnas = [
  {
    id: "referencia",
    label: "Referencia",
    accessor: "idpago"
  },
  {
    id: "fecha",
    label: "Fecha",
    accessor: "generado"
  },
  {
    id: "producto",
    label: "Producto",
    accessor: "nombre"
  },
  {
    id: "cantidad",
    label: "Cantidad",
    accessor: "cantidad"
  },
  {
    id: "precio",
    label: "Precio",
    accessor: "precio"
  },
  {
    id: "total",
    label: "Total",
    accessor: "total"
  },
  {
    id: "estado",
    label: "Estado",
    accessor: "estado"
  }
]

export default function TablaFacturas({ facturas, onDelete = {} }) {
  return (
    <Table striped={true} className="rounded-md">
      <Table.Head>
        {columnas.map(columna => (
          <Table.HeadCell key={columna.id}>
            {columna.label}
          </Table.HeadCell>
        ))}
      </Table.Head>
      <Table.Body className="divide-y ">
      {
        facturas.map((factura, index) => (
          <Table.Row key={factura.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
            
          </Table.Row>
        ))
      }     
      </Table.Body>
    </Table>
  )
}