import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IFinancialMovement, FinanceScope, MovementType } from '../interfaces/finance';

interface MovementFormProps {
  onAddMovement: (movement: Omit<IFinancialMovement, 'id'>) => void;
}

export const MovementForm: React.FC<MovementFormProps> = ({ onAddMovement }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    scope: 'personal' as FinanceScope,
    type: 'expense' as MovementType,
    category: '',
    amount: '',
    date: '',
    paymentMethod: '',
    isPlanned: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = 'El título es obligatorio y debe tener al menos 3 caracteres.';
    }

    if (
      !formData.description ||
      formData.description.trim().length < 10 ||
      formData.description.trim().length > 200
    ) {
      newErrors.description = 'La descripción debe tener entre 10 y 200 caracteres.';
    }

    if (!formData.scope) newErrors.scope = 'Debe seleccionar un ámbito.';
    if (!formData.type) newErrors.type = 'Debe seleccionar el tipo (ingreso o gasto).';
    if (!formData.category || formData.category.trim() === '') {
      newErrors.category = 'La categoría es requerida.';
    }

    const numericAmount = Number(formData.amount);
    if (!formData.amount || isNaN(numericAmount) || numericAmount <= 0) {
      newErrors.amount = 'El monto debe ser numérico y estrictamente mayor a 0.';
    }

    if (!formData.date) {
      newErrors.date = 'La fecha es requerida en formato YYYY-MM-DD.';
    }

    if (!formData.paymentMethod || formData.paymentMethod.trim() === '') {
      newErrors.paymentMethod = 'El método de pago/cobro es requerido.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onAddMovement({
      title: formData.title.trim(),
      description: formData.description.trim(),
      scope: formData.scope,
      type: formData.type,
      category: formData.category.trim(),
      amount: Number(formData.amount),
      date: formData.date,
      paymentMethod: formData.paymentMethod.trim(),
      isPlanned: formData.isPlanned
    });

    // Limpieza del formulario ÚNICAMENTE tras registro exitoso
    setFormData({
      title: '',
      description: '',
      scope: 'personal',
      type: 'expense',
      category: '',
      amount: '',
      date: '',
      paymentMethod: '',
      isPlanned: false
    });

    navigate('/movimientos');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Registrar Nuevo Movimiento</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Título</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Ej. Venta de Menú Digital o Pago de Alquiler"
            className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Descripción</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Detalle breve del movimiento (10 a 200 caracteres)"
            className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Ámbito</label>
            <select
              value={formData.scope}
              onChange={(e) => setFormData({ ...formData, scope: e.target.value as FinanceScope })}
              className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="personal">Personal</option>
              <option value="business">Microemprendimiento</option>
            </select>
            {errors.scope && <p className="text-red-500 text-xs mt-1">{errors.scope}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Tipo</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as MovementType })}
              className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="expense">Gasto</option>
              <option value="income">Ingreso</option>
            </select>
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Categoría</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Ej. Servicios, Ventas, Marketing"
              className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Monto (₡)</label>
            <input
              type="number"
              min="1"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="Ej. 45000"
              className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Fecha</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Método de Pago/Cobro</label>
            <input
              type="text"
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              placeholder="Ej. SINPE Móvil, Transferencia, Efectivo"
              className="w-full border border-slate-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>}
          </div>
        </div>

        <div className="flex items-center space-x-3 pt-2">
          <input
            type="checkbox"
            id="isPlanned"
            checked={formData.isPlanned}
            onChange={(e) => setFormData({ ...formData, isPlanned: e.target.checked })}
            className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isPlanned" className="text-sm font-medium text-slate-700 cursor-pointer">
            Marcar como movimiento proyectado / planificado a futuro
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800 transition shadow-sm mt-4"
        >
          Guardar Movimiento
        </button>
      </form>
    </div>
  );
};