import React from 'react';
import { Info, Code, Database, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center space-x-3 border-b pb-4">
        <div className="bg-blue-600 p-2.5 rounded-xl text-white">
          <Info className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Acerca de Pulso Finanzas</h1>
          <p className="text-slate-500 text-xs">Proyecto</p>
        </div>
      </div>

      <p className="text-slate-600 text-sm leading-relaxed">
        <strong>Pulso Finanzas</strong> es una Single Page Application (SPA) desarrollada con React, TypeScript y Vite. Su objetivo es brindar a las personas y microemprendedores una herramienta limpia y centralizada para registrar ingresos, organizar gastos, proyectar pagos futuros y evaluar límites presupuestarios.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start space-x-3">
          <Code className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Arquitectura Limpia</h3>
            <p className="text-xs text-slate-500 mt-1">Uso de React Router declarativo, props, callbacks y una única fuente de verdad.</p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start space-x-3">
          <Database className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-slate-800 text-sm">Persistencia Local</h3>
            <p className="text-xs text-slate-500 mt-1">Sincronización automática de movimientos y presupuestos en localStorage.</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center space-x-3 text-blue-800 text-xs">
        <ShieldCheck className="w-5 h-5 flex-shrink-0" />
        <span>Todos los datos mostrados en esta versión son totalmente ficticios e inaccesibles externamente.</span>
      </div>
    </div>
  );
};

export default About;