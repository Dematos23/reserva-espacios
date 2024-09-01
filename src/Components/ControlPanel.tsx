"use client";

interface Data {
  [key: string]: any;
  id: String | undefined;
}

interface TableProps<T> {
  data: T[];
  headers: { head: string; location?: number }[];
  isThInRow?: boolean;
  thInRowHeaders?: { head: string; location?: number }[];
  isColumnButton?: boolean;
  columButtonFunction?: (item: T | null) => void;
}
export default function ControlPanel<T extends Data>({
  data,
  headers,
  isThInRow,
  thInRowHeaders,
  isColumnButton,
  columButtonFunction,
}: TableProps<T>) {
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-8 overflow-y-hidden">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr>
              <th scope="col" className="px-6 py-3">
                {thInRowHeaders ? thInRowHeaders[0].head : null}
              </th>
              {headers.map((header) => (
                <th scope="col" className="px-6 py-3">
                  {header.head}
                </th>
              ))}
              {isColumnButton ? <th scope="col" className="px-6 py-3"></th> : <></>}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                {isThInRow && thInRowHeaders ? (
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {thInRowHeaders.map((header) => {
                      const keys = Object.keys(item);
                      const value =
                        header.location !== undefined && header.location < keys.length
                          ? item[keys[header.location]]
                          : "No data";

                      return `${String(value)} `;
                    })}
                  </th>
                ) : null}
                {headers.map((header) => {
                  const keys = Object.keys(item);
                  const value =
                    header.location !== undefined && header.location < keys.length
                      ? item[keys[header.location]]
                      : "No data";

                  return <td className="px-6 py-4">{String(value)}</td>;
                })}

                {isColumnButton && columButtonFunction ? (
                  <td className="px-6 py-4">
                    <a
                      className="font-medium text-blue-600 dark:text-blue-500 hover:cursor-pointer hover:underline"
                      onClick={() => columButtonFunction(item)}
                    >
                      Editar
                    </a>
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
