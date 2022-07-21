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

export default function TablaFacturas({ pagos, onDelete = {} }) {
  console.log(pagos)
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
          pagos.map((pago) => (
            pago.facturas.map((factura, index) => (
              <Table.Row key={factura?.idfactura}>
                <Table.Cell>{pago?.idpago}</Table.Cell>
                <Table.Cell>{pago?.generado}</Table.Cell>
                <Table.Cell>{factura?.producto?.nombre}</Table.Cell>
                <Table.Cell>{factura?.cantidad}</Table.Cell>
                <Table.Cell>{factura?.producto?.precio}</Table.Cell>
                <Table.Cell>
                  {factura?.cantidad * factura?.producto?.precio}
                </Table.Cell>
                <Table.Cell>
                  {pago?.estado ? (
                    <span className="text-green-500">Pagado</span>
                  ) : (<span className="text-red-500">Pendiente</span>)}
                </Table.Cell>
              </Table.Row>
            ))
          ))
        }
      </Table.Body>
    </Table>
  )
}