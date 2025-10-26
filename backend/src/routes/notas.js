import express from 'express';
import {
  registrarNota,
  actualizarNota,
  obtenerNotasPorTrimestre,
  obtenerHistorialNotas
} from '../controllers/notasController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, registrarNota);
router.put('/:id', authMiddleware, actualizarNota);
router.get('/trimestre/:trimestreId', authMiddleware, obtenerNotasPorTrimestre);
router.get('/historial', authMiddleware, obtenerHistorialNotas);

export default router;
