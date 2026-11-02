import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { IFinancialMovement } from '../interfaces/finance';
import { ArrowLeft, Clock, CheckCircle2, Wallet, Tag, Calendar, CreditCard } from 'lucide-react';

interface MovementDetailProps {
  movements: IFinancialMovement[];
  onTogglePlanned: (id: number) => void;
}

export const MovementDetail: React.FC<MovementDetailProps> = ({
  movements,
  onTogglePlanned
}) => {
  const { id } = useParams<{ id: string }>();
  const movement = movements.find((m) => m.id === Number(id));

  // Actualización del título de la pestaña con useEffect y función de limpieza (cleanup)
  useEffect(() => {
    const originalTitle = document.title;
    if (movement) {
      document.title = `Pulso Finanzas | ${movement.title}`;
    } else {
      document.title = 'Pulso Finanzas | Movimiento no encontrado';
    }

    return () => {
      document.title = originalTitle;
    };
  }, [movement]);

  if (!movement) {
    return (
      <div className="max-w-md mx-auto text-center py-16 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Movimiento no encontrado</h2>
        <p className="text-slate-500 text-sm">
          El identificador solicitado no existe o fue eliminado de la colección.
        </p>
        <Link
          to="/movimientos"
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Listado
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <Link
          to="/movimientos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Regresar al listado
        </Link>
        <span
          className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
            movement.scope === 'personal'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-emerald-100 text-emerald-800'
          }`}
        >
          {movement.scope === 'personal' ? 'Ámbito Personal' : 'Microemprendimiento'}
        </span>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-slate-900">{movement.title}</h1>
          <span
            className={`text-2xl font-extrabold ${
              movement.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
            }`}
          >
            {movement.type === 'income' ? '+' : '-'}₡{movement.amount.toLocaleString()}
          </span>
        </div>
        <p className="text-slate-600 text-sm mt-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
          {movement.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b py-4">
        <div className="flex items-center gap-3 text-sm text-slate-700">
          <Tag className="w-4 h-4 text-slate-400" />
          <span><strong>Categoría:</strong> {movement.category}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-700">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span><strong>Fecha:</strong> {movement.date}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-700">
          <CreditCard className="w-4 h-4 text-slate-400" />
          <span><strong>Método:</strong> {movement.paymentMethod}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-700">
          <Wallet className="w-4 h-4 text-slate-400" />
          <span><strong>Tipo:</strong> {movement.type === 'income' ? 'Ingreso' : 'Gasto'}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          {movement.isPlanned ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
              <Clock className="w-4 h-4" /> Movimiento Planificado / Proyectado
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" /> Movimiento Realizado / Ejecutado
            </span>
          )}
        </div>

        <button
          onClick={() => onTogglePlanned(movement.id)}
          className="bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-slate-200 transition"
        >
          {movement.isPlanned ? 'Cambiar a Realizado' : 'Cambiar a Planificado'}
        </button>
      </div>
    </div>
  );
};