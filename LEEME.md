# 6 meses con Delfi ❤️ — Guía rápida

## Cómo abrir
Descomprimí la carpeta y abrí `index.html` con doble clic (cualquier navegador).

## Qué reemplazar (todo está marcado con ✏️ EDITAR en el código)

### 1. Fotos
Las fotos actuales son de ejemplo (picsum.photos, requieren internet).
Reemplazá cada `src="https://picsum.photos/..."` en `index.html` por tus
propias imágenes. Lo más prolijo es:
- Crear las fotos dentro de `assets/images/`
- Cambiar el `src` a algo como `src="assets/images/foto1.jpg"`

### 2. Video de bienvenida
Poné tu video en `assets/video/intro.mp4`.
Si no agregás ningún video, se muestra automáticamente una animación
alternativa con un corazón y la fecha de inicio (no rompe nada).

### 3. Música de fondo
Poné tu canción en `assets/audio/musica.mp3`.
El botón ❤️/⏸️ arriba a la derecha la pone en play/pausa.
Si no hay archivo, el botón simplemente no suena (no da error visible).

### 4. Textos
Buscá los comentarios `<!-- ✏️ EDITAR ... -->` en `index.html`:
- Capítulo 1: historia de cómo se conocieron
- Capítulo 2: tarjetas de primeras salidas
- Capítulo 3: pies de foto de los polaroids
- Capítulo 4: lista de "cosas que amo de vos"
- "365 cosas que volvería a elegir de vos": agregá tantas `<li class="note">` como quieras
- Capítulo 5: línea de tiempo (fechas, títulos, descripciones, fotos)
- Capítulo 6: mensaje sobre el futuro

### 5. Fecha de inicio / contador de días
Está en `js/script.js`, línea con:
```js
const startDate = new Date('2025-12-18T00:00:00');
```
Ya está puesta con la fecha 18/12/2025. Si la cambiás, el contador
de días en la portada se recalcula solo.

### 6. Colores
Todos los colores están centralizados arriba de `css/style.css`,
dentro de `:root { ... }`. Cambiando esas variables cambia toda la web.

## Tip
Subí la carpeta completa a un hosting gratuito (Netlify, GitHub Pages,
Vercel) o compartila como ZIP para que la abra desde el celular.
