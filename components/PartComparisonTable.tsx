"use client";

import { useState, useMemo } from 'react';
import { ShoppingCart, Zap, Filter, ExternalLink, ShieldCheck } from 'lucide-react';
import {Products} from '../lib/products'; // Import the dummy data 



const PartComparisonTable = ({message}: any) => {

  const [sortByEfficiency, setSortByEfficiency] = useState(false);
  const [filterInStock, setFilterInStock] = useState(false);

  // Memoize the sorted/filtered data so it updates efficiently when buttons are clicked
  const displayData = useMemo(() => {
    let result = [...Products];

    if (filterInStock) {
      result = result.filter(p => p.inStock);
    }

    if (sortByEfficiency) {
      // Lower R_DS(on) generally means less conduction loss (higher efficiency)
      result.sort((a, b) => a.rdsOn - b.rdsOn);
    }
    return result;
  }, [Products, filterInStock, sortByEfficiency]);

  // The Top Recommendation is the first item in the processed array
  const topPickId = displayData.length > 0 ? displayData[0].id : null;

  return (
    <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden my-6">
      
      {/* Header & AI Message */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <ShieldCheck className="text-blue-600" />
          Infineon Part Recommendations
        </h3>
        {message && <p className="text-sm text-slate-600 mt-2 italic">"{message.aiRecommendationMessage}"</p>}
      </div>

      {/* Interactive Controls */}
      <div className="px-6 py-3 bg-white border-b border-slate-100 flex gap-3">
        <button 
          onClick={() => setSortByEfficiency(!sortByEfficiency)}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
            sortByEfficiency ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Zap size={14} /> {sortByEfficiency ? 'Sorted by Efficiency' : 'Sort by Efficiency'}
        </button>
        
        <button 
          onClick={() => setFilterInStock(!filterInStock)}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
            filterInStock ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Filter size={14} /> {filterInStock ? 'In Stock Only' : 'Filter by Stock'}
        </button>
      </div>
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-3">Part Number</th>
              <th className="px-6 py-3">V_DS (V)</th>
              <th className="px-6 py-3">I_D (A)</th>
              <th className="px-6 py-3">R_DS(on) (mΩ)</th>
              <th className="px-6 py-3">Package</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {displayData.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-6 text-slate-500">No parts match your criteria.</td></tr>
            ) : (
              displayData.map((part) => (
                <tr 
                  key={part.id} 
                  className={`border-b transition-colors hover:bg-slate-50 ${part.id === topPickId ? 'bg-blue-50/50' : 'bg-white'}`}
                >
                  <td className="px-6 py-4 font-medium text-slate-900 flex flex-col">
                    {part.partNumber}
                    {part.id === topPickId && (
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mt-1">Top Pick</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{part.vDs}</td>
                  <td className="px-6 py-4 text-slate-500">{part.iD}</td>
                  <td className="px-6 py-4 font-mono text-slate-500">{part.rdsOn}</td>
                  <td className="px-6 py-4 text-slate-500">{part.packageType}</td>
                  <td className="px-6 py-4">
                    {part.inStock ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-md">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => window.open(part.productUrl, '_blank')}
                      className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed disabled:hover:bg-slate-300 disabled:shadow-none"
                      disabled={!part.inStock}
                    >
                      <ShoppingCart size={14} /> Buy ${part.price.toFixed(2)}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartComparisonTable;