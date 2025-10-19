// Blog Page Manager
class BlogManager {
    constructor() {
        this.config = {
            colors: {},
            blogs: [],
            social: [],
            sectionVisibility: {}
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
                console.log('Loading blog data from dashboard...');
                const portfolioData = JSON.parse(savedData);

                this.config.colors = portfolioData.colors || this.getDefaultColors();
                this.config.blogs = portfolioData.blogs || this.getDefaultBlogs();
                this.config.social = portfolioData.social || this.getDefaultSocial();
                this.config.sectionVisibility = portfolioData.sectionVisibility || this.getDefaultSectionVisibility();

                console.log('Blog data loaded successfully from dashboard');
            } else {
                console.log('No dashboard data found, loading from JSON...');
                await this.loadFromJSON();
            }

        } catch (error) {
            console.warn('Error loading configuration, using defaults:', error);
            this.loadDefaults();
        }
    }

    async loadFromJSON() {
        try {
            const response = await fetch('portfolio-complete.json');
            const data = await response.json();
            
            this.config.colors = data.colors || this.getDefaultColors();
            this.config.blogs = data.blogs || this.getDefaultBlogs();
            this.config.social = data.social || this.getDefaultSocial();
            this.config.sectionVisibility = data.sectionVisibility || this.getDefaultSectionVisibility();
        } catch (error) {
            console.warn('Error loading JSON, using defaults:', error);
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

    getDefaultSocial() {
        return [
            { name: "GitHub", url: "https://github.com", icon: "🔗" },
            { name: "LinkedIn", url: "https://linkedin.com", icon: "💼" },
            { name: "Twitter", url: "https://twitter.com", icon: "🐦" },
            { name: "Portfolio", url: "#", icon: "🌐" }
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
            blog: true
        };
    }

    loadDefaults() {
        this.config.colors = this.getDefaultColors();
        this.config.blogs = this.getDefaultBlogs();
        this.config.social = this.getDefaultSocial();
        this.config.sectionVisibility = this.getDefaultSectionVisibility();
    }

    initializeComponents() {
        this.applyColors();
        this.checkBlogVisibility();
        this.renderBlogs();
        this.renderSocialLinks();
        this.initializeNavigation();
        this.initializeParticles();
        this.initializeBlogModal();
    }

    checkBlogVisibility() {
        // If blog section is disabled, redirect to main page
        if (!this.config.sectionVisibility.blog) {
            window.location.href = 'index.html';
            return;
        }
    }

    applyColors() {
        const root = document.documentElement;
        Object.entries(this.config.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });

        // Apply colors to specific elements
        document.querySelectorAll('.blog-title').forEach(el => {
            el.style.background = `linear-gradient(45deg, ${this.config.colors.primary}, ${this.config.colors.secondary}, ${this.config.colors.accent})`;
            el.style.webkitBackgroundClip = 'text';
            el.style.webkitTextFillColor = 'transparent';
            el.style.backgroundClip = 'text';
        });
    }

    renderBlogs() {
        const container = document.getElementById('blogGrid');
        if (!container) return;

        const blogs = this.config.blogs;

        if (blogs.length === 0) {
            container.innerHTML = `
                <div class="no-blogs">
                    <h3>No blog posts available</h3>
                    <p>Check back later for new content!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = blogs.map((blog, index) => `
            <article class="blog-card fade-in" style="animation-delay: ${index * 0.1}s" data-blog-id="${blog.id}">
                <div class="blog-card-content">
                    <div class="blog-date">${this.formatDate(blog.date)}</div>
                    <h3 class="blog-card-title">${blog.title}</h3>
                    <p class="blog-card-summary">${blog.summary}</p>
                    <button class="blog-read-more" onclick="blogManager.openBlogModal(${blog.id})">
                        Read More <span class="arrow">→</span>
                    </button>
                </div>
            </article>
        `).join('');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    openBlogModal(blogId) {
        const blog = this.config.blogs.find(b => b.id === blogId);
        if (!blog) return;

        const modal = document.getElementById('blogModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDate = document.getElementById('modalDate');
        const modalContent = document.getElementById('modalContent');

        modalTitle.textContent = blog.title;
        modalDate.textContent = this.formatDate(blog.date);
        modalContent.innerHTML = blog.content.split('\n\n').map(paragraph => 
            `<p>${paragraph}</p>`
        ).join('');

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeBlogModal() {
        const modal = document.getElementById('blogModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    initializeBlogModal() {
        const modal = document.getElementById('blogModal');
        const closeBtn = document.getElementById('modalClose');

        closeBtn.addEventListener('click', () => {
            this.closeBlogModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeBlogModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                this.closeBlogModal();
            }
        });
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

        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                this.createParticle(container);
            }, i * 200);
        }

        // Continuously create new particles
        setInterval(() => {
            this.createParticle(container);
        }, 4000);
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
        }, 1500);
    }
}

// Initialize the blog manager
const blogManager = new BlogManager();