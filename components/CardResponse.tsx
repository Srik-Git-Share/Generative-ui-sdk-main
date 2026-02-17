export const CardResponse = ({ data }: any) => {
  return (
    <div className="rounded-xl border p-4 shadow-sm">
      <div className="text-sm text-neutral-500">{data.title}</div>
      <div className="text-2xl font-bold">{data.value}</div>
      {data.trend && (
        <div className="text-xs text-green-600">{data.trend}</div>
      )}
    </div>
  );
};
