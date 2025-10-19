// Portfolio Configuration and Data Management
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
            sectionVisibility: {},
            visibilityOptions: {}
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
                this.config.timeline = portfolioData.timeline || this.getDefaultTimeline();
                this.config.stats = portfolioData.stats || this.getDefaultStats();
                this.config.blogs = portfolioData.blogs || this.getDefaultBlogs();
                this.config.sectionVisibility = portfolioData.sectionVisibility || this.getDefaultSectionVisibility();
                this.config.visibilityOptions = portfolioData.visibilityOptions || this.getDefaultVisibilityOptions();

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
            navbarBg: "rgba(10, 10, 10, 0.95)",
            footerBg: "rgba(10, 10, 10, 0.9)",
            cardBg: "rgba(26, 26, 46, 0.8)",
            panelBg: "rgba(102, 126, 234, 0.1)",
            border: "rgba(102, 126, 234, 0.2)",
            mutedText: "rgba(255, 255, 255, 0.7)",
            gradientStart: "#667eea",
            gradientEnd: "#764ba2"
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

    getDefaultTimeline() {
        return [
            {
                id: 'timeline-1',
                year: "2024",
                title: "Senior Game Developer",
                description: "Leading development of next-gen VR experiences and mentoring junior developers in advanced game mechanics.",
                visible: true
            },
            {
                id: 'timeline-2',
                year: "2022",
                title: "Game Developer",
                description: "Developed multiple successful indie games using Unity and Unreal Engine, focusing on innovative gameplay mechanics.",
                visible: true
            },
            {
                id: 'timeline-3',
                year: "2020",
                title: "Junior Developer",
                description: "Started career in game development, working on mobile games and learning industry best practices.",
                visible: true
            },
            {
                id: 'timeline-4',
                year: "2019",
                title: "Computer Science Graduate",
                description: "Graduated with honors, specializing in computer graphics and game development technologies.",
                visible: true
            }
        ];
    }

    getDefaultStats() {
        return [
            {
                name: "Unity",
                percentage: 95,
                category: "Game Engines"
            },
            {
                name: "C#",
                percentage: 90,
                category: "Programming"
            },
            {
                name: "Unreal Engine",
                percentage: 85,
                category: "Game Engines"
            },
            {
                name: "JavaScript",
                percentage: 80,
                category: "Programming"
            },
            {
                name: "Blender",
                percentage: 75,
                category: "3D Graphics"
            },
            {
                name: "Shader Programming",
                percentage: 70,
                category: "Graphics"
            }
        ];
    }

    getDefaultBlogs() {
        return [
            {
                id: 1,
                title: "The Future of Game Development: VR and Beyond",
                date: "2024-01-15",
                summary: "Exploring the latest trends in virtual reality game development and what the future holds for immersive gaming experiences.",
                content: "Virtual Reality has revolutionized the gaming industry in ways we never imagined. As a game developer who has worked extensively with VR technologies, I've witnessed firsthand how this medium transforms not just how we play games, but how we think about interactive experiences altogether.\n\nThe key to successful VR development lies in understanding the unique constraints and opportunities that the medium presents. Unlike traditional gaming, VR requires developers to think in three dimensions, consider physical comfort, and design for presence rather than just engagement.\n\nIn this post, I'll share insights from my recent VR projects and discuss emerging technologies that will shape the next generation of virtual experiences."
            },
            {
                id: 2,
                title: "Unity vs Unreal: Choosing the Right Engine for Your Project",
                date: "2024-01-08",
                summary: "A comprehensive comparison of Unity and Unreal Engine from a developer's perspective, including performance, workflow, and project considerations.",
                content: "One of the most common questions I receive from aspiring game developers is: 'Should I use Unity or Unreal Engine?' The answer, as with most things in development, is 'it depends.'\n\nBoth engines have their strengths and are capable of producing amazing games. Unity excels in rapid prototyping, has a huge asset store, and is particularly strong for mobile and indie development. Unreal Engine, on the other hand, offers incredible visual fidelity out of the box, powerful Blueprint system, and is often preferred for AAA development.\n\nIn this detailed comparison, I'll break down the key factors you should consider when choosing between these two powerhouse engines."
            },
            {
                id: 3,
                title: "Shader Programming: Creating Visual Magic in Games",
                date: "2023-12-22",
                summary: "An introduction to shader programming and how custom shaders can elevate your game's visual appeal and performance.",
                content: "Shaders are the secret sauce behind stunning game visuals. They're small programs that run on the GPU and control how pixels are rendered on screen. While they might seem intimidating at first, understanding shaders opens up a world of creative possibilities.\n\nIn my experience, custom shaders have been game-changers (pun intended) in several projects. From creating realistic water effects to stylized cartoon rendering, shaders allow developers to achieve unique visual styles that set their games apart.\n\nThis post will guide you through the basics of shader programming, common techniques, and practical examples you can implement in your own projects."
            }
        ];
    }

    getDefaultSectionVisibility() {
        return {
            home: true,
            about: true,
            projects: true,
            skills: true,
            timeline: true,
            stats: true,
            contact: true,
            blog: true,
            header: true
        };
    }

    getDefaultVisibilityOptions() {
        return {
            about: {
                showExperience: true,
                showProjectsCompleted: true,
                showAwards: true
            },
            header: {
                showBlogLink: true,
                showDashboardLink: true
            }
        };
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
        this.config.sectionVisibility = this.getDefaultSectionVisibility();
        this.config.visibilityOptions = this.getDefaultVisibilityOptions();
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

        // Continuous update check removed as requested - keeping only storage event listener
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
        this.applySectionVisibility();
        this.populatePersonalData();
        this.renderProjects();
        this.renderSkills();
        this.renderTimeline();
        this.renderStats();
        this.populateContact();
        this.renderSocialLinks();

        // Profile update notification removed as requested
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

    applySectionVisibility() {
        const visibility = this.config.sectionVisibility;
        const itemVisibility = this.config.visibilityOptions || {};
        
        // Handle sections
        Object.entries(visibility).forEach(([sectionId, isVisible]) => {
            const section = document.getElementById(sectionId);
            if (section) {
                section.style.display = isVisible ? 'block' : 'none';
            }
        });

        // Update navigation links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                if (visibility.hasOwnProperty(sectionId)) {
                    link.style.display = visibility[sectionId] ? 'block' : 'none';
                }
            }
        });

        // Header-only links
        const blogLink = document.querySelector('.nav-menu a[href="blog.html"]');
        if (blogLink) {
            const allowed = (visibility.header !== false) && (!itemVisibility.header || itemVisibility.header.showBlogLink !== false);
            blogLink.style.display = allowed ? '' : 'none';
        }
        const dashboardLink = document.querySelector('.nav-menu a[href="dashboard.html"]');
        if (dashboardLink) {
            const allowed = (visibility.header !== false) && (!itemVisibility.header || itemVisibility.header.showDashboardLink !== false);
            dashboardLink.style.display = allowed ? '' : 'none';
        }

        // About stats items
        const expEl = document.getElementById('experienceYears')?.closest('.stat-item');
        if (expEl) {
            const show = !itemVisibility.about || itemVisibility.about.showExperience !== false;
            expEl.style.display = show ? '' : 'none';
        }
        const projEl = document.getElementById('projectsCount')?.closest('.stat-item');
        if (projEl) {
            const show = !itemVisibility.about || itemVisibility.about.showProjectsCompleted !== false;
            projEl.style.display = show ? '' : 'none';
        }
        const awardsEl = document.getElementById('awardsCount')?.closest('.stat-item');
        if (awardsEl) {
            const show = !itemVisibility.about || itemVisibility.about.showAwards !== false;
            awardsEl.style.display = show ? '' : 'none';
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

    renderTimeline() {
        const container = document.getElementById('timelineItems');
        if (!container) return;

        const timeline = this.config.timeline;

        container.innerHTML = timeline.map((item, index) => `
            <div class="timeline-item fade-in ${item.visible === false ? 'hidden' : ''}" 
                 data-timeline-id="${item.id}" 
                 style="animation-delay: ${index * 0.2}s">
                <div class="timeline-marker">
                    <div class="timeline-year">${item.year}</div>
                </div>
                <div class="timeline-content">
                    <h3 class="timeline-title">
                        ${item.title}
                        <div class="edit-controls">
                            <button class="edit-btn" onclick="portfolio.editTimelineItem('${item.id}')">✎</button>
                            <button class="edit-btn delete-btn" onclick="portfolio.deleteTimelineItem('${item.id}')">✕</button>
                        </div>
                    </h3>
                    <p class="timeline-description">${item.description}</p>
                </div>
            </div>
        `).join('');
        
        this.renderTimelineToggles();
        this.initializeTimelineControls();
    }

    renderStats() {
        const container = document.getElementById('statsGrid');
        if (!container) return;

        const stats = this.config.stats;

        container.innerHTML = stats.map((stat, index) => `
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

        // Animate progress bars after a delay
        setTimeout(() => {
            this.animateStatsBars();
        }, 500);
    }

    animateStatsBars() {
        const progressBars = document.querySelectorAll('.stat-progress');
        
        progressBars.forEach((bar, index) => {
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

// Contact form and sending functionality removed as requested

    // Timeline Management Methods
    renderTimelineToggles() {
        const container = document.getElementById('timelineToggles');
        if (!container) return;

        const timeline = this.config.timeline;

        container.innerHTML = timeline.map(item => `
            <div class="timeline-toggle">
                <span class="toggle-label">${item.year} - ${item.title}</span>
                <div class="toggle-switch ${item.visible !== false ? 'active' : ''}" 
                     onclick="portfolio.toggleTimelineItem('${item.id}')">
                </div>
            </div>
        `).join('');
    }

    initializeTimelineControls() {
        // Timeline size control
        const sizeControl = document.getElementById('timelineSize');
        if (sizeControl) {
            sizeControl.addEventListener('change', (e) => {
                this.updateTimelineSize(e.target.value);
            });
        }

        // Item spacing control
        const spacingControl = document.getElementById('itemSpacing');
        if (spacingControl) {
            spacingControl.addEventListener('input', (e) => {
                this.updateItemSpacing(e.target.value);
                e.target.nextElementSibling.textContent = e.target.value + 'px';
            });
        }

        // Font size control
        const fontSizeControl = document.getElementById('fontSize');
        if (fontSizeControl) {
            fontSizeControl.addEventListener('input', (e) => {
                this.updateFontSize(e.target.value);
                e.target.nextElementSibling.textContent = e.target.value + 'px';
            });
        }

        // Add new section button
        const addButton = document.getElementById('addTimelineSection');
        if (addButton) {
            addButton.addEventListener('click', () => {
                this.addNewTimelineSection();
            });
        }
    }

    updateTimelineSize(size) {
        const container = document.getElementById('timelineItems');
        if (container) {
            container.className = `timeline-items ${size}`;
        }
    }

    updateItemSpacing(spacing) {
        const container = document.getElementById('timelineItems');
        if (container) {
            container.style.setProperty('--timeline-spacing', spacing + 'px');
        }
    }

    updateFontSize(fontSize) {
        const container = document.getElementById('timelineItems');
        if (container) {
            container.style.setProperty('--timeline-font-size', fontSize + 'px');
            container.style.setProperty('--timeline-title-size', (parseFloat(fontSize) * 1.2) + 'px');
        }
    }

    toggleTimelineItem(itemId) {
        const item = this.config.timeline.find(t => t.id === itemId);
        if (item) {
            item.visible = !item.visible;
            this.renderTimeline();
            this.saveConfiguration();
        }
    }

    editTimelineItem(itemId) {
        const item = this.config.timeline.find(t => t.id === itemId);
        if (!item) return;

        const newYear = prompt('Enter year:', item.year);
        if (newYear === null) return;

        const newTitle = prompt('Enter title:', item.title);
        if (newTitle === null) return;

        const newDescription = prompt('Enter description:', item.description);
        if (newDescription === null) return;

        item.year = newYear;
        item.title = newTitle;
        item.description = newDescription;

        this.renderTimeline();
        this.saveConfiguration();
    }

    deleteTimelineItem(itemId) {
        if (!confirm('Are you sure you want to delete this timeline item?')) return;

        this.config.timeline = this.config.timeline.filter(t => t.id !== itemId);
        this.renderTimeline();
        this.saveConfiguration();
    }

    addNewTimelineSection() {
        const year = prompt('Enter year:');
        if (!year) return;

        const title = prompt('Enter title:');
        if (!title) return;

        const description = prompt('Enter description:');
        if (!description) return;

        const newItem = {
            id: 'timeline-' + Date.now(),
            year: year,
            title: title,
            description: description,
            visible: true
        };

        // Insert in chronological order (newest first)
        const insertIndex = this.config.timeline.findIndex(item => 
            parseInt(item.year) < parseInt(year)
        );
        
        if (insertIndex === -1) {
            this.config.timeline.push(newItem);
        } else {
            this.config.timeline.splice(insertIndex, 0, newItem);
        }

        this.renderTimeline();
        this.saveConfiguration();
    }

    saveConfiguration() {
        // Save the current configuration to localStorage
        const portfolioData = {
            colors: this.config.colors,
            personal: this.config.personal,
            projects: this.config.projects,
            skills: this.config.skills,
            contact: this.config.contact,
            social: this.config.social,
            timeline: this.config.timeline,
            stats: this.config.stats,
            blogs: this.config.blogs,
            sectionVisibility: this.config.sectionVisibility,
            visibilityOptions: this.config.visibilityOptions
        };
        
        localStorage.setItem('portfolioData', JSON.stringify(portfolioData));
    }
}

// Initialize the portfolio manager
const portfolio = new PortfolioManager();

// Make portfolio globally accessible
window.portfolio = portfolio;