import { useEffect } from 'react';
import { useMateriasStore } from '../store/materiasStore';

export default function Progreso() {
  const { progreso, materiasCursadas, fetchProgreso, fetchMateriasCursadas } = useMateriasStore();

  useEffect(() => {
    fetchProgreso();
    fetchMateriasCursadas();
  }, []);

  const materiasConNota = materiasCursadas.filter(mc => mc.nota !== null);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800">Progreso Académico</h1>
        <p className="text-gray-600 mt-2">
          Análisis detallado de tu rendimiento en la carrera
        </p>
      </div>

      {/* Estadísticas Generales */}
      {progreso && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-sm font-medium uppercase tracking-wide opacity-80">
              Índice Académico General
            </h3>
            <p className="text-5xl font-bold mt-3">{progreso.indiceAcademico}</p>
            <p className="text-sm mt-2 opacity-80">
              Basado en {materiasConNota.length} materias con nota
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-sm font-medium uppercase tracking-wide opacity-80">
              Progreso de la Carrera
            </h3>
            <p className="text-5xl font-bold mt-3">{progreso.porcentajeCreditos}%</p>
            <p className="text-sm mt-2 opacity-80">
              {progreso.creditosAprobados} de {progreso.creditosTotales} créditos
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-sm font-medium uppercase tracking-wide opacity-80">
              Materias Completadas
            </h3>
            <p className="text-5xl font-bold mt-3">{progreso.materiasAprobadas}</p>
            <p className="text-sm mt-2 opacity-80">
              de {progreso.totalMaterias} materias
            </p>
          </div>
        </div>
      )}

      {/* Desglose de Materias */}
      {progreso && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Estado de Materias</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700 font-medium">Aprobadas</span>
                <span className="text-2xl font-bold text-green-600">
                  {progreso.materiasAprobadas}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-gray-700 font-medium">Reprobadas</span>
                <span className="text-2xl font-bold text-red-600">
                  {progreso.materiasReprobadas}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700 font-medium">Cursando</span>
                <span className="text-2xl font-bold text-blue-600">
                  {progreso.materiasCursando}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700 font-medium">Pendientes</span>
                <span className="text-2xl font-bold text-gray-600">
                  {progreso.materiasPendientes}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Progreso de Créditos</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Créditos Completados</span>
                  <span>{progreso.creditosAprobados} / {progreso.creditosTotales}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${progreso.porcentajeCreditos}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {progreso.porcentajeCreditos}% completado
                </p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600 mb-2">Información Adicional</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex justify-between">
                    <span>Total de materias:</span>
                    <span className="font-medium">{progreso.totalMaterias}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Créditos totales:</span>
                    <span className="font-medium">{progreso.creditosTotales}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Duración:</span>
                    <span className="font-medium">16 trimestres (4 años)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Historial de Notas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-bold text-gray-800">Historial de Notas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Materia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Créditos
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Nota
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {materiasConNota.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No tienes materias con notas registradas
                  </td>
                </tr>
              ) : (
                materiasConNota.map((mc) => (
                  <tr key={mc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {mc.materia.nombre}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {mc.materia.codigo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {mc.materia.creditos}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-lg font-bold ${
                        mc.nota! >= 90 ? 'text-green-600' :
                        mc.nota! >= 80 ? 'text-blue-600' :
                        mc.nota! >= 70 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {mc.nota}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          mc.estado === 'Aprobada'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {mc.estado}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
