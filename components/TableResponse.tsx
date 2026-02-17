export const TableResponse = ({ data }: any) => {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {data.columns.map((col: string) => (
              <th key={col} className="border p-2 text-left text-red-500 bg-amber-100">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row: string[], i: number) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="border p-2" >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
