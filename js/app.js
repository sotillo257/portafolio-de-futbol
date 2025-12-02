// Cargar datos del jugador
async function loadPlayerData() {
    try {
        const response = await fetch('./data/player-data.json');
        const data = await response.json();
        renderPlayerData(data);
    } catch (error) {
        console.error('Error cargando datos del jugador:', error);
    }
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
    document.querySelector('.featured-video h3').textContent = featuredVideo.title;
    document.querySelector('.featured-video .video-placeholder').setAttribute('onclick', `alert('${featuredVideo.placeholder}')`);
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
    const videosHTML = videos.map(video => `
        <div class="video-card" data-category="${video.category}">
            <div class="video-thumbnail">
                <span class="play-icon">▶️</span>
            </div>
            <div class="video-info">
                <span class="video-category">${video.categoryLabel}</span>
                <h4 class="video-title">${video.title}</h4>
                <p class="video-description">${video.description}</p>
            </div>
        </div>
    `).join('');
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
            document.getElementById('videoModal').classList.add('active');
        });
    });
}

// Función para cerrar modal (global)
function closeModal() {
    document.getElementById('videoModal').classList.remove('active');
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
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.');
        e.target.reset();
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
document.addEventListener('DOMContentLoaded', () => {
    loadPlayerData();
    initSmoothScroll();
    initContactForm();
    initSkillBarsAnimation();
});

// Exportar función closeModal para uso global
window.closeModal = closeModal;
