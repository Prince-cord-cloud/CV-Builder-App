// AI Suggestions Module
class AISuggestions {
    constructor() {
        this.apiKey = ''; // Add your OpenAI API key here
        this.endpoint = 'https://api.openai.com/v1/chat/completions';
    }
    
    // Generate professional summary
    async generateSummary(data) {
        const prompt = `Generate a professional summary for a ${data.jobTitle} named ${data.fullName} with the following details:
        
        Skills: ${data.skills.map(s => s.name).join(', ')}
        Experience: ${data.experience.map(e => `${e.title} at ${e.company}`).join(', ')}
        Education: ${data.education.map(e => `${e.degree} from ${e.institution}`).join(', ')}
        
        Create a concise, professional summary (3-4 sentences) highlighting key achievements and skills.`;
        
        return this.callAI(prompt);
    }
    
    // Improve job description
    async improveJobDescription(description, jobTitle) {
        const prompt = `Improve this job description for a ${jobTitle} position to make it more professional and impactful:
        
        Original: "${description}"
        
        Provide an improved version with bullet points highlighting achievements and responsibilities.`;
        
        return this.callAI(prompt);
    }
    
    // Suggest skills based on job title
    async suggestSkills(jobTitle) {
        const prompt = `Suggest 8-10 relevant skills for a ${jobTitle} position. Return as a comma-separated list.`;
        
        const response = await this.callAI(prompt);
        return response.split(',').map(skill => skill.trim());
    }
    
    // Call OpenAI API
    async callAI(prompt) {
        if (!this.apiKey) {
            // Fallback to local suggestions if no API key
            return this.fallbackSuggestions(prompt);
        }
        
        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a professional resume writer and career coach. Provide concise, professional responses.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                })
            });
            
            const data = await response.json();
            return data.choices[0].message.content.trim();
        } catch (error) {
            console.error('AI API Error:', error);
            return this.fallbackSuggestions(prompt);
        }
    }
    
    // Fallback suggestions when no API key
    fallbackSuggestions(prompt) {
        // Simple pattern matching for common requests
        if (prompt.includes('professional summary')) {
            const summaries = [
                "Results-driven professional with extensive experience in delivering high-quality solutions. Proven track record of success in fast-paced environments. Strong problem-solving skills and excellent communication abilities.",
                "Innovative professional passionate about creating efficient and scalable solutions. Combines technical expertise with strategic thinking to drive project success. Committed to continuous learning and professional growth.",
                "Experienced professional with a background in leading successful projects from conception to completion. Excels at collaborating with cross-functional teams and delivering exceptional results under tight deadlines."
            ];
            return summaries[Math.floor(Math.random() * summaries.length)];
        }
        
        if (prompt.includes('improve this job description')) {
            return "• Led cross-functional teams to deliver innovative solutions\n• Implemented best practices that improved efficiency by 30%\n• Collaborated with stakeholders to define project requirements\n• Mentored junior team members and facilitated knowledge sharing";
        }
        
        if (prompt.includes('suggest relevant skills')) {
            const skills = {
                'software engineer': ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Git', 'Docker', 'CI/CD'],
                'project manager': ['Agile Methodology', 'Stakeholder Management', 'Risk Assessment', 'Budget Planning', 'Team Leadership', 'JIRA', 'Scrum', 'Strategic Planning'],
                'data analyst': ['SQL', 'Python', 'Tableau', 'Excel', 'Statistical Analysis', 'Data Visualization', 'Machine Learning', 'Power BI']
            };
            
            for (const [key, value] of Object.entries(skills)) {
                if (prompt.toLowerCase().includes(key)) {
                    return value.join(', ');
                }
            }
            
            return 'Communication, Problem Solving, Teamwork, Leadership, Time Management, Adaptability, Critical Thinking, Creativity';
        }
        
        return "AI suggestions are currently unavailable. Please check your API configuration.";
    }
}

// Initialize AI globally
window.AISuggestions = AISuggestions;