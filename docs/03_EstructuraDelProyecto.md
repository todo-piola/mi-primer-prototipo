# docs/03_EstructuraDelProyecto

Este documento describe cómo está organizado el proyecto de la biblioteca web, facilitando su comprensión, mantenimiento y extensión futura.

## 🗂️ Estructura de Carpetas y Archivos


biblioteca-web/
| Elemento | Descripción


| `docs/` | Carpeta que contiene la documentación del proyecto en formato Markdown.


   ├── 01_Introduccion.md | Introducción general del proyecto y sus objetivos.

   ├── `02_DiagramaCasosUso.drawio`| Descripción de los distintos casos de uso disponibles. 

   ├── `03_EstructuraProyecto.md` | Este documento (estructura del proyecto).

   ├── `04_DocumentacionTécnica.md` | Detalles sobre el código, eventos, lógica, etc.                        

   ├── `05_MejorasPropuestas.md` | Ideas y sugerencias para mejoras futuras. 

   └── `06_GuiaUsuario.md` | Guía básica de uso de la aplicación para usuarios finales.
   

| `src/` | Carpeta principal del código fuente de la aplicación web. 


   ├── `index.html` | Archivo principal HTML. Estructura base del sitio web. 

   ├── `style.css` | Hoja de estilos CSS. Define la apariencia visual de la web. 

   └── `script.js` | Lógica y comportamiento dinámico de la aplicación en JavaScript. 

| `.gitignore` | Archivo que indica qué archivos/directorios ignorar en Git. 

| `README.md` | Documento inicial con resumen y guía del proyecto. 


## 🌳 Diagrama de Árbol del Proyecto

biblioteca-web/
│

├── docs/

│   ├── 01_Introduccion.md

│   ├── 02_CasosDeUso.md

│   ├── 03_EstructuraProyecto.md

│   ├── 04_DocumentacionTécnica.md

│   ├── 05_MejorasPropuestas.md

│   └── 06_GuiaUsuario.md

│

├── src/

│   ├── index.html

│   ├── style.css

│   └── script.js

│

├── .gitignore

└── README.md


## 🔁  Flujo Principal del Proyecto

- Carga Inicial
        El navegador carga index.html, que enlaza style.css y script.js.

- Renderizado y Estilo
        El archivo style.css aplica estilos generales y responsivos.
        Se definen cabeceras, navegación, formularios y tablas visualmente.

-  Lógica Interactiva
        script.js se ejecuta al cargar el DOM (DOMContentLoaded).
        Se inicializa el contenido por defecto (catálogo de libros).
        El usuario navega entre secciones (catálogo, préstamo, devolución, gestión).

- Manipulación de Datos
        Se gestionan listas de libros y préstamos en memoria.
        Las acciones del usuario (prestar, devolver, añadir, eliminar) actualizan dinámicamente	la interfaz sin recargar la página.

 - Actualización del DOM
        Las funciones de JS generan HTML dinámico y lo insertan en <div id="content">.
