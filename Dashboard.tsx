import React, { useState } from 'react';
import type { IFinancialMovement, IMonthlyBudget, FinanceScope } from '../interfaces/finance';
import { Wallet, DollarSign, ArrowUpCircle, ArrowDownCircle, Clock, AlertTriangle } from 'lucide-react';

interface DashboardProps {
  movements: IFinancialMovement[];
  budgets: IMonthlyBudget[];
}

export const Dashboard: React.FC<DashboardProps> = ({ movements, budgets }) => {
  const [activeScope, setActiveScope] = useState<FinanceScope>('personal');

  // Filtrar movimientos 
  const scopeMovements = movements.filter((m) => m.scope === activeScope);

  
  const totalIncome = scopeMovements
    .filter((m) => m.type === 'income' && !m.isPlanned)
    .reduce((acc, m) => acc + m.amount, 0);

  const totalExpense = scopeMovements
    .filter((m) => m.type === 'expense' && !m.isPlanned)
    .reduce((acc, m) => acc + m.amount, 0);

  const netBalance = totalIncome - totalExpense;

  const plannedCount = scopeMovements.filter((m) => m.isPlanned).length;

  // Límite presupuesto
  const currentBudget = budgets.find((b) => b.scope === activeScope)?.monthlyLimit || 0;
  const budgetUsage = currentBudget > 0 ? (totalExpense / currentBudget) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Selector de personal o empresarial */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-1xl font-bold">Pulso Finanzas</h1>
          <p className="text-slate-500 text-sm mt-1">
            Registro de movimientos financieros personales y de microemprendimiento.
          </p>
        </div>

        <div className="flex bg-slate-800 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveScope('personal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeScope === 'personal'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Wallet className="w-4 h-4" /> Personal
          </button>
          <button
            onClick={() => setActiveScope('business')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeScope === 'business'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4" /> Emprendimiento
          </button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Ingresos Realizados
          </span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-emerald-600">₡{totalIncome.toLocaleString()}</span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <ArrowUpCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Gastos Realizados
          </span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-red-600">₡{totalExpense.toLocaleString()}</span>
            <div className="p-2.5 bg-red-50 text-red-600 rounded-lg">
              <ArrowDownCircle className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Saldo Neto Realizado
          </span>
          <div className="flex items-center justify-between mt-2">
            <span
              className={`text-2xl font-bold ${
                netBalance >= 0 ? 'text-slate-900' : 'text-red-600'
              }`}
            >
              ₡{netBalance.toLocaleString()}
            </span>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            Movimientos Planificados
          </span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-2xl font-bold text-amber-600">{plannedCount}</span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Estado del Presupuesto activo*/}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">
            Presupuesto Mensual ({activeScope === 'personal' ? 'Personal' : 'Emprendimiento'})
          </h2>
          <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
            Límite: ₡{currentBudget.toLocaleString()}
          </span>
        </div>

        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              totalExpense > currentBudget && currentBudget > 0 ? 'bg-red-500' : 'bg-blue-600'
            }`}
            style={{ width: `${Math.min(budgetUsage, 100)}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-slate-500 font-medium">
          <span>Gastado: ₡{totalExpense.toLocaleString()}</span>
          <span>{currentBudget === 0 ? 'Sin límite' : `${budgetUsage.toFixed(1)}% consumido`}</span>
        </div>

        {currentBudget > 0 && totalExpense > currentBudget && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm mt-2">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <span>Alerta: Has superado el límite presupuestario asignado.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;