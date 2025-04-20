#docs/04_DocumentaciónTécnica


## Estructura HTML

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biblioteca</title>
    <link rel="stylesheet" href="style.css">
    <script src="script.js" type="module"></script>
    <script type="importmap">
		{
            "imports": {
                "uuid": "https://cdn.jsdelivr.net/npm/uuid@9.0.1/+esm"
            }
        }
    </script>
</head>
<body>
    <header>
        <h1>Biblioteca</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#" data-section="catalog">Catálogo</a></li>
            <li><a href="#" data-section="borrow">Préstamo</a></li>
            <li><a href="#" data-section="return">Devolución</a></li>
            <li><a href="#" data-section="manage">Gestión de Libros</a></li>
        </ul>
    </nav>
    <main id="content">
		<!-- Contenido se actualizará de forma dinámica aquí -->
    </main>
    <footer>
        <p> 2024 Biblioteca</p>
    </footer>
</body>
</html>


## CSS: Principales reglas aplicadas

Sección | Regla principal | Descripción breve

General (body) | font-family, background-color, color | Fuente clara, fondo gris claro, texto legible.

Encabezado (header) | background-color: #333, color: #fff | Fondo oscuro con texto blanco y centrado.

Navegación (nav) | list-style: none, text-align: center | Menú horizontal limpio, sin viñetas.

Enlaces (nav a) | text-decoration: none, font-weight: bold | Enlaces sin subrayado, con énfasis visual.

Contenido (main) | padding: 1em | Espaciado interno para mejor lectura.

Pie (footer) | position: fixed, bottom: 0, width: 100% | Pie siempre visible, pegado al final de la pantalla.

Secciones | margin-top: 20px | Separación entre bloques funcionales.

Formularios | display: block, padding, border-radius | Estilo limpio y accesible en entradas y botones.

Botones (button) | cursor: pointer, hover oscuro | Estética interactiva para acciones.


## JS: Explicación del código y funcionamiento

## 📅 Eventos

Evento		 | 	Descripción

DOMContentLoaded | Ejecuta la lógica cuando el DOM está completamente cargado.

Click en enlaces de <nav> | Detecta clics en la navegación para mostrar secciones dinámicamente.

Submit en formularios | Captura envíos de formularios (préstamo, devolución, gestión) y los maneja sin recargar la página.


## 🗂️ Manejo de Datos

Elemento 	| 	Descripción

books | Lista de libros disponibles con id, title, author y available.

loans | Lista de préstamos activos (bookId, user, loanDate).

Persistencia | Todos los datos se gestionan en memoria (no hay base de datos).


## ⚙️ Funciones Principales

Función	 	|	Descripción
loadSection(seccion)	Muestra dinámicamente una sección del contenido principal.

createCatalogSection()	Genera la vista del catálogo en forma de tabla.

createBorrowSection()	Crea el formulario para pedir préstamos.

createReturnSection()	Crea el formulario para devolver libros.

createManageSection()	Permite añadir y eliminar libros.

# Biblioteca

Función	 |	Descripción

borrowBook(id, user)	Marca un libro como prestado y lo añade a la lista de préstamos.

returnBook(id)	Marca un libro como disponible y elimina su préstamo.

addBook(title, author)	Crea un nuevo libro y lo añade al catálogo.

removeBook(id)	Elimina un libro del catálogo y su préstamo si existe.


## Flujo de Interacción


[Usuario]
   ↓
[index.html]
   ↓
<link rel="stylesheet" href="style.css">   → Aplicación de estilos visuales
<script src="script.js"></script>          → Comportamiento dinámico
   ↓
[script.js]
   ↳ Manipula el DOM (innerHTML, createElement)
   ↳ Controla lógica de préstamo/devolución/libros

   
## 🧩 Ejemplo de interacción completa

El usuario abre la aplicación (index.html).

El navegador carga los estilos (style.css) para mostrar una interfaz estética.

Al cargarse, script.js:

- Escucha eventos del usuario (clic en navegación, envío de formularios).
- Genera contenido dentro de <div id="content"> según la sección.
- Gestiona datos (libros y préstamos) y actualiza el DOM sin recargar la página.
