import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Layout() {
  const { usuario, logout } = useAuthStore();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold">Sistema de Pensum </h1>

              <div className="hidden md:flex space-x-4">
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition ${isActive('/dashboard')}`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/pensum"
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition ${isActive('/pensum')}`}
                >
                  Pensum Completo
                </Link>
                <Link
                  to="/planificar"
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition ${isActive('/planificar')}`}
                >
                  Planificar Trimestre
                </Link>
                <Link
                  to="/mis-materias"
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition ${isActive('/mis-materias')}`}
                >
                  Mis Materias
                </Link>
                <Link
                  to="/progreso"
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition ${isActive('/progreso')}`}
                >
                  Progreso
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm">
                {usuario?.nombre} {usuario?.apellido}
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-sm font-medium transition"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
