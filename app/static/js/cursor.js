/**
 * Custom Cursor Module
 * Spaceship cursor with directional rotation and shooting effects
 */

class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorDot = null;
        this.trails = [];
        this.lastTrailTime = 0;
        this.lastX = 0;
        this.lastY = 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.currentAngle = 0;
        this.targetAngle = 0;
        this.init();
    }

    init() {
        // Create cursor elements
        this.createCursorElements();
        
        // Bind events
        this.bindEvents();
        
        // Start animation loop
        this.animate();
    }

    createCursorElements() {
        // Main cursor (spaceship body)
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        
        // Add wings
        const wings = document.createElement('div');
        wings.className = 'spaceship-wings';
        this.cursor.appendChild(wings);
        
        // Add engines
        const engines = document.createElement('div');
        engines.className = 'spaceship-engines';
        this.cursor.appendChild(engines);
        
        document.body.appendChild(this.cursor);

        // Cursor dot (engine glow trail)
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'cursor-dot';
        document.body.appendChild(this.cursorDot);
    }

    bindEvents() {
        let lastMoveTime = Date.now();
        
        // Mouse move
        document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            const deltaTime = now - lastMoveTime;
            
            // Calculate velocity
            this.velocityX = (e.clientX - this.lastX) / Math.max(deltaTime, 1);
            this.velocityY = (e.clientY - this.lastY) / Math.max(deltaTime, 1);
            
            // Calculate angle based on movement direction
            if (Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1) {
                this.targetAngle = Math.atan2(this.velocityX, -this.velocityY) * (180 / Math.PI);
            }
            
            this.updateCursorPosition(e.clientX, e.clientY);
            this.createTrail(e.clientX, e.clientY);
            
            this.lastX = e.clientX;
            this.lastY = e.clientY;
            lastMoveTime = now;
        });

        // Mouse down - shoot laser
        document.addEventListener('mousedown', (e) => {
            this.cursor.classList.add('click');
            this.shootLaser(e.clientX, e.clientY);
        });

        // Mouse up
        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('click');
        });

        // Hover states for interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, .magnetic, .project-card, .skill-card, input, textarea, .card-3d, [role="button"]'
        );

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });

            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });
    }

    updateCursorPosition(x, y) {
        // Update main cursor position
        this.cursor.style.left = x + 'px';
        this.cursor.style.top = y + 'px';

        // Update engine glow dot position (behind the spaceship at the engines)
        const offset = 30; // Distance behind spaceship
        const radians = (this.currentAngle - 180) * (Math.PI / 180);
        const dotX = x + Math.sin(radians) * offset;
        const dotY = y + Math.cos(radians) * offset;
        
        this.cursorDot.style.left = dotX + 'px';
        this.cursorDot.style.top = dotY + 'px';
    }

    shootLaser(x, y) {
        // Create laser shot that fires in the direction the spaceship is facing
        const laser = document.createElement('div');
        laser.className = 'laser-shot';
        
        // Calculate nose position (front of spaceship)
        const noseOffset = 14; // Distance from center to nose (32px ship, nose at 2px from top)
        const radians = this.currentAngle * (Math.PI / 180);
        const noseX = x + Math.sin(radians) * noseOffset;
        const noseY = y - Math.cos(radians) * noseOffset;
        
        // Position laser at spaceship nose
        laser.style.left = noseX + 'px';
        laser.style.top = noseY + 'px';
        laser.style.setProperty('--rotation', `${this.currentAngle}deg`);
        
        // Store the angle and position for animation
        laser.dataset.angle = this.currentAngle;
        laser.dataset.startX = noseX;
        laser.dataset.startY = noseY;
        
        document.body.appendChild(laser);

        // Create muzzle flash particles
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createShootParticle(noseX, noseY, this.currentAngle);
            }, i * 20);
        }

        // Spaceship recoil effect
        this.cursor.style.transform = `translate(-50%, -50%) rotate(${this.currentAngle}deg)`;
        setTimeout(() => {
            this.cursor.style.transform = `translate(-50%, -50%) rotate(${this.currentAngle}deg)`;
        }, 50);

        // Remove laser after animation
        setTimeout(() => {
            laser.remove();
        }, 300);
    }

    createShootParticle(x, y, angle) {
        const particle = document.createElement('div');
        particle.className = 'cursor-trail';
        
        // Calculate forward direction
        const radians = angle * (Math.PI / 180);
        
        // Create spread in the firing direction
        const spread = 8;
        const forwardSpread = Math.random() * spread;
        const sideSpread = (Math.random() - 0.5) * spread;
        
        const offsetX = Math.sin(radians) * forwardSpread + Math.cos(radians) * sideSpread;
        const offsetY = -Math.cos(radians) * forwardSpread + Math.sin(radians) * sideSpread;
        
        particle.style.left = (x + offsetX) + 'px';
        particle.style.top = (y + offsetY) + 'px';
        particle.style.width = (Math.random() * 1 + 1) + 'px';
        particle.style.height = (Math.random() * 1 + 1) + 'px';
        
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 400);
    }

    createTrail(x, y) {
        const now = Date.now();
        
        // Create trail every 50ms for engine exhaust
        if (now - this.lastTrailTime < 50) return;
        
        this.lastTrailTime = now;

        // Create trails from both engines
        const offset = 11; // Distance to back of spaceship (bottom-6px from 32px ship)
        const sideOffset = 3; // Distance between engines (half of 8px container - 1px)
        const radians = (this.currentAngle - 180) * (Math.PI / 180);
        const perpRadians = (this.currentAngle - 90) * (Math.PI / 180);
        
        // Left engine trail
        const leftX = x + Math.sin(radians) * offset + Math.sin(perpRadians) * sideOffset;
        const leftY = y + Math.cos(radians) * offset + Math.cos(perpRadians) * sideOffset;
        
        // Right engine trail
        const rightX = x + Math.sin(radians) * offset - Math.sin(perpRadians) * sideOffset;
        const rightY = y + Math.cos(radians) * offset - Math.cos(perpRadians) * sideOffset;

        [{ x: leftX, y: leftY }, { x: rightX, y: rightY }].forEach(pos => {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = pos.x + 'px';
            trail.style.top = pos.y + 'px';
            trail.style.width = '2px';
            trail.style.height = '2px';
            
            document.body.appendChild(trail);

            // Remove trail after animation
            setTimeout(() => {
                trail.remove();
            }, 400);
        });
    }

    animate() {
        // Smooth rotation interpolation
        const angleDiff = this.targetAngle - this.currentAngle;
        
        // Handle angle wrapping
        let adjustedDiff = angleDiff;
        if (adjustedDiff > 180) adjustedDiff -= 360;
        if (adjustedDiff < -180) adjustedDiff += 360;
        
        // Lerp rotation for smooth transition
        this.currentAngle += adjustedDiff * 0.15;
        
        // Apply rotation to cursor
        this.cursor.style.transform = `translate(-50%, -50%) rotate(${this.currentAngle}deg)`;
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize custom cursor when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
});

export default CustomCursor;
