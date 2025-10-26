import { useEffect, useState } from 'react';
import { useMateriasStore } from '../store/materiasStore';

export default function MisMaterias() {
  const {
    materiasCursadas,
    materiasDisponibles,
    fetchMateriasCursadas,
    fetchMateriasDisponibles,
    registrarNota,
    loading
  } = useMateriasStore();

  const [notaInput, setNotaInput] = useState<{ [key: number]: string }>({});
  const [filtro, setFiltro] = useState<'todas' | 'cursando' | 'aprobadas' | 'reprobadas'>('todas');

  useEffect(() => {
    fetchMateriasCursadas();
    fetchMateriasDisponibles();
  }, []);

  const handleRegistrarNota = async (materiaCursadaId: number) => {
    const nota = parseFloat(notaInput[materiaCursadaId]);
    if (isNaN(nota) || nota < 0 || nota > 100) {
      alert('Por favor ingresa una nota válida entre 0 y 100');
      return;
    }

    try {
      await registrarNota(materiaCursadaId, nota);
      setNotaInput({ ...notaInput, [materiaCursadaId]: '' });
      alert('Nota registrada exitosamente');
    } catch (error) {
      alert('Error al registrar la nota');
    }
  };

  const materiasFiltradas = materiasCursadas.filter((mc) => {
    if (filtro === 'todas') return true;
    if (filtro === 'cursando') return mc.estado === 'Cursando';
    if (filtro === 'aprobadas') return mc.estado === 'Aprobada';
    if (filtro === 'reprobadas') return mc.estado === 'Reprobada';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800">Mis Materias</h1>
        <p className="text-gray-600 mt-2">
          Gestiona las materias que estás cursando y registra tus calificaciones
        </p>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-blue-800 font-medium">Total</p>
          <p className="text-2xl font-bold text-blue-900">{materiasCursadas.length}</p>
        </div>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-sm text-yellow-800 font-medium">Cursando</p>
          <p className="text-2xl font-bold text-yellow-900">
            {materiasCursadas.filter(m => m.estado === 'Cursando').length}
          </p>
        </div>
        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
          <p className="text-sm text-green-800 font-medium">Aprobadas</p>
          <p className="text-2xl font-bold text-green-900">
            {materiasCursadas.filter(m => m.estado === 'Aprobada').length}
          </p>
        </div>
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded">
          <p className="text-sm text-red-800 font-medium">Reprobadas</p>
          <p className="text-2xl font-bold text-red-900">
            {materiasCursadas.filter(m => m.estado === 'Reprobada').length}
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFiltro('todas')}
            className={`px-4 py-2 rounded-md font-medium transition ${
              filtro === 'todas'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFiltro('cursando')}
            className={`px-4 py-2 rounded-md font-medium transition ${
              filtro === 'cursando'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cursando
          </button>
          <button
            onClick={() => setFiltro('aprobadas')}
            className={`px-4 py-2 rounded-md font-medium transition ${
              filtro === 'aprobadas'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Aprobadas
          </button>
          <button
            onClick={() => setFiltro('reprobadas')}
            className={`px-4 py-2 rounded-md font-medium transition ${
              filtro === 'reprobadas'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Reprobadas
          </button>
        </div>
      </div>

      {/* Lista de materias */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Materias ({materiasFiltradas.length})
          </h2>
        </div>
        <div className="divide-y">
          {materiasFiltradas.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No tienes materias en esta categoría
            </div>
          ) : (
            materiasFiltradas.map((mc) => (
              <div key={mc.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {mc.materia.nombre}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          mc.estado === 'Aprobada'
                            ? 'bg-green-100 text-green-800'
                            : mc.estado === 'Reprobada'
                            ? 'bg-red-100 text-red-800'
                            : mc.estado === 'Cursando'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {mc.estado}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {mc.materia.codigo} - {mc.materia.creditos} créditos
                    </p>
                    {mc.trimestre && (
                      <p className="text-sm text-gray-500 mt-1">
                        Trimestre {mc.trimestre.numeroTrimestre} - {mc.trimestre.periodo}
                      </p>
                    )}
                  </div>

                  <div className="text-right">
                    {mc.nota !== null ? (
                      <div>
                        <p className="text-3xl font-bold text-gray-800">{mc.nota}</p>
                        <p className="text-xs text-gray-500">Nota Final</p>
                      </div>
                    ) : mc.estado === 'Cursando' ? (
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Nota"
                          value={notaInput[mc.id] || ''}
                          onChange={(e) =>
                            setNotaInput({ ...notaInput, [mc.id]: e.target.value })
                          }
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => handleRegistrarNota(mc.id)}
                          disabled={loading}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        >
                          Registrar
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Sin nota</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Materias disponibles */}
      {materiasDisponibles.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-green-50 border-b border-green-200">
            <h2 className="text-xl font-bold text-gray-800">
              Materias Disponibles para Inscribir ({materiasDisponibles.length})
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Estas materias cumplen con los prerrequisitos necesarios
            </p>
          </div>
          <div className="divide-y max-h-96 overflow-y-auto">
            {materiasDisponibles.slice(0, 10).map((materia) => (
              <div key={materia.id} className="p-4 hover:bg-gray-50 transition">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{materia.nombre}</h3>
                    <p className="text-sm text-gray-600">
                      {materia.codigo} - Trimestre {materia.trimestre} - {materia.creditos} créditos
                    </p>
                  </div>
                  <span className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    Disponible
                  </span>
                </div>
              </div>
            ))}
            {materiasDisponibles.length > 10 && (
              <div className="p-4 text-center text-sm text-gray-500">
                ... y {materiasDisponibles.length - 10} materias más
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
