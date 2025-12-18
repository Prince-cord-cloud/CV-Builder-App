// templates/template-loader.js
// This file should be included in ALL template HTML files

class TemplateLoader {
    constructor() {
        this.cvData = null;
        this.templateName = this.getTemplateNameFromURL();
    }
    
    getTemplateNameFromURL() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        return filename.replace('.html', '');
    }
    
    loadCVData() {
        try {
            // Try to get data from URL first
            const urlParams = new URLSearchParams(window.location.search);
            const dataParam = urlParams.get('data');
            
            if (dataParam) {
                this.cvData = JSON.parse(decodeURIComponent(dataParam));
                return this.cvData;
            }
            
            // Fallback to localStorage
            const savedData = localStorage.getItem('cvData');
            if (savedData) {
                this.cvData = JSON.parse(savedData);
                return this.cvData;
            }
            
            // No data found
            return null;
        } catch (error) {
            console.error('Error loading CV data:', error);
            return null;
        }
    }
    
    populateTemplate() {
        if (!this.cvData) {
            this.showError('No CV data found. Please go back and fill in the form.');
            return;
        }
        
        // Call template-specific population function
        const populateFunction = `populate${this.capitalizeFirst(this.templateName)}Template`;
        if (typeof window[populateFunction] === 'function') {
            window[populateFunction](this.cvData);
        } else {
            this.populateGenericTemplate();
        }
        
        // Auto-print if specified in URL
        if (window.location.search.includes('print=true')) {
            setTimeout(() => window.print(), 1000);
        }
    }
    
    populateGenericTemplate() {
        // Generic template population (falls back to this if specific function doesn't exist)
        const data = this.cvData;
        
        // Basic fields
        this.setElementText('fullName', data.fullName);
        this.setElementText('jobTitle', data.jobTitle);
        this.setElementText('summary', data.summary);
        this.setElementText('email', data.email);
        this.setElementText('phone', data.phone);
        this.setElementText('location', data.location);
        
        // Profile Image
        if (data.profileImage) {
            const imgElement = document.getElementById('profileImage');
            if (imgElement) {
                imgElement.src = data.profileImage;
                imgElement.style.display = 'block';
            }
        }
        
        // Skills
        if (data.skills && data.skills.length > 0) {
            this.populateList('skillsList', data.skills.map(skill => 
                `${skill.name} (${skill.level})`
            ));
        }
        
        // Languages
        if (data.languages && data.languages.length > 0) {
            this.populateList('languagesList', data.languages.map(lang => 
                `${lang.name} (${lang.level})`
            ));
        }
        
        // Education
        if (data.education && data.education.length > 0) {
            this.populateEducation(data.education);
        }
        
        // Experience
        if (data.experience && data.experience.length > 0) {
            this.populateExperience(data.experience);
        }
        
        // Referees
        if (data.referees && data.referees.length > 0) {
            this.populateReferees(data.referees);
        }
    }
    
    populateEducation(educationItems) {
        const container = document.getElementById('educationList');
        if (!container) return;
        
        container.innerHTML = '';
        educationItems.forEach(edu => {
            const div = document.createElement('div');
            div.className = 'education-item';
            div.innerHTML = `
                <div class="item-title">${edu.degree || ''}</div>
                <div class="item-subtitle">${edu.institution || ''}</div>
                ${edu.year ? `<div class="item-date">${edu.year}</div>` : ''}
                ${edu.achievements ? `<div class="item-description">${edu.achievements}</div>` : ''}
            `;
            container.appendChild(div);
        });
    }
    
    populateExperience(experienceItems) {
        const container = document.getElementById('experienceList');
        if (!container) return;
        
        container.innerHTML = '';
        experienceItems.forEach(exp => {
            const div = document.createElement('div');
            div.className = 'experience-item';
            
            const description = exp.description || '';
            const bulletPoints = description.split('\n').filter(line => line.trim());
            
            div.innerHTML = `
                <div class="item-header">
                    <div>
                        <div class="item-title">${exp.title || ''}</div>
                        <div class="item-subtitle">${exp.company || ''}</div>
                    </div>
                    <div class="item-date">
                        ${this.formatDate(exp.startDate)} - ${exp.current ? 'Present' : this.formatDate(exp.endDate)}
                    </div>
                </div>
                ${exp.location ? `<div class="item-subtitle">${exp.location}</div>` : ''}
                ${description ? `
                    <div class="item-description">
                        ${bulletPoints.length > 0 ? `
                            <ul class="bullet-list">
                                ${bulletPoints.map(point => `<li>${point}</li>`).join('')}
                            </ul>
                        ` : `<p>${description}</p>`}
                    </div>
                ` : ''}
            `;
            container.appendChild(div);
        });
    }
    
    populateReferees(referees) {
        const container = document.getElementById('refereesList');
        if (!container) return;
        
        container.innerHTML = '';
        referees.forEach(ref => {
            const div = document.createElement('div');
            div.className = 'referee-item';
            div.innerHTML = `
                <div class="referee-name">${ref.name || ''}</div>
                <div class="referee-details">
                    ${ref.position ? `<div>${ref.position}</div>` : ''}
                    ${ref.company ? `<div>${ref.company}</div>` : ''}
                    ${ref.email ? `<div>${ref.email}</div>` : ''}
                    ${ref.phone ? `<div>${ref.phone}</div>` : ''}
                </div>
            `;
            container.appendChild(div);
        });
    }
    
    populateList(elementId, items) {
        const container = document.getElementById(elementId);
        if (!container) return;
        
        container.innerHTML = '';
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'list-item';
            div.textContent = item;
            container.appendChild(div);
        });
    }
    
    setElementText(elementId, text) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = text || '';
        }
    }
    
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    
    capitalizeFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    showError(message) {
        document.body.innerHTML = `
            <div style="padding: 40px; text-align: center; font-family: Arial, sans-serif;">
                <h2 style="color: #e74c3c;">Error</h2>
                <p style="margin: 20px 0; color: #666;">${message}</p>
                <button onclick="window.history.back()" 
                        style="padding: 12px 24px; background: #4361ee; color: white; border: none; border-radius: 6px; cursor: pointer;">
                    Go Back to Builder
                </button>
            </div>
        `;
    }
    
    // PDF Generation
    async generatePDF(filename = 'my-cv.pdf') {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });
            
            // Capture the CV container
            const element = document.querySelector('.cv-container') || document.body;
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });
            
            const imgData = canvas.toDataURL('image/png');
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            
            doc.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
            doc.save(filename);
            
            return true;
        } catch (error) {
            console.error('PDF generation error:', error);
            return false;
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    const templateLoader = new TemplateLoader();
    const cvData = templateLoader.loadCVData();
    
    if (cvData) {
        templateLoader.populateTemplate();
        
        // Set up action buttons
        setupTemplateActions(templateLoader, cvData);
    }
});

function setupTemplateActions(templateLoader, cvData) {
    // Print button
    document.getElementById('printBtn')?.addEventListener('click', function() {
        window.print();
    });
    
    // Download PDF button
    document.getElementById('downloadPdfBtn')?.addEventListener('click', async function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
        this.disabled = true;
        
        const filename = `${cvData.fullName.replace(/\s+/g, '-').toLowerCase()}-cv.pdf`;
        const success = await templateLoader.generatePDF(filename);
        
        if (success) {
            showToast('PDF downloaded successfully!');
        } else {
            showToast('Error generating PDF');
            this.innerHTML = '<i class="fas fa-download"></i> Download PDF';
            this.disabled = false;
        }
    });
    
    // Edit Again button
    document.getElementById('editAgainBtn')?.addEventListener('click', function() {
        window.location.href = '../index.html';
    });
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        border-radius: 6px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}