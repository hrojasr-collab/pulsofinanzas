export type FinanceScope = 'personal' | 'business';
export type MovementType = 'income' | 'expense';

export interface IFinancialMovement {
  id: number;
  title: string;
  description: string;
  scope: FinanceScope;
  type: MovementType;
  category: string;
  amount: number;          // Monto positivo siempre
  date: string;            // Formato YYYY-MM-DD
  paymentMethod: string;
  isPlanned: boolean;      // true = planificado, false = realizado
}

export interface IMonthlyBudget {
  scope: FinanceScope;
  monthlyLimit: number;
}