/* =========================================================
   1. CORAZONES FLOTANTES DE FONDO
   ========================================================= */
const heartsLayer = document.getElementById('heartsLayer');

function spawnHeart(){
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.textContent = Math.random() > 0.5 ? '❤' : '♡';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
  heart.style.fontSize = (0.9 + Math.random() * 1.2) + 'rem';
  heart.style.animationDuration = (8 + Math.random() * 8) + 's';
  heartsLayer.appendChild(heart);
  setTimeout(() => heart.remove(), 17000);
}
// Genera un corazón nuevo cada 1.4s aprox.
setInterval(spawnHeart, 1400);
for(let i=0;i<5;i++) setTimeout(spawnHeart, i*400); // algunos al cargar


/* =========================================================
   2. CONTADOR DE DÍAS JUNTOS
   ========================================================= */
const startDate = new Date('2025-12-18T00:00:00');

function updateDayCounter(){
  const now = new Date();
  const diffMs = now - startDate;
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const counterEl = document.getElementById('dayCounter');
  if(counterEl) counterEl.textContent = days.toLocaleString('es-AR');
}
updateDayCounter();
// Se actualiza cada hora por si la persona deja la página abierta
setInterval(updateDayCounter, 1000 * 60 * 60);


/* =========================================================
   3. PANTALLA DE INTRO + VIDEO (Adaptado para iOS)
   ========================================================= */
const intro       = document.getElementById('intro');
const startBtn    = document.getElementById('startBtn');
const videoScreen = document.getElementById('videoScreen');
const introVideo  = document.getElementById('introVideo');
const videoFallback = document.getElementById('videoFallback');
const skipBtn     = document.getElementById('skipBtn');
const bgMusic     = document.getElementById('bgMusic');

let experienciaIniciada = false;

function iniciarExperiencia(e) {
  // Prevenir el comportamiento por defecto en táctiles para evitar "ghost clicks"
  if (e.type === 'touchstart') e.preventDefault();
  
  // Evitar que se ejecute dos veces si el celular dispara touch y click a la vez
  if (experienciaIniciada) return;
  experienciaIniciada = true;

  // Ocultar el recuadro para que no tape el video
  document.getElementById('introContent').classList.add('is-hidden');

  videoScreen.classList.add('active');
  
  // Intenta reproducir el video.
  introVideo.play().then(() => {
    videoFallback.style.display = 'none';
  }).catch(() => {
    videoFallback.style.display = 'flex';
  });

  introVideo.addEventListener('error', () => {
    videoFallback.style.display = 'flex';
  });

  // Iniciar la música de forma directa para sortear el bloqueo de iOS
  bgMusic.volume = 0.4; // Funciona en PC, iOS lo ignora
  bgMusic.play().then(() => {
    setMusicIcon(true);
  }).catch(() => { 
    /* el usuario podrá darle play manualmente si falla */ 
  });

  introVideo.addEventListener('ended', goToAlbum);
}

// Escuchamos ambos eventos para máxima compatibilidad
startBtn.addEventListener('click', iniciarExperiencia);
startBtn.addEventListener('touchstart', iniciarExperiencia, { passive: false });

skipBtn.addEventListener('click', goToAlbum);

function goToAlbum(){
  introVideo.pause();
  intro.classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// Bloquear scroll mientras está la intro
document.body.style.overflow = 'hidden';


/* =========================================================
  4. BOTÓN DE MÚSICA (Adaptado para iOS)
   ========================================================= */
const musicToggle = document.getElementById('musicToggle');
const iconNote  = document.getElementById('iconNote');
const iconPause = document.getElementById('iconPause');

function setMusicIcon(isPlaying){
  iconNote.style.display  = isPlaying ? 'none' : 'block';
  iconPause.style.display = isPlaying ? 'block' : 'none';
}

function toggleMusic(e) {
  if (e.type === 'touchstart') e.preventDefault();

  if(bgMusic.paused){
    bgMusic.play().then(() => setMusicIcon(true)).catch(()=>{});
  } else {
    bgMusic.pause();
    setMusicIcon(false);
  }
}

musicToggle.addEventListener('click', toggleMusic);
musicToggle.addEventListener('touchstart', toggleMusic, { passive: false });


/* =========================================================
   5. ANIMACIONES AL HACER SCROLL (reveal)
   ========================================================= */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

revealElements.forEach(el => revealObserver.observe(el));


/* =========================================================
   6. "365 COSAS QUE VOLVERÍA A ELEGIR DE VOS"
      Aparición progresiva + contador animado
   ========================================================= */
const notes = document.querySelectorAll('#notesGrid .note');
const notesCountEl = document.getElementById('notesCount');
let notesRevealed = 0;

const notesObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      // pequeño delay escalonado según la posición en la grilla
      const index = Array.from(notes).indexOf(el);
      setTimeout(() => {
        el.classList.add('visible');
        notesRevealed++;
        animateNotesCount();
      }, index * 90);
      notesObserver.unobserve(el);
    }
  });
}, { threshold: 0.15 });

notes.forEach(note => notesObserver.observe(note));

function animateNotesCount(){
  let current = parseInt(notesCountEl.textContent, 10) || 0;
  const target = notesRevealed;
  if(current >= target) { notesCountEl.textContent = target; return; }
  const step = () => {
    current++;
    notesCountEl.textContent = current;
    if(current < target) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}


/* =========================================================
   7. POLAROIDS — rotación inicial + LIGHTBOX
   ========================================================= */
document.querySelectorAll('.polaroid').forEach(p => {
  const rot = p.dataset.rotate || 0;
  p.style.setProperty('--r', rot + 'deg');
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, caption){
  lightboxImg.src = src;
  lightboxCaption.textContent = caption || '';
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Polaroids del Capítulo 3
document.querySelectorAll('.polaroid img').forEach(img => {
  img.addEventListener('click', () => {
    const caption = img.parentElement.querySelector('figcaption')?.textContent || '';
    openLightbox(img.src, caption);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if(e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeLightbox();
});


/* =========================================================
   8. LÍNEA DE TIEMPO — abrir foto + descripción en lightbox
   ========================================================= */
document.querySelectorAll('.timeline-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.dataset.img;
    const title = item.querySelector('h3')?.textContent || '';
    const desc  = item.querySelector('p')?.textContent || '';
    const date  = item.querySelector('.timeline-date')?.textContent || '';
    openLightbox(img, `${date} — ${title}: ${desc}`);
  });
});


/* =========================================================
   9. NAVEGACIÓN LATERAL — resaltar sección activa
   ========================================================= */
const sections = document.querySelectorAll('main.book section[id]');
const navDots  = document.querySelectorAll('.dots-nav .dot');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const dot = document.querySelector(`.dots-nav .dot[href="#${entry.target.id}"]`);
    if(!dot) return;
    if(entry.isIntersecting){
      navDots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => sectionObserver.observe(sec));


/* =========================================================
   10. BOTÓN "VOLVER A RECORRER EL ÁLBUM"
   ========================================================= */
const restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener('click', () => {
  document.getElementById('cover').scrollIntoView({ behavior:'smooth' });
});