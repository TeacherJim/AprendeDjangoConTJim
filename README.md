# Aprende Django con Teacher Jim

Plataforma educativa estática para aprender Django 6.0 paso a paso, diseñada para estudiantes que están comenzando con Python y desarrollo web.

> De cero a tu primera web app con Django, paso a paso y sin saltos mágicos.

## Características

- 5 tutoriales completos con contenido real y verificable
- Proyecto guiado: aplicación To-Do con autenticación
- Centro de diagnóstico con 25 errores comunes
- Modo claro y oscuro con preferencia guardada
- Progreso del estudiante en `localStorage`
- Bloques de código estilo VS Code con copiar al portapapeles
- Syntax highlighting con Prism.js
- Diseño responsive y accesible
- Compatible con GitHub Pages (sitio estático)

## Estructura del proyecto

```text
/
├── index.html              # Landing y selector de tutoriales
├── 404.html                # Página de error
├── tutoriales/             # 5 tutoriales HTML
├── assets/
│   ├── css/                # Estilos globales y de tutorial
│   ├── js/                 # Tema, progreso, búsqueda, copiar
│   ├── img/                # Ilustraciones SVG originales
│   ├── icons/              # Favicon y marcas
│   └── vendor/prism/       # Syntax highlighting
└── scripts/
    └── check_links.py      # Validador de enlaces internos
```

## Ejecutar localmente

El sitio es estático. No necesitas Django para ver el portal educativo.

```powershell
cd "ruta\al\proyecto"
python -m http.server 8000
```

Abre en el navegador:

```text
http://localhost:8000
```

Usa un servidor local en lugar de abrir `index.html` directamente. Así las rutas y el comportamiento se comportan igual que en GitHub Pages.

## Validar enlaces

```powershell
python scripts/check_links.py
```

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `aprende-django-teacher-jim`).
2. Sube todos los archivos del proyecto a la rama `main`.
3. En el repositorio, ve a **Settings** → **Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Elige la rama `main` y la carpeta `/ (root)`.
6. Guarda y espera unos minutos.
7. Tu sitio estará disponible en:

```text
https://TU-USUARIO.github.io/NOMBRE-REPOSITORIO/
```

El archivo `.nojekyll` en la raíz evita que Jekyll procese el sitio.

### Personalizar el enlace de GitHub

En `index.html` y el footer, reemplaza el placeholder:

```text
https://github.com/TU-USUARIO/TU-REPOSITORIO
```

por la URL real de tu repositorio.

## Tutoriales incluidos

| # | Tutorial | Objetivo |
|---|----------|----------|
| 1 | Instalar VS Code y Python | Preparar el entorno de desarrollo |
| 2 | Entornos controlados + Django | Crear `.venv` e instalar Django 6.0 |
| 3 | Tu primera ventana en Django | Conectar URL, vista y template |
| 4 | Web App To-Do + Login | Proyecto completo con autenticación |
| 5 | Errores comunes | Diagnóstico y soluciones |

Los tutoriales enseñan a crear proyectos Django **en la computadora del estudiante**. Este portal no ejecuta Django; solo muestra las guías.

## Licencias

- Código y contenido del sitio: uso educativo libre dentro del repositorio.
- [Prism.js](https://prismjs.com/) — MIT License
- Fuentes [Inter](https://fonts.google.com/specimen/Inter) y [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — Open Font License
- Icono VS Code: referencia al producto de Microsoft según [brand guidelines](https://code.visualstudio.com/brand)

Ver `assets/img/CREDITS.md` para detalles de recursos visuales.

## Créditos

Creado como plataforma educativa **Aprende Django con Teacher Jim**.

Construido para aprender haciendo.
