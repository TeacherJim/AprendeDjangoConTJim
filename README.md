# Aprende Django con Teacher Jim

Plataforma educativa estática para aprender Django 6.0 paso a paso y construir un **portafolio profesional** publicado en GitHub Pages. **Entrega:** 19 de noviembre de 2026 a las 5:00 p. m. **Graduación:** 1 de diciembre de 2026.

> Aprende Django. Construye proyectos. Resuelve problemas reales. Documenta. Publica. Preséntate.

Sitio publicado: [teacherjim.github.io/AprendeDjangoConTJim](https://teacherjim.github.io/AprendeDjangoConTJim/index.html)

## Objetivo educativo

Los estudiantes:

1. Aprenden Django desde cero (herramientas, entorno, vistas, URLs, templates).
2. Construyen mini-proyectos y proyectos guiados (To-Do, Notes, Calculadora, CRM, Blog).
3. Resuelven problemas reales (HelpDesk, Dashboard).
4. Publican un portafolio estático en GitHub Pages con evidencia profesional.

**Importante:** este portal es estático (HTML/CSS/JS). Enseña a crear proyectos Django en la computadora del estudiante. GitHub Pages **no** ejecuta Django.

## Ruta de Portafolio Profesional

| Fase | Nombre | Proyectos |
|------|--------|-----------|
| 1 | Ya sé construir con Django | To-Do + Login, Notes App, Calculadora Académica |
| 2 | Ya sé organizar información | Mini CRM, Blog con Admin |
| 3 | Ya puedo resolver problemas reales | HelpDesk, Dashboard de Datos |
| 4 | Ya puedo presentarme profesionalmente | Portafolio GitHub Pages, Documentación y Demo |

Calendario sugerido: julio (base) → noviembre (portafolio) → **19 noviembre 5:00 p. m.** (entrega) → **1 diciembre** (graduación).

Página dedicada: `ruta-portafolio.html`

## Tutoriales

### Base

| # | Archivo | Tema |
|---|---------|------|
| 01 | `01-instalar-vscode-python.html` | VS Code + Python |
| 02 | `02-entornos-django.html` | venv + Django 6.0 |
| 03 | `03-primera-ventana-django.html` | URL → View → Template |
| 04 | `04-todo-app-autenticacion.html` | To-Do + Login |
| 05 | `05-errores-django.html` | Diagnóstico de errores |

### Portafolio

| # | Archivo | Tema |
|---|---------|------|
| 06 | `06-notes-app-categorias.html` | Notes + categorías |
| 07 | `07-calculadora-academica.html` | Calculadora de promedios |
| 08 | `08-directorio-contactos-mini-crm.html` | Mini CRM |
| 09 | `09-blog-profesional-admin.html` | Blog + Django Admin |
| 10 | `10-helpdesk-tickets.html` | Sistema de tickets |
| 11 | `11-dashboard-datos.html` | Dashboard + Chart.js |
| 12 | `12-portafolio-github-pages.html` | Portafolio estático |
| 13 | `13-documentacion-demo-final.html` | README + demo final |

## Características

- 13 tutoriales con código real y verificable
- Ruta de portafolio por 4 fases
- Modo claro / oscuro
- Progreso en `localStorage`
- Bloques de código estilo VS Code + copiar
- Filtros y búsqueda
- Responsive y accesible
- Compatible con GitHub Pages (Project Pages)

## Estructura

```text
/
├── index.html
├── ruta-portafolio.html
├── 404.html
├── tutoriales/          # 01–13
├── assets/
│   ├── css/             # styles, tutorial, roadmap, cards, syntax
│   ├── js/              # theme, progress, search, roadmap-filter
│   ├── img/             # SVG originales + CREDITS.md
│   ├── icons/projects/  # iconos SVG de proyectos
│   └── vendor/prism/
└── scripts/check_links.py
```

## Probar localmente

```powershell
cd "ruta\al\proyecto"
python -m http.server 8000
```

Abre: http://localhost:8000

## Validar enlaces

```powershell
python scripts/check_links.py
```

## Publicar en GitHub Pages

1. Push a `main` en [TeacherJim/AprendeDjangoConTJim](https://github.com/TeacherJim/AprendeDjangoConTJim)
2. Settings → Pages → Deploy from a branch → `main` / root
3. URL: `https://teacherjim.github.io/AprendeDjangoConTJim/`

El archivo `.nojekyll` evita el procesamiento Jekyll.

## Notas para docentes

- Prioriza function-based views, SQLite y Django Admin.
- No exijas Docker, DRF, Postgres ni deploy Django para graduación.
- El producto final evaluable es el **portafolio estático** + repos + README + demo.
- Cada tutorial incluye sección "Qué subir a tu portafolio" y checklist.

## Licencias y créditos

Ver `assets/img/CREDITS.md`.

- Contenido educativo: uso libre dentro del repositorio.
- Prism.js — MIT
- Fuentes Inter y JetBrains Mono — OFL

## Créditos

Creado como plataforma educativa **Aprende Django con Teacher Jim**.

Construido para aprender haciendo.
