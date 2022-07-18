import { Button, Table } from "flowbite-react";

export default function InfoTablaAdmin({ columnas, items, onDelete = {}, onEdit={} }) {
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
        {items.map((item, index) => (
          <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
            {columnas.map(columna => {
              if (columna.accessor === "eliminar") {
                return (
                  <Table.Cell key={columna.id + "-" + index}>
                    <Button
                      color={"failure"}
                      type="button"
                      onClick={() => onDelete(item)}
                    >
                      Eliminar
                    </Button>
                  </Table.Cell>
                );
              }else if (columna.accessor === "editar") {
                return (
                  <Table.Cell key={columna.id + "-" + index}>
                    <Button
                      color={"purple"}
                      type="button"
                      onClick={() => onEdit(item)}
                    >
                      Editar
                    </Button>
                  </Table.Cell>
                );
              }else {
                return (
                  <Table.Cell key={item[columna.accessor]+ "-" + index}>
                    {item[columna.accessor]}
                  </Table.Cell>
                );
              }
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}