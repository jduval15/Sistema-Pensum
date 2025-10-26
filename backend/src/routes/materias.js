import express from 'express';
import {
  obtenerTodasMaterias,
  obtenerMateriaPorId,
  obtenerMateriasPorTrimestre,
  verificarPrerrequisitos,
  obtenerMateriasDisponibles,
  obtenerProgreso
} from '../controllers/materiasController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, obtenerTodasMaterias);
router.get('/disponibles', authMiddleware, obtenerMateriasDisponibles);
router.get('/progreso', authMiddleware, obtenerProgreso);
router.get('/trimestre/:trimestre', authMiddleware, obtenerMateriasPorTrimestre);
router.get('/:id', authMiddleware, obtenerMateriaPorId);
router.get('/:materiaId/verificar-prerrequisitos', authMiddleware, verificarPrerrequisitos);

export default router;
