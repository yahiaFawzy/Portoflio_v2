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
            text: "#ffffff"
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
        this.config.personal = this.getDefaultPersonalData();
        this.config.projects = this.getDefaultProjects();
        this.config.skills = this.getDefaultSkills();
        this.config.contact = this.getDefaultContact();
        this.config.social = this.getDefaultSocial();
    }

    initializeComponents() {
        this.applyColors();
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

        const projects = this.config.projects.filter(p => p.featured).slice(0, 6);

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
        particle.style.background = this.config.colors.primary;

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
                const primaryColor = this.config.colors.primary;
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

// Form handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }
});

// Initialize the portfolio manager
const portfolio = new PortfolioManager();