// Custom Gaming Arrow Cursor Movement - Desktop only
(function() {
    // Only run on desktop
    if (window.innerWidth < 768) return;
    
    // Create cursor element if it doesn't exist
    let cursor = document.getElementById('custom-cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        cursor.innerHTML = '<img src="chuot.png" alt="cursor" style="width: 100%; height: 100%; object-fit: contain;">';
        document.body.insertBefore(cursor, document.body.firstChild);
    }
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    // Show cursor immediately
    cursor.style.opacity = '1';
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Smooth lerp effect
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('clicking');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('clicking');
    });
    
    // Hover effect on clickable elements
    function setupHoverEffects() {
        const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .info-box, .trailer-card, .vip-item, .crew-toggle-btn, input, textarea, select, .navbar, .section-title, [onclick], label');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovering');
            });
        });
    }
    
    // Setup on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupHoverEffects);
    } else {
        setupHoverEffects();
    }
    
    // Re-setup hover effects after dynamic content loads
    setTimeout(setupHoverEffects, 1000);
    setTimeout(setupHoverEffects, 3000);
})();


