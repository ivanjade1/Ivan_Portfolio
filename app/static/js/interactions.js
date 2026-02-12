/**
 * Interactions Module
 * Handles user interactions like filters, forms, and dynamic content
 */

// Initialize all interactions
document.addEventListener('DOMContentLoaded', () => {
    initializeSkillFilters();
    initializeProjectFilters();
    initializeContactForm();
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
                    btn.classList.add('bg-gradient-to-r', 'from-primary-500', 'to-accent-500');
                    btn.classList.remove('bg-slate-800');
                } else {
                    btn.classList.remove('bg-gradient-to-r', 'from-primary-500', 'to-accent-500');
                    btn.classList.add('bg-slate-800');
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
                    btn.classList.add('bg-gradient-to-r', 'from-primary-500', 'to-accent-500');
                    btn.classList.remove('bg-slate-800');
                } else {
                    btn.classList.remove('bg-gradient-to-r', 'from-primary-500', 'to-accent-500');
                    btn.classList.add('bg-slate-800');
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

// Export functions
export {
    initializeSkillFilters,
    initializeProjectFilters,
    initializeContactForm,
    validateInput
};
