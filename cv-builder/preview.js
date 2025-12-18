// preview.js - Template rendering engine

class TemplateRenderer {
    constructor() {
        this.templates = {
            'modern': this.renderModernTemplate,
            'executive': this.renderExecutiveTemplate,
            'creative': this.renderCreativeTemplate
        };
    }
    
    // Main render method
    render(data, templateName = 'modern') {
        const templateFunc = this.templates[templateName];
        if (!templateFunc) {
            console.error(`Template ${templateName} not found`);
            return this.renderModernTemplate(data);
        }
        
        return templateFunc.call(this, data);
    }
    
    // ===== UTILITY METHODS =====
    formatDate(dateString) {
        if (!dateString || dateString === 'Present') return 'Present';
        const date = new Date(dateString + '-01');
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    
    parseBulletPoints(text) {
        if (!text) return [];
        return text.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0 && !line.startsWith('•'));
    }
    
    // ===== MODERN TEMPLATE =====
    renderModernTemplate(data) {
        const { personal, experience, education, skills, languages, referees, links } = data;
        
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${personal.fullName || 'CV'} - Modern Template</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    
                    body {
                        font-family: 'Inter', sans-serif;
                        line-height: 1.6;
                        color: #1e293b;
                        background: #ffffff;
                        width: 210mm;
                        min-height: 297mm;
                        padding: 25mm;
                        margin: 0;
                    }
                    
                    .cv-container {
                        width: 100%;
                        height: 100%;
                        display: grid;
                        grid-template-columns: 1fr 2fr;
                        gap: 40px;
                    }
                    
                    /* Header */
                    .header {
                        grid-column: 1 / -1;
                        display: flex;
                        align-items: center;
                        gap: 30px;
                        margin-bottom: 30px;
                        padding-bottom: 20px;
                        border-bottom: 3px solid #4361ee;
                    }
                    
                    .profile-image {
                        width: 140px;
                        height: 140px;
                        border-radius: 50%;
                        object-fit: cover;
                        border: 4px solid #4361ee;
                    }
                    
                    .header-content {
                        flex: 1;
                    }
                    
                    .name {
                        font-size: 36px;
                        font-weight: 700;
                        color: #1e293b;
                        margin-bottom: 8px;
                    }
                    
                    .title {
                        font-size: 20px;
                        color: #4361ee;
                        font-weight: 500;
                        margin-bottom: 15px;
                    }
                    
                    .contact-info {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 20px;
                        font-size: 14px;
                        color: #64748b;
                    }
                    
                    .contact-item {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    
                    /* Sidebar */
                    .sidebar {
                        background: #f8fafc;
                        padding: 25px;
                        border-radius: 12px;
                    }
                    
                    .section {
                        margin-bottom: 25px;
                    }
                    
                    .section-title {
                        font-size: 16px;
                        font-weight: 600;
                        color: #4361ee;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        margin-bottom: 15px;
                        padding-bottom: 8px;
                        border-bottom: 2px solid #e2e8f0;
                    }
                    
                    /* Main Content */
                    .main-content {
                        padding-top: 10px;
                    }
                    
                    /* Summary */
                    .summary {
                        font-size: 15px;
                        color: #475569;
                        line-height: 1.8;
                        margin-bottom: 30px;
                    }
                    
                    /* Experience & Education Items */
                    .item {
                        margin-bottom: 25px;
                    }
                    
                    .item-header {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 8px;
                    }
                    
                    .item-title {
                        font-size: 16px;
                        font-weight: 600;
                        color: #1e293b;
                    }
                    
                    .item-subtitle {
                        font-size: 14px;
                        color: #4361ee;
                        font-weight: 500;
                    }
                    
                    .item-date {
                        font-size: 14px;
                        color: #64748b;
                        font-weight: 500;
                    }
                    
                    .item-description {
                        font-size: 14px;
                        color: #475569;
                        margin-top: 8px;
                        line-height: 1.6;
                    }
                    
                    /* Skills */
                    .skill-item {
                        margin-bottom: 12px;
                    }
                    
                    .skill-name {
                        display: block;
                        font-size: 14px;
                        margin-bottom: 6px;
                        color: #1e293b;
                    }
                    
                    .skill-bar {
                        height: 6px;
                        background: #e2e8f0;
                        border-radius: 3px;
                        overflow: hidden;
                    }
                    
                    .skill-level {
                        height: 100%;
                        background: #4361ee;
                        border-radius: 3px;
                    }
                    
                    /* Languages */
                    .language-item {
                        margin-bottom: 10px;
                    }
                    
                    /* Referees */
                    .referee-item {
                        background: white;
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 15px;
                        border-left: 4px solid #4361ee;
                    }
                    
                    .referee-name {
                        font-weight: 600;
                        margin-bottom: 5px;
                        color: #1e293b;
                    }
                    
                    .referee-details {
                        font-size: 13px;
                        color: #64748b;
                    }
                    
                    /* Lists */
                    ul {
                        list-style: none;
                        padding: 0;
                    }
                    
                    ul li {
                        position: relative;
                        padding-left: 20px;
                        margin-bottom: 8px;
                        font-size: 14px;
                        color: #475569;
                    }
                    
                    ul li:before {
                        content: "•";
                        color: #4361ee;
                        position: absolute;
                        left: 0;
                        font-size: 18px;
                    }
                    
                    /* Print Styles */
                    @media print {
                        body {
                            padding: 0;
                            margin: 0;
                            width: 210mm;
                            height: 297mm;
                        }
                        
                        .cv-container {
                            padding: 20mm;
                        }
                        
                        .no-print {
                            display: none !important;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="cv-container">
                    <!-- Header -->
                    <div class="header">
                        ${personal.profileImage ? `
                            <img src="${personal.profileImage}" alt="${personal.fullName}" class="profile-image">
                        ` : `
                            <div class="profile-image" style="background: #4361ee; display: flex; align-items: center; justify-content: center; color: white; font-size: 48px;">
                                <i class="fas fa-user"></i>
                            </div>
                        `}
                        
                        <div class="header-content">
                            <h1 class="name">${personal.fullName || 'Your Name'}</h1>
                            <h2 class="title">${personal.jobTitle || 'Professional Title'}</h2>
                            
                            <div class="contact-info">
                                ${personal.emails?.length > 0 ? `
                                    <div class="contact-item">
                                        <i class="fas fa-envelope"></i>
                                        <span>${personal.emails[0]}</span>
                                    </div>
                                ` : ''}
                                
                                ${personal.phones?.length > 0 ? `
                                    <div class="contact-item">
                                        <i class="fas fa-phone"></i>
                                        <span>${personal.phones[0]}</span>
                                    </div>
                                ` : ''}
                                
                                ${personal.location ? `
                                    <div class="contact-item">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <span>${personal.location}</span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Sidebar -->
                    <div class="sidebar">
                        ${skills?.length > 0 ? `
                            <div class="section">
                                <h3 class="section-title">Skills</h3>
                                <div class="skills-list">
                                    ${skills.map(skill => `
                                        <div class="skill-item">
                                            <span class="skill-name">${skill.name}</span>
                                            <div class="skill-bar">
                                                <div class="skill-level" style="width: ${
                                                    skill.level === 'expert' ? '100' :
                                                    skill.level === 'advanced' ? '85' :
                                                    skill.level === 'intermediate' ? '65' : '40'
                                                }%"></div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${education?.length > 0 ? `
                            <div class="section">
                                <h3 class="section-title">Education</h3>
                                ${education.map(edu => `
                                    <div class="item">
                                        <div class="item-title">${edu.degree}</div>
                                        <div class="item-subtitle">${edu.institution}</div>
                                        ${edu.year ? `<div class="item-date">${edu.year}</div>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                        
                        ${languages?.length > 0 ? `
                            <div class="section">
                                <h3 class="section-title">Languages</h3>
                                ${languages.map(lang => `
                                    <div class="language-item">
                                        <span class="skill-name">${lang.name}</span>
                                        <div class="skill-bar">
                                            <div class="skill-level" style="width: ${
                                                lang.level === 'native' ? '100' :
                                                lang.level === 'fluent' ? '85' :
                                                lang.level === 'intermediate' ? '65' : '40'
                                            }%"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- Main Content -->
                    <div class="main-content">
                        ${personal.summary ? `
                            <div class="section">
                                <h3 class="section-title">Professional Summary</h3>
                                <p class="summary">${personal.summary}</p>
                            </div>
                        ` : ''}
                        
                        ${experience?.length > 0 ? `
                            <div class="section">
                                <h3 class="section-title">Work Experience</h3>
                                ${experience.map(exp => `
                                    <div class="item">
                                        <div class="item-header">
                                            <div>
                                                <div class="item-title">${exp.title}</div>
                                                <div class="item-subtitle">${exp.company}</div>
                                            </div>
                                            <div class="item-date">
                                                ${this.formatDate(exp.startDate)} - 
                                                ${exp.current ? 'Present' : this.formatDate(exp.endDate)}
                                            </div>
                                        </div>
                                        ${exp.location ? `<div class="item-subtitle">${exp.location}</div>` : ''}
                                        ${exp.description ? `
                                            <div class="item-description">
                                                ${this.parseBulletPoints(exp.description).length > 0 ? `
                                                    <ul>
                                                        ${this.parseBulletPoints(exp.description).map(point => `<li>${point}</li>`).join('')}
                                                    </ul>
                                                ` : `<p>${exp.description}</p>`}
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                        
                        ${referees?.length > 0 ? `
                            <div class="section">
                                <h3 class="section-title">References</h3>
                                ${referees.map(ref => `
                                    <div class="referee-item">
                                        <div class="referee-name">${ref.name}</div>
                                        <div class="referee-details">
                                            ${ref.position ? `<div>${ref.position}</div>` : ''}
                                            ${ref.company ? `<div>${ref.company}</div>` : ''}
                                            ${ref.email ? `<div>${ref.email}</div>` : ''}
                                            ${ref.phone ? `<div>${ref.phone}</div>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <!-- Print/Download Buttons -->
                <div class="no-print" style="position: fixed; bottom: 20px; right: 20px; display: flex; gap: 10px;">
                    <button onclick="window.print()" style="padding: 10px 20px; background: #4361ee; color: white; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-print"></i> Print
                    </button>
                    <button onclick="downloadPDF()" style="padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-download"></i> Download PDF
                    </button>
                </div>
                
                <script>
                    async function downloadPDF() {
                        const { jsPDF } = window.jspdf;
                        const pdf = new jsPDF({
                            orientation: 'portrait',
                            unit: 'mm',
                            format: 'a4'
                        });
                        
                        // Use html2canvas to capture the CV
                        const canvas = await html2canvas(document.body, {
                            scale: 2,
                            useCORS: true,
                            logging: false,
                            backgroundColor: '#ffffff'
                        });
                        
                        const imgData = canvas.toDataURL('image/png');
                        const pageWidth = pdf.internal.pageSize.getWidth();
                        const pageHeight = pdf.internal.pageSize.getHeight();
                        
                        pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
                        pdf.save('${personal.fullName || 'cv'}-resume.pdf');
                    }
                </script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
            </body>
            </html>
        `;
    }
    
    // ===== EXECUTIVE TEMPLATE =====
    renderExecutiveTemplate(data) {
        const { personal, experience, education, skills, languages, referees } = data;
        
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${personal.fullName || 'CV'} - Executive Template</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
                <style>
                    body {
                        font-family: 'Inter', sans-serif;
                        width: 210mm;
                        min-height: 297mm;
                        padding: 25mm;
                        margin: 0;
                        color: #2d3748;
                        background: #ffffff;
                    }
                    
                    .cv-container {
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    
                    .header {
                        text-align: center;
                        margin-bottom: 40px;
                        padding-bottom: 20px;
                        border-bottom: 3px solid #2d3748;
                    }
                    
                    .name {
                        font-size: 42px;
                        font-weight: 700;
                        color: #2d3748;
                        margin-bottom: 10px;
                        letter-spacing: 1px;
                    }
                    
                    .title {
                        font-size: 22px;
                        color: #4a5568;
                        font-weight: 400;
                        margin-bottom: 20px;
                        font-style: italic;
                    }
                    
                    .contact-info {
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;
                        gap: 25px;
                        font-size: 15px;
                        color: #718096;
                    }
                    
                    .section {
                        margin-bottom: 30px;
                    }
                    
                    .section-title {
                        font-size: 18px;
                        font-weight: 600;
                        color: #2d3748;
                        margin-bottom: 15px;
                        padding-bottom: 8px;
                        border-bottom: 2px solid #e2e8f0;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    
                    .summary {
                        font-size: 16px;
                        line-height: 1.8;
                        color: #4a5568;
                        margin-bottom: 30px;
                    }
                    
                    .item {
                        margin-bottom: 25px;
                        page-break-inside: avoid;
                    }
                    
                    .item-header {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 8px;
                    }
                    
                    .item-title {
                        font-size: 17px;
                        font-weight: 600;
                        color: #2d3748;
                    }
                    
                    .item-subtitle {
                        font-size: 15px;
                        color: #4a5568;
                        font-style: italic;
                    }
                    
                    .item-date {
                        font-size: 15px;
                        color: #718096;
                        font-weight: 500;
                    }
                    
                    .item-description {
                        font-size: 15px;
                        color: #4a5568;
                        margin-top: 10px;
                        line-height: 1.6;
                    }
                    
                    .skills-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 15px;
                    }
                    
                    .skill-category {
                        margin-bottom: 15px;
                    }
                    
                    .skill-category h4 {
                        font-size: 15px;
                        color: #2d3748;
                        margin-bottom: 8px;
                    }
                    
                    .skill-list {
                        list-style: none;
                        padding: 0;
                    }
                    
                    .skill-list li {
                        font-size: 14px;
                        color: #4a5568;
                        margin-bottom: 5px;
                        position: relative;
                        padding-left: 15px;
                    }
                    
                    .skill-list li:before {
                        content: "▸";
                        position: absolute;
                        left: 0;
                        color: #2d3748;
                    }
                    
                    .referees-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                        gap: 20px;
                    }
                    
                    .referee-card {
                        background: #f7fafc;
                        padding: 20px;
                        border-radius: 8px;
                        border-left: 4px solid #2d3748;
                    }
                    
                    .referee-name {
                        font-weight: 600;
                        font-size: 16px;
                        margin-bottom: 5px;
                        color: #2d3748;
                    }
                    
                    .referee-title {
                        color: #4a5568;
                        font-size: 14px;
                        margin-bottom: 5px;
                    }
                    
                    .referee-contact {
                        font-size: 14px;
                        color: #718096;
                    }
                    
                    @media print {
                        body {
                            padding: 20mm;
                        }
                        
                        .no-print {
                            display: none !important;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="cv-container">
                    <!-- Header -->
                    <div class="header">
                        <h1 class="name">${personal.fullName || 'Your Name'}</h1>
                        <h2 class="title">${personal.jobTitle || 'Professional Title'}</h2>
                        
                        <div class="contact-info">
                            ${personal.emails?.map(email => `<div>${email}</div>`).join('')}
                            ${personal.phones?.map(phone => `<div>${phone}</div>`).join('')}
                            ${personal.location ? `<div>${personal.location}</div>` : ''}
                        </div>
                    </div>
                    
                    <!-- Professional Summary -->
                    ${personal.summary ? `
                        <div class="section">
                            <h3 class="section-title">Professional Profile</h3>
                            <p class="summary">${personal.summary}</p>
                        </div>
                    ` : ''}
                    
                    <!-- Work Experience -->
                    ${experience?.length > 0 ? `
                        <div class="section">
                            <h3 class="section-title">Career History</h3>
                            ${experience.map(exp => `
                                <div class="item">
                                    <div class="item-header">
                                        <div>
                                            <div class="item-title">${exp.title}</div>
                                            <div class="item-subtitle">${exp.company}</div>
                                        </div>
                                        <div class="item-date">
                                            ${this.formatDate(exp.startDate)} - 
                                            ${exp.current ? 'Present' : this.formatDate(exp.endDate)}
                                        </div>
                                    </div>
                                    ${exp.location ? `<div class="item-subtitle">${exp.location}</div>` : ''}
                                    ${exp.description ? `
                                        <div class="item-description">
                                            ${this.parseBulletPoints(exp.description).length > 0 ? `
                                                <ul class="skill-list">
                                                    ${this.parseBulletPoints(exp.description).map(point => `<li>${point}</li>`).join('')}
                                                </ul>
                                            ` : `<p>${exp.description}</p>`}
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    <!-- Skills & Education -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 30px;">
                        ${skills?.length > 0 ? `
                            <div class="section">
                                <h3 class="section-title">Core Competencies</h3>
                                <div class="skills-grid">
                                    <div class="skill-category">
                                        <h4>Technical Skills</h4>
                                        <ul class="skill-list">
                                            ${skills.filter(s => s.level === 'expert' || s.level === 'advanced').slice(0, 8).map(skill => `
                                                <li>${skill.name}</li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                        
                        ${education?.length > 0 ? `
                            <div class="section">
                                <h3 class="section-title">Education</h3>
                                ${education.map(edu => `
                                    <div class="item">
                                        <div class="item-title">${edu.degree}</div>
                                        <div class="item-subtitle">${edu.institution}</div>
                                        ${edu.year ? `<div class="item-date">${edu.year}</div>` : ''}
                                        ${edu.achievements ? `
                                            <div class="item-description">
                                                ${edu.achievements}
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                    
                    <!-- Languages -->
                    ${languages?.length > 0 ? `
                        <div class="section">
                            <h3 class="section-title">Languages</h3>
                            <div class="skills-grid">
                                ${languages.map(lang => `
                                    <div class="skill-category">
                                        <h4>${lang.name}</h4>
                                        <div style="color: #4a5568; font-size: 14px;">
                                            ${lang.level.charAt(0).toUpperCase() + lang.level.slice(1)} Proficiency
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- References -->
                    ${referees?.length > 0 ? `
                        <div class="section">
                            <h3 class="section-title">Professional References</h3>
                            <div class="referees-grid">
                                ${referees.map(ref => `
                                    <div class="referee-card">
                                        <div class="referee-name">${ref.name}</div>
                                        ${ref.position ? `<div class="referee-title">${ref.position}</div>` : ''}
                                        ${ref.company ? `<div class="referee-title">${ref.company}</div>` : ''}
                                        <div class="referee-contact">
                                            ${ref.email ? `<div>${ref.email}</div>` : ''}
                                            ${ref.phone ? `<div>${ref.phone}</div>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </body>
            </html>
        `;
    }
    
    // ===== CREATIVE TEMPLATE =====
    renderCreativeTemplate(data) {
        const { personal, experience, education, skills, languages, referees } = data;
        
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${personal.fullName || 'CV'} - Creative Template</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
                <style>
                    body {
                        font-family: 'Inter', sans-serif;
                        width: 210mm;
                        min-height: 297mm;
                        margin: 0;
                        padding: 0;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: #333;
                    }
                    
                    .cv-container {
                        display: flex;
                        min-height: 297mm;
                    }
                    
                    .sidebar {
                        width: 80px;
                        background: rgba(0, 0, 0, 0.9);
                        padding: 40px 15px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    
                    .main-content {
                        flex: 1;
                        background: white;
                        padding: 40px;
                        margin-left: 80px;
                        position: relative;
                    }
                    
                    .profile-icon {
                        width: 50px;
                        height: 50px;
                        background: #667eea;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 24px;
                        margin-bottom: 40px;
                    }
                    
                    .header {
                        margin-bottom: 40px;
                    }
                    
                    .name {
                        font-size: 48px;
                        font-weight: 800;
                        color: #2c3e50;
                        margin-bottom: 10px;
                        line-height: 1.1;
                    }
                    
                    .title {
                        font-size: 24px;
                        color: #667eea;
                        font-weight: 600;
                        margin-bottom: 30px;
                        position: relative;
                        display: inline-block;
                    }
                    
                    .title:after {
                        content: '';
                        position: absolute;
                        bottom: -10px;
                        left: 0;
                        width: 60px;
                        height: 4px;
                        background: #667eea;
                    }
                    
                    .contact-info {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 20px;
                        margin-top: 20px;
                    }
                    
                    .contact-item {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        color: #666;
                        font-size: 15px;
                    }
                    
                    .section {
                        margin-bottom: 40px;
                    }
                    
                    .section-title {
                        font-size: 20px;
                        font-weight: 700;
                        color: #2c3e50;
                        margin-bottom: 20px;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        position: relative;
                        padding-left: 20px;
                    }
                    
                    .section-title:before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 8px;
                        height: 8px;
                        background: #667eea;
                        border-radius: 50%;
                    }
                    
                    .summary {
                        font-size: 16px;
                        line-height: 1.8;
                        color: #666;
                        margin-bottom: 30px;
                    }
                    
                    .timeline {
                        position: relative;
                        padding-left: 30px;
                    }
                    
                    .timeline:before {
                        content: '';
                        position: absolute;
                        left: 9px;
                        top: 0;
                        bottom: 0;
                        width: 2px;
                        background: #e0e0e0;
                    }
                    
                    .timeline-item {
                        position: relative;
                        margin-bottom: 30px;
                    }
                    
                    .timeline-item:before {
                        content: '';
                        position: absolute;
                        left: -30px;
                        top: 5px;
                        width: 20px;
                        height: 20px;
                        background: #667eea;
                        border-radius: 50%;
                        border: 4px solid white;
                    }
                    
                    .timeline-title {
                        font-size: 18px;
                        font-weight: 600;
                        color: #2c3e50;
                        margin-bottom: 5px;
                    }
                    
                    .timeline-subtitle {
                        color: #667eea;
                        font-weight: 600;
                        margin-bottom: 5px;
                    }
                    
                    .timeline-date {
                        color: #999;
                        font-size: 14px;
                        margin-bottom: 10px;
                    }
                    
                    .timeline-description {
                        color: #666;
                        font-size: 15px;
                    }
                    
                    .skills-container {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                    }
                    
                    .skill-tag {
                        background: #f0f0f0;
                        padding: 8px 15px;
                        border-radius: 20px;
                        font-size: 14px;
                        color: #555;
                    }
                    
                    .grid-container {
                        display: grid;
                        grid-template-columns: 2fr 1fr;
                        gap: 40px;
                    }
                    
                    .referee-card {
                        background: #f8f9fa;
                        padding: 20px;
                        border-radius: 10px;
                        margin-bottom: 20px;
                        border-left: 5px solid #667eea;
                    }
                    
                    .referee-name {
                        font-weight: 600;
                        margin-bottom: 8px;
                        color: #2c3e50;
                    }
                    
                    .referee-details {
                        font-size: 14px;
                        color: #666;
                    }
                    
                    @media print {
                        body {
                            background: white;
                        }
                        
                        .cv-container {
                            margin: 0;
                        }
                        
                        .main-content {
                            margin-left: 0;
                        }
                        
                        .sidebar {
                            display: none;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="cv-container">
                    <!-- Sidebar -->
                    <div class="sidebar">
                        <div class="profile-icon">
                            <i class="fas fa-user"></i>
                        </div>
                        ${personal.profileImage ? `
                            <img src="${personal.profileImage}" alt="${personal.fullName}" 
                                 style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; margin-bottom: 30px;">
                        ` : ''}
                    </div>
                    
                    <!-- Main Content -->
                    <div class="main-content">
                        <!-- Header -->
                        <div class="header">
                            <h1 class="name">${personal.fullName || 'Your Name'}</h1>
                            <h2 class="title">${personal.jobTitle || 'Professional Title'}</h2>
                            
                            <div class="contact-info">
                                ${personal.emails?.map(email => `
                                    <div class="contact-item">
                                        <i class="fas fa-envelope"></i>
                                        <span>${email}</span>
                                    </div>
                                `).join('')}
                                
                                ${personal.phones?.map(phone => `
                                    <div class="contact-item">
                                        <i class="fas fa-phone"></i>
                                        <span>${phone}</span>
                                    </div>
                                `).join('')}
                                
                                ${personal.location ? `
                                    <div class="contact-item">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <span>${personal.location}</span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                        
                        <div class="grid-container">
                            <!-- Left Column -->
                            <div>
                                ${personal.summary ? `
                                    <div class="section">
                                        <h3 class="section-title">About Me</h3>
                                        <p class="summary">${personal.summary}</p>
                                    </div>
                                ` : ''}
                                
                                ${experience?.length > 0 ? `
                                    <div class="section">
                                        <h3 class="section-title">Experience</h3>
                                        <div class="timeline">
                                            ${experience.map(exp => `
                                                <div class="timeline-item">
                                                    <div class="timeline-title">${exp.title}</div>
                                                    <div class="timeline-subtitle">${exp.company}</div>
                                                    <div class="timeline-date">
                                                        ${this.formatDate(exp.startDate)} - 
                                                        ${exp.current ? 'Present' : this.formatDate(exp.endDate)}
                                                        ${exp.location ? ` • ${exp.location}` : ''}
                                                    </div>
                                                    ${exp.description ? `
                                                        <p class="timeline-description">${exp.description}</p>
                                                    ` : ''}
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                            
                            <!-- Right Column -->
                            <div>
                                ${skills?.length > 0 ? `
                                    <div class="section">
                                        <h3 class="section-title">Skills</h3>
                                        <div class="skills-container">
                                            ${skills.map(skill => `
                                                <span class="skill-tag">${skill.name}</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                                
                                ${education?.length > 0 ? `
                                    <div class="section">
                                        <h3 class="section-title">Education</h3>
                                        <div class="timeline">
                                            ${education.map(edu => `
                                                <div class="timeline-item">
                                                    <div class="timeline-title">${edu.degree}</div>
                                                    <div class="timeline-subtitle">${edu.institution}</div>
                                                    ${edu.year ? `
                                                        <div class="timeline-date">${edu.year}</div>
                                                    ` : ''}
                                                    ${edu.achievements ? `
                                                        <p class="timeline-description">${edu.achievements}</p>
                                                    ` : ''}
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                                
                                ${languages?.length > 0 ? `
                                    <div class="section">
                                        <h3 class="section-title">Languages</h3>
                                        <div class="skills-container">
                                            ${languages.map(lang => `
                                                <span class="skill-tag">${lang.name} (${lang.level})</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                                
                                ${referees?.length > 0 ? `
                                    <div class="section">
                                        <h3 class="section-title">References</h3>
                                        ${referees.map(ref => `
                                            <div class="referee-card">
                                                <div class="referee-name">${ref.name}</div>
                                                <div class="referee-details">
                                                    ${ref.position ? `<div>${ref.position}</div>` : ''}
                                                    ${ref.company ? `<div>${ref.company}</div>` : ''}
                                                    ${ref.email ? `<div>${ref.email}</div>` : ''}
                                                    ${ref.phone ? `<div>${ref.phone}</div>` : ''}
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;
    }
}

// ===== TEMPLATE WRAPPER PAGE =====
// Create templates/template.html
const templateHTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CV Template</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Get data from URL
            const urlParams = new URLSearchParams(window.location.search);
            const dataParam = urlParams.get('data');
            
            if (dataParam) {
                try {
                    const { data, template, mode } = JSON.parse(decodeURIComponent(dataParam));
                    
                    // Render template
                    const renderer = new TemplateRenderer();
                    const html = renderer.render(data, template);
                    
                    // Replace document content
                    document.open();
                    document.write(html);
                    document.close();
                    
                    // If in final mode, auto-print
                    if (mode === 'final') {
                        setTimeout(() => {
                            window.print();
                        }, 1000);
                    }
                } catch (error) {
                    document.body.innerHTML = \`
                        <div style="padding: 40px; text-align: center;">
                            <h2>Error Loading CV</h2>
                            <p>\${error.message}</p>
                            <button onclick="window.history.back()" style="padding: 10px 20px; background: #4361ee; color: white; border: none; border-radius: 5px; cursor: pointer;">
                                Go Back
                            </button>
                        </div>
                    \`;
                }
            }
        });
    </script>
</head>
<body>
    <div id="loading" style="padding: 40px; text-align: center;">
        <h2>Loading CV Template...</h2>
        <p>Please wait while we generate your resume</p>
    </div>
</body>
</html>
`;

// ===== EXPORT =====
// Save template HTML to file
function saveTemplateFile() {
    // This would be handled by your server or build process
    console.log('Template HTML generated');
}

// Initialize if running in browser
if (typeof window !== 'undefined') {
    window.TemplateRenderer = TemplateRenderer;
    
    // Auto-initialize if on template page
    if (window.location.pathname.includes('template.html')) {
        document.addEventListener('DOMContentLoaded', initializeTemplate);
    }
}

function initializeTemplate() {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');
    
    if (dataParam) {
        try {
            const { data, template } = JSON.parse(decodeURIComponent(dataParam));
            const renderer = new TemplateRenderer();
            const html = renderer.render(data, template);
            
            document.open();
            document.write(html);
            document.close();
        } catch (error) {
            console.error('Template initialization error:', error);
        }
    }
}