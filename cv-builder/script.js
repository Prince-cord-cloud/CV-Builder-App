// ===== CONFIGURATION =====
const CONFIG = {
    MAX_EMAILS: 3,
    MAX_PHONES: 2,
    MAX_SKILLS: 20,
    MAX_LANGUAGES: 10,
    MAX_EXPERIENCE: 10,
    MAX_EDUCATION: 5,
    MAX_REFEREES: 3
};

// ===== STATE MANAGEMENT =====
let currentStep = 1;
let selectedTemplate = 'modern';
let cvData = {
    personal: {},
    experience: [],
    education: [],
    skills: [],
    languages: [],
    referees: [],
    links: []
};

// ===== MODERN ANIMATED LOADER =====
function showLoadingEffect(message = 'Building your professional CV...') {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loadingOverlay';
    
    // Add ARIA attributes for accessibility
    loadingOverlay.setAttribute('role', 'alert');
    loadingOverlay.setAttribute('aria-live', 'polite');
    loadingOverlay.setAttribute('aria-label', 'Loading indicator');
    loadingOverlay.setAttribute('tabindex', '-1');
    
    // Create CSS animations for the loader
    const loaderStyles = document.createElement('style');
    loaderStyles.textContent = `
        @keyframes loaderFadeIn {
            from { 
                opacity: 0; 
                backdrop-filter: blur(0px);
                transform: scale(0.95);
            }
            to { 
                opacity: 1; 
                backdrop-filter: blur(15px);
                transform: scale(1);
            }
        }
        
        @keyframes loaderFadeOut {
            from { 
                opacity: 1; 
                backdrop-filter: blur(15px);
                transform: scale(1);
            }
            to { 
                opacity: 0; 
                backdrop-filter: blur(0px);
                transform: scale(0.95);
            }
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        @keyframes pulseGlow {
            0%, 100% { 
                opacity: 0.8;
                box-shadow: 0 0 20px rgba(67, 97, 238, 0.5),
                           0 0 40px rgba(67, 97, 238, 0.3),
                           0 0 60px rgba(67, 97, 238, 0.1);
            }
            50% { 
                opacity: 1;
                box-shadow: 0 0 30px rgba(67, 97, 238, 0.7),
                           0 0 60px rgba(67, 97, 238, 0.5),
                           0 0 90px rgba(67, 97, 238, 0.3);
            }
        }
        
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes particlesFloat {
            0% { 
                transform: translateY(100vh) translateX(0) rotate(0deg); 
                opacity: 0; 
            }
            10% { opacity: 0.7; }
            90% { opacity: 0.7; }
            100% { 
                transform: translateY(-100px) translateX(var(--x-end)) rotate(360deg); 
                opacity: 0; 
            }
        }
        
        @keyframes textGlow {
            0%, 100% { 
                text-shadow: 0 0 10px rgba(67, 97, 238, 0.5); 
            }
            50% { 
                text-shadow: 0 0 20px rgba(67, 97, 238, 0.8), 
                          0 0 30px rgba(114, 9, 183, 0.6); 
            }
        }
        
        @keyframes progressWidth {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .loading-particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #4361ee, #7209b7);
            border-radius: 50%;
            opacity: 0;
            pointer-events: none;
        }
        
        .loading-checkmark {
            width: 80px;
            height: 80px;
            position: relative;
        }
        
        .loading-checkmark__circle {
            stroke-dasharray: 166;
            stroke-dashoffset: 166;
            stroke-width: 4;
            stroke: #4361ee;
            fill: none;
            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        
        .loading-checkmark__check {
            transform-origin: 50% 50%;
            stroke-dasharray: 48;
            stroke-dashoffset: 48;
            stroke: #fff;
            animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
        
        @keyframes stroke {
            100% { stroke-dashoffset: 0; }
        }
        
        @keyframes confettiFall {
            0% {
                transform: translate(-50%, -50%) rotate(0deg);
                opacity: 0;
            }
            10% { opacity: 1; }
            100% {
                transform: translate(
                    calc(-50% + var(--x-move)),
                    calc(-50% + var(--y-move))
                ) rotate(var(--rotation));
                opacity: 0;
            }
        }
        
        /* Responsive Design */
        
        /* Extra small devices (phones, 320px and up) */
        @media (max-width: 480px) {
            .loader-content {
                padding: 20px !important;
                margin: 15px !important;
                max-width: calc(100% - 30px) !important;
                gap: 20px !important;
                border-radius: 16px !important;
            }
            
            .animated-orb {
                width: 80px !important;
                height: 80px !important;
            }
            
            .inner-pulse {
                width: 50px !important;
                height: 50px !important;
            }
            
            .orbit-circles {
                width: 100px !important;
                height: 100px !important;
            }
            
            .message {
                font-size: 18px !important;
                line-height: 1.3 !important;
                padding: 0 10px !important;
            }
            
            .sub-message {
                font-size: 14px !important;
                line-height: 1.4 !important;
                padding: 0 10px !important;
                max-width: 300px !important;
            }
            
            .steps-container {
                gap: 8px !important;
                margin-top: 15px !important;
            }
            
            .step-item {
                font-size: 11px !important;
                padding: 6px 10px !important;
                border-radius: 15px !important;
            }
            
            .progress-container {
                max-width: 280px !important;
                height: 4px !important;
            }
            
            .loading-particle {
                display: none; /* Reduce particles on mobile */
            }
        }
        
        /* Small devices (tablets, 481px to 768px) */
        @media (min-width: 481px) and (max-width: 768px) {
            .loader-content {
                padding: 25px !important;
                margin: 20px !important;
                max-width: 90% !important;
                gap: 25px !important;
                border-radius: 20px !important;
            }
            
            .animated-orb {
                width: 100px !important;
                height: 100px !important;
            }
            
            .inner-pulse {
                width: 65px !important;
                height: 65px !important;
            }
            
            .orbit-circles {
                width: 120px !important;
                height: 120px !important;
            }
            
            .message {
                font-size: 20px !important;
                line-height: 1.3 !important;
            }
            
            .sub-message {
                font-size: 15px !important;
                line-height: 1.5 !important;
                max-width: 350px !important;
            }
            
            .steps-container {
                gap: 10px !important;
                margin-top: 18px !important;
            }
            
            .step-item {
                font-size: 12px !important;
                padding: 7px 12px !important;
            }
            
            .progress-container {
                max-width: 320px !important;
                height: 5px !important;
            }
            
            .loading-particle {
                display: block; /* Reduce particles on tablet */
            }
        }
        
        /* Medium devices (laptops, 769px to 1024px) */
        @media (min-width: 769px) and (max-width: 1024px) {
            .loader-content {
                max-width: 80% !important;
                padding: 30px !important;
                margin: 30px !important;
            }
            
            .animated-orb {
                width: 110px !important;
                height: 110px !important;
            }
            
            .inner-pulse {
                width: 70px !important;
                height: 70px !important;
            }
            
            .orbit-circles {
                width: 135px !important;
                height: 135px !important;
            }
            
            .message {
                font-size: 22px !important;
            }
            
            .progress-container {
                max-width: 350px !important;
            }
        }
        
        /* Large devices (desktops, 1025px and up) */
        @media (min-width: 1025px) {
            .loader-content {
                max-width: 600px !important;
            }
        }
        
        /* Landscape orientation for mobile */
        @media (max-height: 600px) and (orientation: landscape) {
            .loader-content {
                padding: 15px !important;
                gap: 15px !important;
                max-height: 90vh !important;
                overflow-y: auto !important;
            }
            
            .animated-orb {
                width: 60px !important;
                height: 60px !important;
            }
            
            .inner-pulse {
                width: 40px !important;
                height: 40px !important;
            }
            
            .orbit-circles {
                width: 80px !important;
                height: 80px !important;
            }
            
            .message {
                font-size: 16px !important;
            }
            
            .sub-message {
                font-size: 13px !important;
            }
            
            .steps-container {
                gap: 6px !important;
                margin-top: 10px !important;
            }
            
            .step-item {
                font-size: 10px !important;
                padding: 4px 8px !important;
            }
            
            .progress-container {
                max-width: 250px !important;
                height: 3px !important;
            }
        }
        
        /* High DPI screens */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .loader-content {
                border-width: 0.5px !important;
            }
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .loader-content {
                background: rgba(0, 0, 0, 0.3) !important;
                border-color: rgba(255, 255, 255, 0.15) !important;
            }
            
            .step-item {
                background: rgba(255, 255, 255, 0.08) !important;
                border-color: rgba(255, 255, 255, 0.1) !important;
            }
        }
        
        /* Reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
            
            .loader-content {
                animation: none !important;
            }
            
            .animated-orb {
                animation: none !important;
            }
            
            .progress-bar {
                animation: none !important;
                width: 100% !important;
            }
        }
        
        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
            .loading-overlay {
                cursor: default !important;
            }
        }
    `;
    document.head.appendChild(loaderStyles);
    
    // Create main container with gradient background
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            135deg, 
            rgba(15, 23, 42, 0.98) 0%, 
            rgba(30, 41, 59, 0.98) 50%, 
            rgba(15, 23, 42, 0.98) 100%
        );
        backdrop-filter: blur(15px);
        -webkit-backdrop-filter: blur(15px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 9999;
        animation: loaderFadeIn 0.5s ease-out;
        will-change: opacity, backdrop-filter, transform;
        overflow: hidden;
        touch-action: none;
    `;
    
    // Create floating orb container
    const orbContainer = document.createElement('div');
    orbContainer.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    `;
    
    // Create floating particles (reduced count on mobile)
    const particles = [];
    const isMobile = window.innerWidth <= 768;
    const particleCount = isMobile ? 8 : 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'loading-particle';
        const size = Math.random() * (isMobile ? 4 : 6) + 2;
        const x = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 3 + 2;
        const xEnd = Math.random() * 100 - 50;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            --x-end: ${xEnd}px;
            animation: particlesFloat ${duration}s ease-in-out ${delay}s infinite;
            background: linear-gradient(45deg, 
                hsl(${Math.random() * 60 + 200}, 100%, 60%),
                hsl(${Math.random() * 60 + 270}, 100%, 60%)
            );
            border-radius: ${size}px;
            opacity: ${Math.random() * 0.3 + 0.1};
            will-change: transform, opacity;
        `;
        orbContainer.appendChild(particle);
        particles.push(particle);
    }
    
    // Create main loader container
    const loaderContent = document.createElement('div');
    loaderContent.className = 'loader-content';
    loaderContent.style.cssText = `
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        max-width: 600px;
        padding: 40px;
        margin: 20px;
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border-radius: 24px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3),
                    0 0 100px rgba(67, 97, 238, 0.1);
        animation: pulseGlow 3s ease-in-out infinite;
        will-change: box-shadow, opacity, transform;
        box-sizing: border-box;
    `;
    
    // Create animated orb
    const animatedOrb = document.createElement('div');
    animatedOrb.className = 'animated-orb';
    animatedOrb.style.cssText = `
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: linear-gradient(
            135deg,
            #4361ee 0%,
            #3a56d4 25%,
            #7209b7 50%,
            #f72585 75%,
            #4361ee 100%
        );
        background-size: 400% 400%;
        animation: 
            gradientShift 3s ease infinite,
            float 3s ease-in-out infinite,
            pulseGlow 2s ease-in-out infinite;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        will-change: transform, background-position, box-shadow;
    `;
    
    // Create inner orb pulse
    const innerPulse = document.createElement('div');
    innerPulse.className = 'inner-pulse';
    innerPulse.style.cssText = `
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        animation: pulseGlow 1.5s ease-in-out infinite alternate;
        will-change: box-shadow, opacity;
    `;
    
    // Create orbiting circles
    const orbitCircles = document.createElement('div');
    orbitCircles.className = 'orbit-circles';
    orbitCircles.style.cssText = `
        position: absolute;
        width: 150px;
        height: 150px;
        animation: spin 8s linear infinite;
        will-change: transform;
    `;
    
    for (let i = 0; i < 3; i++) {
        const circle = document.createElement('div');
        circle.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: linear-gradient(45deg, #4cc9f0, #f72585);
            top: ${i === 0 ? '0' : i === 1 ? 'calc(50% - 10px)' : 'calc(100% - 20px)'};
            left: ${i === 0 ? 'calc(50% - 10px)' : i === 1 ? '0' : 'calc(100% - 20px)'};
            animation: bounce 2s ease-in-out infinite ${i * 0.3}s;
            box-shadow: 0 0 15px currentColor;
            will-change: transform;
        `;
        orbitCircles.appendChild(circle);
    }
    
    animatedOrb.appendChild(innerPulse);
    animatedOrb.appendChild(orbitCircles);
    
    // Create text container
    const textContainer = document.createElement('div');
    textContainer.style.cssText = `
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        width: 100%;
        box-sizing: border-box;
    `;
    
    // Create main message
    const messageEl = document.createElement('div');
    messageEl.className = 'message';
    messageEl.style.cssText = `
        color: white;
        font-size: 24px;
        font-weight: 600;
        background: linear-gradient(90deg, #4361ee, #f72585, #4cc9f0);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradientShift 3s ease infinite, textGlow 2s ease-in-out infinite;
        text-align: center;
        line-height: 1.4;
        will-change: background-position;
        margin: 0;
        padding: 0;
        word-wrap: break-word;
        overflow-wrap: break-word;
    `;
    messageEl.textContent = message;
    
    // Create sub message with shimmer effect
    const subMessage = document.createElement('div');
    subMessage.className = 'sub-message';
    subMessage.style.cssText = `
        color: rgba(255, 255, 255, 0.8);
        font-size: 16px;
        font-weight: 400;
        background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            transparent 100%
        );
        background-size: 1000px 100%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmer 3s infinite linear;
        text-align: center;
        max-width: 400px;
        line-height: 1.6;
        will-change: background-position;
        margin: 0;
        padding: 0;
        word-wrap: break-word;
        overflow-wrap: break-word;
    `;
    subMessage.textContent = 'Crafting your professional resume with precision...';
    
    // Create progress bar container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    progressContainer.style.cssText = `
        width: 100%;
        max-width: 400px;
        height: 6px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
        overflow: hidden;
        margin-top: 10px;
    `;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.style.cssText = `
        width: 0%;
        height: 100%;
        background: linear-gradient(90deg, #4361ee, #f72585);
        border-radius: 3px;
        animation: progressWidth 8s ease-in-out forwards;
        position: relative;
        will-change: width;
    `;
    
    // Add shine effect to progress bar
    const progressShine = document.createElement('div');
    progressShine.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.3) 50%, 
            transparent 100%
        );
        animation: shimmer 2s infinite linear;
        will-change: background-position;
    `;
    
    progressBar.appendChild(progressShine);
    progressContainer.appendChild(progressBar);
    
    // Create loading steps
    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'steps-container';
    stepsContainer.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-top: 20px;
        justify-content: center;
        align-items: center;
    `;
    
    const steps = [
        'Processing data',
        'Applying template',
        'Optimizing layout',
        'Finalizing design',
        'Generating preview',
        'Preparing for export'
    ];
    
    const stepElements = [];
    steps.forEach((step, index) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'step-item';
        stepEl.style.cssText = `
            color: rgba(255, 255, 255, 0.5);
            font-size: 14px;
            padding: 8px 16px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
            animation: fadeIn 0.5s ease ${index * 0.5}s both;
            will-change: transform, opacity, background-color;
            white-space: nowrap;
            text-align: center;
        `;
        stepEl.textContent = step;
        stepElements.push(stepEl);
        
        // Animate step completion
        setTimeout(() => {
            stepEl.style.cssText = `
                color: #4cc9f0;
                font-size: 14px;
                padding: 8px 16px;
                background: rgba(76, 201, 240, 0.1);
                border-radius: 20px;
                border: 1px solid rgba(76, 201, 240, 0.3);
                box-shadow: 0 0 15px rgba(76, 201, 240, 0.2);
                animation: pulseGlow 2s infinite;
                will-change: box-shadow, background-color;
                white-space: nowrap;
                text-align: center;
            `;
        }, (index + 1) * 1300);
    
        stepsContainer.appendChild(stepEl);
    });
    
    // Assemble everything
    textContainer.appendChild(messageEl);
    textContainer.appendChild(subMessage);
    textContainer.appendChild(progressContainer);
    
    loaderContent.appendChild(animatedOrb);
    loaderContent.appendChild(textContainer);
    loaderContent.appendChild(stepsContainer);
    
    loadingOverlay.appendChild(orbContainer);
    loadingOverlay.appendChild(loaderContent);
    document.body.appendChild(loadingOverlay);
    
    // Store references for cleanup
    let completionTimeout;
    let confettiElements = [];
    
    // Add resize listener for responsive adjustments
    let resizeTimeout;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Adjust particle count based on screen size
            const currentIsMobile = window.innerWidth <= 768;
            if (currentIsMobile !== isMobile) {
                // You could dynamically adjust particles here
                // For now, we'll keep it simple
            }
        }, 250);
    };
    
    window.addEventListener('resize', handleResize);
    
    return {
        hide: () => {
            try {
                // Remove resize listener
                window.removeEventListener('resize', handleResize);
                
                // Animate success completion
                animatedOrb.style.animation = 'none';
                animatedOrb.innerHTML = '';
                
                // Create checkmark SVG
                const checkmarkSVG = `
                    <svg class="loading-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle class="loading-checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                        <path class="loading-checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                `;
                
                animatedOrb.innerHTML = checkmarkSVG;
                animatedOrb.style.background = 'transparent';
                animatedOrb.style.width = '80px';
                animatedOrb.style.height = '80px';
                
                // Update message
                messageEl.textContent = 'CV Ready!';
                messageEl.style.animation = 'textGlow 1s ease-in-out infinite';
                subMessage.textContent = 'Opening in new window...';
                
                // Stop particle animations
                particles.forEach(particle => {
                    particle.style.animation = 'none';
                });
                
                // Add confetti particles (reduced count on mobile)
                const confettiCount = window.innerWidth <= 480 ? 15 : 30;
                for (let i = 0; i < confettiCount; i++) {
                    const confetti = document.createElement('div');
                    const colors = ['#4361ee', '#f72585', '#4cc9f0', '#7209b7', '#f8961e'];
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    
                    // Adjust confetti size based on screen
                    const size = window.innerWidth <= 480 ? 
                        Math.random() * 6 + 3 : Math.random() * 10 + 5;
                    
                    confetti.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        background: ${color};
                        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                        top: 50%;
                        left: 50%;
                        opacity: 0;
                        --x-move: ${Math.random() * 200 - 100}px;
                        --y-move: ${Math.random() * 200 + 100}px;
                        --rotation: ${Math.random() * 720}deg;
                        animation: confettiFall ${Math.random() * 1 + 0.5}s ease-out forwards;
                        transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg);
                        will-change: transform, opacity;
                        pointer-events: none;
                    `;
                    
                    animatedOrb.parentElement.appendChild(confetti);
                    confettiElements.push(confetti);
                    
                    // Remove confetti after animation
                    setTimeout(() => {
                        if (confetti.parentElement) {
                            confetti.parentElement.removeChild(confetti);
                        }
                    }, 1500);
                }
                
                // Hide overlay after completion
                completionTimeout = setTimeout(() => {
                    loadingOverlay.style.animation = 'loaderFadeOut 0.5s ease-out forwards';
                    setTimeout(() => {
                        if (loadingOverlay.parentElement) {
                            // Cleanup all elements
                            confettiElements.forEach(el => {
                                if (el.parentElement) {
                                    el.parentElement.removeChild(el);
                                }
                            });
                            
                            // Remove styles
                            if (loaderStyles.parentElement) {
                                document.head.removeChild(loaderStyles);
                            }
                            
                            // Remove overlay
                            document.body.removeChild(loadingOverlay);
                        }
                    }, 500);
                }, 1500);
                
            } catch (error) {
                console.error('Error hiding loading effect:', error);
                // Fallback: remove overlay immediately
                if (loadingOverlay.parentElement) {
                    document.body.removeChild(loadingOverlay);
                }
                if (loaderStyles.parentElement) {
                    document.head.removeChild(loaderStyles);
                }
            }
        },
        
        updateMessage: (newMessage) => {
            if (messageEl) {
                messageEl.textContent = newMessage;
            }
        },
        
        updateProgress: (progress) => {
            if (progressBar) {
                progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
            }
        },
        
        // New method to show error state
        showError: (errorMessage = 'An error occurred') => {
            try {
                animatedOrb.style.animation = 'none';
                animatedOrb.innerHTML = '❌';
                animatedOrb.style.fontSize = window.innerWidth <= 480 ? '30px' : '40px';
                animatedOrb.style.color = '#ff4757';
                animatedOrb.style.background = 'rgba(255, 71, 87, 0.1)';
                animatedOrb.style.width = window.innerWidth <= 480 ? '60px' : '80px';
                animatedOrb.style.height = window.innerWidth <= 480 ? '60px' : '80px';
                
                messageEl.textContent = 'Error!';
                messageEl.style.background = 'linear-gradient(90deg, #ff4757, #ff3838)';
                subMessage.textContent = errorMessage;
                
                // Stop particle animations
                particles.forEach(particle => {
                    particle.style.animation = 'none';
                });
                
                // Auto-hide after 3 seconds
                setTimeout(() => {
                    this.hide();
                }, 3000);
                
            } catch (error) {
                console.error('Error showing error state:', error);
                this.hide();
            }
        },
        
        // New method to force immediate hide (for timeouts)
        forceHide: () => {
            window.removeEventListener('resize', handleResize);
            
            if (completionTimeout) {
                clearTimeout(completionTimeout);
            }
            
            if (loadingOverlay.parentElement) {
                document.body.removeChild(loadingOverlay);
            }
            if (loaderStyles.parentElement) {
                document.head.removeChild(loaderStyles);
            }
        }
    };
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Load saved data if exists
    loadSavedData();
    
    // Initialize form sections
    initializeFormSections();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize image upload
    setupImageUpload();
    
    // Initialize preview
    updatePreview();
});

// ===== FORM SECTION MANAGEMENT =====
function initializeFormSections() {
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('click', function() {
            const stepNumber = parseInt(this.dataset.step);
            goToStep(stepNumber);
        });
    });
}

function goToStep(stepNumber) {
    // Update active step in progress bar
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector(`.step[data-step="${stepNumber}"]`).classList.add('active');
    
    // Update active form section
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`section-${stepNumber}`).classList.add('active');
    
    currentStep = stepNumber;
    
    // Update navigation buttons
    updateNavigationButtons();
}

function nextSection() {
    if (currentStep < 4) {
        goToStep(currentStep + 1);
    }
}

function prevSection() {
    if (currentStep > 1) {
        goToStep(currentStep - 1);
    }
}

function updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (currentStep === 1) {
        prevBtn.style.visibility = 'hidden';
    } else {
        prevBtn.style.visibility = 'visible';
    }
    
    if (currentStep === 4) {
        nextBtn.innerHTML = 'Generate CV <i class="fas fa-arrow-right"></i>';
        nextBtn.onclick = generateCV;
    } else {
        nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        nextBtn.onclick = nextSection;
    }
}

// ===== IMAGE UPLOAD =====
function setupImageUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('profilePhoto');
    const preview = document.getElementById('imagePreview');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#4361ee';
        uploadArea.style.background = 'rgba(67, 97, 238, 0.1)';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#334155';
        uploadArea.style.background = 'transparent';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#334155';
        uploadArea.style.background = 'transparent';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });
}

function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById('imagePreview');
        preview.innerHTML = `<img src="${e.target.result}" alt="Profile Preview">`;
        preview.style.border = '3px solid #4361ee';
        
        // Save to data
        cvData.personal.profileImage = e.target.result;
        saveToLocalStorage();
        updatePreview();
        
        showToast('Profile image uploaded successfully!', 'success');
    };
    reader.readAsDataURL(file);
}

// ===== FORM FIELD MANAGEMENT =====
function addEmailField() {
    const container = document.getElementById('emails-container');
    if (container.children.length >= CONFIG.MAX_EMAILS) {
        showToast(`Maximum ${CONFIG.MAX_EMAILS} email addresses allowed`, 'warning');
        return;
    }
    
    const div = document.createElement('div');
    div.className = 'multi-field';
    div.innerHTML = `
        <input type="email" class="email-input" placeholder="additional@example.com">
        <button type="button" class="field-action remove-field" onclick="removeField(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(div);
}

function addPhoneField() {
    const container = document.getElementById('phones-container');
    if (container.children.length >= CONFIG.MAX_PHONES) {
        showToast(`Maximum ${CONFIG.MAX_PHONES} phone numbers allowed`, 'warning');
        return;
    }
    
    const div = document.createElement('div');
    div.className = 'multi-field';
    div.innerHTML = `
        <input type="tel" class="phone-input" placeholder="+1 (987) 654-3210">
        <button type="button" class="field-action remove-field" onclick="removeField(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(div);
}

function addLinkField() {
    const container = document.getElementById('links-container');
    
    const div = document.createElement('div');
    div.className = 'multi-field';
    div.innerHTML = `
        <select class="link-type">
            <option value="linkedin">LinkedIn</option>
            <option value="github">GitHub</option>
            <option value="portfolio">Portfolio</option>
            <option value="twitter">Twitter</option>
            <option value="website">Website</option>
            <option value="other">Other</option>
        </select>
        <input type="url" class="link-url" placeholder="https://example.com">
        <button type="button" class="field-action remove-field" onclick="removeField(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(div);
}

function removeField(button) {
    button.parentElement.remove();
    collectFormData();
    updatePreview();
}

// ===== EXPERIENCE MANAGEMENT =====
function addExperience() {
    const container = document.getElementById('experience-container');
    if (container.children.length >= CONFIG.MAX_EXPERIENCE) {
        showToast(`Maximum ${CONFIG.MAX_EXPERIENCE} experiences allowed`, 'warning');
        return;
    }
    
    const count = container.children.length + 1;
    const div = document.createElement('div');
    div.className = 'experience-card';
    div.innerHTML = `
        <div class="card-header">
            <h3>Experience #${count}</h3>
            <button type="button" class="card-remove" onclick="removeExperience(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Job Title *</label>
                <input type="text" class="exp-title" placeholder="Senior Developer" required>
            </div>
            <div class="form-group">
                <label>Company *</label>
                <input type="text" class="exp-company" placeholder="Tech Corp Inc." required>
            </div>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Start Date</label>
                <input type="month" class="exp-start">
            </div>
            <div class="form-group">
                <label>End Date</label>
                <input type="month" class="exp-end">
                <label class="checkbox-label">
                    <input type="checkbox" class="exp-current"> Currently working here
                </label>
            </div>
        </div>
        <div class="form-group">
            <label>Location</label>
            <input type="text" class="exp-location" placeholder="Remote / New York, NY">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="exp-description" rows="4" placeholder="Describe your responsibilities and achievements..."></textarea>
            <div class="hint">Use bullet points for better formatting</div>
        </div>
    `;
    container.appendChild(div);
}

function removeExperience(button) {
    button.closest('.experience-card').remove();
    renumberExperience();
    collectFormData();
    updatePreview();
}

function renumberExperience() {
    const cards = document.querySelectorAll('.experience-card');
    cards.forEach((card, index) => {
        card.querySelector('h3').textContent = `Experience #${index + 1}`;
    });
}

// ===== EDUCATION MANAGEMENT =====
function addEducation() {
    const container = document.getElementById('education-container');
    if (container.children.length >= CONFIG.MAX_EDUCATION) {
        showToast(`Maximum ${CONFIG.MAX_EDUCATION} education entries allowed`, 'warning');
        return;
    }
    
    const count = container.children.length + 1;
    const div = document.createElement('div');
    div.className = 'education-card';
    div.innerHTML = `
        <div class="card-header">
            <h3>Education #${count}</h3>
            <button type="button" class="card-remove" onclick="removeEducation(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Institution *</label>
                <input type="text" class="edu-institution" placeholder="University of Technology" required>
            </div>
            <div class="form-group">
                <label>Degree *</label>
                <input type="text" class="edu-degree" placeholder="Bachelor of Science" required>
            </div>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Field of Study</label>
                <input type="text" class="edu-field" placeholder="Computer Science">
            </div>
            <div class="form-group">
                <label>Graduation Year</label>
                <input type="number" class="edu-year" placeholder="2020" min="1900" max="2030">
            </div>
        </div>
        <div class="form-group">
            <label>Achievements</label>
            <textarea class="edu-achievements" rows="3" placeholder="Honors, awards, or notable projects..."></textarea>
        </div>
    `;
    container.appendChild(div);
}

function removeEducation(button) {
    button.closest('.education-card').remove();
    renumberEducation();
    collectFormData();
    updatePreview();
}

function renumberEducation() {
    const cards = document.querySelectorAll('.education-card');
    cards.forEach((card, index) => {
        card.querySelector('h3').textContent = `Education #${index + 1}`;
    });
}

// ===== SKILLS MANAGEMENT =====
function addSkill() {
    const container = document.querySelector('.skill-tags');
    if (container.children.length >= CONFIG.MAX_SKILLS) {
        showToast(`Maximum ${CONFIG.MAX_SKILLS} skills allowed`, 'warning');
        return;
    }
    
    const div = document.createElement('div');
    div.className = 'skill-tag';
    div.innerHTML = `
        <input type="text" placeholder="New Skill" class="skill-input">
        <select class="skill-level">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced" selected>Advanced</option>
            <option value="expert">Expert</option>
        </select>
        <button type="button" class="tag-remove" onclick="removeSkill(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(div);
}

function removeSkill(button) {
    button.closest('.skill-tag').remove();
    collectFormData();
    updatePreview();
}

// ===== LANGUAGES MANAGEMENT =====
function addLanguage() {
    const container = document.querySelector('.language-tags');
    if (container.children.length >= CONFIG.MAX_LANGUAGES) {
        showToast(`Maximum ${CONFIG.MAX_LANGUAGES} languages allowed`, 'warning');
        return;
    }
    
    const div = document.createElement('div');
    div.className = 'language-tag';
    div.innerHTML = `
        <input type="text" placeholder="New Language" class="language-input">
        <select class="language-level">
            <option value="native">Native</option>
            <option value="fluent" selected>Fluent</option>
            <option value="intermediate">Intermediate</option>
            <option value="basic">Basic</option>
        </select>
        <button type="button" class="tag-remove" onclick="removeLanguage(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(div);
}

function removeLanguage(button) {
    button.closest('.language-tag').remove();
    collectFormData();
    updatePreview();
}

// ===== REFEREES MANAGEMENT =====
function addReferee() {
    const container = document.getElementById('referees-container');
    if (container.children.length >= CONFIG.MAX_REFEREES) {
        showToast(`Maximum ${CONFIG.MAX_REFEREES} referees allowed`, 'warning');
        return;
    }
    
    const count = container.children.length + 1;
    const div = document.createElement('div');
    div.className = 'referee-card';
    div.innerHTML = `
        <div class="card-header">
            <h4>Referee #${count}</h4>
            <button type="button" class="card-remove" onclick="removeReferee(this)">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Name *</label>
                <input type="text" class="referee-name" placeholder="Sarah Johnson" required>
            </div>
            <div class="form-group">
                <label>Position</label>
                <input type="text" class="referee-position" placeholder="Senior Manager">
            </div>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="referee-company" placeholder="Tech Solutions Inc.">
            </div>
            <div class="form-group">
                <label>Relationship</label>
                <input type="text" class="referee-relationship" placeholder="Former Supervisor">
            </div>
        </div>
        <div class="form-grid">
            <div class="form-group">
                <label>Email</label>
                <input type="email" class="referee-email" placeholder="sarah@company.com">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="tel" class="referee-phone" placeholder="+1 (123) 456-7890">
            </div>
        </div>
        <div class="form-group">
            <label>Additional Notes</label>
            <textarea class="referee-notes" rows="2" placeholder="Optional notes..."></textarea>
        </div>
    `;
    container.appendChild(div);
}

function removeReferee(button) {
    button.closest('.referee-card').remove();
    renumberReferees();
    collectFormData();
    updatePreview();
}

function renumberReferees() {
    const cards = document.querySelectorAll('.referee-card');
    cards.forEach((card, index) => {
        card.querySelector('h4').textContent = `Referee #${index + 1}`;
    });
}

// ===== DATA COLLECTION =====
function collectFormData() {
    // Personal Information
    cvData.personal = {
        fullName: document.getElementById('fullName').value,
        jobTitle: document.getElementById('jobTitle').value,
        summary: document.getElementById('summary').value,
        location: document.getElementById('location').value,
        emails: Array.from(document.querySelectorAll('.email-input')).map(input => input.value).filter(Boolean),
        phones: Array.from(document.querySelectorAll('.phone-input')).map(input => input.value).filter(Boolean),
        profileImage: cvData.personal.profileImage || ''
    };
    
    // Experience
    cvData.experience = Array.from(document.querySelectorAll('.experience-card')).map(card => ({
        title: card.querySelector('.exp-title').value,
        company: card.querySelector('.exp-company').value,
        startDate: card.querySelector('.exp-start').value,
        endDate: card.querySelector('.exp-end').value,
        current: card.querySelector('.exp-current').checked,
        location: card.querySelector('.exp-location').value,
        description: card.querySelector('.exp-description').value
    }));
    
    // Education
    cvData.education = Array.from(document.querySelectorAll('.education-card')).map(card => ({
        institution: card.querySelector('.edu-institution').value,
        degree: card.querySelector('.edu-degree').value,
        field: card.querySelector('.edu-field').value,
        year: card.querySelector('.edu-year').value,
        achievements: card.querySelector('.edu-achievements').value
    }));
    
    // Skills
    cvData.skills = Array.from(document.querySelectorAll('.skill-tag')).map(tag => ({
        name: tag.querySelector('.skill-input').value,
        level: tag.querySelector('.skill-level').value
    })).filter(skill => skill.name);
    
    // Languages
    cvData.languages = Array.from(document.querySelectorAll('.language-tag')).map(tag => ({
        name: tag.querySelector('.language-input').value,
        level: tag.querySelector('.language-level').value
    })).filter(lang => lang.name);
    
    // Referees
    cvData.referees = Array.from(document.querySelectorAll('.referee-card')).map(card => ({
        name: card.querySelector('.referee-name').value,
        position: card.querySelector('.referee-position').value,
        company: card.querySelector('.referee-company').value,
        relationship: card.querySelector('.referee-relationship').value,
        email: card.querySelector('.referee-email').value,
        phone: card.querySelector('.referee-phone').value,
        notes: card.querySelector('.referee-notes').value
    }));
    
    // Links
    cvData.links = Array.from(document.querySelectorAll('.multi-field')).filter(field => 
        field.querySelector('.link-type')
    ).map(field => ({
        type: field.querySelector('.link-type')?.value || '',
        url: field.querySelector('.link-url')?.value || ''
    })).filter(link => link.url);
    
    return cvData;
}

// ===== TEMPLATE SELECTION =====
function selectTemplate(templateName) {
    // Update UI
    document.querySelectorAll('.template-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`.template-card[data-template="${templateName}"]`).classList.add('active');
    
    selectedTemplate = templateName;
    
    // Update preview
    updatePreview();
    
    showToast(`${templateName.charAt(0).toUpperCase() + templateName.slice(1)} template selected`, 'success');
}

// ===== PREVIEW MANAGEMENT =====
function updatePreview() {
    collectFormData();
    saveToLocalStorage();
    
    // Update preview iframe - FIXED: Use TemplateRenderer from preview.js
    const previewIframe = document.getElementById('cvPreview');
    
    if (typeof TemplateRenderer !== 'undefined') {
        // Use the TemplateRenderer class from preview.js
        const renderer = new TemplateRenderer();
        const html = renderer.render(cvData, selectedTemplate);
        
        // Use srcdoc for immediate rendering
        previewIframe.srcdoc = html;
    } else {
        // Fallback preview
        previewIframe.srcdoc = generateFallbackPreview();
    }
}

function generateFallbackPreview() {
    const { personal, experience, education, skills } = cvData;
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { 
                    font-family: 'Inter', sans-serif; 
                    padding: 40px; 
                    background: #f8fafc;
                    margin: 0;
                }
                .preview-container {
                    max-width: 800px;
                    margin: 0 auto;
                    background: white;
                    padding: 40px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    border-radius: 8px;
                }
                .name { 
                    font-size: 36px; 
                    color: #1e293b; 
                    margin-bottom: 10px; 
                }
                .title { 
                    font-size: 20px; 
                    color: #4361ee; 
                    margin-bottom: 20px; 
                }
                .section { 
                    margin-bottom: 25px; 
                }
                .section-title { 
                    font-size: 18px; 
                    color: #1e293b; 
                    border-bottom: 2px solid #e2e8f0;
                    padding-bottom: 8px;
                    margin-bottom: 15px;
                }
            </style>
        </head>
        <body>
            <div class="preview-container">
                <h1 class="name">${personal.fullName || 'Your Name'}</h1>
                <h2 class="title">${personal.jobTitle || 'Professional Title'}</h2>
                
                ${personal.summary ? `
                    <div class="section">
                        <h3 class="section-title">Summary</h3>
                        <p>${personal.summary}</p>
                    </div>
                ` : ''}
                
                ${experience.length > 0 ? `
                    <div class="section">
                        <h3 class="section-title">Experience</h3>
                        ${experience.map(exp => `
                            <div style="margin-bottom: 15px;">
                                <strong>${exp.title || 'Position'}</strong> at ${exp.company || 'Company'}<br>
                                ${exp.startDate ? `${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <p style="color: #64748b; font-size: 14px; text-align: center; margin-top: 40px;">
                    Full preview will appear when TemplateRenderer is loaded
                </p>
            </div>
        </body>
        </html>
    `;
}

function printPreview() {
    if (typeof TemplateRenderer !== 'undefined') {
        const renderer = new TemplateRenderer();
        const html = renderer.render(cvData, selectedTemplate);
        
        const printWindow = window.open('', '_blank');
        printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
        
        setTimeout(() => {
            printWindow.print();
        }, 500);
    } else {
        showToast('Template renderer not loaded yet', 'error');
    }
}

function downloadPreview() {
    showToast('Use "Export PDF" for better quality downloads', 'info');
}

// ===== GENERATE CV (WITH 8-SECOND MODERN LOADER) =====
function generateCV() {
    // Validate required fields
    if (!validateForm()) {
        showToast('Please fill in all required fields (*)', 'error');
        return;
    }
    
    // Show modern loading effect for 8 seconds
    const loading = showLoadingEffect('Crafting your professional CV');
    
    // Collect final data
    collectFormData();
    saveToLocalStorage();
    
    // Simulate processing with 8-second delay
    setTimeout(() => {
        try {
            // ===== ACTUAL CV GENERATION CODE =====
            if (typeof TemplateRenderer !== 'undefined') {
                const renderer = new TemplateRenderer();
                const html = renderer.render(cvData, selectedTemplate);
                
                // Open in new window
                const newWindow = window.open('', '_blank');
                newWindow.document.open();
                newWindow.document.write(html);
                newWindow.document.close();
                
                // Hide loading with success animation
                loading.hide();
                
                // Show success message
                showToast('CV generated successfully! Opening in new window...', 'success');
                
                // Auto-print after a moment
                setTimeout(() => {
                    newWindow.focus();
                    newWindow.print();
                    showToast('Print dialog opened. Save as PDF for best results.', 'info');
                }, 1000);
                
            } else {
                loading.hide();
                showToast('Template renderer not loaded. Please refresh the page.', 'error');
            }
            
        } catch (error) {
            loading.hide();
            showToast('Error generating CV: ' + error.message, 'error');
            console.error('CV Generation Error:', error);
        }
    }, 8000); // 8 second delay for modern loader
}

function validateForm() {
    const required = [
        { element: document.getElementById('fullName'), message: 'Full Name is required' },
        { element: document.getElementById('jobTitle'), message: 'Professional Title is required' },
        { element: document.querySelector('.email-input'), message: 'Email is required' }
    ];
    
    for (const field of required) {
        if (!field.element || !field.element.value.trim()) {
            showToast(field.message, 'error');
            field.element?.focus();
            return false;
        }
    }
    
    return true;
}

// ===== AI SUGGESTIONS =====
async function suggestSummary() {
    const jobTitle = document.getElementById('jobTitle').value;
    const fullName = document.getElementById('fullName').value;
    
    if (!jobTitle || !fullName) {
        showToast('Please enter your name and job title first', 'warning');
        return;
    }
    
    // Show loading for AI suggestion
    const loading = showLoadingEffect('Generating AI-powered summary...');
    
    try {
        const summaryField = document.getElementById('summary');
        
        // Use AISuggestions class if available
        if (typeof AISuggestions !== 'undefined') {
            const ai = new AISuggestions();
            const suggestion = await ai.generateSummary({
                jobTitle,
                fullName,
                skills: cvData.skills,
                experience: cvData.experience,
                education: cvData.education
            });
            summaryField.value = suggestion;
        } else {
            // Fallback to local AI
            const suggestion = await generateAISummary(jobTitle, fullName);
            summaryField.value = suggestion;
        }
        
        collectFormData();
        updatePreview();
        
        loading.hide();
        showToast('AI suggestion generated!', 'success');
    } catch (error) {
        loading.hide();
        showToast('AI suggestion failed. Please try again.', 'error');
    }
}

async function generateAISummary(jobTitle, name) {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const templates = [
        `Results-driven ${jobTitle} with extensive experience in delivering high-quality solutions. ${name} has a proven track record of success in fast-paced environments with strong problem-solving skills and excellent communication abilities.`,
        `Innovative ${jobTitle} passionate about creating efficient and scalable solutions. ${name} combines technical expertise with strategic thinking to drive project success and is committed to continuous learning and professional growth.`,
        `Experienced ${jobTitle} with a background in leading successful projects from conception to completion. ${name} excels at collaborating with cross-functional teams and delivering exceptional results under tight deadlines.`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
}

// ===== DATA PERSISTENCE =====
function saveToLocalStorage() {
    try {
        localStorage.setItem('cvBuilderData', JSON.stringify({
            cvData,
            selectedTemplate,
            currentStep
        }));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function loadSavedData() {
    try {
        const saved = localStorage.getItem('cvBuilderData');
        if (saved) {
            const data = JSON.parse(saved);
            cvData = data.cvData || cvData;
            selectedTemplate = data.selectedTemplate || selectedTemplate;
            currentStep = data.currentStep || 1;
            
            // Restore UI state
            restoreFormData();
            
            // Restore template selection
            const templateCard = document.querySelector(`.template-card[data-template="${selectedTemplate}"]`);
            if (templateCard) {
                document.querySelectorAll('.template-card').forEach(card => {
                    card.classList.remove('active');
                });
                templateCard.classList.add('active');
            }
            
            // Restore step
            goToStep(currentStep);
            
            showToast('Previous data loaded successfully', 'success');
        }
    } catch (error) {
        console.error('Error loading from localStorage:', error);
    }
}

function restoreFormData() {
    // Restore personal information
    if (cvData.personal) {
        document.getElementById('fullName').value = cvData.personal.fullName || '';
        document.getElementById('jobTitle').value = cvData.personal.jobTitle || '';
        document.getElementById('summary').value = cvData.personal.summary || '';
        document.getElementById('location').value = cvData.personal.location || '';
        
        // Restore profile image
        if (cvData.personal.profileImage) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `<img src="${cvData.personal.profileImage}" alt="Profile Preview">`;
            preview.style.border = '3px solid #4361ee';
        }
    }
    
    // Note: For simplicity, we're not restoring all dynamic fields
    // This would require more complex logic
}

// ===== EXPORT FUNCTIONALITY =====
async function exportPDF() {
    if (!validateForm()) {
        showToast('Please fill in all required fields first', 'error');
        return;
    }
    
    // Show modern loading effect
    const loading = showLoadingEffect('Creating PDF document...');
    
    collectFormData();
    
    try {
        if (typeof TemplateRenderer !== 'undefined') {
            const renderer = new TemplateRenderer();
            const html = renderer.render(cvData, selectedTemplate);
            
            // Create temporary iframe
            const tempIframe = document.createElement('iframe');
            tempIframe.style.cssText = 'position: absolute; width: 210mm; height: 297mm; top: -9999px; left: -9999px;';
            document.body.appendChild(tempIframe);
            
            // Write HTML to iframe
            tempIframe.contentDocument.open();
            tempIframe.contentDocument.write(html);
            tempIframe.contentDocument.close();
            
            // Wait for content to load (8 seconds)
            setTimeout(async () => {
                try {
                    // Generate PDF
                    const canvas = await html2canvas(tempIframe.contentDocument.body, {
                        scale: 2,
                        useCORS: true,
                        logging: false,
                        backgroundColor: '#ffffff'
                    });
                    
                    const { jsPDF } = window.jspdf;
                    const pdf = new jsPDF({
                        orientation: 'portrait',
                        unit: 'mm',
                        format: 'a4'
                    });
                    
                    const imgData = canvas.toDataURL('image/png');
                    const pageWidth = pdf.internal.pageSize.getWidth();
                    const pageHeight = pdf.internal.pageSize.getHeight();
                    
                    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
                    
                    // Generate filename
                    const fileName = `${cvData.personal.fullName || 'cv'}-resume.pdf`.replace(/[^a-z0-9]/gi, '_').toLowerCase();
                    pdf.save(fileName);
                    
                    // Clean up
                    document.body.removeChild(tempIframe);
                    
                    loading.hide();
                    showToast('PDF downloaded successfully!', 'success');
                    
                } catch (error) {
                    loading.hide();
                    showToast('Error generating PDF: ' + error.message, 'error');
                    console.error('PDF Export Error:', error);
                }
            }, 8000);
            
        } else {
            loading.hide();
            showToast('Template renderer not available', 'error');
        }
    } catch (error) {
        loading.hide();
        showToast('Error generating PDF: ' + error.message, 'error');
        console.error('PDF Export Error:', error);
    }
}

function saveProgress() {
    collectFormData();
    saveToLocalStorage();
    showToast('Progress saved successfully!', 'success');
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' :
                 type === 'error' ? 'fa-exclamation-circle' :
                 type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
    
    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Real-time updates for preview
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(window.previewTimeout);
            window.previewTimeout = setTimeout(updatePreview, 500);
        });
        
        input.addEventListener('change', updatePreview);
    });
    
    // Auto-save every 30 seconds
    setInterval(saveProgress, 30000);
    
    // Add AI suggestion button to summary field
    const summaryField = document.getElementById('summary');
    const summaryContainer = summaryField.parentElement;
    
    const aiButton = document.createElement('button');
    aiButton.type = 'button';
    aiButton.className = 'ai-suggest-btn';
    aiButton.innerHTML = '<i class="fas fa-robot"></i> AI Suggest';
    aiButton.onclick = suggestSummary;
    aiButton.title = 'Generate AI-powered summary';
    
    summaryContainer.appendChild(aiButton);
    
    // Add AI suggestion CSS
    const style = document.createElement('style');
    style.textContent = `
        .ai-suggest-btn {
            position: absolute;
            right: 10px;
            bottom: 40px;
            padding: 6px 12px;
            background: linear-gradient(90deg, #7209b7, #4361ee);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 0.85rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.3s;
        }
        
        .ai-suggest-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(114, 9, 183, 0.3);
        }
        
        .form-group {
            position: relative;
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ===== UTILITY FUNCTIONS =====
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function generateBulletPoints(text) {
    if (!text) return [];
    return text.split(/\n|•|-\s+/)
        .map(line => line.trim())
        .filter(line => line.length > 0);
}

// Make functions globally available
window.addEmailField = addEmailField;
window.addPhoneField = addPhoneField;
window.addLinkField = addLinkField;
window.removeField = removeField;
window.addExperience = addExperience;
window.removeExperience = removeExperience;
window.addEducation = addEducation;
window.removeEducation = removeEducation;
window.addSkill = addSkill;
window.removeSkill = removeSkill;
window.addLanguage = addLanguage;
window.removeLanguage = removeLanguage;
window.addReferee = addReferee;
window.removeReferee = removeReferee;
window.nextSection = nextSection;
window.prevSection = prevSection;
window.selectTemplate = selectTemplate;
window.updatePreview = updatePreview;
window.printPreview = printPreview;
window.downloadPreview = downloadPreview;
window.generateCV = generateCV;
window.exportPDF = exportPDF;
window.saveProgress = saveProgress;
window.suggestSummary = suggestSummary;