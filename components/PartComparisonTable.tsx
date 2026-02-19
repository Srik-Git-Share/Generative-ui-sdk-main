import React, { useState } from 'react';
import { ArrowUpDown, ShoppingCart, FileText } from 'lucide-react'; // Assuming you use lucide-react for icons

interface Part {
  id: string;
  name: string;
  voltage: number;
  current: number;
  resistance: number;
  package: string;
  price: number;
  inStock: boolean;
}

const PartComparisonTable = ({ data }: { data: Part[] }) => {
  const [sortKey, setSortKey] = useState<keyof Part>('voltage');

  const sortedData = [...data].sort((a, b) => {
    return a[sortKey] > b[sortKey] ? 1 : -1;
  });

  return (
    <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden my-4">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">Recommended CoolSiC™ Modules</h3>
        <p className="text-sm text-slate-500">Based on your 1200V / 50A requirement</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3">Part Number</th>
              <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => setSortKey('voltage')}>
                <div className="flex items-center gap-1">V_DS (V) <ArrowUpDown size={14}/></div>
              </th>
              <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => setSortKey('current')}>
                <div className="flex items-center gap-1">I_D (A) <ArrowUpDown size={14}/></div>
              </th>
              <th className="px-6 py-3 cursor-pointer hover:bg-slate-100" onClick={() => setSortKey('resistance')}>
                <div className="flex items-center gap-1">R_DS(on) (mΩ) <ArrowUpDown size={14}/></div>
              </th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((part, idx) => (
              <tr key={part.id} className="bg-white border-b hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                  <FileText size={16} className="text-blue-600"/> {part.name}
                </td>
                <td className="px-6 py-4">{part.voltage}V</td>
                <td className="px-6 py-4">{part.current}A</td>
                <td className="px-6 py-4">{part.resistance} mΩ</td>
                <td className="px-6 py-4">
                  <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 transition-colors">
                    <ShoppingCart size={14} /> Buy ${part.price}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartComparisonTable;