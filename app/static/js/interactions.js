/**
 * Interactions Module
 * Handles user interactions like filters, forms, and dynamic content
 */

// Initialize all interactions
document.addEventListener('DOMContentLoaded', () => {
    initializeSkillFilters();
    initializeProjectFilters();
    initializeContactForm();
    initializeMagneticEffects();
    initializeParallaxScroll();
    initializeAdvancedAnimations();
});

/**
 * Initialize skill filtering
 */
function initializeSkillFilters() {
    const filterButtons = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    if (filterButtons.length === 0 || skillCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update button styles
            filterButtons.forEach(btn => {
                if (btn.classList.contains('active')) {
                    btn.classList.add('bg-gradient-to-r', 'from-primary-500', 'to-accent-500', 'border-primary-400');
                    btn.classList.remove('bg-slate-800', 'border-transparent');
                } else {
                    btn.classList.remove('bg-gradient-to-r', 'from-primary-500', 'to-accent-500', 'border-primary-400');
                    btn.classList.add('bg-slate-800', 'border-transparent');
                }
            });
            
            // Filter skill cards
            skillCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Initialize project filtering
 */
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update button styles
            filterButtons.forEach(btn => {
                if (btn.classList.contains('active')) {
                    btn.classList.add('bg-gradient-to-r', 'from-primary-500', 'to-accent-500', 'border-primary-400');
                    btn.classList.remove('bg-slate-800', 'border-transparent');
                } else {
                    btn.classList.remove('bg-gradient-to-r', 'from-primary-500', 'to-accent-500', 'border-primary-400');
                    btn.classList.add('bg-slate-800', 'border-transparent');
                }
            });
            
            // Filter project cards
            projectCards.forEach((card) => {
                const shouldShow = filter === 'all' || card.classList.contains(filter);
                
                if (shouldShow) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Initialize contact form submission
 */
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Disable submit button
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split animate-spin"></i> Sending...';
        
        try {
            // Send form data to API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            // Show message
            formMessage.classList.remove('hidden');
            
            if (data.success) {
                formMessage.className = 'p-4 rounded-xl text-center bg-green-500/20 border border-green-500/50 text-green-400';
                formMessage.textContent = data.message;
                form.reset();
            } else {
                formMessage.className = 'p-4 rounded-xl text-center bg-red-500/20 border border-red-500/50 text-red-400';
                formMessage.textContent = data.error || 'An error occurred. Please try again.';
            }
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            formMessage.classList.remove('hidden');
            formMessage.className = 'p-4 rounded-xl text-center bg-red-500/20 border border-red-500/50 text-red-400';
            formMessage.textContent = 'An error occurred. Please try again later.';
            
            setTimeout(() => {
                formMessage.classList.add('hidden');
            }, 5000);
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('border-red-500')) {
                validateInput(input);
            }
        });
    });
}

/**
 * Validate individual form input
 */
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    
    if (input.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }
    
    if (isValid) {
        input.classList.remove('border-red-500');
        input.classList.add('border-primary-500/20');
    } else {
        input.classList.add('border-red-500');
        input.classList.remove('border-primary-500/20');
    }
    
    return isValid;
}

/**
 * Initialize magnetic hover effects for buttons
 */
function initializeMagneticEffects() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        let ticking = false;
        let translateX = 0;
        let translateY = 0;
        
        element.addEventListener('mousemove', (e) => {
            if (!ticking) {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                translateX = x * 0.15;
                translateY = y * 0.15;
                
                window.requestAnimationFrame(() => {
                    element.style.transform = `translate(${translateX}px, ${translateY}px)`;
                    ticking = false;
                });
                
                ticking = true;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            element.style.transform = 'translate(0, 0)';
            setTimeout(() => {
                element.style.transition = 'none';
            }, 300);
        });
        
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'none';
        });
    });
}

/**
 * Initialize parallax scrolling effects
 */
function initializeParallaxScroll() {
    const parallaxElements = document.querySelectorAll('.parallax-slow');
    
    if (parallaxElements.length === 0) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

/**
 * Initialize advanced animations on scroll
 */
function initializeAdvancedAnimations() {
    // Animate skill progress bars when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.getAttribute('data-width');
                
                // Animate width with delay
                setTimeout(() => {
                    progressBar.style.width = targetWidth + '%';
                }, 100);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.skill-progress').forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // Add mouse movement parallax to particles
    const particles = document.querySelectorAll('.particle');
    if (particles.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 20;
                const y = (mouseY - 0.5) * speed * 20;
                
                particle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
    
    // Add 3D tilt effect to skill cards on mouse move
    const skillCards = document.querySelectorAll('.card-3d');
    skillCards.forEach(card => {
        let ticking = false;
        let rotateX = 0;
        let rotateY = 0;
        
        card.addEventListener('mousemove', (e) => {
            if (!ticking) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                rotateX = (y - centerY) / 10;
                rotateY = (centerX - x) / 10;
                
                window.requestAnimationFrame(() => {
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                    ticking = false;
                });
                
                ticking = true;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.3s ease-out';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            setTimeout(() => {
                card.style.transition = 'none';
            }, 300);
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="/#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(2);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Export functions
export {
    initializeSkillFilters,
    initializeProjectFilters,
    initializeContactForm,
    validateInput,
    initializeMagneticEffects,
    initializeParallaxScroll,
    initializeAdvancedAnimations
};
