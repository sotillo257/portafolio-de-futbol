# Portafolio de Fútbol - Michael Sotillo

Un portafolio web dinámico para mostrar las habilidades, logros y videos de un jugador de fútbol joven.

## 📁 Estructura del Proyecto

```
portafolio-de-futbol/
├── index.html          # Página principal
├── data/
│   └── player-data.json  # Datos del jugador (edita este archivo)
├── js/
│   └── app.js          # Lógica de carga dinámica
└── README.md           # Este archivo
```

## 🚀 Carga Dinámica de Información

La página ahora carga toda la información de forma dinámica desde un archivo JSON. Esto significa que puedes actualizar toda la información del jugador sin tocar el código HTML.

## ✏️ Cómo Actualizar la Información

### 1. Editar Información Personal

Abre el archivo `data/player-data.json` y modifica los valores:

```json
{
  "player": {
    "name": "Michael Sotillo",
    "age": 10,
    "position": "Delantero",
    ...
  }
}
```

### 2. Actualizar Estadísticas

En el mismo archivo, busca la sección `stats`:

```json
"stats": {
  "goals": "25+",
  "assists": "15+",
  "matches": "50+"
}
```

### 3. Agregar o Modificar Habilidades

En la sección `skills`, puedes agregar nuevas habilidades o modificar las existentes:

```json
"skills": [
  {
    "name": "Velocidad",
    "percentage": 90
  },
  {
    "name": "Nueva Habilidad",
    "percentage": 85
  }
]
```

### 4. Agregar Videos de YouTube

Para agregar nuevos videos a la galería, necesitas el URL del video de YouTube:

```json
"videos": [
  {
    "category": "goles",           // goles, asistencias, regates, jugadas
    "categoryLabel": "Gol",
    "title": "Título del video",
    "description": "Descripción del video",
    "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
    "thumbnail": ""                // Opcional: se genera automáticamente desde YouTube
  }
]
```

**Formatos de URL de YouTube aceptados:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`

**Pasos para agregar un video:**
1. Sube tu video a YouTube
2. Copia el URL del video
3. Pégalo en el campo `youtubeUrl` del archivo JSON
4. El thumbnail se cargará automáticamente
5. Al hacer clic en el video, se reproducirá en el modal

### 5. Video Destacado

Para cambiar el video destacado de la portada:

```json
"featuredVideo": {
  "title": "⭐ Video Destacado",
  "placeholder": "Mensaje si no hay video",
  "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

Si agregas un `youtubeUrl`, el video se mostrará directamente en la página principal.

### 6. Modificar Logros

Actualiza o agrega logros en la sección `achievements`:

```json
"achievements": [
  {
    "icon": "🏆",
    "title": "Nuevo logro alcanzado"
  }
]
```

## 📝 Categorías de Videos Disponibles

- `goles` - Para videos de goles
- `asistencias` - Para videos de asistencias
- `regates` - Para videos de regates y dribles
- `jugadas` - Para jugadas completas

## 🎥 Videos de YouTube - Guía Completa

### Cómo Obtener el URL de un Video de YouTube

1. Ve a YouTube y abre el video que quieres agregar
2. Haz clic en el botón "Compartir" debajo del video
3. Copia el enlace que aparece (por ejemplo: `https://youtu.be/abc123`)
4. Pégalo en el campo `youtubeUrl` de tu video en el JSON

### Ejemplo Completo

```json
"videos": [
  {
    "category": "goles",
    "categoryLabel": "Gol",
    "title": "Golazo contra el equipo rival",
    "description": "Gol anotado en el minuto 45 del partido final",
    "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "thumbnail": ""
  }
]
```

### Características

- **Thumbnails Automáticos**: Las miniaturas de los videos se cargan automáticamente desde YouTube
- **Reproducción en Modal**: Al hacer clic en un video, se abre en un modal con el reproductor de YouTube
- **Video Destacado**: Puedes mostrar un video directamente en la portada
- **Responsive**: Los videos se adaptan a cualquier tamaño de pantalla

### Consejos

- Asegúrate de que tus videos sean públicos o no listados en YouTube
- Usa títulos descriptivos para tus videos
- Organiza tus videos por categorías para facilitar la navegación
- El video destacado es ideal para tu mejor jugada

## 🎨 Personalización

### Cambiar Colores

Los colores principales están definidos en el CSS dentro de `index.html`:
- `#1976D2` - Azul
- `#2E7D32` - Verde
- `#FDD835` - Amarillo/Dorado

### Agregar Más Categorías de Video

1. Agrega la nueva categoría en `videoCategories`:
```json
"videoCategories": [
  ...
  { "id": "entrenamientos", "label": "Entrenamientos" }
]
```

2. Usa ese ID en la propiedad `category` de tus videos.

## 🌐 Cómo Ver el Sitio

1. Abre el archivo `index.html` directamente en tu navegador
2. O usa un servidor local:
   ```bash
   # Con Python 3
   python -m http.server 8000

   # Con Node.js (si tienes http-server instalado)
   npx http-server
   ```

3. Navega a `http://localhost:8000`

## 📱 Responsive

El sitio es completamente responsive y se adapta a móviles, tablets y escritorio.

## 🔄 Actualizaciones Futuras

Para actualizar la información:
1. Edita el archivo `data/player-data.json`
2. Guarda los cambios
3. Recarga la página en el navegador

¡No necesitas modificar ningún código HTML o JavaScript!

## 📄 Licencia

Este proyecto es de uso personal para Michael Sotillo.
