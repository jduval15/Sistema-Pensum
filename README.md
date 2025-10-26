# Sistema de Control de Pensum

Sistema web para gestionar tu progreso académico en la Licenciatura en Informática Gerencial de la UAPA.

![CI Status](https://img.shields.io/badge/CI-passing-brightgreen)
![Code Quality](https://img.shields.io/badge/code%20quality-A-brightgreen)
![License](https://img.shields.io/badge/license-Educational-blue)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![React](https://img.shields.io/badge/react-18-blue)

---

## ¿Qué hace este sistema?

Te ayuda a:
- ✅ Ver todas las materias de tu carrera (66 materias en 16 trimestres)
- ✅ Planificar qué materias cursarás cada trimestre
- ✅ Registrar tus notas
- ✅ Calcular automáticamente tu índice académico
- ✅ Seguir tu progreso en la carrera
- ✅ Validar prerrequisitos antes de inscribir materias

---

## Instalación

### 1. Backend (Servidor)

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

### 2. Frontend (Interfaz)

```bash
cd frontend
npm install
npm run dev
```

---

## Uso

1. Abre tu navegador en: **http://localhost:3000**
2. Crea tu cuenta (registro)
3. Inicia sesión
4. ¡Empieza a usar el sistema!

---

## Funcionalidades Principales

### 📊 Dashboard
- Ve tu índice académico
- Materias aprobadas y pendientes
- Créditos completados

### 📚 Pensum Completo
- 66 materias organizadas por trimestre
- Información de créditos y prerrequisitos
- Materias optativas disponibles

### 📅 Planificar Trimestre
- Crea un trimestre (ej: Mayo-Julio 2025)
- Selecciona las materias que vas a cursar
- El sistema valida automáticamente los prerrequisitos
- Inscribe múltiples materias a la vez

### 📝 Mis Materias
- Gestiona las materias que estás cursando
- Registra tus notas
- Aprobado: nota ≥ 70 | Reprobado: nota < 70

### 📈 Progreso
- Índice académico general
- Porcentaje de avance en la carrera
- Historial completo de notas

---

## Tecnologías

- **Backend**: Node.js, Express, Prisma, SQLite
- **Frontend**: React, TypeScript, Tailwind CSS
- **Autenticación**: JWT

---

## Estructura de la Carrera

- **Total de créditos**: 197
- **Duración**: 16 trimestres (4 años)
- **Materias obligatorias**: 54
- **Materias optativas**: 12 (debes cursar 3)
- **Requisitos especiales**: Servicio Social (60 hrs) + Pasantía (240 hrs)

---

## Sistema de Calificación

- **70-100 puntos** = Aprobada ✅
- **0-69 puntos** = Reprobada ❌

El sistema calcula automáticamente el estado de cada materia.

---

## Soporte

Si tienes problemas:

1. Asegúrate de que ambos servidores estén corriendo:
   - Backend: http://localhost:3001
   - Frontend: http://localhost:3000

2. Revisa que la base de datos esté inicializada:
   ```bash
   cd backend
   npx prisma migrate dev
   npm run seed
   ```

3. Verifica las dependencias instaladas:
   ```bash
   npm install
   ```

---

## CI/CD y Workflows

Este proyecto incluye workflows automatizados de GitHub Actions:

- ✅ **CI**: Verifica que todo compile y funcione
- ✅ **Code Quality**: Revisa la calidad del código
- ✅ **Deploy**: Prepara el proyecto para producción

Ver más en: [.github/workflows/README.md](.github/workflows/README.md)

---

## Estructura del Proyecto

```
├── backend/              # API REST
│   ├── src/
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── routes/       # Rutas de la API
│   │   └── middleware/   # Autenticación
│   └── prisma/           # Base de datos
│
├── frontend/             # Interfaz React
│   └── src/
│       ├── components/   # Componentes
│       ├── pages/        # Páginas
│       ├── store/        # Estado global
│       └── services/     # API client
│
└── .github/
    └── workflows/        # CI/CD
```

---

## Licencia

Proyecto educativo 
