import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { IFinancialMovement, IMonthlyBudget, FinanceScope } from './interfaces/finance';
import { initialMovements, initialBudgets } from './shared/data/initialData';

import { Layout } from './shared/components/Layout';
import { Dashboard } from './pages/Dashboard';
import { MovementList } from './pages/MovementList';
import { MovementForm } from './pages/MovementForm';
import { MovementDetail } from './pages/MovementDetail';
import { Budgets } from './pages/home/Budgets';
import About from './pages/About';
import { NotFound } from './pages/NotFound';


const MOVEMENTS_KEY = 'pulso-movimientos';
const BUDGETS_KEY = 'pulso-presupuestos';

export const App: React.FC = () => {
  // estados globales
  const [movements, setMovements] = useState<IFinancialMovement[]>(() => {
    const saved = localStorage.getItem(MOVEMENTS_KEY);
    return saved !== null ? JSON.parse(saved) : initialMovements;
  });

  const [budgets, setBudgets] = useState<IMonthlyBudget[]>(() => {
    const saved = localStorage.getItem(BUDGETS_KEY);
    return saved !== null ? JSON.parse(saved) : initialBudgets;
  });

  // Persistencia con useEffect
  useEffect(() => {
    localStorage.setItem(MOVEMENTS_KEY, JSON.stringify(movements));
  }, [movements]);

  useEffect(() => {
    localStorage.setItem(BUDGETS_KEY, JSON.stringify(budgets));
  }, [budgets]);

  // Handlers para mutaciones inmutables
  const handleAddMovement = (newMovement: Omit<IFinancialMovement, 'id'>) => {
    const created: IFinancialMovement = {
      ...newMovement,
      id: Date.now()
    };
    setMovements((prev) => [created, ...prev]);
  };

  const handleTogglePlanned = (id: number) => {
    setMovements((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isPlanned: !m.isPlanned } : m))
    );
  };

  const handleDeleteMovement = (id: number) => {
    setMovements((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUpdateBudget = (scope: FinanceScope, newLimit: number) => {
    setBudgets((prev) =>
      prev.map((b) => (b.scope === scope ? { ...b, monthlyLimit: newLimit } : b))
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard movements={movements} budgets={budgets} />} />
        <Route
          path="movimientos"
          element={
            <MovementList
              movements={movements}
              onTogglePlanned={handleTogglePlanned}
              onDelete={handleDeleteMovement}
            />
          }
        />
        <Route path="movimientos/nuevo" element={<MovementForm onAddMovement={handleAddMovement} />} />
        <Route
          path="movimientos/:id"
          element={<MovementDetail movements={movements} onTogglePlanned={handleTogglePlanned} />}
        />
        <Route
          path="presupuestos"
          element={
            <Budgets
              movements={movements}
              budgets={budgets}
              onUpdateBudget={handleUpdateBudget}
            />
          }
        />
        <Route path="acerca" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;