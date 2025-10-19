// Portfolio Manager - Reads from JSON file (GitHub Pages Compatible)

// --- SVG d-attribute sanitizer (hotfix for malformed injected SVG paths) ---
(function () {
    function sanitizeDValue(d) {
        if (!d || typeof d !== 'string') return d;
        // Add space where letter commands are accidentally concatenated like "tc" -> "t c"
        // Only fix common pairs (t followed by c or c followed by t) to avoid over-editing.
        d = d.replace(/t(?=c)/g, 't ');
        d = d.replace(/c(?=t)/g, 'c ');
        // Insert missing comma before negative numbers when directly attached to a preceding number:  "0.4-0.2" -> "0.4,-0.2"
        // Use lookahead to avoid touching exponent notation.
        d = d.replace(/(\d(?:\.\d+)?)-(?=\d)/g, '$1,-');
        // Remove repeated commas if any created accidentally
        d = d.replace(/,+/g, ',');
        return d;
    }

    function sanitizeSVGPaths(html) {
        if (typeof html !== 'string') return html;
        // Replace every d="..."/d='...' occurrence with sanitized content
        return html.replace(/(d=)(["'])(.*?)\2/gi, function (_, prefix, quote, dContent) {
            const fixed = sanitizeDValue(dContent);
            return prefix + quote + fixed + quote;
        });
    }

    function patchjQuery() {
        if (!window.jQuery) return false;
        // Keep original if exists
        const orig = jQuery.htmlPrefilter;
        jQuery.htmlPrefilter = function (html) {
            if (typeof orig === 'function') {
                try { html = orig(html); } catch (e) { /* ignore and continue */ }
            }
            try {
                return sanitizeSVGPaths(html);
            } catch (e) {
                return html;
            }
        };
        return true;
    }

    if (window.jQuery) {
        patchjQuery();
    } else {
        // If jQuery not loaded yet, try to patch after DOM ready (so many bundles load jQuery early)
        document.addEventListener('DOMContentLoaded', function () {
            patchjQuery();
        });
        // Also try on window load as a fallback
        window.addEventListener('load', function () {
            patchjQuery();
        });
    }
})();

class PortfolioManager {
    constructor() {
        this.config = {
            colors: {},
            personal: {},
            projects: [],
            skills: {},
            contact: {},
            social: [],
            timeline: [],
            stats: [],
            blogs: [],
            visibility: {}
        };
        this.isLoading = true;
        this.init();
    }

    async init() {
        await this.loadConfiguration();
        this.initializeComponents();
        this.hideLoadingScreen();
    }

    async loadConfiguration() {
        try {
            console.log('📄 Loading data from portfolio-complete.json...');
            
            // Load from JSON file
            const response = await fetch('portfolio-complete.json');
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Map JSON data to config
            this.config.colors = data.colors || this.getDefaultColors();
            this.config.personal = data.personal || this.getDefaultPersonalData();
            this.config.projects = data.projects || this.getDefaultProjects();
            this.config.skills = data.skills || this.getDefaultSkills();
            this.config.contact = data.contact || this.getDefaultContact();
            this.config.social = data.social || this.getDefaultSocial();
            this.config.timeline = data.timeline || this.getDefaultTimeline();
            this.config.stats = data.stats || this.getDefaultStats();
            this.config.blogs = data.blogs || this.getDefaultBlogs();
            this.config.visibility = this.mapVisibility(data.visibility);

            console.log('✅ Portfolio data loaded successfully from JSON file');
            
        } catch (error) {
            console.error('❌ Error loading portfolio-complete.json:', error);
            console.warn('⚠️ Using default data instead');
            this.loadDefaults();
        }
    }

    mapVisibility(dataVisibility) {
        if (!dataVisibility) {
            return this.getDefaultVisibility();
        }

        return {
            header: {
                show: dataVisibility.header?.logo !== false && 
                      dataVisibility.header?.navigation !== false,
                logo: dataVisibility.header?.logo !== false,
                navigation: dataVisibility.header?.navigation !== false,
                dashboardLink: dataVisibility.header?.dashboardLink !== false,
                mobileMenu: dataVisibility.header?.mobileMenu !== false
            },
            hero: {
                show: dataVisibility.hero?.title !== false,
                title: dataVisibility.hero?.title !== false,
                subtitle: dataVisibility.hero?.subtitle !== false,
                buttons: dataVisibility.hero?.buttons !== false,
                scrollIndicator: dataVisibility.hero?.scrollIndicator !== false,
                backgroundCanvas: dataVisibility.hero?.backgroundCanvas !== false
            },
            about: {
                show: dataVisibility.about?.title !== false || 
                      dataVisibility.about?.description !== false,
                title: dataVisibility.about?.title !== false,
                description: dataVisibility.about?.description !== false,
                profileImage: dataVisibility.about?.profileImage !== false,
                experienceYears: dataVisibility.about?.experienceYears !== false,
                projectsCompleted: dataVisibility.about?.projectsCompleted !== false,
                awards: dataVisibility.about?.awards !== false
            },
            projects: {
                show: dataVisibility.projects?.title !== false || 
                      dataVisibility.projects?.projectGrid !== false,
                title: dataVisibility.projects?.title !== false,
                projectGrid: dataVisibility.projects?.projectGrid !== false,
                featuredOnly: dataVisibility.projects?.featuredOnly !== false
            },
            skills: {
                show: dataVisibility.skills?.title !== false || 
                      dataVisibility.skills?.categories !== false,
                title: dataVisibility.skills?.title !== false,
                categories: dataVisibility.skills?.categories !== false,
                icons: dataVisibility.skills?.icons !== false
            },
            contact: {
                show: dataVisibility.contact?.title !== false,
                title: dataVisibility.contact?.title !== false,
                contactInfo: dataVisibility.contact?.contactInfo !== false,
                email: dataVisibility.contact?.email !== false,
                phone: dataVisibility.contact?.phone !== false,
                location: dataVisibility.contact?.location !== false,
                contactForm: dataVisibility.contact?.contactForm !== false,
                socialLinks: dataVisibility.contact?.socialLinks !== false
            },
            footer: {
                show: dataVisibility.footer?.copyright !== false || 
                      dataVisibility.footer?.socialLinks !== false,
                copyright: dataVisibility.footer?.copyright !== false,
                socialLinks: dataVisibility.footer?.socialLinks !== false
            },
            effects: {
                particles: dataVisibility.effects?.particles !== false,
                scrollAnimations: dataVisibility.effects?.scrollAnimations !== false,
                loadingScreen: dataVisibility.effects?.loadingScreen !== false,
                glitchEffect: dataVisibility.effects?.glitchEffect !== false
            }
        };
    }

    getDefaultVisibility() {
        return {
            header: { show: true, logo: true, navigation: true, dashboardLink: true, mobileMenu: true },
            hero: { show: true, title: true, subtitle: true, buttons: true, scrollIndicator: true, backgroundCanvas: true },
            about: { show: true, title: true, description: true, profileImage: true, experienceYears: true, projectsCompleted: true, awards: true },
            projects: { show: true, title: true, projectGrid: true, featuredOnly: false },
            skills: { show: true, title: true, categories: true, icons: true },
            contact: { show: true, title: true, contactInfo: true, email: true, phone: true, location: true, contactForm: true, socialLinks: true },
            footer: { show: true, copyright: true, socialLinks: true },
            effects: { particles: true, scrollAnimations: true, loadingScreen: true, glitchEffect: true }
        };
    }

    getDefaultColors() {
        return {
            primary: "#64ffda",
            secondary: "#667eea",
            accent: "#ff6b6b",
            background: "#0a0a0a",
            surface: "#1a1a2e",
            text: "#ffffff"
        };
    }

    getDefaultPersonalData() {
        return {
            name: "Alex Johnson",
            title: "Game Developer & Designer",
            about: "Passionate game developer with 5+ years of experience creating immersive interactive experiences. Specialized in Unity, Unreal Engine, and cutting-edge game technologies.",
            experienceYears: 5,
            projectsCompleted: 23,
            awards: 7,
            profileImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23667eea'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='60' fill='white' text-anchor='middle' dy='.3em'%3EAJ%3C/text%3E%3C/svg%3E"
        };
    }

    getDefaultProjects() {
        return [
            {
                id: 1,
                title: "Cyber Runner 2077",
                description: "A futuristic endless runner game with cyberpunk aesthetics, featuring dynamic lighting and procedural level generation.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23667eea'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.3em'%3ECyber Runner%3C/text%3E%3C/svg%3E",
                technologies: ["Unity", "C#", "Shader Graph", "ProBuilder"],
                liveUrl: "#",
                githubUrl: "#",
                featured: true
            },
            {
                id: 2,
                title: "Fantasy Quest RPG",
                description: "Epic fantasy RPG with turn-based combat system, character progression, and immersive storytelling.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23ff6b6b'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.3em'%3EFantasy Quest%3C/text%3E%3C/svg%3E",
                technologies: ["Unreal Engine", "Blueprint", "C++", "UI/UX"],
                liveUrl: "#",
                githubUrl: "#",
                featured: true
            }
        ];
    }

    getDefaultSkills() {
        return {
            "Game Engines": {
                icon: "🎮",
                skills: ["Unity", "Unreal Engine", "Godot", "GameMaker Studio"]
            },
            "Programming": {
                icon: "💻",
                skills: ["C#", "C++", "JavaScript", "Python", "GDScript"]
            },
            "Graphics & Art": {
                icon: "🎨",
                skills: ["Blender", "Maya", "Photoshop", "Substance Painter", "Shader Programming"]
            }
        };
    }

    getDefaultContact() {
        return {
            email: "alex@gamedev.com",
            phone: "+1 (555) 123-4567",
            location: "San Francisco, CA"
        };
    }

    getDefaultSocial() {
        return [
            { name: "GitHub", url: "https://github.com", icon: "🔗" },
            { name: "LinkedIn", url: "https://linkedin.com", icon: "💼" },
            { name: "Twitter", url: "https://twitter.com", icon: "🦅" }
        ];
    }

    getDefaultTimeline() {
        return [
            {
                id: "timeline-1",
                year: "2024",
                title: "Senior Game Developer",
                description: "Leading development of next-gen VR experiences and mentoring junior developers in advanced game mechanics.",
                visible: true
            },
            {
                id: "timeline-2",
                year: "2022",
                title: "Game Developer",
                description: "Developed multiple successful indie games using Unity and Unreal Engine, focusing on innovative gameplay mechanics.",
                visible: true
            },
            {
                id: "timeline-3",
                year: "2020",
                title: "Junior Developer",
                description: "Started career in game development, working on mobile games and learning industry best practices.",
                visible: true
            },
            {
                id: "timeline-4",
                year: "2019",
                title: "Computer Science Graduate",
                description: "Graduated with honors, specializing in computer graphics and game development technologies.",
                visible: true
            }
        ];
    }

    getDefaultStats() {
        return [
            { name: "Unity", percentage: 95, category: "Game Engines" },
            { name: "C#", percentage: 90, category: "Programming" },
            { name: "Unreal Engine", percentage: 85, category: "Game Engines" },
            { name: "JavaScript", percentage: 80, category: "Programming" },
            { name: "Blender", percentage: 75, category: "3D Graphics" },
            { name: "Shader Programming", percentage: 70, category: "Graphics" }
        ];
    }

    getDefaultBlogs() {
        return [];
    }

    loadDefaults() {
        this.config.colors = this.getDefaultColors();
        this.config.personal = this.getDefaultPersonalData();
        this.config.projects = this.getDefaultProjects();
        this.config.skills = this.getDefaultSkills();
        this.config.contact = this.getDefaultContact();
        this.config.social = this.getDefaultSocial();
        this.config.timeline = this.getDefaultTimeline();
        this.config.stats = this.getDefaultStats();
        this.config.blogs = this.getDefaultBlogs();
        this.config.visibility = this.getDefaultVisibility();
    }

    initializeComponents() {
        this.applyColors();
        this.applySectionVisibility();
        this.populatePersonalData();
        this.renderProjects();
        this.renderSkills();
        this.renderTimeline();
        this.renderStats();
        this.populateContact();
        this.renderSocialLinks();
        this.initializeNavigation();
        this.initializeParticles();
        this.initializeCanvasBackground();
        this.initializeScrollAnimations();
    }

    applyColors() {
        const root = document.documentElement;
        Object.entries(this.config.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });

        const primaryColor = this.config.colors.primary || '#64ffda';
        const secondaryColor = this.config.colors.secondary || '#667eea';
        const accentColor = this.config.colors.accent || '#ff6b6b';

        document.querySelectorAll('.hero-title').forEach(el => {
            el.style.background = `linear-gradient(45deg, ${primaryColor}, ${secondaryColor}, ${accentColor})`;
            el.style.webkitBackgroundClip = 'text';
            el.style.webkitTextFillColor = 'transparent';
        });

        document.querySelectorAll('.section-title').forEach(el => {
            el.style.background = `linear-gradient(45deg, ${primaryColor}, ${secondaryColor})`;
            el.style.webkitBackgroundClip = 'text';
            el.style.webkitTextFillColor = 'transparent';
        });
    }

    applySectionVisibility() {
        const v = this.config.visibility;
        
        const sectionsMap = {
            'home': v.hero?.show,
            'about': v.about?.show,
            'projects': v.projects?.show,
            'skills': v.skills?.show,
            'timeline': true,
            'stats': true,
            'contact': v.contact?.show
        };

        Object.entries(sectionsMap).forEach(([id, show]) => {
            const section = document.getElementById(id);
            if (section) {
                section.style.display = show !== false ? '' : 'none';
            }
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            const href = link.getAttribute('href');
            if (href?.startsWith('#')) {
                const sectionId = href.substring(1);
                const isVisible = sectionsMap[sectionId];
                link.style.display = isVisible !== false ? '' : 'none';
            }
        });

        const dashboardLink = document.querySelector('.nav-menu a[href="dashboard.html"]');
        if (dashboardLink) {
            dashboardLink.style.display = v.header?.dashboardLink !== false ? '' : 'none';
        }

        if (v.hero) {
            const heroSubtitle = document.querySelector('.hero-subtitle');
            if (heroSubtitle) heroSubtitle.style.display = v.hero.subtitle !== false ? '' : 'none';
            
            const heroButtons = document.querySelector('.hero-buttons');
            if (heroButtons) heroButtons.style.display = v.hero.buttons !== false ? '' : 'none';
            
            const scrollIndicator = document.querySelector('.scroll-indicator');
            if (scrollIndicator) scrollIndicator.style.display = v.hero.scrollIndicator !== false ? '' : 'none';
            
            const gameCanvas = document.getElementById('gameCanvas');
            if (gameCanvas) gameCanvas.style.display = v.hero.backgroundCanvas !== false ? '' : 'none';
        }

        if (v.about) {
            const profileImage = document.querySelector('.about-image');
            if (profileImage) profileImage.style.display = v.about.profileImage !== false ? '' : 'none';
            
            const stats = document.querySelectorAll('.stats-grid .stat-item');
            if (stats[0]) stats[0].style.display = v.about.experienceYears !== false ? '' : 'none';
            if (stats[1]) stats[1].style.display = v.about.projectsCompleted !== false ? '' : 'none';
            if (stats[2]) stats[2].style.display = v.about.awards !== false ? '' : 'none';
        }

        if (v.contact) {
            const contactItems = document.querySelectorAll('.contact-item');
            if (contactItems[0]) contactItems[0].style.display = v.contact.email !== false ? '' : 'none';
            if (contactItems[1]) contactItems[1].style.display = v.contact.phone !== false ? '' : 'none';
            if (contactItems[2]) contactItems[2].style.display = v.contact.location !== false ? '' : 'none';
        }

        if (v.footer) {
            const footerText = document.querySelector('.footer-text');
            if (footerText) footerText.style.display = v.footer.copyright !== false ? '' : 'none';
            
            const footerSocial = document.querySelector('.footer .social-links');
            if (footerSocial) footerSocial.style.display = v.footer.socialLinks !== false ? '' : 'none';
        }

        if (v.effects) {
            const particles = document.getElementById('particles');
            if (particles) particles.style.display = v.effects.particles !== false ? '' : 'none';
            
            const loading = document.getElementById('loading');
            if (loading && v.effects.loadingScreen === false) {
                loading.style.display = 'none';
            }
            
            const glitchElements = document.querySelectorAll('.glitch');
            glitchElements.forEach(el => {
                if (v.effects.glitchEffect === false) {
                    el.classList.remove('glitch');
                }
            });
        }
    }

    populatePersonalData() {
        const data = this.config.personal;

        const heroName = document.getElementById('heroName');
        if (heroName) {
            heroName.textContent = data.name;
            heroName.setAttribute('data-text', data.name);
        }

        const heroTitle = document.querySelector('.hero-subtitle');
        if (heroTitle) heroTitle.textContent = data.title;

        const aboutDesc = document.getElementById('aboutDescription');
        if (aboutDesc) aboutDesc.textContent = data.about;

        const experienceYears = document.getElementById('experienceYears');
        const projectsCount = document.getElementById('projectsCount');
        const awardsCount = document.getElementById('awardsCount');

        if (experienceYears) experienceYears.textContent = data.experienceYears;
        if (projectsCount) projectsCount.textContent = data.projectsCompleted;
        if (awardsCount) awardsCount.textContent = data.awards;

        const profileImage = document.getElementById('profileImage');
        if (profileImage && data.profileImage) {
            profileImage.src = data.profileImage;
            profileImage.alt = data.name;
        }

        this.animateNumbers();
    }

    animateNumbers() {
        const animateNumber = (element, target, duration = 2000) => {
            if (!element) return;
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start);
                }
            }, 16);
        };

        setTimeout(() => {
            animateNumber(document.getElementById('experienceYears'), this.config.personal.experienceYears);
            animateNumber(document.getElementById('projectsCount'), this.config.personal.projectsCompleted);
            animateNumber(document.getElementById('awardsCount'), this.config.personal.awards);
        }, 1000);
    }

    renderProjects() {
        const container = document.getElementById('projectsGrid');
        if (!container) return;

        const showFeaturedOnly = this.config.visibility?.projects?.featuredOnly !== false;
        let projects = this.config.projects;
        
        if (showFeaturedOnly) {
            projects = projects.filter(p => p.featured);
        }

        container.innerHTML = projects.slice(0, 6).map(project => `
            <div class="project-card fade-in">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.liveUrl}" class="project-link">Live Demo</a>
                        <a href="${project.githubUrl}" class="project-link">Source Code</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderSkills() {
        const container = document.getElementById('skillsCategories');
        if (!container) return;

        const showIcons = this.config.visibility?.skills?.icons !== false;

        container.innerHTML = Object.entries(this.config.skills).map(([category, data]) => `
            <div class="skill-category fade-in">
                <h3 class="category-title">
                    ${showIcons ? `<span class="category-icon">${data.icon}</span>` : ''}
                    ${category}
                </h3>
                <div class="skills-list">
                    ${data.skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    renderTimeline() {
        const container = document.getElementById('timelineItems');
        if (!container) return;

        const visibleTimeline = this.config.timeline.filter(item => item.visible !== false);

        container.innerHTML = visibleTimeline.map((item, index) => `
            <div class="timeline-item fade-in" style="animation-delay: ${index * 0.2}s">
                <div class="timeline-marker">
                    <div class="timeline-year">${item.year}</div>
                </div>
                <div class="timeline-content">
                    <h3 class="timeline-title">${item.title}</h3>
                    <p class="timeline-description">${item.description}</p>
                </div>
            </div>
        `).join('');
    }

    renderStats() {
        const container = document.getElementById('statsGrid');
        if (!container) return;

        container.innerHTML = this.config.stats.map((stat, index) => `
            <div class="stat-item fade-in" style="animation-delay: ${index * 0.1}s">
                <div class="stat-header">
                    <h4 class="stat-name">${stat.name}</h4>
                    <span class="stat-percentage">${stat.percentage}%</span>
                </div>
                <div class="stat-category">${stat.category}</div>
                <div class="stat-bar">
                    <div class="stat-progress" data-percentage="${stat.percentage}"></div>
                </div>
            </div>
        `).join('');

        setTimeout(() => this.animateStatsBars(), 500);
    }

    animateStatsBars() {
        document.querySelectorAll('.stat-progress').forEach((bar, index) => {
            const percentage = bar.getAttribute('data-percentage');
            setTimeout(() => {
                bar.style.width = `${percentage}%`;
            }, index * 100);
        });
    }

    populateContact() {
        const contact = this.config.contact;
        const emailEl = document.getElementById('contactEmail');
        const phoneEl = document.getElementById('contactPhone');
        const locationEl = document.getElementById('contactLocation');

        if (emailEl) emailEl.textContent = contact.email;
        if (phoneEl) phoneEl.textContent = contact.phone;
        if (locationEl) locationEl.textContent = contact.location;
    }

    renderSocialLinks() {
        const container = document.getElementById('socialLinks');
        if (!container) return;

        container.innerHTML = this.config.social.map(link => `
            <a href="${link.url}" class="social-link" target="_blank" rel="noopener">
                ${link.icon}
            </a>
        `).join('');
    }

    initializeNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navbar = document.getElementById('navbar');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                } else {
                    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                }
            });
        }
    }

    initializeParticles() {
        if (this.config.visibility?.effects?.particles === false) return;
        
        const container = document.getElementById('particles');
        if (!container) return;

        for (let i = 0; i < 50; i++) {
            setTimeout(() => this.createParticle(container), i * 200);
        }

        setInterval(() => this.createParticle(container), 3000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
        particle.style.background = this.config.colors.primary;

        container.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) particle.remove();
        }, (Math.random() * 5 + 5) * 1000);
    }

    initializeCanvasBackground() {
        if (this.config.visibility?.hero?.backgroundCanvas === false) return;
        
        const canvas = document.getElementById('gameCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const shapes = Array.from({ length: 20 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 30 + 10,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            rotation: 0,
            rotationSpeed: (Math.random() - 0.5) * 0.02
        }));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            shapes.forEach(shape => {
                shape.x += shape.speedX;
                shape.y += shape.speedY;
                shape.rotation += shape.rotationSpeed;

                if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
                if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
                if (shape.y > canvas.height + shape.size) shape.y = -shape.size;
                if (shape.y < -shape.size) shape.y = canvas.height + shape.size;

                ctx.save();
                ctx.translate(shape.x, shape.y);
                ctx.rotate(shape.rotation);
                ctx.strokeStyle = `${this.config.colors.primary}33`;
                ctx.lineWidth = 2;
                ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
                ctx.restore();
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    initializeScrollAnimations() {
        if (this.config.visibility?.effects?.scrollAnimations === false) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('section, .project-card, .skill-category').forEach(el => {
            observer.observe(el);
        });
    }

    hideLoadingScreen() {
        if (this.config.visibility?.effects?.loadingScreen === false) {
            const loading = document.getElementById('loading');
            if (loading) loading.style.display = 'none';
            this.isLoading = false;
            return;
        }

        setTimeout(() => {
            const loading = document.getElementById('loading');
            if (loading) {
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.style.display = 'none';
                    this.isLoading = false;
                }, 500);
            }
        }, 2000);
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize
const portfolio = new PortfolioManager()
window.portfolio = portfolio;