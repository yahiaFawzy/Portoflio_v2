// Portfolio Configuration and Data Management
class PortfolioManager {
    constructor() {
        this.config = {
            colors: {},
            personal: {},
            projects: [],
            skills: {},
            contact: {},
            social: []
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
            // First try to load from localStorage (dashboard data)
            const savedData = localStorage.getItem('portfolioData');

            if (savedData) {
                console.log('Loading portfolio data from dashboard...');
                const portfolioData = JSON.parse(savedData);

                // Map dashboard structure to portfolio structure
                this.config.colors = portfolioData.colors || this.getDefaultColors();
                this.config.visibility = portfolioData.visibility || this.getDefaultVisibility();
                this.config.personal = portfolioData.personal || this.getDefaultPersonalData();
                this.config.projects = portfolioData.projects || this.getDefaultProjects();
                this.config.skills = portfolioData.skills || this.getDefaultSkills();
                this.config.contact = portfolioData.contact || this.getDefaultContact();
                this.config.social = portfolioData.social || this.getDefaultSocial();

                console.log('Portfolio data loaded successfully from dashboard');
            } else {
                console.log('No dashboard data found, using defaults');
                this.loadDefaults();
            }

        } catch (error) {
            console.warn('Error loading configuration, using defaults:', error);
            this.loadDefaults();
        }
    }

    getDefaultColors() {
        return {
            primary: "#64ffda",
            secondary: "#667eea",
            accent: "#ff6b6b",
            background: "#0a0a0a",
            surface: "#1a1a2e",
            text: "#ffffff",
            success: "#4caf50",
            warning: "#ff9800",
            error: "#f44336",
            info: "#2196f3",
            muted: "#6c757d",
            light: "#f8f9fa",
            dark: "#343a40",
            gradientStart: "#667eea",
            gradientEnd: "#764ba2",
            border: "rgba(100, 255, 218, 0.2)",
            shadow: "rgba(0, 0, 0, 0.3)",
            primaryHover: "#4fd3b8",
            secondaryHover: "#5a6fd8",
            accentHover: "#ff5252"
        };
    }

    getDefaultVisibility() {
        return {
            header: {
                logo: true,
                navigation: true,
                dashboardLink: true,
                mobileMenu: true
            },
            hero: {
                title: true,
                subtitle: true,
                buttons: true,
                scrollIndicator: true,
                backgroundCanvas: true
            },
            about: {
                title: true,
                description: true,
                profileImage: true,
                experienceYears: true,
                projectsCompleted: true,
                awards: true
            },
            projects: {
                title: true,
                projectGrid: true,
                featuredOnly: true
            },
            skills: {
                title: true,
                categories: true,
                icons: true
            },
            contact: {
                title: true,
                contactInfo: true,
                email: true,
                phone: true,
                location: true,
                contactForm: true,
                socialLinks: true
            },
            footer: {
                copyright: true,
                socialLinks: true
            },
            effects: {
                particles: true,
                scrollAnimations: true,
                loadingScreen: true,
                glitchEffect: true
            }
        };
    }

    getDefaultPersonalData() {
        return {
            name: "Alex Johnson",
            title: "Game Developer & Designer",
            about: "Passionate game developer with 5+ years of experience creating immersive interactive experiences. Specialized in Unity, Unreal Engine, and cutting-edge game technologies. I believe in the power of games to tell stories, connect people, and create unforgettable moments.",
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
            },
            {
                id: 3,
                title: "Space Defense VR",
                description: "Virtual reality tower defense game where players protect Earth from alien invasions using hand gestures and strategic thinking.",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%2364ffda'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='black' text-anchor='middle' dy='.3em'%3ESpace Defense VR%3C/text%3E%3C/svg%3E",
                technologies: ["Unity", "VR SDK", "C#", "3D Modeling"],
                liveUrl: "#",
                githubUrl: "#",
                featured: false
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
            },
            "Audio": {
                icon: "🎵",
                skills: ["FMOD", "Wwise", "Audacity", "FL Studio"]
            },
            "Tools & Platforms": {
                icon: "🛠️",
                skills: ["Git", "Perforce", "Jenkins", "Steam", "Mobile Platforms"]
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
            { name: "Twitter", url: "https://twitter.com", icon: "🐦" },
            { name: "Portfolio", url: "#", icon: "🌐" }
        ];
    }

    loadDefaults() {
        this.config.colors = this.getDefaultColors();
        this.config.visibility = this.getDefaultVisibility();
        this.config.personal = this.getDefaultPersonalData();
        this.config.projects = this.getDefaultProjects();
        this.config.skills = this.getDefaultSkills();
        this.config.contact = this.getDefaultContact();
        this.config.social = this.getDefaultSocial();
    }

    initializeComponents() {
        this.applyColors();
        this.applyVisibilitySettings();
        this.populatePersonalData();
        this.renderProjects();
        this.renderSkills();
        this.populateContact();
        this.renderSocialLinks();
        this.initializeNavigation();
        this.initializeParticles();
        this.initializeCanvasBackground();
        this.initializeScrollAnimations();
        this.setupDataRefreshListener();
    }

    // Add listener for localStorage changes (when dashboard updates data)
    setupDataRefreshListener() {
        // Listen for storage events (when data is updated from another tab/window)
        window.addEventListener('storage', (e) => {
            if (e.key === 'portfolioData') {
                console.log('Portfolio data updated from dashboard, refreshing...');
                this.loadConfiguration().then(() => {
                    this.refreshPortfolio();
                });
            }
        });

        // Also check periodically for updates (in case same-tab updates)
        setInterval(() => {
            this.checkForUpdates();
        }, 2000);
    }

    checkForUpdates() {
        const savedData = localStorage.getItem('portfolioData');
        if (savedData) {
            try {
                const newData = JSON.parse(savedData);
                // Simple check if data has changed
                const newDataString = JSON.stringify(newData);
                const currentDataString = JSON.stringify({
                    colors: this.config.colors,
                    personal: this.config.personal,
                    projects: this.config.projects,
                    skills: this.config.skills,
                    contact: this.config.contact,
                    social: this.config.social
                });

                if (newDataString !== currentDataString) {
                    console.log('Portfolio data changed, refreshing...');
                    this.loadConfiguration().then(() => {
                        this.refreshPortfolio();
                    });
                }
            } catch (error) {
                console.warn('Error checking for updates:', error);
            }
        }
    }

    refreshPortfolio() {
        this.applyColors();
        this.applyVisibilitySettings();
        this.populatePersonalData();
        this.renderProjects();
        this.renderSkills();
        this.populateContact();
        this.renderSocialLinks();

        // Show a subtle notification that content was updated
        this.showUpdateNotification();
    }

    showUpdateNotification() {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #667eea, #64ffda);
            color: #000;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = 'Portfolio updated!';

        // Add animation keyframes if not already added
        if (!document.querySelector('#updateNotificationStyles')) {
            const style = document.createElement('style');
            style.id = 'updateNotificationStyles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 2700);
    }

    applyColors() {
        const root = document.documentElement;
        Object.entries(this.config.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });

        // Apply colors to specific elements that use them directly
        document.querySelectorAll('.hero-title').forEach(el => {
            el.style.background = `linear-gradient(45deg, ${this.config.colors.primary}, ${this.config.colors.secondary}, ${this.config.colors.accent})`;
            el.style.webkitBackgroundClip = 'text';
            el.style.webkitTextFillColor = 'transparent';
            el.style.backgroundClip = 'text';
        });

        document.querySelectorAll('.section-title').forEach(el => {
            el.style.background = `linear-gradient(45deg, ${this.config.colors.primary}, ${this.config.colors.secondary})`;
            el.style.webkitBackgroundClip = 'text';
            el.style.webkitTextFillColor = 'transparent';
            el.style.backgroundClip = 'text';
        });
    }

    applyVisibilitySettings() {
        const visibility = this.config.visibility;

        // Header elements
        this.toggleElement('.nav-logo', visibility.header?.logo);
        this.toggleElement('.nav-menu li:not(:last-child)', visibility.header?.navigation);
        this.toggleElement('.dashboard-link', visibility.header?.dashboardLink);
        this.toggleElement('.hamburger', visibility.header?.mobileMenu);

        // Hero elements
        this.toggleElement('.hero-title', visibility.hero?.title);
        this.toggleElement('.hero-subtitle', visibility.hero?.subtitle);
        this.toggleElement('.hero-buttons', visibility.hero?.buttons);
        this.toggleElement('.scroll-indicator', visibility.hero?.scrollIndicator);
        this.toggleElement('#gameCanvas', visibility.hero?.backgroundCanvas);

        // About elements
        this.toggleElement('#about .section-title', visibility.about?.title);
        this.toggleElement('#aboutDescription', visibility.about?.description);
        this.toggleElement('.about-image', visibility.about?.profileImage);
        this.toggleElement('.stat-item:nth-child(1)', visibility.about?.experienceYears);
        this.toggleElement('.stat-item:nth-child(2)', visibility.about?.projectsCompleted);
        this.toggleElement('.stat-item:nth-child(3)', visibility.about?.awards);

        // Projects elements
        this.toggleElement('#projects .section-title', visibility.projects?.title);
        this.toggleElement('.projects-grid', visibility.projects?.projectGrid);

        // Skills elements
        this.toggleElement('#skills .section-title', visibility.skills?.title);
        this.toggleElement('.skills-categories', visibility.skills?.categories);
        
        // Contact elements
        this.toggleElement('#contact .section-title', visibility.contact?.title);
        this.toggleElement('.contact-info', visibility.contact?.contactInfo);
        this.toggleElement('.contact-item:nth-child(1)', visibility.contact?.email);
        this.toggleElement('.contact-item:nth-child(2)', visibility.contact?.phone);
        this.toggleElement('.contact-item:nth-child(3)', visibility.contact?.location);
        this.toggleElement('.contact-form', visibility.contact?.contactForm);

        // Footer elements
        this.toggleElement('.footer-text', visibility.footer?.copyright);
        this.toggleElement('.footer .social-links', visibility.footer?.socialLinks);

        // Effects
        this.toggleElement('#particles', visibility.effects?.particles);
        this.toggleElement('#loading', visibility.effects?.loadingScreen);

        // Handle skill icons
        if (visibility.skills?.icons === false) {
            document.querySelectorAll('.category-icon').forEach(el => {
                el.style.display = 'none';
            });
        } else {
            document.querySelectorAll('.category-icon').forEach(el => {
                el.style.display = '';
            });
        }

        // Handle glitch effect
        if (visibility.effects?.glitchEffect === false) {
            document.querySelectorAll('.glitch').forEach(el => {
                el.classList.remove('glitch');
            });
        } else {
            document.querySelectorAll('.hero-title').forEach(el => {
                el.classList.add('glitch');
            });
        }

        // Handle scroll animations
        if (visibility.effects?.scrollAnimations === false) {
            document.querySelectorAll('.fade-in').forEach(el => {
                el.classList.remove('fade-in');
            });
        }

        // Hide entire sections if all their content is hidden
        this.toggleSection('about', visibility.about);
        this.toggleSection('projects', visibility.projects);
        this.toggleSection('skills', visibility.skills);
        this.toggleSection('contact', visibility.contact);
    }

    toggleElement(selector, isVisible) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (isVisible === false) {
                el.style.display = 'none';
            } else {
                el.style.display = '';
            }
        });
    }

    toggleSection(sectionId, sectionVisibility) {
        if (!sectionVisibility) return;
        
        const section = document.getElementById(sectionId);
        if (!section) return;

        // Check if any item in the section is visible
        const hasVisibleContent = Object.values(sectionVisibility).some(value => value !== false);
        
        if (!hasVisibleContent) {
            section.style.display = 'none';
        } else {
            section.style.display = '';
        }
    }

    populatePersonalData() {
        const data = this.config.personal;

        // Hero section
        const heroName = document.getElementById('heroName');
        if (heroName) {
            heroName.textContent = data.name;
            heroName.setAttribute('data-text', data.name);
        }

        const heroTitle = document.querySelector('.hero-subtitle');
        if (heroTitle) {
            heroTitle.textContent = data.title;
        }

        // About section
        const aboutDesc = document.getElementById('aboutDescription');
        if (aboutDesc) {
            aboutDesc.textContent = data.about;
        }

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

        // Animate numbers
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

        // Respect the featuredOnly visibility setting
        const showFeaturedOnly = this.config.visibility?.projects?.featuredOnly !== false;
        const projects = showFeaturedOnly 
            ? this.config.projects.filter(p => p.featured).slice(0, 6)
            : this.config.projects.slice(0, 6);

        container.innerHTML = projects.map(project => `
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
                        <a href="${project.liveUrl}" class="project-link" ${project.liveUrl === '#' ? '' : 'target="_blank" rel="noopener"'}>Live Demo</a>
                        <a href="${project.githubUrl}" class="project-link" ${project.githubUrl === '#' ? '' : 'target="_blank" rel="noopener"'}>Source Code</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderSkills() {
        const container = document.getElementById('skillsCategories');
        if (!container) return;

        const skills = this.config.skills;

        container.innerHTML = Object.entries(skills).map(([category, data]) => `
            <div class="skill-category fade-in">
                <h3 class="category-title">
                    <span class="category-icon">${data.icon}</span>
                    ${category}
                </h3>
                <div class="skills-list">
                    ${data.skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                </div>
            </div>
        `).join('');
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

        const social = this.config.social;

        container.innerHTML = social.map(link => `
            <a href="${link.url}" class="social-link" ${link.url === '#' ? '' : 'target="_blank" rel="noopener"'}>
                ${link.icon}
            </a>
        `).join('');
    }

    initializeNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navbar = document.getElementById('navbar');

        if (!hamburger || !navMenu || !navbar) return;

        // Mobile menu toggle
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    initializeParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        // Check if particles are enabled
        if (this.config.visibility?.effects?.particles === false) {
            return;
        }

        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createParticle(container);
            }, i * 200);
        }

        // Continuously create new particles
        setInterval(() => {
            this.createParticle(container);
        }, 3000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 4 + 2;
        const leftPosition = Math.random() * 100;
        const animationDuration = Math.random() * 5 + 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${leftPosition}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.background = this.config.colors.primary || 'var(--color-primary)';

        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, animationDuration * 1000);
    }

    initializeCanvasBackground() {
        const canvas = document.getElementById('gameCanvas');
        if (!canvas) return;

        // Check if background canvas is enabled
        if (this.config.visibility?.hero?.backgroundCanvas === false) {
            canvas.style.display = 'none';
            return;
        }

        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Simple animated background
        const shapes = [];
        const shapeCount = 20;

        // Create shapes
        for (let i = 0; i < shapeCount; i++) {
            shapes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 30 + 10,
                speedX: (Math.random() - 0.5) * 2,
                speedY: (Math.random() - 0.5) * 2,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.02
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            shapes.forEach(shape => {
                // Update position
                shape.x += shape.speedX;
                shape.y += shape.speedY;
                shape.rotation += shape.rotationSpeed;

                // Wrap around edges
                if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
                if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
                if (shape.y > canvas.height + shape.size) shape.y = -shape.size;
                if (shape.y < -shape.size) shape.y = canvas.height + shape.size;

                // Draw shape
                ctx.save();
                ctx.translate(shape.x, shape.y);
                ctx.rotate(shape.rotation);

                // Use primary color from config
                const primaryColor = this.config.colors.primary || '#64ffda';
                ctx.strokeStyle = `${primaryColor}33`; // Add alpha
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
                ctx.stroke();

                ctx.restore();
            });

            requestAnimationFrame(animate);
        };

        animate();
    }

    initializeScrollAnimations() {
        // Check if scroll animations are enabled
        if (this.config.visibility?.effects?.scrollAnimations === false) {
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        document.querySelectorAll('section, .project-card, .skill-category, .contact-item').forEach(el => {
            observer.observe(el);
        });
    }

    hideLoadingScreen() {
        // Check if loading screen is enabled
        if (this.config.visibility?.effects?.loadingScreen === false) {
            const loading = document.getElementById('loading');
            if (loading) {
                loading.style.display = 'none';
                this.isLoading = false;
            }
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

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Contact Form Handling - Multiple Working Options
class ContactFormManager {
    constructor() {
        this.form = null;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.form = document.querySelector('.contact-form');
            if (this.form) {
                this.setupEventListeners();
            }
        });
    }

    setupEventListeners() {
        // Email submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.sendViaEmail();
        });

        // WhatsApp
        const whatsappBtn = document.getElementById('whatsappBtn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                this.sendViaWhatsApp();
            });
        }

        // Copy to clipboard
        const copyBtn = document.getElementById('copyMessageBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyToClipboard();
            });
        }

        // Download message
        const downloadBtn = document.getElementById('downloadMessageBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadMessage();
            });
        }
    }

    getFormData() {
        const formData = new FormData(this.form);
        return {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
    }

    validateForm() {
        const data = this.getFormData();
        if (!data.name || !data.email || !data.subject || !data.message) {
            this.showNotification('Please fill in all fields', 'error');
            return false;
        }
        
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return false;
        }
        
        return true;
    }

    sendViaEmail() {
        if (!this.validateForm()) return;

        const data = this.getFormData();
        const portfolioEmail = this.getPortfolioEmail();

        // Try multiple methods for better compatibility
        this.tryEmailMethods(data, portfolioEmail);
    }

    tryEmailMethods(data, portfolioEmail) {
        const methods = [
            () => this.sendViaMailtoWithWindow(data, portfolioEmail),
            () => this.sendViaMailtoWithLocation(data, portfolioEmail),
            () => this.sendViaMailtoSimple(data, portfolioEmail),
            () => this.showEmailInstructions(data, portfolioEmail)
        ];

        let currentMethod = 0;

        const tryNext = () => {
            if (currentMethod < methods.length) {
                try {
                    const result = methods[currentMethod]();
                    if (result !== false) {
                        this.showNotification('Opening your email client...', 'success');
                        this.resetForm(2000);
                        return;
                    }
                } catch (error) {
                    console.warn(`Email method ${currentMethod + 1} failed:`, error);
                }
                currentMethod++;
                setTimeout(tryNext, 100);
            } else {
                this.showNotification('Unable to open email client. Message copied to clipboard instead.', 'error');
                this.copyToClipboard();
            }
        };

        tryNext();
    }

    sendViaMailtoWithWindow(data, portfolioEmail) {
        const subject = encodeURIComponent(data.subject);
        const body = this.createEmailBody(data);
        
        // Check if body is too long (mailto has limitations)
        if (body.length > 1800) {
            return false; // Try next method
        }

        const mailtoLink = `mailto:${portfolioEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;
        
        // Try opening in new window first
        const emailWindow = window.open(mailtoLink, '_self');
        
        // Check if window opened successfully
        setTimeout(() => {
            if (emailWindow && !emailWindow.closed) {
                return true;
            }
        }, 100);
        
        return true;
    }

    sendViaMailtoWithLocation(data, portfolioEmail) {
        const subject = encodeURIComponent(data.subject);
        const shortBody = `From: ${data.name} (${data.email})\n\n${data.message}`;
        
        if (shortBody.length > 1500) {
            return false; // Try next method
        }

        const mailtoLink = `mailto:${portfolioEmail}?subject=${subject}&body=${encodeURIComponent(shortBody)}`;
        
        try {
            window.location.href = mailtoLink;
            return true;
        } catch (error) {
            return false;
        }
    }

    sendViaMailtoSimple(data, portfolioEmail) {
        // Very simple mailto with just email and subject
        const subject = encodeURIComponent(`Contact from ${data.name}: ${data.subject}`);
        const mailtoLink = `mailto:${portfolioEmail}?subject=${subject}`;
        
        try {
            // Create a hidden link and click it
            const link = document.createElement('a');
            link.href = mailtoLink;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show instructions for user to copy message
            setTimeout(() => {
                this.showEmailInstructions(data, portfolioEmail);
            }, 500);
            
            return true;
        } catch (error) {
            return false;
        }
    }

    showEmailInstructions(data, portfolioEmail) {
        // Create a modal with email instructions
        const modal = this.createEmailModal(data, portfolioEmail);
        document.body.appendChild(modal);
        return true;
    }

    createEmailBody(data) {
        return `Hi!

My name is ${data.name} and I'd like to get in touch.

Subject: ${data.subject}

Message:
${data.message}

Contact Information:
- Name: ${data.name}
- Email: ${data.email}
- Date: ${new Date().toLocaleString()}

Best regards,
${data.name}

---
Sent from Portfolio Contact Form`;
    }

    createEmailModal(data, portfolioEmail) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
            backdrop-filter: blur(5px);
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: linear-gradient(135deg, var(--color-surface), var(--color-background));
            padding: 30px;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            border: 2px solid var(--color-primary);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;

        const emailBody = this.createEmailBody(data);

        modalContent.innerHTML = `
            <h3 style="color: var(--color-primary); margin-bottom: 20px; text-align: center;">
                📧 Email Instructions
            </h3>
            <p style="color: var(--color-text); margin-bottom: 15px; line-height: 1.6;">
                Your email client should open automatically. If it doesn't, please:
            </p>
            <ol style="color: var(--color-text); margin-bottom: 20px; line-height: 1.6;">
                <li>Send an email to: <strong style="color: var(--color-primary)">${portfolioEmail}</strong></li>
                <li>Use this subject: <strong style="color: var(--color-primary)">${data.subject}</strong></li>
                <li>Copy the message below:</li>
            </ol>
            
            <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px; margin: 15px 0;">
                <pre style="color: var(--color-text); font-size: 14px; line-height: 1.4; white-space: pre-wrap; margin: 0;">${emailBody}</pre>
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button id="copyEmailText" style="
                    flex: 1;
                    background: var(--color-primary);
                    color: var(--color-background);
                    border: none;
                    padding: 10px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                ">📋 Copy Message</button>
                <button id="openEmail" style="
                    flex: 1;
                    background: transparent;
                    color: var(--color-primary);
                    border: 2px solid var(--color-primary);
                    padding: 10px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                ">📧 Try Email Again</button>
                <button id="closeModal" style="
                    background: transparent;
                    color: #ff6b6b;
                    border: 2px solid #ff6b6b;
                    padding: 10px 15px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                ">✕</button>
            </div>
        `;

        modal.appendChild(modalContent);

        // Add event listeners
        modalContent.querySelector('#copyEmailText').addEventListener('click', async () => {
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(emailBody);
                } else {
                    this.fallbackCopyToClipboard(emailBody);
                }
                this.showNotification('Message copied to clipboard!', 'success');
            } catch (error) {
                this.showNotification('Failed to copy message', 'error');
            }
        });

        modalContent.querySelector('#openEmail').addEventListener('click', () => {
            const simpleMailto = `mailto:${portfolioEmail}?subject=${encodeURIComponent(data.subject)}`;
            window.location.href = simpleMailto;
        });

        modalContent.querySelector('#closeModal').addEventListener('click', () => {
            document.body.removeChild(modal);
            this.resetForm();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                this.resetForm();
            }
        });

        return modal;
    }

    sendViaWhatsApp() {
        if (!this.validateForm()) return;

        const data = this.getFormData();
        const message = `Hi! I'm ${data.name} and I'd like to get in touch.

*Subject:* ${data.subject}

*Message:*
${data.message}

*Contact Info:*
📧 ${data.email}
📅 ${new Date().toLocaleString()}

Best regards,
${data.name}`;

        // Get phone number from contact data or use default
        const phoneNumber = this.getPortfolioPhone();
        
        try {
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
            
            this.showNotification('Opening WhatsApp...', 'success');
            this.resetForm(2000);
        } catch (error) {
            this.showNotification('Failed to open WhatsApp. Message copied to clipboard instead.', 'error');
            this.copyToClipboard();
        }
    }

    getPortfolioPhone() {
        // Try to get WhatsApp number from contact configuration first
        if (this.portfolio && this.portfolio.config && this.portfolio.config.contact && this.portfolio.config.contact.whatsapp) {
            return this.portfolio.config.contact.whatsapp.replace(/[^\d+]/g, '');
        }
        
        // Try to get phone from contact configuration
        const contactPhone = document.getElementById('contactPhone');
        if (contactPhone && contactPhone.textContent !== 'Loading...') {
            // Remove all non-numeric characters except +
            return contactPhone.textContent.replace(/[^\d+]/g, '');
        }
        
        // Try localStorage data
        try {
            const savedData = localStorage.getItem('portfolioData');
            if (savedData) {
                const data = JSON.parse(savedData);
                if (data.contact && data.contact.whatsapp) {
                    return data.contact.whatsapp.replace(/[^\d+]/g, '');
                }
                if (data.contact && data.contact.phone) {
                    return data.contact.phone.replace(/[^\d+]/g, '');
                }
            }
        } catch (error) {
            console.warn('Error getting phone from localStorage:', error);
        }
        
        // Fallback - you can customize this
        return '1234567890'; // Replace with actual phone number
    }

    async copyToClipboard() {
        if (!this.validateForm()) return;

        const data = this.getFormData();
        const messageText = this.formatMessage(data);

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(messageText);
            } else {
                // Fallback for older browsers
                this.fallbackCopyToClipboard(messageText);
            }
            
            this.showNotification('Message copied to clipboard!', 'success');
            this.resetForm(2000);
        } catch (error) {
            this.showNotification('Failed to copy message. Please try again.', 'error');
        }
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            textArea.remove();
        } catch (error) {
            textArea.remove();
            throw error;
        }
    }

    downloadMessage() {
        if (!this.validateForm()) return;

        const data = this.getFormData();
        const messageText = this.formatMessage(data);
        
        const blob = new Blob([messageText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `message-from-${data.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showNotification('Message downloaded successfully!', 'success');
        this.resetForm(2000);
    }

    formatMessage(data) {
        const timestamp = new Date().toLocaleString();
        return `Contact Message
=================

From: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
Date: ${timestamp}

Message:
--------
${data.message}

---
Generated from Portfolio Contact Form`;
    }

    getPortfolioEmail() {
        // Try to get email from contact configuration
        const contactEmail = document.getElementById('contactEmail');
        if (contactEmail && contactEmail.textContent !== 'Loading...') {
            return contactEmail.textContent;
        }
        
        // Fallback to a default
        return 'contact@example.com';
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `contact-notification contact-notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: #fff;
            font-weight: 600;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: slideInNotification 0.3s ease;
            background: ${type === 'success' ? 'linear-gradient(45deg, #4caf50, #45a049)' : 'linear-gradient(45deg, #f44336, #d32f2f)'};
        `;

        // Add animation keyframes if not already added
        if (!document.querySelector('#notificationStyles')) {
            const style = document.createElement('style');
            style.id = 'notificationStyles';
            style.textContent = `
                @keyframes slideInNotification {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutNotification {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutNotification 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    resetForm(delay = 0) {
        setTimeout(() => {
            if (this.form) {
                this.form.reset();
            }
        }, delay);
    }
}

// Initialize the contact form manager
const contactFormManager = new ContactFormManager();

// Initialize the portfolio manager
const portfolio = new PortfolioManager();