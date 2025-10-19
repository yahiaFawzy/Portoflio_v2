class DashboardManager {
    constructor() {
        this.currentFile = 'colors';
        this.currentTab = 'form';
        this.data = {};
        this.init();
    }

    init() {
        this.loadDataFromStorage();
        this.setupEventListeners();
        this.renderCurrentFile();
    }

    // Load data from localStorage or use defaults
    loadDataFromStorage() {
        const savedData = localStorage.getItem('portfolioData');

        if (savedData) {
            try {
                this.data = JSON.parse(savedData);
                this.showStatus('Data loaded from local storage', 'success');
            } catch (error) {
                this.loadDefaultData();
                this.showStatus('Error loading saved data, using defaults', 'error');
            }
        } else {
            this.loadDefaultData();
        }
    }

    // Save data to localStorage
    saveDataToStorage() {
        try {
            localStorage.setItem('portfolioData', JSON.stringify(this.data));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    loadDefaultData() {
        this.data = {
            colors: {
                primary: "#64ffda",
                secondary: "#667eea",
                accent: "#ff6b6b",
                background: "#0a0a0a",
                surface: "#1a1a2e",
                text: "#ffffff",
                // Additional color options
                success: "#4caf50",
                warning: "#ff9800",
                error: "#f44336",
                info: "#2196f3",
                muted: "#6c757d",
                light: "#f8f9fa",
                dark: "#343a40",
                // Gradient colors
                gradientStart: "#667eea",
                gradientEnd: "#764ba2",
                // Border and shadow colors
                border: "rgba(100, 255, 218, 0.2)",
                shadow: "rgba(0, 0, 0, 0.3)",
                // Hover states
                primaryHover: "#4fd3b8",
                secondaryHover: "#5a6fd8",
                accentHover: "#ff5252"
            },
            visibility: {
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
            },
            personal: {
                name: "Alex Johnson",
                title: "Game Developer & Designer",
                about: "Passionate game developer with 5+ years of experience creating immersive interactive experiences. Specialized in Unity, Unreal Engine, and cutting-edge game technologies. I believe in the power of games to tell stories, connect people, and create unforgettable moments.",
                experienceYears: 5,
                projectsCompleted: 23,
                awards: 7,
                profileImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23667eea'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='60' fill='white' text-anchor='middle' dy='.3em'%3EAJ%3C/text%3E%3C/svg%3E"
            },
            projects: [
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
            ],
            skills: {
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
            },
            contact: {
                email: "alex@gamedev.com",
                phone: "+1 (555) 123-4567",
                whatsapp: "+15551234567", // WhatsApp number (international format)
                location: "San Francisco, CA"
            },
            social: [
                { name: "GitHub", url: "https://github.com", icon: "🔗" },
                { name: "LinkedIn", url: "https://linkedin.com", icon: "💼" },
                { name: "Twitter", url: "https://twitter.com", icon: "🐦" }
            ]
        };
    }

    // Export data to JSON file with folder selection
    async exportData(filename = null) {
        const dataToExport = filename ? this.data[filename] : this.data;
        const exportName = filename || 'portfolio-complete';

        // Try to save to user-selected location first
        const saved = await this.saveToJsonFile(exportName, dataToExport);
        
        if (saved) {
            this.showStatus(`${exportName}.json exported successfully to selected folder!`, 'success');
        } else {
            // Fallback message for download
            this.showStatus(`${exportName}.json downloaded to default Downloads folder`, 'success');
        }
    }

    // Import data from JSON file
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const importedData = JSON.parse(e.target.result);

                        // Check if it's a complete portfolio or single section
                        if (importedData.colors && importedData.personal) {
                            // Complete portfolio import
                            this.data = importedData;
                            this.saveDataToStorage();
                            this.showStatus('Complete portfolio data imported successfully!', 'success');
                        } else {
                            // Single section import
                            this.data[this.currentFile] = importedData;
                            this.saveDataToStorage();
                            this.showStatus(`${this.currentFile} data imported successfully!`, 'success');
                        }

                        this.renderCurrentFile();
                    } catch (error) {
                        this.showStatus('Error importing file: Invalid JSON format', 'error');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    // Clear all data
    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            localStorage.removeItem('portfolioData');
            this.loadDefaultData();
            this.renderCurrentFile();
            this.showStatus('All data cleared and reset to defaults', 'success');
        }
    }

    setupEventListeners() {
        // File selection
        document.querySelectorAll('.file-item').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.file-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                this.currentFile = item.dataset.file;
                this.renderCurrentFile();
            });
        });

        // Tab switching
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                tab.classList.add('active');
                this.currentTab = tab.dataset.tab;
                document.getElementById(this.currentTab + 'Tab').classList.add('active');

                if (this.currentTab === 'json') {
                    this.updateJSONEditor();
                } else if (this.currentTab === 'preview') {
                    this.updatePreview();
                }
            });
        });
    }

    renderCurrentFile() {
        const titles = {
            colors: 'Colors Configuration',
            visibility: 'Visibility Controls',
            personal: 'Personal Data',
            projects: 'Projects',
            skills: 'Skills & Technologies',
            contact: 'Contact Information',
            social: 'Social Links'
        };

        document.getElementById('contentTitle').textContent = titles[this.currentFile];
        this.renderFormEditor();
        this.updateJSONEditor();
        this.updatePreview();
    }

    renderFormEditor() {
        const container = document.getElementById('formEditor');
        const data = this.data[this.currentFile];

        switch (this.currentFile) {
            case 'colors':
                container.innerHTML = this.renderColorsForm(data);
                break;
            case 'visibility':
                container.innerHTML = this.renderVisibilityForm(data);
                break;
            case 'personal':
                container.innerHTML = this.renderPersonalForm(data);
                break;
            case 'projects':
                container.innerHTML = this.renderProjectsForm(data);
                break;
            case 'skills':
                container.innerHTML = this.renderSkillsForm(data);
                break;
            case 'contact':
                container.innerHTML = this.renderContactForm(data);
                break;
            case 'social':
                container.innerHTML = this.renderSocialForm(data);
                break;
        }

        this.bindFormEvents();
    }

    renderVisibilityForm(data) {
        const sections = {
            'Header Section': {
                icon: '🔝',
                items: {
                    logo: 'Logo/Brand',
                    navigation: 'Navigation Menu',
                    dashboardLink: 'Dashboard Link',
                    mobileMenu: 'Mobile Menu'
                }
            },
            'Hero Section': {
                icon: '🎯',
                items: {
                    title: 'Main Title',
                    subtitle: 'Subtitle',
                    buttons: 'Action Buttons',
                    scrollIndicator: 'Scroll Indicator',
                    backgroundCanvas: 'Animated Background'
                }
            },
            'About Section': {
                icon: '👤',
                items: {
                    title: 'Section Title',
                    description: 'About Description',
                    profileImage: 'Profile Image',
                    experienceYears: 'Experience Years',
                    projectsCompleted: 'Projects Count',
                    awards: 'Awards Count'
                }
            },
            'Projects Section': {
                icon: '🚀',
                items: {
                    title: 'Section Title',
                    projectGrid: 'Project Grid',
                    featuredOnly: 'Show Featured Only'
                }
            },
            'Skills Section': {
                icon: '💪',
                items: {
                    title: 'Section Title',
                    categories: 'Skill Categories',
                    icons: 'Category Icons'
                }
            },
            'Contact Section': {
                icon: '📞',
                items: {
                    title: 'Section Title',
                    contactInfo: 'Contact Information',
                    email: 'Email Display',
                    phone: 'Phone Display',
                    location: 'Location Display',
                    contactForm: 'Contact Form',
                    socialLinks: 'Social Links'
                }
            },
            'Footer Section': {
                icon: '🔻',
                items: {
                    copyright: 'Copyright Text',
                    socialLinks: 'Social Links'
                }
            },
            'Visual Effects': {
                icon: '✨',
                items: {
                    particles: 'Particle Effects',
                    scrollAnimations: 'Scroll Animations',
                    loadingScreen: 'Loading Screen',
                    glitchEffect: 'Glitch Effects'
                }
            }
        };

        return `
            <div class="form-section">
                <h3 class="form-section-title">👁️ Visibility Controls</h3>
                <p class="form-description">Control the visibility of individual elements across your portfolio. Toggle any item on or off to customize your layout.</p>
                
                ${Object.entries(sections).map(([sectionName, sectionData]) => {
                    // Map section names to actual data keys
                    const sectionKeyMap = {
                        'Header Section': 'header',
                        'Hero Section': 'hero',
                        'About Section': 'about',
                        'Projects Section': 'projects',
                        'Skills Section': 'skills',
                        'Contact Section': 'contact',
                        'Footer Section': 'footer',
                        'Visual Effects': 'effects'
                    };
                    const sectionKey = sectionKeyMap[sectionName] || sectionName.toLowerCase().replace(/\s+/g, '').replace('section', '');
                    const sectionVisibility = data[sectionKey] || {};
                    
                    return `
                        <div class="visibility-section">
                            <h4 class="visibility-section-title">
                                <span class="section-icon">${sectionData.icon}</span>
                                ${sectionName}
                                <button class="toggle-all-btn" onclick="dashboard.toggleSectionVisibility('${sectionKey}')">
                                    Toggle All
                                </button>
                            </h4>
                            <div class="visibility-grid">
                                ${Object.entries(sectionData.items).map(([itemKey, itemName]) => {
                                    const isVisible = sectionVisibility[itemKey] !== false;
                                    return `
                                        <div class="visibility-item">
                                            <label class="visibility-label">
                                                <input type="checkbox" 
                                                       class="visibility-checkbox" 
                                                       ${isVisible ? 'checked' : ''} 
                                                       data-section="${sectionKey}" 
                                                       data-item="${itemKey}">
                                                <span class="checkbox-custom"></span>
                                                <span class="item-name">${itemName}</span>
                                            </label>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
                
                <div class="visibility-presets">
                    <h4 class="visibility-section-title">🎛️ Quick Presets</h4>
                    <div class="preset-buttons">
                        <button class="preset-btn" onclick="dashboard.applyVisibilityPreset('minimal')">🔹 Minimal</button>
                        <button class="preset-btn" onclick="dashboard.applyVisibilityPreset('professional')">💼 Professional</button>
                        <button class="preset-btn" onclick="dashboard.applyVisibilityPreset('showcase')">🎨 Showcase</button>
                        <button class="preset-btn" onclick="dashboard.applyVisibilityPreset('complete')">🌟 Complete</button>
                        <button class="preset-btn" onclick="dashboard.applyVisibilityPreset('landing')">🎯 Landing Page</button>
                    </div>
                </div>
                
                <div class="editor-actions">
                    <button class="btn btn-primary" onclick="dashboard.saveFormData()">💾 Save Changes</button>
                    <button class="btn btn-secondary" onclick="dashboard.exportData(dashboard.currentFile)">📤 Export This Section</button>
                    <button class="btn btn-secondary" onclick="dashboard.resetVisibility()">🔄 Reset to Default</button>
                </div>
            </div>
        `;
    }

    renderColorsForm(data) {
        const colorGroups = {
            'Primary Colors': ['primary', 'secondary', 'accent'],
            'Background Colors': ['background', 'surface', 'text'],
            'Status Colors': ['success', 'warning', 'error', 'info'],
            'Additional Colors': ['muted', 'light', 'dark'],
            'Gradient Colors': ['gradientStart', 'gradientEnd'],
            'Interactive Colors': ['primaryHover', 'secondaryHover', 'accentHover'],
            'Border & Shadow': ['border', 'shadow']
        };

        return `
            <div class="form-section">
                <h3 class="form-section-title">🎨 Enhanced Color Palette</h3>
                <p class="form-description">Customize every aspect of your portfolio's color scheme with granular control over all UI elements.</p>
                
                ${Object.entries(colorGroups).map(([groupName, colorKeys]) => `
                    <div class="color-group">
                        <h4 class="color-group-title">${groupName}</h4>
                        <div class="color-grid">
                            ${colorKeys.map(key => {
                                const value = data[key] || '#000000';
                                const displayName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                                return `
                                    <div class="color-item">
                                        <label class="color-label">${displayName}</label>
                                        <div class="color-input-group">
                                            <input type="color" class="color-input" value="${value}" data-field="${key}">
                                            <input type="text" class="color-text-input" value="${value}" data-field="${key}" placeholder="#000000">
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `).join('')}
                
                <div class="color-presets">
                    <h4 class="color-group-title">🎯 Quick Presets</h4>
                    <div class="preset-buttons">
                        <button class="preset-btn" onclick="dashboard.applyColorPreset('cyberpunk')">🌃 Cyberpunk</button>
                        <button class="preset-btn" onclick="dashboard.applyColorPreset('ocean')">🌊 Ocean</button>
                        <button class="preset-btn" onclick="dashboard.applyColorPreset('sunset')">🌅 Sunset</button>
                        <button class="preset-btn" onclick="dashboard.applyColorPreset('forest')">🌲 Forest</button>
                        <button class="preset-btn" onclick="dashboard.applyColorPreset('monochrome')">⚫ Monochrome</button>
                        <button class="preset-btn" onclick="dashboard.applyColorPreset('neon')">💡 Neon</button>
                    </div>
                </div>
                
                <div class="editor-actions">
                    <button class="btn btn-primary" onclick="dashboard.saveFormData()">💾 Save Changes</button>
                    <button class="btn btn-secondary" onclick="dashboard.exportData(dashboard.currentFile)">📤 Export This Section</button>
                    <button class="btn btn-secondary" onclick="dashboard.resetColors()">🔄 Reset to Default</button>
                </div>
            </div>
        `;
    }

    renderPersonalForm(data) {
        return `
            <div class="form-section">
                <h3 class="form-section-title">👤 Personal Information</h3>
                <div class="form-group">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-input" value="${data.name}" data-field="name">
                </div>
                <div class="form-group">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-input" value="${data.title}" data-field="title">
                </div>
                <div class="form-group">
                    <label class="form-label">About</label>
                    <textarea class="form-input form-textarea" data-field="about">${data.about}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Experience Years</label>
                    <input type="number" class="form-input" value="${data.experienceYears}" data-field="experienceYears">
                </div>
                <div class="form-group">
                    <label class="form-label">Projects Completed</label>
                    <input type="number" class="form-input" value="${data.projectsCompleted}" data-field="projectsCompleted">
                </div>
                <div class="form-group">
                    <label class="form-label">Awards</label>
                    <input type="number" class="form-input" value="${data.awards}" data-field="awards">
                </div>
                <div class="form-group">
                    <label class="form-label">Profile Image URL</label>
                    <input type="url" class="form-input" value="${data.profileImage}" data-field="profileImage">
                </div>
                <div class="editor-actions">
                    <button class="btn btn-primary" onclick="dashboard.saveFormData()">💾 Save Changes</button>
                    <button class="btn btn-secondary" onclick="dashboard.exportData(dashboard.currentFile)">📤 Export This Section</button>
                </div>
            </div>
        `;
    }

    renderProjectsForm(data) {
        return `
            <div class="form-section">
                <h3 class="form-section-title">🚀 Projects</h3>
                <div id="projectsList">
                    ${data.map((project, index) => `
                        <div class="project-item" data-index="${index}" style="margin-bottom: 30px; padding: 20px; background: rgba(10,10,10,0.3); border-radius: 10px;">
                            <h4 style="color: #64ffda; margin-bottom: 15px;">Project ${index + 1}</h4>
                            <div class="form-group">
                                <label class="form-label">Title</label>
                                <input type="text" class="form-input" value="${project.title}" data-field="title" data-index="${index}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Description</label>
                                <textarea class="form-input form-textarea" data-field="description" data-index="${index}">${project.description}</textarea>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Image URL</label>
                                <input type="url" class="form-input" value="${project.image}" data-field="image" data-index="${index}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Technologies (comma-separated)</label>
                                <input type="text" class="form-input" value="${project.technologies.join(', ')}" data-field="technologies" data-index="${index}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Live URL</label>
                                <input type="url" class="form-input" value="${project.liveUrl}" data-field="liveUrl" data-index="${index}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">GitHub URL</label>
                                <input type="url" class="form-input" value="${project.githubUrl}" data-field="githubUrl" data-index="${index}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">
                                    <input type="checkbox" ${project.featured ? 'checked' : ''} data-field="featured" data-index="${index}" style="margin-right: 8px;">
                                    Featured Project
                                </label>
                            </div>
                            <button class="remove-btn" onclick="dashboard.removeProject(${index})">🗑️ Remove Project</button>
                        </div>
                    `).join('')}
                </div>
                <button class="add-btn" onclick="dashboard.addProject()">➕ Add New Project</button>
                <div class="editor-actions">
                    <button class="btn btn-primary" onclick="dashboard.saveFormData()">💾 Save Changes</button>
                    <button class="btn btn-secondary" onclick="dashboard.exportData(dashboard.currentFile)">📤 Export This Section</button>
                </div>
            </div>
        `;
    }

    renderSkillsForm(data) {
        return `
            <div class="form-section">
                <h3 class="form-section-title">💪 Skills & Technologies</h3>
                <div id="skillsList">
                    ${Object.entries(data).map(([category, info]) => `
                        <div class="skill-category-item" data-category="${category}" style="margin-bottom: 25px; padding: 15px; background: rgba(10,10,10,0.3); border-radius: 8px;">
                            <div class="form-group">
                                <label class="form-label">Category Name</label>
                                <input type="text" class="form-input" value="${category}" data-field="categoryName" data-category="${category}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Icon</label>
                                <input type="text" class="form-input" value="${info.icon}" data-field="icon" data-category="${category}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Skills (comma-separated)</label>
                                <input type="text" class="form-input" value="${info.skills.join(', ')}" data-field="skills" data-category="${category}">
                            </div>
                            <button class="remove-btn" onclick="dashboard.removeSkillCategory('${category}')">🗑️ Remove Category</button>
                        </div>
                    `).join('')}
                </div>
                <button class="add-btn" onclick="dashboard.addSkillCategory()">➕ Add New Category</button>
                <div class="editor-actions">
                    <button class="btn btn-primary" onclick="dashboard.saveFormData()">💾 Save Changes</button>
                    <button class="btn btn-secondary" onclick="dashboard.exportData(dashboard.currentFile)">📤 Export This Section</button>
                </div>
            </div>
        `;
    }

    renderContactForm(data) {
        return `
            <div class="form-section">
                <h3 class="form-section-title">📞 Contact Information</h3>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-input" value="${data.email}" data-field="email">
                </div>
                <div class="form-group">
                    <label class="form-label">Phone</label>
                    <input type="tel" class="form-input" value="${data.phone}" data-field="phone">
                </div>
                <div class="form-group">
                    <label class="form-label">WhatsApp Number (international format: +1234567890)</label>
                    <input type="tel" class="form-input" value="${data.whatsapp || data.phone}" data-field="whatsapp" placeholder="+1234567890">
                </div>
                <div class="form-group">
                    <label class="form-label">Location</label>
                    <input type="text" class="form-input" value="${data.location}" data-field="location">
                </div>
                <div class="editor-actions">
                    <button class="btn btn-primary" onclick="dashboard.saveFormData()">💾 Save Changes</button>
                    <button class="btn btn-secondary" onclick="dashboard.exportData(dashboard.currentFile)">📤 Export This Section</button>
                </div>
            </div>
        `;
    }

    renderSocialForm(data) {
        return `
            <div class="form-section">
                <h3 class="form-section-title">🌐 Social Links</h3>
                <div id="socialList">
                    ${data.map((social, index) => `
                        <div class="social-item" data-index="${index}" style="margin-bottom: 20px; padding: 15px; background: rgba(10,10,10,0.3); border-radius: 8px;">
                            <div class="form-group">
                                <label class="form-label">Name</label>
                                <input type="text" class="form-input" value="${social.name}" data-field="name" data-index="${index}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">URL</label>
                                <input type="url" class="form-input" value="${social.url}" data-field="url" data-index="${index}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Icon</label>
                                <input type="text" class="form-input" value="${social.icon}" data-field="icon" data-index="${index}">
                            </div>
                            <button class="remove-btn" onclick="dashboard.removeSocialLink(${index})">🗑️ Remove Link</button>
                        </div>
                    `).join('')}
                </div>
                <button class="add-btn" onclick="dashboard.addSocialLink()">➕ Add New Link</button>
                <div class="editor-actions">
                    <button class="btn btn-primary" onclick="dashboard.saveFormData()">💾 Save Changes</button>
                    <button class="btn btn-secondary" onclick="dashboard.exportData(dashboard.currentFile)">📤 Export This Section</button>
                </div>
            </div>
        `;
    }

    bindFormEvents() {
        // Color inputs synchronization
        document.querySelectorAll('.color-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const textInput = e.target.parentNode.querySelector('input[type="text"]');
                textInput.value = e.target.value;
            });
        });

        document.querySelectorAll('input[type="text"][data-field]').forEach(input => {
            if (input.parentNode.querySelector('.color-input')) {
                input.addEventListener('input', (e) => {
                    const colorInput = e.target.parentNode.querySelector('.color-input');
                    if (colorInput) {
                        colorInput.value = e.target.value;
                    }
                });
            }
        });
    }

    // File saving functionality - saves to JSON files in directory
    async saveToJsonFile(filename, data) {
        const jsonString = JSON.stringify(data, null, 2);

        // Try File System Access API first (Chrome/Edge)
        if ('showSaveFilePicker' in window) {
            try {
                const fileHandle = await window.showSaveFilePicker({
                    suggestedName: `${filename}.json`,
                    types: [{
                        description: 'JSON files',
                        accept: { 'application/json': ['.json'] }
                    }]
                });

                const writable = await fileHandle.createWritable();
                await writable.write(jsonString);
                await writable.close();

                return true;
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('File System Access API error:', error);
                }
            }
        }

        // Fallback to download method
        this.downloadJsonFile(filename, jsonString);
        return false;
    }

    downloadJsonFile(filename, jsonString) {
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    saveFormData() {
        try {
            const container = document.getElementById('formEditor');

            switch (this.currentFile) {
                case 'colors':
                    this.saveColorsData();
                    break;
                case 'visibility':
                    this.saveVisibilityData();
                    break;
                case 'personal':
                    this.savePersonalData();
                    break;
                case 'projects':
                    this.saveProjectsData();
                    break;
                case 'skills':
                    this.saveSkillsData();
                    break;
                case 'contact':
                    this.saveContactData();
                    break;
                case 'social':
                    this.saveSocialData();
                    break;
            }

            // Save to localStorage
            const saved = this.saveDataToStorage();

            if (saved) {
                this.showStatus(`${this.currentFile} data saved to local storage!`, 'success');
            } else {
                this.showStatus('Error saving to local storage', 'error');
            }

            this.updateJSONEditor();
            this.updatePreview();

        } catch (error) {
            this.showStatus('Error saving data: ' + error.message, 'error');
        }
    }

    saveColorsData() {
        const inputs = document.querySelectorAll('#formEditor input[data-field]');
        inputs.forEach(input => {
            this.data.colors[input.dataset.field] = input.value;
        });
    }

    saveVisibilityData() {
        const checkboxes = document.querySelectorAll('#formEditor .visibility-checkbox');
        checkboxes.forEach(checkbox => {
            const section = checkbox.dataset.section;
            const item = checkbox.dataset.item;
            
            if (!this.data.visibility[section]) {
                this.data.visibility[section] = {};
            }
            
            this.data.visibility[section][item] = checkbox.checked;
        });
    }

    savePersonalData() {
        const inputs = document.querySelectorAll('#formEditor input[data-field], #formEditor textarea[data-field]');
        inputs.forEach(input => {
            const value = input.type === 'number' ? parseInt(input.value) : input.value;
            this.data.personal[input.dataset.field] = value;
        });
    }

    saveProjectsData() {
        const projects = [];
        const projectItems = document.querySelectorAll('.project-item');

        projectItems.forEach((item, index) => {
            const project = { id: index + 1 };
            const inputs = item.querySelectorAll('input, textarea');

            inputs.forEach(input => {
                const field = input.dataset.field;
                if (field === 'technologies') {
                    project[field] = input.value.split(',').map(t => t.trim()).filter(t => t);
                } else if (field === 'featured') {
                    project[field] = input.checked;
                } else {
                    project[field] = input.value;
                }
            });

            projects.push(project);
        });

        this.data.projects = projects;
    }

    saveSkillsData() {
        const skills = {};
        const categoryItems = document.querySelectorAll('.skill-category-item');

        categoryItems.forEach(item => {
            const originalCategory = item.dataset.category;
            const inputs = item.querySelectorAll('input[data-field]');
            let newCategoryName = originalCategory;

            inputs.forEach(input => {
                const field = input.dataset.field;
                if (field === 'categoryName') {
                    newCategoryName = input.value;
                } else if (field === 'icon') {
                    if (!skills[newCategoryName]) skills[newCategoryName] = {};
                    skills[newCategoryName].icon = input.value;
                } else if (field === 'skills') {
                    if (!skills[newCategoryName]) skills[newCategoryName] = {};
                    skills[newCategoryName].skills = input.value.split(',').map(s => s.trim()).filter(s => s);
                }
            });
        });

        this.data.skills = skills;
    }

    saveContactData() {
        const inputs = document.querySelectorAll('#formEditor input[data-field]');
        inputs.forEach(input => {
            this.data.contact[input.dataset.field] = input.value;
        });
    }

    saveSocialData() {
        const social = [];
        const socialItems = document.querySelectorAll('.social-item');

        socialItems.forEach(item => {
            const socialLink = {};
            const inputs = item.querySelectorAll('input[data-field]');

            inputs.forEach(input => {
                socialLink[input.dataset.field] = input.value;
            });

            social.push(socialLink);
        });

        this.data.social = social;
    }

    updateJSONEditor() {
        const editor = document.getElementById('jsonEditor');
        let dataForEditor = this.data[this.currentFile];
        if (this.currentFile === 'visibility') {
            dataForEditor = {
                sectionVisibility: this.data.sectionVisibility || {},
                visibilityOptions: this.data.visibilityOptions || {}
            };
        }
        editor.value = JSON.stringify(dataForEditor, null, 2);
    }

    updatePreview() {
        const preview = document.getElementById('jsonPreview');
        let dataForPreview = this.data[this.currentFile];
        if (this.currentFile === 'visibility') {
            dataForPreview = {
                sectionVisibility: this.data.sectionVisibility || {},
                visibilityOptions: this.data.visibilityOptions || {}
            };
        }
        preview.innerHTML = this.syntaxHighlight(JSON.stringify(dataForPreview, null, 2));
    }

    syntaxHighlight(json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'json-number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'json-key';
                } else {
                    cls = 'json-string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'json-boolean';
            } else if (/null/.test(match)) {
                cls = 'json-null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    showStatus(message, type) {
        const statusEl = document.getElementById('statusMessage');
        statusEl.textContent = message;
        statusEl.className = `status-message status-${type}`;
        statusEl.style.display = 'block';

        setTimeout(() => {
            statusEl.style.display = 'none';
        }, 3000);
    }

    // Project management methods
    addProject() {
        const newProject = {
            id: this.data.projects.length + 1,
            title: "New Project",
            description: "Project description here...",
            image: "",
            technologies: [],
            liveUrl: "#",
            githubUrl: "#",
            featured: false
        };

        this.data.projects.push(newProject);
        this.renderCurrentFile();
    }

    removeProject(index) {
        if (confirm('Are you sure you want to remove this project?')) {
            this.data.projects.splice(index, 1);
            this.renderCurrentFile();
        }
    }

    // Skills management methods
    addSkillCategory() {
        const categoryName = prompt('Enter category name:');
        if (categoryName) {
            this.data.skills[categoryName] = {
                icon: "🔧",
                skills: []
            };
            this.renderCurrentFile();
        }
    }

    removeSkillCategory(category) {
        if (confirm(`Are you sure you want to remove the "${category}" category?`)) {
            delete this.data.skills[category];
            this.renderCurrentFile();
        }
    }

    // Social links management methods
    addSocialLink() {
        const newLink = {
            name: "New Platform",
            url: "https://",
            icon: "🔗"
        };

        this.data.social.push(newLink);
        this.renderCurrentFile();
    }

    removeSocialLink(index) {
        if (confirm('Are you sure you want to remove this social link?')) {
            this.data.social.splice(index, 1);
            this.renderCurrentFile();
        }
    }

    // Color preset methods
    applyColorPreset(presetName) {
        const presets = {
            cyberpunk: {
                primary: "#00ff9f",
                secondary: "#ff0080",
                accent: "#ffff00",
                background: "#000011",
                surface: "#1a0033",
                text: "#ffffff",
                success: "#00ff9f",
                warning: "#ffaa00",
                error: "#ff0080",
                info: "#00aaff",
                muted: "#666699",
                light: "#f0f0ff",
                dark: "#000011",
                gradientStart: "#ff0080",
                gradientEnd: "#00ff9f",
                border: "rgba(0, 255, 159, 0.3)",
                shadow: "rgba(255, 0, 128, 0.4)",
                primaryHover: "#00cc7f",
                secondaryHover: "#cc0066",
                accentHover: "#cccc00"
            },
            ocean: {
                primary: "#00bcd4",
                secondary: "#0277bd",
                accent: "#ff5722",
                background: "#0a1929",
                surface: "#1e3a8a",
                text: "#ffffff",
                success: "#4caf50",
                warning: "#ff9800",
                error: "#f44336",
                info: "#2196f3",
                muted: "#607d8b",
                light: "#e3f2fd",
                dark: "#0d47a1",
                gradientStart: "#0277bd",
                gradientEnd: "#00bcd4",
                border: "rgba(0, 188, 212, 0.3)",
                shadow: "rgba(2, 119, 189, 0.4)",
                primaryHover: "#0097a7",
                secondaryHover: "#01579b",
                accentHover: "#d84315"
            },
            sunset: {
                primary: "#ff6b35",
                secondary: "#f7931e",
                accent: "#ffd23f",
                background: "#1a0f0a",
                surface: "#2d1b0e",
                text: "#ffffff",
                success: "#8bc34a",
                warning: "#ff9800",
                error: "#f44336",
                info: "#03a9f4",
                muted: "#8d6e63",
                light: "#fff3e0",
                dark: "#3e2723",
                gradientStart: "#f7931e",
                gradientEnd: "#ff6b35",
                border: "rgba(255, 107, 53, 0.3)",
                shadow: "rgba(247, 147, 30, 0.4)",
                primaryHover: "#e55722",
                secondaryHover: "#ef6c00",
                accentHover: "#ffc107"
            },
            forest: {
                primary: "#4caf50",
                secondary: "#2e7d32",
                accent: "#8bc34a",
                background: "#0d1b0f",
                surface: "#1b2e20",
                text: "#ffffff",
                success: "#4caf50",
                warning: "#ff9800",
                error: "#f44336",
                info: "#2196f3",
                muted: "#689f38",
                light: "#e8f5e8",
                dark: "#1b5e20",
                gradientStart: "#2e7d32",
                gradientEnd: "#4caf50",
                border: "rgba(76, 175, 80, 0.3)",
                shadow: "rgba(46, 125, 50, 0.4)",
                primaryHover: "#388e3c",
                secondaryHover: "#1b5e20",
                accentHover: "#689f38"
            },
            monochrome: {
                primary: "#ffffff",
                secondary: "#e0e0e0",
                accent: "#9e9e9e",
                background: "#000000",
                surface: "#212121",
                text: "#ffffff",
                success: "#ffffff",
                warning: "#e0e0e0",
                error: "#9e9e9e",
                info: "#bdbdbd",
                muted: "#757575",
                light: "#fafafa",
                dark: "#212121",
                gradientStart: "#e0e0e0",
                gradientEnd: "#ffffff",
                border: "rgba(255, 255, 255, 0.2)",
                shadow: "rgba(255, 255, 255, 0.1)",
                primaryHover: "#f5f5f5",
                secondaryHover: "#bdbdbd",
                accentHover: "#757575"
            },
            neon: {
                primary: "#ff073a",
                secondary: "#39ff14",
                accent: "#ff073a",
                background: "#000000",
                surface: "#0a0a0a",
                text: "#ffffff",
                success: "#39ff14",
                warning: "#ffff00",
                error: "#ff073a",
                info: "#00ffff",
                muted: "#ff00ff",
                light: "#ffffff",
                dark: "#000000",
                gradientStart: "#39ff14",
                gradientEnd: "#ff073a",
                border: "rgba(255, 7, 58, 0.5)",
                shadow: "rgba(57, 255, 20, 0.5)",
                primaryHover: "#cc0529",
                secondaryHover: "#2ecc10",
                accentHover: "#cc0529"
            }
        };

        if (presets[presetName]) {
            this.data.colors = { ...this.data.colors, ...presets[presetName] };
            this.renderCurrentFile();
            this.showStatus(`${presetName.charAt(0).toUpperCase() + presetName.slice(1)} preset applied!`, 'success');
        }
    }

    resetColors() {
        if (confirm('Reset all colors to default? This cannot be undone.')) {
            this.data.colors = {
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
            this.renderCurrentFile();
            this.showStatus('Colors reset to default!', 'success');
        }
    }

    // Visibility preset methods
    applyVisibilityPreset(presetName) {
        const presets = {
            minimal: {
                header: { logo: true, navigation: true, dashboardLink: false, mobileMenu: true },
                hero: { title: true, subtitle: true, buttons: false, scrollIndicator: false, backgroundCanvas: false },
                about: { title: true, description: true, profileImage: false, experienceYears: false, projectsCompleted: false, awards: false },
                projects: { title: true, projectGrid: true, featuredOnly: true },
                skills: { title: true, categories: true, icons: false },
                contact: { title: true, contactInfo: true, email: true, phone: false, location: false, contactForm: false, socialLinks: true },
                footer: { copyright: true, socialLinks: false },
                effects: { particles: false, scrollAnimations: false, loadingScreen: false, glitchEffect: false }
            },
            professional: {
                header: { logo: true, navigation: true, dashboardLink: true, mobileMenu: true },
                hero: { title: true, subtitle: true, buttons: true, scrollIndicator: true, backgroundCanvas: false },
                about: { title: true, description: true, profileImage: true, experienceYears: true, projectsCompleted: true, awards: true },
                projects: { title: true, projectGrid: true, featuredOnly: true },
                skills: { title: true, categories: true, icons: true },
                contact: { title: true, contactInfo: true, email: true, phone: true, location: true, contactForm: true, socialLinks: true },
                footer: { copyright: true, socialLinks: true },
                effects: { particles: false, scrollAnimations: true, loadingScreen: true, glitchEffect: false }
            },
            showcase: {
                header: { logo: true, navigation: true, dashboardLink: true, mobileMenu: true },
                hero: { title: true, subtitle: true, buttons: true, scrollIndicator: true, backgroundCanvas: true },
                about: { title: true, description: true, profileImage: true, experienceYears: true, projectsCompleted: true, awards: true },
                projects: { title: true, projectGrid: true, featuredOnly: false },
                skills: { title: true, categories: true, icons: true },
                contact: { title: true, contactInfo: true, email: true, phone: true, location: true, contactForm: true, socialLinks: true },
                footer: { copyright: true, socialLinks: true },
                effects: { particles: true, scrollAnimations: true, loadingScreen: true, glitchEffect: true }
            },
            complete: {
                header: { logo: true, navigation: true, dashboardLink: true, mobileMenu: true },
                hero: { title: true, subtitle: true, buttons: true, scrollIndicator: true, backgroundCanvas: true },
                about: { title: true, description: true, profileImage: true, experienceYears: true, projectsCompleted: true, awards: true },
                projects: { title: true, projectGrid: true, featuredOnly: false },
                skills: { title: true, categories: true, icons: true },
                contact: { title: true, contactInfo: true, email: true, phone: true, location: true, contactForm: true, socialLinks: true },
                footer: { copyright: true, socialLinks: true },
                effects: { particles: true, scrollAnimations: true, loadingScreen: true, glitchEffect: true }
            },
            landing: {
                header: { logo: true, navigation: false, dashboardLink: false, mobileMenu: false },
                hero: { title: true, subtitle: true, buttons: true, scrollIndicator: true, backgroundCanvas: true },
                about: { title: false, description: false, profileImage: false, experienceYears: false, projectsCompleted: false, awards: false },
                projects: { title: true, projectGrid: true, featuredOnly: true },
                skills: { title: false, categories: false, icons: false },
                contact: { title: true, contactInfo: false, email: false, phone: false, location: false, contactForm: true, socialLinks: true },
                footer: { copyright: true, socialLinks: true },
                effects: { particles: true, scrollAnimations: true, loadingScreen: true, glitchEffect: true }
            }
        };

        if (presets[presetName]) {
            this.data.visibility = presets[presetName];
            this.renderCurrentFile();
            this.showStatus(`${presetName.charAt(0).toUpperCase() + presetName.slice(1)} preset applied!`, 'success');
        }
    }

    toggleSectionVisibility(sectionKey) {
        const section = this.data.visibility[sectionKey];
        if (!section) return;

        const allVisible = Object.values(section).every(value => value === true);
        const newState = !allVisible;

        Object.keys(section).forEach(key => {
            section[key] = newState;
        });

        this.renderCurrentFile();
        this.showStatus(`${sectionKey} section ${newState ? 'enabled' : 'disabled'}!`, 'success');
    }

    resetVisibility() {
        if (confirm('Reset all visibility settings to default? This cannot be undone.')) {
            this.data.visibility = {
                header: { logo: true, navigation: true, dashboardLink: true, mobileMenu: true },
                hero: { title: true, subtitle: true, buttons: true, scrollIndicator: true, backgroundCanvas: true },
                about: { title: true, description: true, profileImage: true, experienceYears: true, projectsCompleted: true, awards: true },
                projects: { title: true, projectGrid: true, featuredOnly: true },
                skills: { title: true, categories: true, icons: true },
                contact: { title: true, contactInfo: true, email: true, phone: true, location: true, contactForm: true, socialLinks: true },
                footer: { copyright: true, socialLinks: true },
                effects: { particles: true, scrollAnimations: true, loadingScreen: true, glitchEffect: true }
            };
            this.renderCurrentFile();
            this.showStatus('Visibility settings reset to default!', 'success');
        }
    }
}

// Global functions
function validateJSON() {
    const editor = document.getElementById('jsonEditor');
    try {
        JSON.parse(editor.value);
        dashboard.showStatus('JSON is valid!', 'success');
    } catch (error) {
        dashboard.showStatus('Invalid JSON: ' + error.message, 'error');
    }
}

function formatJSON() {
    const editor = document.getElementById('jsonEditor');
    try {
        const parsed = JSON.parse(editor.value);
        editor.value = JSON.stringify(parsed, null, 2);
        dashboard.showStatus('JSON formatted successfully!', 'success');
    } catch (error) {
        dashboard.showStatus('Cannot format invalid JSON: ' + error.message, 'error');
    }
}

function saveJSON() {
    const editor = document.getElementById('jsonEditor');
    try {
        const parsed = JSON.parse(editor.value);
        if (dashboard.currentFile === 'visibility') {
            dashboard.data.sectionVisibility = parsed.sectionVisibility || {};
            dashboard.data.visibilityOptions = parsed.visibilityOptions || {};
        } else {
            dashboard.data[dashboard.currentFile] = parsed;
        }

        // Save to localStorage
        const saved = dashboard.saveDataToStorage();

        if (saved) {
            dashboard.showStatus(`${dashboard.currentFile} data saved to local storage!`, 'success');
        } else {
            dashboard.showStatus('Error saving to local storage', 'error');
        }

        dashboard.renderCurrentFile();
    } catch (error) {
        dashboard.showStatus('Cannot save invalid JSON: ' + error.message, 'error');
    }
}

function previewPortfolio() {
    // Open portfolio in new tab
    window.open('Portoflio/index.html', '_blank');
}

// Initialize dashboard
const dashboard = new DashboardManager();