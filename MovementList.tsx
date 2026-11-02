import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { IFinancialMovement, FinanceScope } from '../interfaces/finance';
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  Eye, 
  Search,
  Filter
} from 'lucide-react';

interface MovementListProps {
  movements: IFinancialMovement[];
  onTogglePlanned: (id: number) => void;
  onDelete: (id: number) => void;
}

export const MovementList: React.FC<MovementListProps> = ({
  movements,
  onTogglePlanned,
  onDelete
}) => {
  const [selectedScope, setSelectedScope] = useState<FinanceScope | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filtrado por ámbito y término de búsqueda
  const filteredMovements = movements.filter((m) => {
    const matchesScope = selectedScope === 'all' || m.scope === selectedScope;
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesScope && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Listado de Movimientos</h1>
          <p className="text-slate-500 text-sm mt-1">
            Administra los ingresos y gastos registrados para tus finanzas personales y tu negocio.
          </p>
        </div>

        <Link
          to="/movimientos/nuevo"
          className="inline-flex items-center justify-center bg-blue-600 text-white font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm text-sm"
        >
          + Nuevo Movimiento
        </Link>
      </div>

      {/* Controles de Filtrado */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Selector de Ámbito */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <div className="flex bg-slate-100 p-1 rounded-lg w-full sm:w-auto">
            <button
              onClick={() => setSelectedScope('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                selectedScope === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedScope('personal')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                selectedScope === 'personal'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Personal
            </button>
            <button
              onClick={() => setSelectedScope('business')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                selectedScope === 'business'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Emprendimiento
            </button>
          </div>
        </div>

        {/* Búsqueda por Concepto/Categoría (Mejora propia) */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por concepto o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Renderizado de Colección mediante .map() */}
      {filteredMovements.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500 text-sm">No se encontraron movimientos registrados para los criterios seleccionados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredMovements.map((movement) => (
            <div
              key={movement.id}
              className={`bg-white p-4 rounded-xl border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition hover:border-slate-300 ${
                movement.isPlanned ? 'border-amber-200 bg-amber-50/20' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2.5 rounded-lg mt-1 md:mt-0 ${
                    movement.type === 'income'
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {movement.type === 'income' ? (
                    <ArrowUpCircle className="w-5 h-5" />
                  ) : (
                    <ArrowDownCircle className="w-5 h-5" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900 text-base">{movement.title}</h3>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        movement.scope === 'personal'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {movement.scope === 'personal' ? 'Personal' : 'Negocio'}
                    </span>
                    {movement.isPlanned && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Planificado
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {movement.category} • {movement.date} • {movement.paymentMethod}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t md:border-t-0 pt-2 md:pt-0">
                <div className="text-left md:text-right">
                  <span
                    className={`text-lg font-extrabold block ${
                      movement.type === 'income' ? 'text-emerald-600' : 'text-slate-900'
                    }`}
                  >
                    {movement.type === 'income' ? '+' : '-'}₡{movement.amount.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onTogglePlanned(movement.id)}
                    title={movement.isPlanned ? 'Marcar como Realizado' : 'Marcar como Planificado'}
                    className={`p-2 rounded-lg text-xs font-semibold transition ${
                      movement.isPlanned
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {movement.isPlanned ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>

                  <Link
                    to={`/movimientos/${movement.id}`}
                    title="Ver detalle"
                    className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => onDelete(movement.id)}
                    title="Eliminar registro"
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};