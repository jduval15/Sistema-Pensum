import { create } from 'zustand';
import { Usuario, AuthResponse } from '../types';
import api from '../services/api';

interface AuthState {
  usuario: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  registro: (nombre: string, apellido: string, email: string, password: string, matricula?: string) => Promise<void>;
  logout: () => void;
  loadUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  usuario: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post<AuthResponse>('/auth/login', { email, password });
      const { token, usuario } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      set({
        usuario,
        token,
        isAuthenticated: true,
        loading: false,
        error: null
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Error al iniciar sesión',
        loading: false
      });
      throw error;
    }
  },

  registro: async (nombre, apellido, email, password, matricula) => {
    try {
      set({ loading: true, error: null });
      const response = await api.post<AuthResponse>('/auth/registro', {
        nombre,
        apellido,
        email,
        password,
        matricula
      });
      const { token, usuario } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      set({
        usuario,
        token,
        isAuthenticated: true,
        loading: false,
        error: null
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.error || 'Error al registrarse',
        loading: false
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    set({
      usuario: null,
      token: null,
      isAuthenticated: false,
      error: null
    });
  },

  loadUser: () => {
    const usuarioStr = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');

    if (usuarioStr && token) {
      try {
        const usuario = JSON.parse(usuarioStr);
        set({
          usuario,
          token,
          isAuthenticated: true
        });
      } catch (error) {
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
      }
    }
  }
}));
