export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  matricula?: string;
}

export interface Materia {
  id: number;
  codigo: string;
  nombre: string;
  ht: number;
  hp: number;
  hit: number;
  hei: number;
  creditos: number;
  trimestre: number;
  prerrequisitos?: string;
  esOptativa: boolean;
  esEspecial: boolean;
}

export interface Trimestre {
  id: number;
  usuarioId: number;
  numeroTrimestre: number;
  periodo: string;
  fechaInicio: string;
  fechaFin: string;
  activo: boolean;
  materiasCursadas?: MateriaCursada[];
}

export interface MateriaCursada {
  id: number;
  usuarioId: number;
  materiaId: number;
  trimestreId?: number;
  estado: 'Cursando' | 'Aprobada' | 'Reprobada' | 'Pendiente';
  nota?: number;
  materia: Materia;
  trimestre?: Trimestre;
}

export interface Progreso {
  creditosTotales: number;
  creditosAprobados: number;
  porcentajeCreditos: string;
  materiasAprobadas: number;
  materiasReprobadas: number;
  materiasCursando: number;
  materiasPendientes: number;
  indiceAcademico: string;
  totalMaterias: number;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
  message: string;
}
