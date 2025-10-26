import prisma from '../lib/prisma.js';

export const crearTrimestre = async (req, res) => {
  try {
    const { numeroTrimestre, periodo, fechaInicio, fechaFin } = req.body;
    const usuarioId = req.userId;

    // Validaciones
    if (!numeroTrimestre || !periodo || !fechaInicio || !fechaFin) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Verificar si ya existe
    const trimestreExistente = await prisma.trimestreUsuario.findUnique({
      where: {
        usuarioId_numeroTrimestre: {
          usuarioId,
          numeroTrimestre: parseInt(numeroTrimestre)
        }
      }
    });

    if (trimestreExistente) {
      return res.status(400).json({ error: 'Este trimestre ya existe' });
    }

    const trimestre = await prisma.trimestreUsuario.create({
      data: {
        usuarioId,
        numeroTrimestre: parseInt(numeroTrimestre),
        periodo,
        fechaInicio: new Date(fechaInicio),
        fechaFin: new Date(fechaFin)
      }
    });

    res.status(201).json(trimestre);
  } catch (error) {
    console.error('Error al crear trimestre:', error);
    res.status(500).json({ error: 'Error al crear trimestre' });
  }
};

export const obtenerTrimestres = async (req, res) => {
  try {
    const usuarioId = req.userId;

    const trimestres = await prisma.trimestreUsuario.findMany({
      where: { usuarioId },
      include: {
        materiasCursadas: {
          include: {
            materia: true
          }
        }
      },
      orderBy: { numeroTrimestre: 'asc' }
    });

    res.json(trimestres);
  } catch (error) {
    console.error('Error al obtener trimestres:', error);
    res.status(500).json({ error: 'Error al obtener trimestres' });
  }
};

export const obtenerTrimestreActual = async (req, res) => {
  try {
    const usuarioId = req.userId;

    const trimestreActual = await prisma.trimestreUsuario.findFirst({
      where: {
        usuarioId,
        activo: true
      },
      include: {
        materiasCursadas: {
          include: {
            materia: true
          }
        }
      }
    });

    if (!trimestreActual) {
      return res.status(404).json({ error: 'No hay trimestre activo' });
    }

    res.json(trimestreActual);
  } catch (error) {
    console.error('Error al obtener trimestre actual:', error);
    res.status(500).json({ error: 'Error al obtener trimestre actual' });
  }
};

export const activarTrimestre = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.userId;

    // Desactivar todos los trimestres del usuario
    await prisma.trimestreUsuario.updateMany({
      where: { usuarioId },
      data: { activo: false }
    });

    // Activar el trimestre seleccionado
    const trimestre = await prisma.trimestreUsuario.update({
      where: { id: parseInt(id) },
      data: { activo: true }
    });

    res.json(trimestre);
  } catch (error) {
    console.error('Error al activar trimestre:', error);
    res.status(500).json({ error: 'Error al activar trimestre' });
  }
};

export const inscribirMateria = async (req, res) => {
  try {
    const { trimestreId, materiaId } = req.body;
    const usuarioId = req.userId;

    // Validaciones
    if (!trimestreId || !materiaId) {
      return res.status(400).json({ error: 'Trimestre y materia son requeridos' });
    }

    // Verificar que el trimestre pertenece al usuario
    const trimestre = await prisma.trimestreUsuario.findFirst({
      where: {
        id: parseInt(trimestreId),
        usuarioId
      }
    });

    if (!trimestre) {
      return res.status(404).json({ error: 'Trimestre no encontrado' });
    }

    // Verificar si ya está cursada
    const yaInscrita = await prisma.materiaCursada.findUnique({
      where: {
        usuarioId_materiaId: {
          usuarioId,
          materiaId: parseInt(materiaId)
        }
      }
    });

    if (yaInscrita) {
      return res.status(400).json({ error: 'Ya has cursado o estás cursando esta materia' });
    }

    // Inscribir materia
    const materiaCursada = await prisma.materiaCursada.create({
      data: {
        usuarioId,
        materiaId: parseInt(materiaId),
        trimestreId: parseInt(trimestreId),
        estado: 'Cursando'
      },
      include: {
        materia: true,
        trimestre: true
      }
    });

    res.status(201).json(materiaCursada);
  } catch (error) {
    console.error('Error al inscribir materia:', error);
    res.status(500).json({ error: 'Error al inscribir materia' });
  }
};

export const obtenerMateriasCursadas = async (req, res) => {
  try {
    const usuarioId = req.userId;

    const materiasCursadas = await prisma.materiaCursada.findMany({
      where: { usuarioId },
      include: {
        materia: true,
        trimestre: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(materiasCursadas);
  } catch (error) {
    console.error('Error al obtener materias cursadas:', error);
    res.status(500).json({ error: 'Error al obtener materias cursadas' });
  }
};
