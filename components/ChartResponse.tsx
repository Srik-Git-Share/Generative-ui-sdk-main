import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const ChartResponse = ({ data }: any) => {
  const chartData = data.labels.map((label: string, i: number) => ({
    name: label,
    value: data.values[i],
  }));

  return (
    <div className="h-64 rounded-xl border p-4">
      <h3 className="mb-2 font-semibold">{data.title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
