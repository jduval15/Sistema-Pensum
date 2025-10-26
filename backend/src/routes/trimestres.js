import express from 'express';
import {
  crearTrimestre,
  obtenerTrimestres,
  obtenerTrimestreActual,
  activarTrimestre,
  inscribirMateria,
  obtenerMateriasCursadas
} from '../controllers/trimestresController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, crearTrimestre);
router.get('/', authMiddleware, obtenerTrimestres);
router.get('/actual', authMiddleware, obtenerTrimestreActual);
router.patch('/:id/activar', authMiddleware, activarTrimestre);
router.post('/inscribir', authMiddleware, inscribirMateria);
router.get('/materias-cursadas', authMiddleware, obtenerMateriasCursadas);

export default router;
