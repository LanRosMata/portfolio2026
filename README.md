# Allan Rosales — Portfolio Personal

Este es el repositorio del portafolio personal de **Allan Rosales**, Ingeniero en Sistemas y Desarrollador Full-Stack. El sitio está diseñado para destacar experiencia, proyectos, stack tecnológico y educación, utilizando un estilo moderno, minimalista y audaz inspirado en enfoques editoriales y de agencias (como Nixtio).

## 🚀 Tecnologías Principales

- **[Astro](https://astro.build/)**: Framework web optimizado para velocidad, generando contenido estático (SSG) de alto rendimiento.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework de CSS utility-first para construcción de UI rápida y altamente personalizable.
- **JavaScript (Vanilla)**: Para interacciones, animaciones dinámicas y menús móviles ligeros.

## ✨ Características del Diseño

- **Arquitectura de UI "Nixtio-Style"**: Alternancia entre fondos oscuros y claros con tipografía Josefin Sans a gran escala.
- **Bento Grids**: Utilizados en la sección de proyectos para mostrar contenido de manera compacta y visualmente atractiva.
- **Efectos Glassmorphism (Liquid Glass)**: Elementos UI semi-transparentes y bordes sutiles que aportan profundidad sobre fondos oscuros o difuminados.
- **Responsive Design**: Optimización total desde dispositivos móviles hasta pantallas y resoluciones extra anchas (`max-w-[1400px]`).

## 📁 Estructura del Proyecto

El proyecto sigue la convención estándar de Astro:

```text
/
├── public/
│   └── docs/          # Documentos estáticos (ej. Currículum en PDF)
├── src/
│   ├── assets/        # Imágenes e iconos procesados por Astro
│   ├── components/    # Componentes reutilizables (Hero, Navbar, Projects, etc.)
│   ├── layouts/       # Plantillas base de página (Layout principal)
│   ├── styles/        # CSS global (Tailwind, tipografías y utilidades personalizadas)
│   └── pages/         # Páginas principales del sitio (index.astro)
├── .gitignore
├── astro.config.mjs   # Configuración de Astro y Tailwind
├── package.json
└── tailwind.config.mjs
```

## 🧞 Comandos Locales

Todos los comandos se ejecutan desde la raíz del proyecto en la terminal:

| Comando | Acción |
| :--- | :--- |
| `npm install` | Instala las dependencias del proyecto. |
| `npm run dev` | Inicia el servidor local de desarrollo en `localhost:4321`. |
| `npm run build` | Compila el sitio para producción en el directorio `./dist/`. |
| `npm run preview` | Previsualiza el sitio compilado localmente antes de desplegar. |

## 🛠 Instalación y Pasos para Ejecutar

1. Clona el repositorio.
2. Asegúrate de tener **Node.js** instalado (versión 18+ recomendada).
3. Ejecuta `npm install` para instalar todas las dependencias.
4. Ejecuta `npm run dev` e ingresa en tu navegador a `http://localhost:4321`.

## 🎨 Sobre el Autor

Desarrollador por **Allan Rosales** (@arrmatamoros).
- **Email**: arrmatamoros@gmail.com
- **Sitio web**: [allanrosales.dev](https://allanrosales.dev)
