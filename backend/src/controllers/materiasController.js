import prisma from '../lib/prisma.js';

export const obtenerTodasMaterias = async (req, res) => {
  try {
    const materias = await prisma.materia.findMany({
      orderBy: [
        { trimestre: 'asc' },
        { codigo: 'asc' }
      ]
    });

    res.json(materias);
  } catch (error) {
    console.error('Error al obtener materias:', error);
    res.status(500).json({ error: 'Error al obtener materias' });
  }
};

export const obtenerMateriaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const materia = await prisma.materia.findUnique({
      where: { id: parseInt(id) }
    });

    if (!materia) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    res.json(materia);
  } catch (error) {
    console.error('Error al obtener materia:', error);
    res.status(500).json({ error: 'Error al obtener materia' });
  }
};

export const obtenerMateriasPorTrimestre = async (req, res) => {
  try {
    const { trimestre } = req.params;

    const materias = await prisma.materia.findMany({
      where: { trimestre: parseInt(trimestre) },
      orderBy: { codigo: 'asc' }
    });

    res.json(materias);
  } catch (error) {
    console.error('Error al obtener materias del trimestre:', error);
    res.status(500).json({ error: 'Error al obtener materias del trimestre' });
  }
};

export const verificarPrerrequisitos = async (req, res) => {
  try {
    const { materiaId } = req.params;
    const usuarioId = req.userId;

    const materia = await prisma.materia.findUnique({
      where: { id: parseInt(materiaId) }
    });

    if (!materia) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    // Si no tiene prerrequisitos o es BR (sin requisito)
    if (!materia.prerrequisitos || materia.prerrequisitos === 'BR') {
      return res.json({
        puedeInscribir: true,
        mensaje: 'No requiere prerrequisitos'
      });
    }

    // Obtener materias aprobadas del usuario
    const materiasAprobadas = await prisma.materiaCursada.findMany({
      where: {
        usuarioId,
        estado: 'Aprobada'
      },
      include: {
        materia: true
      }
    });

    const codigosAprobados = materiasAprobadas.map(mc => mc.materia.codigo);

    // Verificar si tiene todos los prerrequisitos
    const prerrequisitosArray = materia.prerrequisitos.split(',').map(p => p.trim());
    const faltantes = prerrequisitosArray.filter(prereq => !codigosAprobados.includes(prereq));

    if (faltantes.length > 0) {
      return res.json({
        puedeInscribir: false,
        mensaje: `Faltan prerrequisitos: ${faltantes.join(', ')}`,
        prerrequisitos: prerrequisitosArray,
        faltantes
      });
    }

    res.json({
      puedeInscribir: true,
      mensaje: 'Cumple con todos los prerrequisitos',
      prerrequisitos: prerrequisitosArray
    });
  } catch (error) {
    console.error('Error al verificar prerrequisitos:', error);
    res.status(500).json({ error: 'Error al verificar prerrequisitos' });
  }
};

export const obtenerMateriasDisponibles = async (req, res) => {
  try {
    const usuarioId = req.userId;

    // Obtener todas las materias
    const todasMaterias = await prisma.materia.findMany({
      where: { esEspecial: false } // Excluir Servicio Social, Pasantía, etc.
    });

    // Obtener materias cursadas del usuario
    const materiasCursadas = await prisma.materiaCursada.findMany({
      where: { usuarioId },
      include: { materia: true }
    });

    const materiasAprobadas = materiasCursadas
      .filter(mc => mc.estado === 'Aprobada')
      .map(mc => mc.materia.codigo);

    const materiasCursadasIds = materiasCursadas.map(mc => mc.materiaId);

    // Filtrar materias disponibles
    const materiasDisponibles = todasMaterias.filter(materia => {
      // Ya cursada o cursando
      if (materiasCursadasIds.includes(materia.id)) return false;

      // Sin prerrequisitos
      if (!materia.prerrequisitos || materia.prerrequisitos === 'BR') return true;

      // Verificar prerrequisitos
      const prerrequisitosArray = materia.prerrequisitos.split(',').map(p => p.trim());
      return prerrequisitosArray.every(prereq => materiasAprobadas.includes(prereq));
    });

    res.json(materiasDisponibles);
  } catch (error) {
    console.error('Error al obtener materias disponibles:', error);
    res.status(500).json({ error: 'Error al obtener materias disponibles' });
  }
};

export const obtenerProgreso = async (req, res) => {
  try {
    const usuarioId = req.userId;

    const materiasCursadas = await prisma.materiaCursada.findMany({
      where: { usuarioId },
      include: { materia: true }
    });

    const todasMaterias = await prisma.materia.findMany({
      where: { esEspecial: false }
    });

    const creditosTotales = todasMaterias.reduce((sum, m) => sum + m.creditos, 0);

    const creditosAprobados = materiasCursadas
      .filter(mc => mc.estado === 'Aprobada')
      .reduce((sum, mc) => sum + mc.materia.creditos, 0);

    const materiasAprobadas = materiasCursadas.filter(mc => mc.estado === 'Aprobada').length;
    const materiasReprobadas = materiasCursadas.filter(mc => mc.estado === 'Reprobada').length;
    const materiasCursando = materiasCursadas.filter(mc => mc.estado === 'Cursando').length;
    const materiasPendientes = todasMaterias.length - materiasAprobadas - materiasCursando;

    // Calcular índice académico
    const materiasConNota = materiasCursadas.filter(mc => mc.nota !== null);
    const indiceAcademico = materiasConNota.length > 0
      ? materiasConNota.reduce((sum, mc) => sum + mc.nota, 0) / materiasConNota.length
      : 0;

    res.json({
      creditosTotales,
      creditosAprobados,
      porcentajeCreditos: (creditosAprobados / creditosTotales * 100).toFixed(2),
      materiasAprobadas,
      materiasReprobadas,
      materiasCursando,
      materiasPendientes,
      indiceAcademico: indiceAcademico.toFixed(2),
      totalMaterias: todasMaterias.length
    });
  } catch (error) {
    console.error('Error al obtener progreso:', error);
    res.status(500).json({ error: 'Error al obtener progreso' });
  }
};
