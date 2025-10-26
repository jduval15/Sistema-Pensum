import { useEffect, useState } from 'react';
import { useMateriasStore } from '../store/materiasStore';
import { useTrimestresStore } from '../store/trimestresStore';
import { Materia } from '../types';

export default function PlanificarTrimestre() {
  const { materiasDisponibles, fetchMateriasDisponibles, inscribirMateria } = useMateriasStore();
  const { trimestres, trimestreActual, fetchTrimestres, fetchTrimestreActual, crearTrimestre, activarTrimestre } = useTrimestresStore();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [trimestreSeleccionado, setTrimestreSeleccionado] = useState<number | null>(null);
  const [materiasSeleccionadas, setMateriasSeleccionadas] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  // Formulario de nuevo trimestre
  const [nuevoTrimestre, setNuevoTrimestre] = useState({
    numeroTrimestre: '',
    periodo: '',
    fechaInicio: '',
    fechaFin: ''
  });

  useEffect(() => {
    fetchTrimestres();
    fetchTrimestreActual();
    fetchMateriasDisponibles();
  }, []);

  const handleCrearTrimestre = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const trimestre = await crearTrimestre(
        parseInt(nuevoTrimestre.numeroTrimestre),
        nuevoTrimestre.periodo,
        nuevoTrimestre.fechaInicio,
        nuevoTrimestre.fechaFin
      );

      alert('Trimestre creado exitosamente');
      setMostrarFormulario(false);
      setTrimestreSeleccionado(trimestre.id);
      setNuevoTrimestre({
        numeroTrimestre: '',
        periodo: '',
        fechaInicio: '',
        fechaFin: ''
      });
    } catch (error) {
      alert('Error al crear trimestre');
    }
  };

  const toggleMateriaSeleccionada = (materiaId: number) => {
    if (materiasSeleccionadas.includes(materiaId)) {
      setMateriasSeleccionadas(materiasSeleccionadas.filter(id => id !== materiaId));
    } else {
      setMateriasSeleccionadas([...materiasSeleccionadas, materiaId]);
    }
  };

  const handleInscribirMaterias = async () => {
    if (!trimestreSeleccionado) {
      alert('Selecciona un trimestre primero');
      return;
    }

    if (materiasSeleccionadas.length === 0) {
      alert('Selecciona al menos una materia');
      return;
    }

    setLoading(true);
    try {
      for (const materiaId of materiasSeleccionadas) {
        await inscribirMateria(trimestreSeleccionado, materiaId);
      }

      alert(`${materiasSeleccionadas.length} materias inscritas exitosamente`);
      setMateriasSeleccionadas([]);
      fetchMateriasDisponibles();
      fetchTrimestres();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error al inscribir materias');
    }
    setLoading(false);
  };

  const handleActivarTrimestre = async (trimestreId: number) => {
    try {
      await activarTrimestre(trimestreId);
      alert('Trimestre activado exitosamente');
    } catch (error) {
      alert('Error al activar trimestre');
    }
  };

  const calcularCreditosSeleccionados = () => {
    return materiasDisponibles
      .filter(m => materiasSeleccionadas.includes(m.id))
      .reduce((sum, m) => sum + m.creditos, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Planificar Trimestre</h1>
            <p className="text-gray-600 mt-2">
              Crea un trimestre y selecciona las materias que vas a cursar
            </p>
          </div>
          <button
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            {mostrarFormulario ? 'Cancelar' : '+ Crear Trimestre'}
          </button>
        </div>
      </div>

      {/* Formulario de Nuevo Trimestre */}
      {mostrarFormulario && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Nuevo Trimestre</h2>
          <form onSubmit={handleCrearTrimestre} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Trimestre
              </label>
              <select
                required
                value={nuevoTrimestre.numeroTrimestre}
                onChange={(e) => setNuevoTrimestre({ ...nuevoTrimestre, numeroTrimestre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona...</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(n => (
                  <option key={n} value={n}>Trimestre {n}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Período
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Mayo-Julio 2025"
                value={nuevoTrimestre.periodo}
                onChange={(e) => setNuevoTrimestre({ ...nuevoTrimestre, periodo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Inicio
              </label>
              <input
                type="date"
                required
                value={nuevoTrimestre.fechaInicio}
                onChange={(e) => setNuevoTrimestre({ ...nuevoTrimestre, fechaInicio: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Fin
              </label>
              <input
                type="date"
                required
                value={nuevoTrimestre.fechaFin}
                onChange={(e) => setNuevoTrimestre({ ...nuevoTrimestre, fechaFin: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
              >
                Crear Trimestre
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mis Trimestres */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-bold text-gray-800">Mis Trimestres</h2>
        </div>
        <div className="p-6">
          {trimestres.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tienes trimestres creados. Crea uno para empezar a planificar.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trimestres.map((trimestre) => (
                <div
                  key={trimestre.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                    trimestreSeleccionado === trimestre.id
                      ? 'border-blue-500 bg-blue-50'
                      : trimestre.activo
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setTrimestreSeleccionado(trimestre.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">
                      Trimestre {trimestre.numeroTrimestre}
                    </h3>
                    {trimestre.activo && (
                      <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                        Activo
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{trimestre.periodo}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(trimestre.fechaInicio).toLocaleDateString()} - {new Date(trimestre.fechaFin).toLocaleDateString()}
                  </p>
                  <p className="text-sm font-medium text-gray-700 mt-2">
                    {trimestre.materiasCursadas?.length || 0} materias inscritas
                  </p>
                  {!trimestre.activo && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActivarTrimestre(trimestre.id);
                      }}
                      className="mt-3 w-full px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition"
                    >
                      Activar
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selección de Materias */}
      {trimestreSeleccionado && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Selecciona Materias para el Trimestre
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {materiasSeleccionadas.length} materias seleccionadas - {calcularCreditosSeleccionados()} créditos
                </p>
              </div>
              {materiasSeleccionadas.length > 0 && (
                <button
                  onClick={handleInscribirMaterias}
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium disabled:opacity-50"
                >
                  {loading ? 'Inscribiendo...' : `Inscribir ${materiasSeleccionadas.length} Materias`}
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {materiasDisponibles.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No hay materias disponibles. Esto puede ser porque:
                <ul className="mt-2 text-sm">
                  <li>• Ya has inscrito todas las materias disponibles</li>
                  <li>• No cumples los prerrequisitos de las materias restantes</li>
                </ul>
              </div>
            ) : (
              <div className="grid gap-3">
                {materiasDisponibles.map((materia) => (
                  <div
                    key={materia.id}
                    onClick={() => toggleMateriaSeleccionada(materia.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                      materiasSeleccionadas.includes(materia.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={materiasSeleccionadas.includes(materia.id)}
                            onChange={() => {}}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-800">{materia.nombre}</h3>
                            <p className="text-sm text-gray-600">{materia.codigo}</p>
                            {materia.prerrequisitos && materia.prerrequisitos !== 'BR' && (
                              <p className="text-xs text-gray-500 mt-1">
                                Prerrequisitos: {materia.prerrequisitos}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <span className="text-sm font-medium text-gray-700">
                          {materia.creditos} créditos
                        </span>
                        <p className="text-xs text-gray-500">Trimestre {materia.trimestre}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mensaje de ayuda */}
      {!trimestreSeleccionado && trimestres.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Selecciona un trimestre</strong> de la lista para ver las materias disponibles que puedes inscribir.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
