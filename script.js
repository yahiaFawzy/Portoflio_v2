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
                text: "#ffffff"
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
        return `
            <div class="form-section">
                <h3 class="form-section-title">🎨 Color Palette</h3>
                ${Object.entries(data).map(([key, value]) => `
                    <div class="form-group">
                        <label class="form-label">${key.charAt(0).toUpperCase() + key.slice(1)}</label>
                        <div style="display: flex; gap: 10px; align-items: center;">
                            <input type="color" class="color-input" value="${value}" data-field="${key}">
                            <input type="text" class="form-input" value="${value}" data-field="${key}" style="flex: 1;">
                        </div>
                    </div>
                `).join('')}
                <div class="editor-actions">
                    <button class="btn btn-primary" onclick="dashboard.saveFormData()">💾 Save Changes</button>
                    <button class="btn btn-secondary" onclick="dashboard.exportData(dashboard.currentFile)">📤 Export This Section</button>
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