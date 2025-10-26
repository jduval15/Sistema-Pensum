import { create } from 'zustand';
import { Materia, MateriaCursada, Progreso } from '../types';
import api from '../services/api';

interface MateriasState {
  materias: Materia[];
  materiasDisponibles: Materia[];
  materiasCursadas: MateriaCursada[];
  progreso: Progreso | null;
  loading: boolean;
  error: string | null;
  fetchMaterias: () => Promise<void>;
  fetchMateriasDisponibles: () => Promise<void>;
  fetchMateriasCursadas: () => Promise<void>;
  fetchProgreso: () => Promise<void>;
  inscribirMateria: (trimestreId: number, materiaId: number) => Promise<void>;
  registrarNota: (materiaCursadaId: number, nota: number) => Promise<void>;
}

export const useMateriasStore = create<MateriasState>((set, get) => ({
  materias: [],
  materiasDisponibles: [],
  materiasCursadas: [],
  progreso: null,
  loading: false,
  error: null,

  fetchMaterias: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get<Materia[]>('/materias');
      set({ materias: response.data, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Error al cargar materias',
        loading: false
      });
    }
  },

  fetchMateriasDisponibles: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get<Materia[]>('/materias/disponibles');
      set({ materiasDisponibles: response.data, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Error al cargar materias disponibles',
        loading: false
      });
    }
  },

  fetchMateriasCursadas: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get<MateriaCursada[]>('/trimestres/materias-cursadas');
      set({ materiasCursadas: response.data, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Error al cargar materias cursadas',
        loading: false
      });
    }
  },

  fetchProgreso: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get<Progreso>('/materias/progreso');
      set({ progreso: response.data, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Error al cargar progreso',
        loading: false
      });
    }
  },

  inscribirMateria: async (trimestreId, materiaId) => {
    try {
      set({ loading: true, error: null });
      await api.post('/trimestres/inscribir', { trimestreId, materiaId });
      // Recargar datos
      await get().fetchMateriasCursadas();
      await get().fetchMateriasDisponibles();
      await get().fetchProgreso();
      set({ loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Error al inscribir materia',
        loading: false
      });
      throw error;
    }
  },

  registrarNota: async (materiaCursadaId, nota) => {
    try {
      set({ loading: true, error: null });
      await api.post('/notas', { materiaCursadaId, nota });
      // Recargar datos
      await get().fetchMateriasCursadas();
      await get().fetchProgreso();
      set({ loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Error al registrar nota',
        loading: false
      });
      throw error;
    }
  }
}));
