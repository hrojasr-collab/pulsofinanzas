import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-md mx-auto text-center py-16 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
      <div className="inline-flex p-3 bg-red-50 text-red-600 rounded-full">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900">404 - Ruta No Encontrada</h1>
      <p className="text-slate-500 text-sm">
        La dirección URL ingresada no corresponde a ninguna vista del sistema Pulso Finanzas.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-slate-900 text-white font-medium px-4 py-2.5 rounded-lg text-sm hover:bg-slate-800 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Regresar al Panel Principal
      </Link>
    </div>
  );
};

export default NotFound;