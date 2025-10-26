import prisma from '../lib/prisma.js';

export const registrarNota = async (req, res) => {
  try {
    const { materiaCursadaId, nota } = req.body;
    const usuarioId = req.userId;

    // Validaciones
    if (!materiaCursadaId || nota === undefined) {
      return res.status(400).json({ error: 'MateriaCursadaId y nota son requeridos' });
    }

    if (nota < 0 || nota > 100) {
      return res.status(400).json({ error: 'La nota debe estar entre 0 y 100' });
    }

    // Verificar que la materia cursada pertenece al usuario
    const materiaCursada = await prisma.materiaCursada.findFirst({
      where: {
        id: parseInt(materiaCursadaId),
        usuarioId
      }
    });

    if (!materiaCursada) {
      return res.status(404).json({ error: 'Materia cursada no encontrada' });
    }

    // Determinar estado basado en la nota
    const estado = nota >= 70 ? 'Aprobada' : 'Reprobada';

    // Actualizar nota y estado
    const materiaActualizada = await prisma.materiaCursada.update({
      where: { id: parseInt(materiaCursadaId) },
      data: {
        nota: parseFloat(nota),
        estado
      },
      include: {
        materia: true,
        trimestre: true
      }
    });

    res.json({
      message: `Materia ${estado.toLowerCase()}`,
      materiaCursada: materiaActualizada
    });
  } catch (error) {
    console.error('Error al registrar nota:', error);
    res.status(500).json({ error: 'Error al registrar nota' });
  }
};

export const actualizarNota = async (req, res) => {
  try {
    const { id } = req.params;
    const { nota } = req.body;
    const usuarioId = req.userId;

    // Validaciones
    if (nota === undefined) {
      return res.status(400).json({ error: 'Nota es requerida' });
    }

    if (nota < 0 || nota > 100) {
      return res.status(400).json({ error: 'La nota debe estar entre 0 y 100' });
    }

    // Verificar que la materia cursada pertenece al usuario
    const materiaCursada = await prisma.materiaCursada.findFirst({
      where: {
        id: parseInt(id),
        usuarioId
      }
    });

    if (!materiaCursada) {
      return res.status(404).json({ error: 'Materia cursada no encontrada' });
    }

    // Determinar estado basado en la nota
    const estado = nota >= 70 ? 'Aprobada' : 'Reprobada';

    // Actualizar nota y estado
    const materiaActualizada = await prisma.materiaCursada.update({
      where: { id: parseInt(id) },
      data: {
        nota: parseFloat(nota),
        estado
      },
      include: {
        materia: true,
        trimestre: true
      }
    });

    res.json({
      message: 'Nota actualizada exitosamente',
      materiaCursada: materiaActualizada
    });
  } catch (error) {
    console.error('Error al actualizar nota:', error);
    res.status(500).json({ error: 'Error al actualizar nota' });
  }
};

export const obtenerNotasPorTrimestre = async (req, res) => {
  try {
    const { trimestreId } = req.params;
    const usuarioId = req.userId;

    const materiasCursadas = await prisma.materiaCursada.findMany({
      where: {
        usuarioId,
        trimestreId: parseInt(trimestreId)
      },
      include: {
        materia: true,
        trimestre: true
      },
      orderBy: {
        materia: {
          codigo: 'asc'
        }
      }
    });

    // Calcular estadísticas del trimestre
    const materiasConNota = materiasCursadas.filter(mc => mc.nota !== null);
    const promedio = materiasConNota.length > 0
      ? materiasConNota.reduce((sum, mc) => sum + mc.nota, 0) / materiasConNota.length
      : 0;

    const aprobadas = materiasConNota.filter(mc => mc.nota >= 70).length;
    const reprobadas = materiasConNota.filter(mc => mc.nota < 70).length;

    res.json({
      materias: materiasCursadas,
      estadisticas: {
        promedio: promedio.toFixed(2),
        aprobadas,
        reprobadas,
        total: materiasCursadas.length
      }
    });
  } catch (error) {
    console.error('Error al obtener notas del trimestre:', error);
    res.status(500).json({ error: 'Error al obtener notas del trimestre' });
  }
};

export const obtenerHistorialNotas = async (req, res) => {
  try {
    const usuarioId = req.userId;

    const materiasCursadas = await prisma.materiaCursada.findMany({
      where: {
        usuarioId,
        nota: { not: null }
      },
      include: {
        materia: true,
        trimestre: true
      },
      orderBy: [
        { trimestre: { numeroTrimestre: 'asc' } },
        { materia: { codigo: 'asc' } }
      ]
    });

    // Calcular estadísticas generales
    const promedio = materiasCursadas.length > 0
      ? materiasCursadas.reduce((sum, mc) => sum + mc.nota, 0) / materiasCursadas.length
      : 0;

    const aprobadas = materiasCursadas.filter(mc => mc.nota >= 70).length;
    const reprobadas = materiasCursadas.filter(mc => mc.nota < 70).length;

    res.json({
      historial: materiasCursadas,
      estadisticas: {
        indiceGeneral: promedio.toFixed(2),
        aprobadas,
        reprobadas,
        total: materiasCursadas.length
      }
    });
  } catch (error) {
    console.error('Error al obtener historial de notas:', error);
    res.status(500).json({ error: 'Error al obtener historial de notas' });
  }
};
