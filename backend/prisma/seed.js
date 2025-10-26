import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const materias = [
  // PRIMER TRIMESTRE
  { codigo: 'CBC-101', nombre: 'Taller de Orientación Universitaria', ht: 0, hp: 0, hit: 0, hei: 0, creditos: 0, trimestre: 1, prerrequisitos: 'BR', esOptativa: false, esEspecial: false },
  { codigo: 'CBC-102', nombre: 'Introducción a la Educación a Distancia', ht: 3, hp: 0, hit: 18, hei: 72, creditos: 3, trimestre: 1, prerrequisitos: 'BR', esOptativa: false, esEspecial: false },
  { codigo: 'CBE-103', nombre: 'Español I', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 1, prerrequisitos: 'BR', esOptativa: false, esEspecial: false },
  { codigo: 'CBC-104', nombre: 'Infotecnología para el Aprendizaje', ht: 1, hp: 4, hit: 18, hei: 72, creditos: 3, trimestre: 1, prerrequisitos: 'BR', esOptativa: false, esEspecial: false },
  { codigo: 'FGI-101', nombre: 'Propedéutico de Ingeniería', ht: 0, hp: 0, hit: 0, hei: 0, creditos: 0, trimestre: 1, prerrequisitos: 'BR', esOptativa: false, esEspecial: false },

  // SEGUNDO TRIMESTRE
  { codigo: 'CBE-105', nombre: 'Español II', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 2, prerrequisitos: 'CBE-103', esOptativa: false, esEspecial: false },
  { codigo: 'FGI-102', nombre: 'Algebra y Geometría para Ingenieros', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 2, prerrequisitos: 'BR', esOptativa: false, esEspecial: false },
  { codigo: 'FGI-103', nombre: 'Lógica Computacional', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 2, prerrequisitos: 'BR', esOptativa: false, esEspecial: false },
  { codigo: 'FGC-104', nombre: 'Filosofía General', ht: 2, hp: 0, hit: 12, hei: 48, creditos: 2, trimestre: 2, prerrequisitos: 'BR', esOptativa: false, esEspecial: false },

  // TERCER TRIMESTRE
  { codigo: 'FGC-102', nombre: 'Sociología', ht: 3, hp: 0, hit: 18, hei: 72, creditos: 3, trimestre: 3, prerrequisitos: 'BR', esOptativa: false, esEspecial: false },
  { codigo: 'FGM-102', nombre: 'Análisis Matemático I', ht: 2, hp: 6, hit: 30, hei: 120, creditos: 5, trimestre: 3, prerrequisitos: 'FGI-102', esOptativa: false, esEspecial: false },
  { codigo: 'CBC-107', nombre: 'Ser Humano y Desarrollo Sostenible', ht: 2, hp: 2, hit: 18, hei: 72, creditos: 3, trimestre: 3, prerrequisitos: 'BR', esOptativa: false, esEspecial: false },
  { codigo: 'FGI-104', nombre: 'Programación I', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 3, prerrequisitos: 'FGI-103', esOptativa: false, esEspecial: false },

  // CUARTO TRIMESTRE
  { codigo: 'FGM-103', nombre: 'Análisis Matemático II', ht: 2, hp: 6, hit: 30, hei: 120, creditos: 5, trimestre: 4, prerrequisitos: 'FGM-102', esOptativa: false, esEspecial: false },
  { codigo: 'FGI-105', nombre: 'Programación II', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 4, prerrequisitos: 'FGI-104', esOptativa: false, esEspecial: false },
  { codigo: 'FGI-106', nombre: 'Sistema de Base de Datos', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 4, prerrequisitos: 'FGI-104', esOptativa: false, esEspecial: false },

  // QUINTO TRIMESTRE
  { codigo: 'FGF-201', nombre: 'Física General', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 5, prerrequisitos: 'FGI-102', esOptativa: false, esEspecial: false },
  { codigo: 'LAF-201', nombre: 'Práctica de Física General', ht: 0, hp: 2, hit: 6, hei: 24, creditos: 1, trimestre: 5, prerrequisitos: 'FGF-201', esOptativa: false, esEspecial: false },
  { codigo: 'FGI-207', nombre: 'Programación III', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 5, prerrequisitos: 'FGI-105', esOptativa: false, esEspecial: false },
  { codigo: 'FGI-208', nombre: 'Análisis y Diseño de Sistema', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 5, prerrequisitos: 'FGI-106', esOptativa: false, esEspecial: false },

  // SEXTO TRIMESTRE
  { codigo: 'FGL-201', nombre: 'Inglés de Sistema Informático', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 6, prerrequisitos: 'BR', esOptativa: false, esEspecial: false },
  { codigo: 'ADM-101', nombre: 'Administración de Empresas I', ht: 3, hp: 2, hit: 24, hei: 96, creditos: 4, trimestre: 6, prerrequisitos: 'BR', esOptativa: false, esEspecial: false },
  { codigo: 'FGI-209', nombre: 'Electrónica Básica', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 6, prerrequisitos: 'FGF-201', esOptativa: false, esEspecial: false },
  { codigo: 'FGC-205', nombre: 'Metodología de la Investigación I', ht: 3, hp: 2, hit: 24, hei: 96, creditos: 4, trimestre: 6, prerrequisitos: 'BR', esOptativa: false, esEspecial: false },

  // SÉPTIMO TRIMESTRE
  { codigo: 'FGN-204', nombre: 'Contabilidad y Finanzas', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 7, prerrequisitos: 'FGI-102', esOptativa: false, esEspecial: false },
  { codigo: 'FGI-210', nombre: 'Arquitectura de Hardware', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 7, prerrequisitos: 'FGI-209', esOptativa: false, esEspecial: false },
  { codigo: 'FGC-206', nombre: 'Metodología de la Investigación II', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 7, prerrequisitos: 'FGC-205', esOptativa: false, esEspecial: false },

  // OCTAVO TRIMESTRE
  { codigo: 'INF-202', nombre: 'Sistema de Automatización de Oficinas', ht: 1, hp: 4, hit: 18, hei: 72, creditos: 3, trimestre: 8, prerrequisitos: 'FGI-207', esOptativa: false, esEspecial: false },
  { codigo: 'FGN-201', nombre: 'Fundamentos de Economía', ht: 3, hp: 0, hit: 18, hei: 72, creditos: 3, trimestre: 8, prerrequisitos: 'BR', esOptativa: false, esEspecial: false },
  { codigo: 'ISW-305', nombre: 'Estructura de Datos y Algoritmos', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 8, prerrequisitos: 'FGI-207', esOptativa: false, esEspecial: false },

  // NOVENO TRIMESTRE
  { codigo: 'FGM-207', nombre: 'Estadística y Probabilidades', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 9, prerrequisitos: 'FGM-103', esOptativa: false, esEspecial: false },
  { codigo: 'FGI-311', nombre: 'Teleinformática', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 9, prerrequisitos: 'FGI-210', esOptativa: false, esEspecial: false },
  { codigo: 'PSI-203', nombre: 'Gestión Humana', ht: 3, hp: 2, hit: 24, hei: 96, creditos: 4, trimestre: 9, prerrequisitos: 'ADM-101', esOptativa: false, esEspecial: false },

  // DÉCIMO TRIMESTRE
  { codigo: 'INF-303', nombre: 'Seguridad Informática', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 10, prerrequisitos: 'FGI-311', esOptativa: false, esEspecial: false },
  { codigo: 'ISW-304', nombre: 'Desarrollo de Proyectos con Software Libre', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 10, prerrequisitos: 'FGI-208', esOptativa: false, esEspecial: false },
  { codigo: 'INF-304', nombre: 'Informática Gerencial', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 10, prerrequisitos: 'INF-202', esOptativa: false, esEspecial: false },

  // DÉCIMO PRIMER TRIMESTRE
  { codigo: 'INF-305', nombre: 'Sistemas Operativos', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 11, prerrequisitos: 'FGI-207', esOptativa: false, esEspecial: false },
  { codigo: 'ISW-306', nombre: 'Desarrollo de Aplicaciones Web', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 11, prerrequisitos: 'ISW-304', esOptativa: false, esEspecial: false },
  { codigo: 'INF-306', nombre: 'Administración de Sistema de Información', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 11, prerrequisitos: 'INF-304', esOptativa: false, esEspecial: false },

  // DÉCIMO SEGUNDO TRIMESTRE
  { codigo: 'ADM-311', nombre: 'Administración Estratégica I', ht: 3, hp: 2, hit: 24, hei: 96, creditos: 4, trimestre: 12, prerrequisitos: 'INF-306', esOptativa: false, esEspecial: false },
  { codigo: 'ISW-307', nombre: 'Programación de Dispositivos Móviles', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 12, prerrequisitos: 'ISW-306', esOptativa: false, esEspecial: false },
  { codigo: 'INF-307', nombre: 'Gestión de Conocimiento y la Toma de Decisiones', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 12, prerrequisitos: 'INF-304', esOptativa: false, esEspecial: false },

  // DÉCIMO TERCER TRIMESTRE
  { codigo: 'INF-408', nombre: 'Investigación de Operaciones', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 13, prerrequisitos: 'FGM-207', esOptativa: false, esEspecial: false },
  { codigo: 'INF-409', nombre: 'Formación de Empresa de Base Tecnológica', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 13, prerrequisitos: 'INF-306', esOptativa: false, esEspecial: false },
  { codigo: 'MER-415', nombre: 'Marketing Digital', ht: 2, hp: 2, hit: 18, hei: 72, creditos: 3, trimestre: 13, prerrequisitos: 'ISW-306', esOptativa: false, esEspecial: false },

  // DÉCIMO CUARTO TRIMESTRE
  { codigo: 'ISW-410', nombre: 'Seminario de Proyecto I', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 14, prerrequisitos: 'ISW-306', esOptativa: false, esEspecial: false },
  { codigo: 'FGC-409', nombre: 'Ética Profesional', ht: 3, hp: 0, hit: 18, hei: 72, creditos: 3, trimestre: 14, prerrequisitos: 'BR', esOptativa: false, esEspecial: false },
  { codigo: 'ISW-412', nombre: 'Minería de Datos', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 14, prerrequisitos: 'INF-307', esOptativa: false, esEspecial: false },

  // DÉCIMO QUINTO TRIMESTRE
  { codigo: 'PSI-310', nombre: 'Coaching Organizacional', ht: 2, hp: 2, hit: 18, hei: 72, creditos: 3, trimestre: 15, prerrequisitos: 'PSI-203', esOptativa: false, esEspecial: false },
  { codigo: 'FGI-412', nombre: 'Ciencia, Tecnología y Sociedad', ht: 1, hp: 4, hit: 18, hei: 72, creditos: 3, trimestre: 15, prerrequisitos: 'FGI-207', esOptativa: false, esEspecial: false },
  { codigo: 'ISW-413', nombre: 'Simulación Digital', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 15, prerrequisitos: 'INF-408', esOptativa: false, esEspecial: false },

  // DÉCIMO SEXTO TRIMESTRE
  { codigo: 'CFI-500', nombre: 'Curso Final de Grado', ht: 2, hp: 8, hit: 36, hei: 144, creditos: 6, trimestre: 16, prerrequisitos: null, esOptativa: false, esEspecial: false },

  // ASIGNATURAS OPTATIVAS
  { codigo: 'ADM-314', nombre: 'Liderazgo y Gestión de Equipo', ht: 2, hp: 2, hit: 18, hei: 72, creditos: 3, trimestre: 0, prerrequisitos: 'INF-303', esOptativa: true, esEspecial: false },
  { codigo: 'ISW-203', nombre: 'Calidad de Software', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 0, prerrequisitos: 'FGI-207', esOptativa: true, esEspecial: false },
  { codigo: 'ADM-315', nombre: 'Administración Estratégica II', ht: 2, hp: 4, hit: 24, hei: 96, creditos: 4, trimestre: 0, prerrequisitos: 'ADM-311', esOptativa: true, esEspecial: false },
  { codigo: 'ISW-308', nombre: 'Gráficos por Computadoras', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 0, prerrequisitos: 'FGI-207', esOptativa: true, esEspecial: false },
  { codigo: 'ISW-309', nombre: 'Inteligencia Artificial', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 0, prerrequisitos: 'FGI-210', esOptativa: true, esEspecial: false },
  { codigo: 'ADM-203', nombre: 'Teoría y Estructura Organizacional', ht: 2, hp: 2, hit: 18, hei: 72, creditos: 3, trimestre: 0, prerrequisitos: 'PSI-203', esOptativa: true, esEspecial: false },
  { codigo: 'ISW-411', nombre: 'Seminario de Proyecto II', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 0, prerrequisitos: 'ISW-410', esOptativa: true, esEspecial: false },
  { codigo: 'ISW-201', nombre: 'Ingeniería en Software I', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 0, prerrequisitos: 'FGI-208', esOptativa: true, esEspecial: false },
  { codigo: 'ISW-202', nombre: 'Ingeniería en Software II', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 0, prerrequisitos: 'ISW-201', esOptativa: true, esEspecial: false },
  { codigo: 'ADM-309', nombre: 'Formulación de Proyectos Emprendedores', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 0, prerrequisitos: 'BR', esOptativa: true, esEspecial: false },
  { codigo: 'ADM-420', nombre: 'Simulación de Negocios', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 0, prerrequisitos: 'BR', esOptativa: true, esEspecial: false },
  { codigo: 'MER-421', nombre: 'Simulación de Marketing', ht: 1, hp: 6, hit: 24, hei: 96, creditos: 4, trimestre: 0, prerrequisitos: 'BR', esOptativa: true, esEspecial: false },

  // REQUISITOS ESPECIALES
  { codigo: 'SSU-001', nombre: 'Servicio Social Universitario', ht: 0, hp: 0, hit: 0, hei: 60, creditos: 0, trimestre: 0, prerrequisitos: null, esOptativa: false, esEspecial: true },
  { codigo: 'PAI-400', nombre: 'Pasantía', ht: 0, hp: 0, hit: 0, hei: 240, creditos: 8, trimestre: 0, prerrequisitos: null, esOptativa: false, esEspecial: true }
];

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Limpiar datos existentes
  await prisma.materiaCursada.deleteMany();
  await prisma.trimestreUsuario.deleteMany();
  await prisma.materia.deleteMany();
  await prisma.usuario.deleteMany();

  console.log('🗑️  Datos anteriores eliminados');

  // Insertar materias
  for (const materia of materias) {
    await prisma.materia.create({
      data: materia
    });
  }

  console.log(`✅ ${materias.length} materias insertadas correctamente`);
  console.log('🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
