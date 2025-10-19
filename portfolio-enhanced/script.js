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

    // Load data from localStorage or use defaults with better validation
    loadDataFromStorage() {
        const savedData = localStorage.getItem('portfolioData');

        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                
                // Validate data structure
                if (parsed && typeof parsed === 'object') {
                    this.loadDefaultData();
                    
                    // Merge saved data with defaults to ensure all new fields exist
                    if (parsed.colors) {
                        this.data.colors = { ...this.data.colors, ...parsed.colors };
                    }
                    if (parsed.typography) {
                        this.data.typography = { ...this.data.typography, ...parsed.typography };
                    }
                    if (parsed.personal) this.data.personal = parsed.personal;
                    if (parsed.projects) this.data.projects = parsed.projects;
                    if (parsed.skills) this.data.skills = parsed.skills;
                    if (parsed.contact) this.data.contact = parsed.contact;
                    if (parsed.social) this.data.social = parsed.social;
                    
                    this.showStatus('Data loaded successfully', 'success');
                } else {
                    throw new Error('Invalid data structure');
                }
            } catch (error) {
                console.error('Error loading data:', error);
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
                // Primary colors
                primary: "#64ffda",
                primaryHover: "#52e7c7",
                secondary: "#667eea",
                secondaryHover: "#5568d3",
                accent: "#ff6b6b",
                accentHover: "#ff5252",
                
                // Background colors
                background: "#0a0a0a",
                backgroundSecondary: "#1a1a2e",
                surface: "#16213e",
                surfaceHover: "#1f2a46",
                
                // Text colors
                text: "#ffffff",
                textSecondary: "#b8c5d6",
                textMuted: "#8892a0",
                
                // UI Element colors
                border: "#2c3e50",
                borderLight: "#34495e",
                link: "#64ffda",
                linkHover: "#52e7c7",
                
                // Status colors
                success: "#4caf50",
                error: "#f44336",
                warning: "#ff9800",
                info: "#2196f3",
                
                // Gradient colors
                gradientStart: "#667eea",
                gradientEnd: "#764ba2",
                
                // Shadow colors
                shadowColor: "rgba(0, 0, 0, 0.3)",
                glowColor: "rgba(100, 255, 218, 0.2)"
            },
            typography: {
                fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                headingFont: "'Inter', sans-serif",
                codeFont: "'Fira Code', 'Monaco', 'Consolas', monospace",
                fontSize: "16px",
                lineHeight: "1.6"
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
                whatsapp: "+15551234567",
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
            typography: 'Typography Settings',
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
            case 'typography':
                container.innerHTML = this.renderTypographyForm(data);
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

    renderColorsForm(data) {
        const colorGroups = {
            'Primary Colors': ['primary', 'primaryHover', 'secondary', 'secondaryHover', 'accent', 'accentHover'],
            'Background Colors': ['background', 'backgroundSecondary', 'surface', 'surfaceHover'],
            'Text Colors': ['text', 'textSecondary', 'textMuted'],
            'UI Elements': ['border', 'borderLight', 'link', 'linkHover'],
            'Status Colors': ['success', 'error', 'warning', 'info'],
            'Gradients': ['gradientStart', 'gradientEnd'],
            'Effects': ['shadowColor', 'glowColor']
        };
        
        let html = '<div class="form-section">';
        html += '<h3 class="form-section-title">🎨 Complete Color Palette</h3>';
        
        // Theme Presets
        html += `
            <div class="theme-presets" style="margin-bottom: 30px; padding: 20px; background: rgba(100, 255, 218, 0.1); border-radius: 10px;">
                <h4 style="color: #64ffda; margin-bottom: 15px;">🌟 Quick Theme Presets</h4>
                <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    <button class="btn btn-secondary" onclick="dashboard.applyThemePreset('cyberpunk')">Cyberpunk</button>
                    <button class="btn btn-secondary" onclick="dashboard.applyThemePreset('ocean')">Ocean Blue</button>
                    <button class="btn btn-secondary" onclick="dashboard.applyThemePreset('sunset')">Sunset</button>
                    <button class="btn btn-secondary" onclick="dashboard.applyThemePreset('forest')">Forest</button>
                    <button class="btn btn-secondary" onclick="dashboard.applyThemePreset('noir')">Dark Noir</button>
                    <button class="btn btn-secondary" onclick="dashboard.applyThemePreset('lavender')">Lavender Dream</button>
                </div>
            </div>
        `;
        
        // Render color groups
        for (const [groupName, fields] of Object.entries(colorGroups)) {
            html += `<div class="color-group" style="margin-bottom: 25px; padding: 15px; background: rgba(10,10,10,0.3); border-radius: 8px;">`;
            html += `<h4 style="color: #667eea; margin-bottom: 15px; font-size: 1.1rem;">${groupName}</h4>`;
            
            fields.forEach(key => {
                if (data[key] !== undefined) {
                    const label = key.replace(/([A-Z])/g, ' $1').trim();
                    const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);
                    const colorValue = data[key].startsWith('#') ? data[key] : '#000000';
                    html += `
                        <div class="form-group">
                            <label class="form-label">${capitalizedLabel}</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="color" class="color-input" value="${colorValue}" data-field="${key}">
                                <input type="text" class="form-input" value="${data[key]}" data-field="${key}-text" data-color-field="${key}" style="flex: 1;" placeholder="#hex or rgba()">
                            </div>
                        </div>
                    `;
                }
            });
            
            html += '</div>';
        }
        
        html += `
            <div class="editor-actions">
                <button class="btn btn-primary" onclick="dashboard.saveFormData()">💾 Save Changes</button>
                <button class="btn btn-secondary" onclick="dashboard.resetToDefaults()">🔄 Reset to Defaults</button>
            </div>
        </div>`;
        
        return html;
    }

    renderTypographyForm(data) {
        return `
            <div class="form-section">
                <h3 class="form-section-title">✍️ Typography Settings</h3>
                <div class="form-group">
                    <label class="form-label">Primary Font Family</label>
                    <input type="text" class="form-input" value="${data.fontFamily}" data-field="fontFamily" placeholder="'Inter', sans-serif">
                    <small style="color: #8892a0; margin-top: 5px; display: block;">Examples: 'Roboto', 'Open Sans', 'Poppins'</small>
                </div>
                <div class="form-group">
                    <label class="form-label">Heading Font</label>
                    <input type="text" class="form-input" value="${data.headingFont}" data-field="headingFont" placeholder="'Inter', sans-serif">
                </div>
                <div class="form-group">
                    <label class="form-label">Code Font</label>
                    <input type="text" class="form-input" value="${data.codeFont}" data-field="codeFont" placeholder="'Fira Code', monospace">
                </div>
                <div class="form-group">
                    <label class="form-label">Base Font Size</label>
                    <input type="text" class="form-input" value="${data.fontSize}" data-field="fontSize" placeholder="16px">
                </div>
                <div class="form-group">
                    <label class="form-label">Line Height</label>
                    <input type="text" class="form-input" value="${data.lineHeight}" data-field="lineHeight" placeholder="1.6">
                </div>
                <div class="editor-actions">
                    <button class="btn btn-primary" onclick="dashboard.saveFormData()">💾 Save Changes</button>
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
                </div>
            </div>
        `;
    }

    bindFormEvents() {
        // Color inputs synchronization
        document.querySelectorAll('.color-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const textInput = e.target.parentNode.querySelector('input[type="text"]');
                if (textInput) {
                    textInput.value = e.target.value;
                }
            });
        });

        document.querySelectorAll('input[type="text"][data-color-field]').forEach(input => {
            input.addEventListener('input', (e) => {
                const colorInput = e.target.parentNode.querySelector('.color-input');
                if (colorInput && e.target.value.startsWith('#')) {
                    try {
                        colorInput.value = e.target.value;
                    } catch (err) {
                        // Invalid color format
                    }
                }
            });
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
                case 'typography':
                    this.saveTypographyData();
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
                this.showStatus(`${this.currentFile} data saved successfully!`, 'success');
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
        const inputs = document.querySelectorAll('#formEditor input[data-color-field]');
        
        inputs.forEach(input => {
            const field = input.dataset.colorField;
            const value = input.value.trim();
            
            // Validate color format
            if (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('rgba')) {
                this.data.colors[field] = value;
            } else {
                this.showStatus(`Invalid color format for ${field}. Use #hex or rgba() format.`, 'error');
            }
        });
    }

    saveTypographyData() {
        const inputs = document.querySelectorAll('#formEditor input[data-field]');
        inputs.forEach(input => {
            this.data.typography[input.dataset.field] = input.value.trim();
        });
    }

    savePersonalData() {
        const inputs = document.querySelectorAll('#formEditor input[data-field], #formEditor textarea[data-field]');
        inputs.forEach(input => {
            let value = input.value;
            
            // Validate and parse number inputs
            if (input.type === 'number') {
                value = parseInt(value);
                if (isNaN(value) || value < 0) {
                    this.showStatus(`Invalid number for ${input.dataset.field}`, 'error');
                    return;
                }
            }
            
            // Validate email
            if (input.type === 'email' && value && !value.includes('@')) {
                this.showStatus('Invalid email format', 'error');
                return;
            }
            
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
            const value = input.value.trim();
            
            // Validate email format
            if (input.dataset.field === 'email' && value && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                this.showStatus('Invalid email format', 'error');
                return;
            }
            
            // Validate WhatsApp format (should start with +)
            if (input.dataset.field === 'whatsapp' && value && !value.startsWith('+')) {
                this.showStatus('WhatsApp number should be in international format (e.g., +1234567890)', 'error');
                return;
            }
            
            this.data.contact[input.dataset.field] = value;
        });
    }

    saveSocialData() {
        const social = [];
        const socialItems = document.querySelectorAll('.social-item');

        socialItems.forEach(item => {
            const socialLink = {};
            const inputs = item.querySelectorAll('input[data-field]');

            inputs.forEach(input => {
                socialLink[input.dataset.field] = input.value.trim();
            });

            // Validate URL format
            if (socialLink.url && !socialLink.url.match(/^https?:\/\/.+/)) {
                this.showStatus('Invalid URL format. URLs should start with http:// or https://', 'error');
                return;
            }

            if (socialLink.name) {
                social.push(socialLink);
            }
        });

        this.data.social = social;
    }

    updateJSONEditor() {
        const editor = document.getElementById('jsonEditor');
        editor.value = JSON.stringify(this.data[this.currentFile], null, 2);
    }

    updatePreview() {
        const preview = document.getElementById('jsonPreview');
        preview.innerHTML = this.syntaxHighlight(JSON.stringify(this.data[this.currentFile], null, 2));
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

    // Theme preset system
    applyThemePreset(theme) {
        const presets = {
            cyberpunk: {
                primary: "#64ffda",
                primaryHover: "#52e7c7",
                secondary: "#667eea",
                secondaryHover: "#5568d3",
                accent: "#ff6b6b",
                accentHover: "#ff5252",
                background: "#0a0a0a",
                backgroundSecondary: "#1a1a2e",
                surface: "#16213e",
                surfaceHover: "#1f2a46",
                text: "#ffffff",
                textSecondary: "#b8c5d6",
                textMuted: "#8892a0",
                border: "#2c3e50",
                borderLight: "#34495e",
                link: "#64ffda",
                linkHover: "#52e7c7",
                success: "#4caf50",
                error: "#f44336",
                warning: "#ff9800",
                info: "#2196f3",
                gradientStart: "#667eea",
                gradientEnd: "#764ba2",
                shadowColor: "rgba(0, 0, 0, 0.3)",
                glowColor: "rgba(100, 255, 218, 0.2)"
            },
            ocean: {
                primary: "#00b4d8",
                primaryHover: "#0096c7",
                secondary: "#4361ee",
                secondaryHover: "#3a51d4",
                accent: "#7209b7",
                accentHover: "#560bad",
                background: "#03045e",
                backgroundSecondary: "#023e8a",
                surface: "#0077b6",
                surfaceHover: "#0096c7",
                text: "#caf0f8",
                textSecondary: "#90e0ef",
                textMuted: "#48cae4",
                border: "#0096c7",
                borderLight: "#00b4d8",
                link: "#00d4ff",
                linkHover: "#00b8e6",
                success: "#06ffa5",
                error: "#ff006e",
                warning: "#ffb703",
                info: "#0096c7",
                gradientStart: "#4361ee",
                gradientEnd: "#7209b7",
                shadowColor: "rgba(3, 4, 94, 0.5)",
                glowColor: "rgba(0, 180, 216, 0.3)"
            },
            sunset: {
                primary: "#ff6b35",
                primaryHover: "#ff5722",
                secondary: "#f7931e",
                secondaryHover: "#e67e00",
                accent: "#fbb040",
                accentHover: "#f9a825",
                background: "#1a0b2e",
                backgroundSecondary: "#2e1a47",
                surface: "#432874",
                surfaceHover: "#52368c",
                text: "#fff5e4",
                textSecondary: "#ffe4c0",
                textMuted: "#ffc98b",
                border: "#5b3a70",
                borderLight: "#734a94",
                link: "#ff6b35",
                linkHover: "#ff5722",
                success: "#4caf50",
                error: "#e53935",
                warning: "#fbb040",
                info: "#29b6f6",
                gradientStart: "#ff6b35",
                gradientEnd: "#f7931e",
                shadowColor: "rgba(26, 11, 46, 0.4)",
                glowColor: "rgba(255, 107, 53, 0.3)"
            },
            forest: {
                primary: "#52b788",
                primaryHover: "#40916c",
                secondary: "#2d6a4f",
                secondaryHover: "#1b4332",
                accent: "#95d5b2",
                accentHover: "#74c69d",
                background: "#081c15",
                backgroundSecondary: "#1b4332",
                surface: "#2d6a4f",
                surfaceHover: "#40916c",
                text: "#d8f3dc",
                textSecondary: "#b7e4c7",
                textMuted: "#95d5b2",
                border: "#40916c",
                borderLight: "#52b788",
                link: "#95d5b2",
                linkHover: "#74c69d",
                success: "#52b788",
                error: "#e63946",
                warning: "#f4a261",
                info: "#2a9d8f",
                gradientStart: "#52b788",
                gradientEnd: "#2d6a4f",
                shadowColor: "rgba(8, 28, 21, 0.5)",
                glowColor: "rgba(82, 183, 136, 0.2)"
            },
            noir: {
                primary: "#e0e0e0",
                primaryHover: "#f5f5f5",
                secondary: "#9e9e9e",
                secondaryHover: "#bdbdbd",
                accent: "#616161",
                accentHover: "#757575",
                background: "#000000",
                backgroundSecondary: "#121212",
                surface: "#1e1e1e",
                surfaceHover: "#2a2a2a",
                text: "#ffffff",
                textSecondary: "#e0e0e0",
                textMuted: "#9e9e9e",
                border: "#424242",
                borderLight: "#616161",
                link: "#e0e0e0",
                linkHover: "#f5f5f5",
                success: "#66bb6a",
                error: "#ef5350",
                warning: "#ffa726",
                info: "#42a5f5",
                gradientStart: "#424242",
                gradientEnd: "#212121",
                shadowColor: "rgba(0, 0, 0, 0.6)",
                glowColor: "rgba(255, 255, 255, 0.1)"
            },
            lavender: {
                primary: "#c77dff",
                primaryHover: "#b565f2",
                secondary: "#9d4edd",
                secondaryHover: "#8b3fd9",
                accent: "#e0aaff",
                accentHover: "#d49aed",
                background: "#10002b",
                backgroundSecondary: "#240046",
                surface: "#3c096c",
                surfaceHover: "#5a189a",
                text: "#f0e6ff",
                textSecondary: "#e0d1ff",
                textMuted: "#c9b3f5",
                border: "#5a189a",
                borderLight: "#7209b7",
                link: "#c77dff",
                linkHover: "#b565f2",
                success: "#4caf50",
                error: "#ff006e",
                warning: "#ffb703",
                info: "#4cc9f0",
                gradientStart: "#c77dff",
                gradientEnd: "#7209b7",
                shadowColor: "rgba(16, 0, 43, 0.5)",
                glowColor: "rgba(199, 125, 255, 0.3)"
            }
        };

        if (presets[theme]) {
            this.data.colors = { ...this.data.colors, ...presets[theme] };
            this.renderCurrentFile();
            this.showStatus(`${theme.charAt(0).toUpperCase() + theme.slice(1)} theme applied!`, 'success');
        }
    }

    // Reset colors to default
    resetToDefaults() {
        if (confirm('Reset all colors to default values?')) {
            const tempData = { ...this.data };
            this.loadDefaultData();
            
            // Preserve non-color data
            this.data.personal = tempData.personal;
            this.data.projects = tempData.projects;
            this.data.skills = tempData.skills;
            this.data.contact = tempData.contact;
            this.data.social = tempData.social;
            
            this.saveDataToStorage();
            this.renderCurrentFile();
            this.showStatus('Colors reset to defaults', 'success');
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
        dashboard.data[dashboard.currentFile] = parsed;

        // Save to localStorage
        const saved = dashboard.saveDataToStorage();

        if (saved) {
            dashboard.showStatus(`${dashboard.currentFile} data saved successfully!`, 'success');
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
