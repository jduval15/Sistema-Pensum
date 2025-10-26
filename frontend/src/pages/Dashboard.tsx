import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useMateriasStore } from '../store/materiasStore';

export default function Dashboard() {
  const { usuario } = useAuthStore();
  const { progreso, materiasCursadas, fetchProgreso, fetchMateriasCursadas } = useMateriasStore();

  useEffect(() => {
    fetchProgreso();
    fetchMateriasCursadas();
  }, []);

  const materiasRecientes = materiasCursadas.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Bienvenido, {usuario?.nombre}!
        </h1>
        <p className="text-gray-600 mt-2">
          Licenciatura en Informática Gerencial
        </p>
      </div>

      {/* Estadísticas */}
      {progreso && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-sm font-medium uppercase tracking-wide opacity-80">
              Índice Académico
            </h3>
            <p className="text-4xl font-bold mt-2">{progreso.indiceAcademico}</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-sm font-medium uppercase tracking-wide opacity-80">
              Materias Aprobadas
            </h3>
            <p className="text-4xl font-bold mt-2">{progreso.materiasAprobadas}</p>
            <p className="text-sm mt-1 opacity-80">de {progreso.totalMaterias}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-sm font-medium uppercase tracking-wide opacity-80">
              Créditos
            </h3>
            <p className="text-4xl font-bold mt-2">{progreso.creditosAprobados}</p>
            <p className="text-sm mt-1 opacity-80">de {progreso.creditosTotales} ({progreso.porcentajeCreditos}%)</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-sm font-medium uppercase tracking-wide opacity-80">
              Cursando
            </h3>
            <p className="text-4xl font-bold mt-2">{progreso.materiasCursando}</p>
            <p className="text-sm mt-1 opacity-80">materias activas</p>
          </div>
        </div>
      )}

      {/* Accesos Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/planificar"
          className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-lg hover:shadow-xl transition p-6 text-white"
        >
          <h3 className="text-lg font-bold">📅 Planificar Trimestre</h3>
          <p className="mt-2 text-sm opacity-90">
            Crea tu trimestre y selecciona las materias a cursar
          </p>
        </Link>

        <Link
          to="/pensum"
          className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border-l-4 border-blue-500"
        >
          <h3 className="text-lg font-bold text-gray-800">Ver Pensum Completo</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Explora todas las materias de la carrera
          </p>
        </Link>

        <Link
          to="/mis-materias"
          className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border-l-4 border-green-500"
        >
          <h3 className="text-lg font-bold text-gray-800">Mis Materias</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Gestiona materias y registra notas
          </p>
        </Link>

        <Link
          to="/progreso"
          className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 border-l-4 border-purple-500"
        >
          <h3 className="text-lg font-bold text-gray-800">Ver Progreso</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Analiza tu rendimiento académico
          </p>
        </Link>
      </div>

      {/* Materias Recientes */}
      {materiasRecientes.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Materias Recientes</h2>
          <div className="space-y-3">
            {materiasRecientes.map((mc) => (
              <div key={mc.id} className="flex items-center justify-between border-l-4 border-blue-500 pl-4 py-2">
                <div>
                  <h4 className="font-semibold text-gray-800">{mc.materia.nombre}</h4>
                  <p className="text-sm text-gray-600">{mc.materia.codigo}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      mc.estado === 'Aprobada'
                        ? 'bg-green-100 text-green-800'
                        : mc.estado === 'Reprobada'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {mc.estado}
                  </span>
                  {mc.nota !== null && (
                    <p className="text-sm text-gray-600 mt-1">Nota: {mc.nota}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
