import { create } from 'zustand';
import { Trimestre } from '../types';
import api from '../services/api';

interface TrimestresState {
  trimestres: Trimestre[];
  trimestreActual: Trimestre | null;
  loading: boolean;
  error: string | null;
  fetchTrimestres: () => Promise<void>;
  fetchTrimestreActual: () => Promise<void>;
  crearTrimestre: (numeroTrimestre: number, periodo: string, fechaInicio: string, fechaFin: string) => Promise<Trimestre>;
  activarTrimestre: (trimestreId: number) => Promise<void>;
}

export const useTrimestresStore = create<TrimestresState>((set, get) => ({
  trimestres: [],
  trimestreActual: null,
  loading: false,
  error: null,

  fetchTrimestres: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get<Trimestre[]>('/trimestres');
      set({ trimestres: response.data, loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Error al cargar trimestres',
        loading: false
      });
    }
  },

  fetchTrimestreActual: async () => {
    try {
      set({ loading: true, error: null });
      const response = await api.get<Trimestre>('/trimestres/actual');
      set({ trimestreActual: response.data, loading: false });
    } catch (error: any) {
      // Si no hay trimestre activo, no es un error
      set({ trimestreActual: null, loading: false });
    }
  },

  crearTrimestre: async (numeroTrimestre, periodo, fechaInicio, fechaFin) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post<Trimestre>('/trimestres', {
        numeroTrimestre,
        periodo,
        fechaInicio,
        fechaFin
      });

      // Recargar lista de trimestres
      await get().fetchTrimestres();
      set({ loading: false });

      return response.data;
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Error al crear trimestre',
        loading: false
      });
      throw error;
    }
  },

  activarTrimestre: async (trimestreId) => {
    try {
      set({ loading: true, error: null });
      await api.patch(`/trimestres/${trimestreId}/activar`);

      // Recargar trimestre actual
      await get().fetchTrimestreActual();
      await get().fetchTrimestres();
      set({ loading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Error al activar trimestre',
        loading: false
      });
      throw error;
    }
  }
}));
