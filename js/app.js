// Variable global para almacenar los datos
let playerData = null;
let emailConfig = null;

// Cargar datos del jugador
async function loadPlayerData() {
    try {
        const response = await fetch('./data/player-data.json');
        playerData = await response.json();
        renderPlayerData(playerData);
    } catch (error) {
        console.error('Error cargando datos del jugador:', error);
    }
}

// Cargar configuración de email
async function loadEmailConfig() {
    try {
        const response = await fetch('./data/email-config.json');
        emailConfig = await response.json();
    } catch (error) {
        console.error('Error cargando configuración de email:', error);
        // Configuración por defecto si no se puede cargar
        emailConfig = {
            recipients: ['sotillo257@gmail.com'],
            formSubmitSettings: {
                successMessage: '¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.',
                errorMessage: 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.'
            }
        };
    }
}

// Extraer ID de video de YouTube de una URL
function getYouTubeVideoId(url) {
    if (!url) return null;

    // Formatos soportados:
    // https://www.youtube.com/watch?v=VIDEO_ID
    // https://youtu.be/VIDEO_ID
    // https://www.youtube.com/embed/VIDEO_ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
}

// Obtener URL de thumbnail de YouTube
function getYouTubeThumbnail(url) {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
}

// Crear iframe de YouTube
function getYouTubeEmbedUrl(url, autoplay = true) {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;

    // Parámetros para evitar el error 153 y mejorar compatibilidad
    const params = new URLSearchParams({
        rel: '0',           // No mostrar videos relacionados
        modestbranding: '1', // Menos branding de YouTube
        autoplay: autoplay ? '1' : '0',
        enablejsapi: '1',   // Habilitar API de JavaScript
        origin: window.location.origin // Especificar origen para seguridad
    });

    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

// Renderizar todos los datos en la página
function renderPlayerData(data) {
    renderHero(data);
    renderPersonalInfo(data);
    renderCareer(data);
    renderAchievements(data);
    renderSkills(data);
    renderFeaturedVideo(data);
    renderVideoCategories(data);
    renderVideos(data);
    renderFooter(data);
}

// Renderizar sección hero
function renderHero(data) {
    const { player, stats } = data;

    document.querySelector('.logo').textContent = player.logo;
    document.querySelector('.hero-image').src = player.image;
    document.querySelector('.hero h1').textContent = player.name;
    document.querySelector('.position').innerHTML = `⚡ ${player.position} | ${player.age} años`;
    document.querySelector('.tagline').textContent = `"${player.tagline}"`;

    // Renderizar estadísticas
    const statsHTML = `
        <div class="stat-box">
            <div class="number">${stats.goals}</div>
            <div class="label">Goles</div>
        </div>
        <div class="stat-box">
            <div class="number">${stats.assists}</div>
            <div class="label">Asistencias</div>
        </div>
        <div class="stat-box">
            <div class="number">${stats.matches}</div>
            <div class="label">Partidos</div>
        </div>
    `;
    document.querySelector('.stats-row').innerHTML = statsHTML;
}

// Renderizar información personal
function renderPersonalInfo(data) {
    const { personalInfo } = data;
    const infoHTML = `
        <h3>Información Personal</h3>
        <div class="info-item">
            <span>Nombre:</span>
            <strong>${personalInfo.fullName}</strong>
        </div>
        <div class="info-item">
            <span>Edad:</span>
            <strong>${personalInfo.age}</strong>
        </div>
        <div class="info-item">
            <span>Posición:</span>
            <strong>${personalInfo.position}</strong>
        </div>
        <div class="info-item">
            <span>Pierna hábil:</span>
            <strong>${personalInfo.preferredFoot}</strong>
        </div>
        <div class="info-item">
            <span>Origen:</span>
            <strong>${personalInfo.origin}</strong>
        </div>
    `;
    document.getElementById('personal-info-card').innerHTML = infoHTML;
}

// Renderizar trayectoria
function renderCareer(data) {
    const { career } = data;
    const careerHTML = `
        <h3>Trayectoria</h3>
        <div class="info-item">
            <span>Equipo Actual:</span>
            <strong>${career.currentTeam}</strong>
        </div>
        <div class="info-item">
            <span>Años jugando:</span>
            <strong>${career.yearsPlaying}</strong>
        </div>
        <div class="info-item">
            <span>Categoría:</span>
            <strong>${career.category}</strong>
        </div>
        <div class="info-item">
            <span>Dorsal:</span>
            <strong>${career.jerseyNumber}</strong>
        </div>
    `;
    document.getElementById('career-card').innerHTML = careerHTML;
}

// Renderizar logros
function renderAchievements(data) {
    const { achievements } = data;
    const achievementsHTML = `
        <h3>Logros Destacados</h3>
        ${achievements.map(achievement => `
            <div class="info-item">
                <span>${achievement.icon}</span>
                <strong>${achievement.title}</strong>
            </div>
        `).join('')}
    `;
    document.getElementById('achievements-card').innerHTML = achievementsHTML;
}

// Renderizar habilidades
function renderSkills(data) {
    const { skills } = data;
    const skillsHTML = `
        <h3>⚡ Atributos Técnicos</h3>
        ${skills.map(skill => `
            <div class="skill-bar">
                <div class="skill-name">
                    <span>${skill.name}</span>
                    <span>${skill.percentage}%</span>
                </div>
                <div class="bar-container">
                    <div class="bar-fill" style="width: ${skill.percentage}%;"></div>
                </div>
            </div>
        `).join('')}
    `;
    document.getElementById('skills-card').innerHTML = skillsHTML;
}

// Renderizar video destacado
function renderFeaturedVideo(data) {
    const { featuredVideo } = data;
    const videoContainer = document.querySelector('.featured-video .video-placeholder');

    document.querySelector('.featured-video h3').textContent = featuredVideo.title;

    if (featuredVideo.youtubeUrl) {
        const embedUrl = getYouTubeEmbedUrl(featuredVideo.youtubeUrl, false);
        if (embedUrl) {
            videoContainer.innerHTML = `
                <iframe
                    width="100%"
                    height="100%"
                    src="${embedUrl}"
                    frameborder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    loading="lazy">
                </iframe>
            `;
            videoContainer.style.cursor = 'default';
            videoContainer.removeAttribute('onclick');
        }
    } else {
        videoContainer.setAttribute('onclick', `alert('${featuredVideo.placeholder}')`);
    }
}

// Renderizar categorías de video
function renderVideoCategories(data) {
    const { videoCategories } = data;
    const categoriesHTML = videoCategories.map((cat, index) => `
        <button class="filter-btn ${index === 0 ? 'active' : ''}" data-filter="${cat.id}">${cat.label}</button>
    `).join('');
    document.querySelector('.filter-buttons').innerHTML = categoriesHTML;

    // Reactivar event listeners
    initVideoFilters();
}

// Renderizar videos
function renderVideos(data) {
    const { videos } = data;
    const videosHTML = videos.map((video, index) => {
        const thumbnail = video.youtubeUrl
            ? getYouTubeThumbnail(video.youtubeUrl)
            : (video.thumbnail || '');

        const thumbnailStyle = thumbnail
            ? `background-image: url('${thumbnail}'); background-size: cover; background-position: center;`
            : '';

        return `
            <div class="video-card" data-category="${video.category}" data-video-index="${index}">
                <div class="video-thumbnail" style="${thumbnailStyle}">
                    <span class="play-icon">▶️</span>
                </div>
                <div class="video-info">
                    <span class="video-category">${video.categoryLabel}</span>
                    <h4 class="video-title">${video.title}</h4>
                    <p class="video-description">${video.description}</p>
                </div>
            </div>
        `;
    }).join('');
    document.querySelector('.video-grid').innerHTML = videosHTML;

    // Reactivar event listeners
    initVideoModal();
}

// Renderizar footer
function renderFooter(data) {
    const { footer } = data;
    document.querySelector('footer').innerHTML = `
        <p>&copy; ${footer.copyright}</p>
        <p>${footer.location}</p>
    `;
}

// Inicializar filtros de video
function initVideoFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const videoCards = document.querySelectorAll('.video-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            videoCards.forEach(card => {
                if (filter === 'todos' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Inicializar modal de video
function initVideoModal() {
    const videoCards = document.querySelectorAll('.video-card');
    videoCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoIndex = parseInt(card.dataset.videoIndex);
            const video = playerData.videos[videoIndex];

            if (video && video.youtubeUrl) {
                openVideoModal(video.youtubeUrl);
            } else {
                alert('Video no disponible');
            }
        });
    });
}

// Abrir modal con video de YouTube
function openVideoModal(youtubeUrl) {
    const modal = document.getElementById('videoModal');
    const modalContent = modal.querySelector('.modal-content');
    const embedUrl = getYouTubeEmbedUrl(youtubeUrl, true);

    if (embedUrl) {
        // Reemplazar el contenido del modal con el iframe
        modalContent.innerHTML = `
            <button class="close-modal" onclick="closeModal()">✕</button>
            <div style="position: relative; width: 90vw; max-width: 900px; height: 0; padding-bottom: 50.625%;">
                <iframe
                    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
                    src="${embedUrl}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
            </div>
        `;

        modal.classList.add('active');
    }
}

// Función para cerrar modal (global)
function closeModal() {
    const modal = document.getElementById('videoModal');
    modal.classList.remove('active');

    // Esperar un momento antes de limpiar el contenido para permitir la animación
    setTimeout(() => {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.innerHTML = `
            <button class="close-modal" onclick="closeModal()">✕</button>
            <div class="video-placeholder" style="width: 800px; height: 450px;">
                <span>▶️</span>
            </div>
        `;
    }, 300);
}

// Smooth scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Form submission
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Obtener los datos del formulario
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        // Deshabilitar botón mientras se envía
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            // Enviar a cada destinatario configurado
            const recipients = emailConfig?.recipients || ['sotillo257@gmail.com'];

            // Usar FormSubmit.co para enviar el email
            const formSubmitUrl = `https://formsubmit.co/${recipients[0]}`;

            const formBody = new FormData();
            formBody.append('name', formData.name);
            formBody.append('email', formData.email);
            formBody.append('phone', formData.phone);
            formBody.append('message', formData.message);
            formBody.append('_subject', `Nuevo contacto de ojeador: ${formData.name}`);
            formBody.append('_template', 'table');

            // Si hay más destinatarios, agregarlos como CC
            if (recipients.length > 1) {
                formBody.append('_cc', recipients.slice(1).join(','));
            }

            const response = await fetch(formSubmitUrl, {
                method: 'POST',
                body: formBody,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const successMessage = emailConfig?.formSubmitSettings?.successMessage ||
                    '¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.';
                alert(successMessage);
                form.reset();
            } else {
                throw new Error('Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Error enviando el formulario:', error);
            const errorMessage = emailConfig?.formSubmitSettings?.errorMessage ||
                'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.';
            alert(errorMessage);
        } finally {
            // Rehabilitar botón
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// Animate skill bars on scroll
function initSkillBarsAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.bar-fill').forEach(bar => {
                    bar.style.width = bar.style.width;
                });
            }
        });
    });

    document.querySelectorAll('.profile-card').forEach(card => {
        observer.observe(card);
    });
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([
        loadPlayerData(),
        loadEmailConfig()
    ]);
    initSmoothScroll();
    initContactForm();
    initSkillBarsAnimation();
});

// Exportar función closeModal para uso global
window.closeModal = closeModal;
