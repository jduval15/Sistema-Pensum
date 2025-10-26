import { useEffect, useState } from 'react';
import { useMateriasStore } from '../store/materiasStore';
import { Materia } from '../types';

export default function Pensum() {
  const { materias, fetchMaterias } = useMateriasStore();
  const [trimestreSeleccionado, setTrimestreSeleccionado] = useState<number>(0);

  useEffect(() => {
    fetchMaterias();
  }, []);

  // Agrupar materias por trimestre
  const materiasPorTrimestre = materias.reduce((acc, materia) => {
    if (!materia.esOptativa && !materia.esEspecial) {
      if (!acc[materia.trimestre]) {
        acc[materia.trimestre] = [];
      }
      acc[materia.trimestre].push(materia);
    }
    return acc;
  }, {} as Record<number, Materia[]>);

  const optativas = materias.filter(m => m.esOptativa);
  const especiales = materias.filter(m => m.esEspecial);

  const trimestres = Object.keys(materiasPorTrimestre)
    .map(Number)
    .sort((a, b) => a - b);

  const materiasAMostrar = trimestreSeleccionado === 0
    ? materias.filter(m => !m.esOptativa && !m.esEspecial)
    : materiasPorTrimestre[trimestreSeleccionado] || [];

  const calcularCreditosTrimestre = (trimestre: number) => {
    return materiasPorTrimestre[trimestre]?.reduce((sum, m) => sum + m.creditos, 0) || 0;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Pensum Completo
        </h1>
        <p className="text-gray-600 mt-2">
          Licenciatura en Informática Gerencial - 197 créditos - 16 trimestres
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTrimestreSeleccionado(0)}
            className={`px-4 py-2 rounded-md font-medium transition ${
              trimestreSeleccionado === 0
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todas
          </button>
          {trimestres.map((t) => (
            <button
              key={t}
              onClick={() => setTrimestreSeleccionado(t)}
              className={`px-4 py-2 rounded-md font-medium transition ${
                trimestreSeleccionado === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Trimestre {t}
            </button>
          ))}
        </div>
      </div>

      {/* Materias */}
      {trimestreSeleccionado === 0 ? (
        // Vista por trimestres
        <div className="space-y-6">
          {trimestres.map((t) => (
            <div key={t} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-blue-600 text-white px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">
                    Trimestre {t}
                    {t === 1 && ' (Primer Trimestre)'}
                    {t === 2 && ' (Segundo Trimestre)'}
                    {t === 3 && ' (Tercer Trimestre)'}
                  </h2>
                  <span className="text-sm">
                    {calcularCreditosTrimestre(t)} créditos
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="grid gap-4">
                  {materiasPorTrimestre[t].map((materia) => (
                    <div key={materia.id} className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">{materia.nombre}</h3>
                          <p className="text-sm text-gray-600">{materia.codigo}</p>
                          {materia.prerrequisitos && materia.prerrequisitos !== 'BR' && (
                            <p className="text-xs text-gray-500 mt-1">
                              Prerrequisitos: {materia.prerrequisitos}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-700">
                            {materia.creditos} {materia.creditos === 1 ? 'crédito' : 'créditos'}
                          </span>
                          <p className="text-xs text-gray-500">
                            HT: {materia.ht} | HP: {materia.hp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Optativas */}
          {optativas.length > 0 && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-purple-600 text-white px-6 py-4">
                <h2 className="text-xl font-bold">Materias Optativas</h2>
                <p className="text-sm mt-1">Debes cursar 3 optativas (mínimo 9 créditos)</p>
              </div>
              <div className="p-6">
                <div className="grid gap-4">
                  {optativas.map((materia) => (
                    <div key={materia.id} className="border-l-4 border-purple-500 pl-4 py-2 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">{materia.nombre}</h3>
                          <p className="text-sm text-gray-600">{materia.codigo}</p>
                          {materia.prerrequisitos && materia.prerrequisitos !== 'BR' && (
                            <p className="text-xs text-gray-500 mt-1">
                              Prerrequisitos: {materia.prerrequisitos}
                            </p>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {materia.creditos} créditos
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Especiales */}
          {especiales.length > 0 && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-orange-600 text-white px-6 py-4">
                <h2 className="text-xl font-bold">Requisitos Especiales</h2>
              </div>
              <div className="p-6">
                <div className="grid gap-4">
                  {especiales.map((materia) => (
                    <div key={materia.id} className="border-l-4 border-orange-500 pl-4 py-2 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-800">{materia.nombre}</h3>
                          <p className="text-sm text-gray-600">{materia.codigo}</p>
                          {materia.codigo === 'SSU-001' && (
                            <p className="text-xs text-gray-500 mt-1">
                              Requisito: 6º trimestre aprobado - 60 horas
                            </p>
                          )}
                          {materia.codigo === 'PAI-400' && (
                            <p className="text-xs text-gray-500 mt-1">
                              Requisito: 13º trimestre aprobado - 240 horas
                            </p>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {materia.creditos} créditos
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Vista de un trimestre específico
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Trimestre {trimestreSeleccionado} - {calcularCreditosTrimestre(trimestreSeleccionado)} créditos
          </h2>
          <div className="grid gap-4">
            {materiasAMostrar.map((materia) => (
              <div key={materia.id} className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg">{materia.nombre}</h3>
                    <p className="text-sm text-gray-600 mt-1">{materia.codigo}</p>
                    {materia.prerrequisitos && materia.prerrequisitos !== 'BR' && (
                      <p className="text-sm text-gray-500 mt-2">
                        <span className="font-medium">Prerrequisitos:</span> {materia.prerrequisitos}
                      </p>
                    )}
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                      <span>HT: {materia.ht}</span>
                      <span>HP: {materia.hp}</span>
                      <span>HIT: {materia.hit}</span>
                      <span>HEI: {materia.hei}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600">
                      {materia.creditos}
                    </span>
                    <p className="text-xs text-gray-500">créditos</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
