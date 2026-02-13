/**
 * Animations Module
 * Handles advanced animations and visual effects
 */

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initializeParticlesBackground();
    initializeSkillProgressBars();
    initializeParallaxEffects();
    initializeScrollProgress();
    initializeSectionAnimations();
    initializeScrollSnap();
    initializeSectionTransitions();
    initializeFloatingElements();
});

/**
 * Create animated particle background
 */
function initializeParticlesBackground() {
    const canvas = document.createElement('canvas');
    const container = document.getElementById('particles-background');
    
    if (!container) return;
    
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around screen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles
    const particleCount = 100;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particleA, indexA) => {
            particles.slice(indexA + 1).forEach(particleB => {
                const dx = particleA.x - particleB.x;
                const dy = particleA.y - particleB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.2;
                    ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particleA.x, particleA.y);
                    ctx.lineTo(particleB.x, particleB.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

/**
 * Animate skill progress bars
 */
function initializeSkillProgressBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    if (progressBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-width');
                
                // Animate width
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = `${targetWidth}%`;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

/**
 * Initialize parallax scrolling effects
 */
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/**
 * Create floating animation for elements
 */
function createFloatingAnimation(element, duration = 3000, distance = 20) {
    let startTime = null;
    
    function animate(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = (elapsed % duration) / duration;
        const yOffset = Math.sin(progress * Math.PI * 2) * distance;
        
        element.style.transform = `translateY(${yOffset}px)`;
        
        requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
}

/**
 * Create stagger animation for elements
 */
function staggerAnimation(elements, delay = 100) {
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * delay}ms`;
    });
}

// Export functions
export {
    initializeParticlesBackground,
    initializeSkillProgressBars,
    initializeParallaxEffects,
    createFloatingAnimation,
    staggerAnimation,
    initializeScrollProgress,
    initializeSectionAnimations,
    initializeScrollSnap,
    initializeSectionTransitions,
    initializeFloatingElements
};

/**
 * Initialize scroll progress indicator
 */
function initializeScrollProgress() {
    // Create progress bar container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'fixed top-0 left-0 w-full h-1 bg-slate-800/50 z-50 backdrop-blur-sm';
    progressContainer.innerHTML = `
        <div id="scroll-progress" class="h-full bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500 transition-all duration-300 relative overflow-hidden" style="width: 0%">
            <div class="absolute inset-0 shimmer"></div>
            <div class="absolute right-0 top-0 bottom-0 w-2 bg-primary-400 shadow-lg shadow-primary-400/50"></div>
        </div>
    `;
    document.body.appendChild(progressContainer);
    
    // Create section indicators
    const sections = document.querySelectorAll('section[id]');
    const navIndicator = document.createElement('div');
    navIndicator.className = 'fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-3 hidden lg:block';
    
    sections.forEach((section, index) => {
        const dot = document.createElement('button');
        dot.className = 'block w-3 h-3 bg-slate-700 border-2 border-primary-500/30 hover:border-primary-500 transition-all duration-300 hover:scale-150 relative group';
        dot.dataset.section = section.id;
        dot.innerHTML = `
            <span class="absolute right-6 top-1/2 -translate-y-1/2 bg-slate-800 px-3 py-1 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border-l-2 border-accent-500">
                ${section.id}
            </span>
        `;
        
        dot.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });
        
        navIndicator.appendChild(dot);
    });
    
    document.body.appendChild(navIndicator);
    
    // Update progress on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollProgress();
                updateSectionIndicators();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function updateScrollProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById('scroll-progress').style.width = scrolled + '%';
    }
    
    function updateSectionIndicators() {
        const dots = navIndicator.querySelectorAll('button');
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                dots[index].classList.remove('w-3', 'h-3', 'bg-slate-700');
                dots[index].classList.add('w-4', 'h-4', 'bg-gradient-to-r', 'from-primary-500', 'to-accent-500', 'shadow-lg', 'shadow-primary-500/50');
            } else {
                dots[index].classList.add('w-3', 'h-3', 'bg-slate-700');
                dots[index].classList.remove('w-4', 'h-4', 'bg-gradient-to-r', 'from-primary-500', 'to-accent-500', 'shadow-lg', 'shadow-primary-500/50');
            }
        });
    }
}

/**
 * Initialize section reveal animations
 */
function initializeSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                
                // Trigger stagger animations for child elements
                const staggerElements = entry.target.querySelectorAll('[data-stagger]');
                staggerElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('stagger-visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
}

/**
 * Initialize smooth scroll snap behavior
 */
function initializeScrollSnap() {
    let isScrolling;
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Clear timeout throughout the scroll
        window.clearTimeout(isScrolling);
        
        // Set a timeout to run after 1.5 seconds of inactivity
        isScrolling = setTimeout(() => {
            snapToNearestSection(currentScrollTop > lastScrollTop);
        }, 400);
        
        lastScrollTop = currentScrollTop;
    }, false);
    
    function snapToNearestSection(scrollingDown) {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        
        let closestSection = null;
        let closestDistance = Infinity;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            // Check if we're in the middle of a section (not near top or bottom edges)
            if (scrollPosition > sectionTop + 200 && scrollPosition < sectionBottom - viewportHeight) {
                // User is reading content within the section, don't snap
                return;
            }
            
            // Calculate distance to section start
            const distance = Math.abs(scrollPosition - sectionTop);
            
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSection = section;
            }
        });
        
        // Only snap if we're close to a section boundary (within 20% of viewport height)
        // and not already at the section start
        if (closestDistance > 50 && closestDistance < viewportHeight * 0.2 && closestSection) {
            closestSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

/**
 * Initialize section transition effects
 */
function initializeSectionTransitions() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach((section, index) => {
        // Add geometric divider between sections
        if (index < sections.length - 1) {
            const divider = document.createElement('div');
            divider.className = 'section-divider';
            divider.innerHTML = `
                <div class="relative h-20 overflow-hidden">
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-full border-t-2 border-primary-500/20 relative">
                            <div class="absolute left-0 top-0 w-0 h-full border-t-2 border-gradient-to-r from-primary-500 to-accent-500 transition-all duration-1000 divider-line"></div>
                        </div>
                    </div>
                    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-950 border-2 border-primary-500/50 rotate-45 flex items-center justify-center">
                        <div class="w-6 h-6 bg-gradient-to-br from-primary-500 to-accent-500 rotate-45"></div>
                    </div>
                    <!-- Geometric accents -->
                    <div class="absolute left-1/4 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-accent-500/30 rotate-45"></div>
                    <div class="absolute right-1/4 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-primary-500/30 rotate-45"></div>
                </div>
            `;
            section.parentNode.insertBefore(divider, section.nextSibling);
        }
    });
    
    // Animate dividers on scroll
    const dividerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const line = entry.target.querySelector('.divider-line');
                if (line) {
                    line.style.width = '100%';
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.section-divider').forEach(divider => {
        dividerObserver.observe(divider);
    });
}

/**
 * Initialize floating decorative elements
 */
function initializeFloatingElements() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach((section, index) => {
        // Skip hero section (already has particles)
        if (section.id === 'home') return;
        
        // Add floating geometric shapes to each section
        const floatingContainer = document.createElement('div');
        floatingContainer.className = 'absolute inset-0 pointer-events-none overflow-hidden opacity-20';
        
        // Create different patterns for different sections
        const patterns = [
            { shapes: 3, type: 'square' },
            { shapes: 2, type: 'diamond' },
            { shapes: 4, type: 'triangle' },
        ];
        
        const pattern = patterns[index % patterns.length];
        
        for (let i = 0; i < pattern.shapes; i++) {
            const shape = document.createElement('div');
            const size = 50 + Math.random() * 100;
            const left = Math.random() * 80 + 10;
            const top = Math.random() * 80 + 10;
            const animationDelay = Math.random() * 10;
            const animationDuration = 15 + Math.random() * 10;
            
            shape.className = `absolute animate-float-geometric`;
            shape.style.width = size + 'px';
            shape.style.height = size + 'px';
            shape.style.left = left + '%';
            shape.style.top = top + '%';
            shape.style.animationDelay = `-${animationDelay}s`;
            shape.style.animationDuration = `${animationDuration}s`;
            
            if (pattern.type === 'square') {
                shape.classList.add('bg-primary-500/10', 'border-2', 'border-primary-500/30');
            } else if (pattern.type === 'diamond') {
                shape.classList.add('bg-accent-500/10', 'border-2', 'border-accent-500/30', 'rotate-45');
            } else {
                shape.classList.add('bg-primary-400/10', 'border-2', 'border-primary-400/30');
                shape.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            }
            
            floatingContainer.appendChild(shape);
        }
        
        // Insert at the beginning of the section
        if (section.firstChild) {
            section.insertBefore(floatingContainer, section.firstChild);
        } else {
            section.appendChild(floatingContainer);
        }
    });
}
