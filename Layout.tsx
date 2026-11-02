import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  PlusCircle, 
  PiggyBank, 
  Info, 
  Activity 
} from 'lucide-react';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar Superior Principal */}
      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Identidad Visual de Pulso Finanzas */}
          <NavLink to="/" className="flex items-center space-x-3 group">
            <div className="bg-blue-800 p-2 rounded-xl group-hover:bg-blue-500 transition-colors">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-blue-400 bg-clip-text ">
                Pulso Finanzas
              </span>
              <span className="block text-[13px] text-slate-600 font-medium -mt-1">
                Personal & Microemprendimiento
              </span>
            </div>
          </NavLink>

          {/* Enlaces de Navegación SPA con NavLink (Cumple Criterio 13) */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-00 hover:text-white'
                }`
              }
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Inicio</span>
            </NavLink>

            <NavLink
              to="/movimientos"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Receipt className="w-4 h-4" />
              <span>Movimientos</span>
            </NavLink>

            <NavLink
              to="/movimientos/nuevo"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <PlusCircle className="w-4 h-4" />
              <span>Nuevo Movimiento</span>
            </NavLink>

            <NavLink
              to="/presupuestos"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <PiggyBank className="w-4 h-4" />
              <span>Presupuestos</span>
            </NavLink>

            <NavLink
              to="/acerca"
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Info className="w-4 h-4" />
              <span>Acerca</span>
            </NavLink>
          </nav>
        </div>

        {/* Menú Móvil Inferior/Scroll para Pantallas Pequeñas */}
        <div className="md:hidden border-t border-slate-800 bg-slate-900/95 backdrop-blur px-2 py-2 flex justify-around overflow-x-auto">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg text-[10px] font-medium ${
                isActive ? 'text-blue-400' : 'text-slate-400'
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4 mb-0.5" />
            <span>Inicio</span>
          </NavLink>

          <NavLink
            to="/movimientos"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg text-[10px] font-medium ${
                isActive ? 'text-blue-400' : 'text-slate-400'
              }`
            }
          >
            <Receipt className="w-4 h-4 mb-0.5" />
            <span>Movimientos</span>
          </NavLink>

          <NavLink
            to="/movimientos/nuevo"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg text-[10px] font-medium ${
                isActive ? 'text-blue-400' : 'text-slate-400'
              }`
            }
          >
            <PlusCircle className="w-4 h-4 mb-0.5" />
            <span>Nuevo</span>
          </NavLink>

          <NavLink
            to="/presupuestos"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg text-[10px] font-medium ${
                isActive ? 'text-blue-400' : 'text-slate-400'
              }`
            }
          >
            <PiggyBank className="w-4 h-4 mb-0.5" />
            <span>Límites</span>
          </NavLink>

          <NavLink
            to="/acerca"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg text-[10px] font-medium ${
                isActive ? 'text-blue-400' : 'text-slate-400'
              }`
            }
          >
            <Info className="w-4 h-4 mb-0.5" />
            <span>Acerca</span>
          </NavLink>
        </div>
      </header>

      {/* Contenido Dinámico inyectado por las Rutas Hijas mediante Outlet */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Pie de Página */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500">
          Pulso Finanzas © 2026 — Hazel Rojas Rodriguez
        </div>
      </footer>
    </div>
  );
};

export default Layout;