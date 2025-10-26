# GitHub Actions Workflows

Este proyecto incluye 3 workflows automatizados para CI/CD.

---

## 📋 Workflows Disponibles

### 1. **CI - Test y Build** (`ci.yml`)

**¿Cuándo se ejecuta?**
- Cada vez que haces `push` a `main` o `develop`
- Cada vez que abres un Pull Request

**¿Qué hace?**
- ✅ Verifica que el backend compile correctamente
- ✅ Verifica que el frontend compile correctamente
- ✅ Genera el cliente de Prisma
- ✅ Valida las migraciones de la base de datos
- ✅ Ejecuta tests de integración
- ✅ Verifica TypeScript sin errores

**Resultado:**
- 🟢 Verde = Todo funciona correctamente
- 🔴 Rojo = Hay errores que debes corregir

---

### 2. **Code Quality** (`code-quality.yml`)

**¿Cuándo se ejecuta?**
- Cada vez que haces `push` a `main` o `develop`
- Cada vez que abres un Pull Request

**¿Qué hace?**
- ✅ Verifica la estructura del proyecto
- ✅ Revisa que existan archivos críticos
- ✅ Cuenta líneas de código
- ✅ Audita dependencias de seguridad

**Resultado:**
- Te da un reporte de la calidad del código
- Detecta vulnerabilidades de seguridad en dependencias

---

### 3. **Deploy** (`deploy.yml`)

**¿Cuándo se ejecuta?**
- Cada vez que haces `push` a `main`
- Manualmente desde GitHub (pestaña Actions)

**¿Qué hace?**
- ✅ Verifica que el build de producción funcione
- ✅ Genera archivos listos para deployment
- ✅ Muestra información del deployment

**Resultado:**
- Confirma que el proyecto está listo para producción

---

## 🚀 Cómo Usar los Workflows

### Opción 1: Automático (Recomendado)

Los workflows se ejecutan automáticamente cuando:
1. Haces commit y push a GitHub
2. Abres un Pull Request
3. Merges cambios a `main` o `develop`

```bash
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main
```

Luego ve a: `https://github.com/tu-usuario/tu-repo/actions`

---

### Opción 2: Manual

Puedes ejecutar el workflow de Deploy manualmente:

1. Ve a tu repositorio en GitHub
2. Click en la pestaña **Actions**
3. Selecciona **Deploy**
4. Click en **Run workflow**
5. Selecciona la branch
6. Click en **Run workflow** (botón verde)

---

## 📊 Ver Resultados

### En GitHub:

1. Ve a tu repositorio
2. Click en **Actions**
3. Verás la lista de workflows ejecutándose o completados
4. Click en cualquiera para ver detalles

### Estados:

- 🟡 **Amarillo** (En progreso): El workflow está corriendo
- 🟢 **Verde** (Success): Todo pasó correctamente
- 🔴 **Rojo** (Failed): Algo falló, revisa los logs

---

## 🛠️ Configuración

### Variables de Entorno (Opcional)

Si necesitas agregar secrets (API keys, tokens, etc.):

1. Ve a tu repositorio en GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Click en **New repository secret**
4. Agrega tus secrets

Ejemplo de uso en workflow:
```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## 📝 Personalizar Workflows

### Cambiar cuándo se ejecutan:

Edita la sección `on:` en cualquier workflow:

```yaml
on:
  push:
    branches: [ main, develop, feature/* ]  # Agrega más branches
  schedule:
    - cron: '0 0 * * 0'  # Ejecuta cada domingo a medianoche
```

### Agregar más pasos:

Agrega steps en la sección `steps:`:

```yaml
- name: Mi nuevo paso
  run: |
    echo "Haciendo algo..."
    npm run mi-script
```

---

## ❓ Solución de Problemas

### El workflow falla con "npm ci"

**Solución**: Asegúrate de tener `package-lock.json` en tu repositorio

```bash
npm install
git add package-lock.json
git commit -m "chore: add package-lock.json"
git push
```

### El workflow falla en Prisma

**Solución**: Verifica que `prisma/schema.prisma` esté en el repositorio

```bash
git add backend/prisma/schema.prisma
git commit -m "chore: add prisma schema"
git push
```

### El build de TypeScript falla

**Solución**: Ejecuta localmente para ver errores:

```bash
cd frontend
npx tsc --noEmit
```

Corrige los errores y vuelve a hacer push.

---

## 📚 Recursos

- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [Prisma CI/CD](https://www.prisma.io/docs/guides/testing/continuous-integration)

---

## ✅ Checklist para Primer Uso

- [ ] Crear repositorio en GitHub
- [ ] Hacer primer commit y push
- [ ] Verificar que los workflows se ejecuten
- [ ] Revisar los resultados en la pestaña Actions
- [ ] Corregir cualquier error que aparezca
- [ ] Configurar badges en el README (opcional)

---

¡Los workflows están listos para usar! 🎉
