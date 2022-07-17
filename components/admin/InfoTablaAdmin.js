import { Button, Table } from "flowbite-react";

export default function InfoTablaAdmin({ columnas, items, onDelete = {} }) {
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
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => onDelete(item)}
                    >
                      Eliminar
                    </Button>
                  </Table.Cell>
                );
              }
              else {
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