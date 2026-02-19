"use client";

import { useState, useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Label, Legend 
} from 'recharts';
import { Settings2, Zap, Thermometer } from 'lucide-react';

interface PowerLossProps {
  productName: string;
  rdsOn: number;     // On-resistance in Ohms
  eTotal: number;    // Switching energy in mJ
  maxCurrent: number; // Max chart current
}

export const PowerLossWidget = ({data}:any) => {

    const {productName,rdsOn,eTotal,maxCurrent} = data;
  
  // User Interactive State
  const [frequency, setFrequency] = useState(20); // kHz
  const [gateRes, setGateRes] = useState(10);     // Ohms
  const [temp, setTemp] = useState(25);           // Celsius

  // Physics Calculation Logic
  const chartData = useMemo(() => {
    const dataPoints = [];
    const steps = 10;
    
    for (let i = 0; i <= steps; i++) {
      const current = Math.round((maxCurrent / steps) * i);
      if (current === 0) continue;

      // 1. Temperature Coefficient for Resistance (Silicon Carbide typically rises)
      // Approx 1.6x increase at 150C
      const tempFactor = 1 + ((temp - 25) * 0.004); 
      const actualRds = rdsOn * tempFactor;

      // 2. Conduction Loss = I^2 * R
      const pCond = Math.pow(current, 2) * actualRds;

      // 3. Switching Loss = f * E_tot * (current scaling)
      // Gate resistance usually slows switching, increasing loss.
      // We'll use a simplified factor: (Rg / 10) * 0.2 + 0.8
      const rgFactor = (gateRes / 10) * 0.2 + 0.8; 
      // E_total usually scales linearly with current in simplified models
      const eSwPerCycle = (eTotal / 1000) * (current / 25) * rgFactor; 
      const pSw = (frequency * 1000) * eSwPerCycle;

      dataPoints.push({
        current,
        totalLoss: parseFloat((pCond + pSw).toFixed(1)),
        conduction: parseFloat(pCond.toFixed(1)),
        switching: parseFloat(pSw.toFixed(1)),
      });
    }
    return dataPoints;
  }, [frequency, gateRes, temp, rdsOn, eTotal, maxCurrent]);

  return (
    <div className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden my-6 font-sans">
      
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Zap className="text-yellow-400" size={20}/>
            Power Loss Simulator
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">Target: {productName}</p>
        </div>
        <div className="text-right text-xs text-slate-400">
          <div className="mb-1">R_ds(on): {rdsOn * 1000}mΩ</div>
          <div>E_tot: {eTotal}mJ</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        
        {/* Controls Panel */}
        <div className="w-full md:w-1/3 bg-slate-50 p-6 border-r border-slate-200 space-y-6">
          <div className="flex items-center gap-2 text-slate-700 font-medium mb-2 border-b pb-2">
            <Settings2 size={16} /> Parameters
          </div>

          {/* Slider: Frequency */}
          <div>
            <label className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
              Frequency (f_sw)
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">{frequency} kHz</span>
            </label>
            <input 
              type="range" min="5" max="200" step="5"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Slider: Gate Resistance */}
          <div>
            <label className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
              Gate Res (R_g)
              <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded">{gateRes} Ω</span>
            </label>
            <input 
              type="range" min="1" max="50" step="1"
              value={gateRes}
              onChange={(e) => setGateRes(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
          </div>

          {/* Slider: Temperature */}
          <div>
            <label className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
              Junction Temp (T_j)
              <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded flex items-center gap-1">
                <Thermometer size={10}/> {temp}°C
              </span>
            </label>
            <input 
              type="range" min="25" max="175" step="5"
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
          </div>

          <div className="bg-white p-3 rounded border border-slate-200 text-xs text-slate-500 italic">
            "Increasing frequency scales switching losses linearly. Higher gate resistance slows switching, increasing E_on/E_off."
          </div>
        </div>

        {/* Graph Panel */}
        <div className="w-full md:w-2/3 p-4 h-87.5">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="current" 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              >
                <Label value="Current (A)" offset={0} position="insideBottom" fill="#64748b" style={{ fontSize: '12px' }} />
              </XAxis>
              <YAxis 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                label={{ value: 'Power Loss (W)', angle: -90, position: 'insideLeft', fill: '#64748b', style: { fontSize: '12px' } }}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                cursor={{ stroke: '#cbd5e1', strokeWidth: 2 }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
              
              <Line 
                name="Total Loss"
                type="monotone" 
                dataKey="totalLoss" 
                stroke="#0f172a" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line 
                name="Conduction"
                type="monotone" 
                dataKey="conduction" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                dot={false} 
              />
              <Line 
                name="Switching"
                type="monotone" 
                dataKey="switching" 
                stroke="#ef4444" 
                strokeWidth={2} 
                strokeDasharray="5 5" 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

