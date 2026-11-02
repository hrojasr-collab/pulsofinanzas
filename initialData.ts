import type { IFinancialMovement, IMonthlyBudget } from '../../interfaces/finance';

export const initialMovements: IFinancialMovement[] = [
  {
    id: 1,
    title: "Pago de Salario Empresa",
    description: "Ingreso mensual por concepto de salario principal.",
    scope: "personal",
    type: "income",
    category: "Salario",
    amount: 850000,
    date: "2026-11-01",
    paymentMethod: "Transferencia Bancaria",
    isPlanned: false
  },
  {
    id: 2,
    title: "Venta de Menú Digital QR",
    description: "Cobro por implementación de menú interactivo a cliente local.",
    scope: "business",
    type: "income",
    category: "Ventas",
    amount: 120000,
    date: "2026-11-03",
    paymentMethod: "SINPE Móvil",
    isPlanned: false
  },
  {
    id: 3,
    title: "Compra de Supermercado",
    description: "Insumos alimenticios para el hogar.",
    scope: "personal",
    type: "expense",
    category: "Alimentación",
    amount: 65000,
    date: "2026-11-05",
    paymentMethod: "Tarjeta de Débito",
    isPlanned: false
  },
  {
    id: 4,
    title: "Pago de Hosting y Servidor",
    description: "Renovación de servidores web para aplicaciones de clientes.",
    scope: "business",
    type: "expense",
    category: "Servicios Digitales",
    amount: 45000,
    date: "2026-11-08",
    paymentMethod: "Tarjeta de Crédito",
    isPlanned: false
  },
  {
    id: 5,
    title: "Servicio de Internet Fibra Óptica",
    description: "Pago mensual de conexión a internet del hogar.",
    scope: "personal",
    type: "expense",
    category: "Servicios Básicos",
    amount: 32000,
    date: "2026-11-10",
    paymentMethod: "Deducción Automática",
    isPlanned: false
  },
  {
    id: 6,
    title: "Campaña Publicitaria Meta Ads",
    description: "Inversión planificada en redes sociales para captar reservas.",
    scope: "business",
    type: "expense",
    category: "Marketing",
    amount: 35000,
    date: "2026-11-20",
    paymentMethod: "Tarjeta de Crédito",
    isPlanned: true
  },
  {
    id: 7,
    title: "Mantenimiento Preventivo de Vehículo",
    description: "Cambio de aceite y revisión general del automóvil.",
    scope: "personal",
    type: "expense",
    category: "Transporte",
    amount: 50000,
    date: "2026-11-25",
    paymentMethod: "Efectivo",
    isPlanned: true
  },
  {
    id: 8,
    title: "Asesoría Desarrollo Web",
    description: "Ingreso estimado por consultoría técnica proyectada.",
    scope: "business",
    type: "income",
    category: "Consultoría",
    amount: 95000,
    date: "2026-11-28",
    paymentMethod: "Transferencia Bancaria",
    isPlanned: true
  },
  {
    id: 9,
    title: "Licencia Software de Diseño",
    description: "Suscripción mensual de herramientas para prototipado UI.",
    scope: "business",
    type: "expense",
    category: "Herramientas",
    amount: 18000,
    date: "2026-11-02",
    paymentMethod: "Tarjeta de Débito",
    isPlanned: false
  },
  {
    id: 10,
    title: "Gimnasio Mensual",
    description: "Suscripción de acondicionamiento físico personal.",
    scope: "personal",
    type: "expense",
    category: "Salud",
    amount: 25000,
    date: "2026-11-04",
    paymentMethod: "SINPE Móvil",
    isPlanned: false
  }
];

export const initialBudgets: IMonthlyBudget[] = [
  { scope: "personal", monthlyLimit: 600000 },
  { scope: "business", monthlyLimit: 150000 }
];