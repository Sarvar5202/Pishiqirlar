// ============================================
// DARK MODE FUNCTIONALITY
// ============================================
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check localStorage for saved theme preference
if (darkModeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    // Dark Mode Toggle Event
    darkModeToggle.addEventListener('click', function() {
        // Animation effect
        this.style.transform = 'rotate(360deg) scale(0.8)';
        
        setTimeout(() => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
            
            this.style.transform = 'rotate(0deg) scale(1)';
        }, 200);
    });
}

// ============================================
// TABS FUNCTIONALITY
// ============================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe gallery items with stagger effect
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    observer.observe(item);
    item.style.transitionDelay = `${index * 0.05}s`;
});

// ============================================
// PARALLAX EFFECT
// ============================================
let lastScroll = 0;
const heroHeader = document.querySelector('.hero-header');

if (heroHeader) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Parallax effect for hero header
        if (currentScroll < heroHeader.offsetHeight) {
            heroHeader.style.transform = `translateY(${currentScroll * 0.3}px)`;
        }
        
        lastScroll = currentScroll;
    });
}

// ============================================
// IMAGE LOADING ANIMATION
// ============================================
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '0';
        setTimeout(() => {
            this.style.transition = 'opacity 0.5s ease';
            this.style.opacity = '1';
        }, 100);
    });
    
    // Handle image errors
    img.addEventListener('error', function() {
        this.style.display = 'none';
        const parent = this.closest('.gallery-item');
        if (parent) {
            parent.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
            parent.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #999; font-size: 1.2em;">Rasm topilmadi</div>';
        }
    });
});

// ============================================
// EMOJI ANIMATIONS
// ============================================
const emojis = document.querySelectorAll('.hero-title .emoji, .tab-icon');
emojis.forEach(emoji => {
    emoji.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'bounce 0.5s ease';
        }, 10);
    });
});

// Add bounce animation
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% {
            transform: translateY(0) scale(1);
        }
        50% {
            transform: translateY(-20px) scale(1.3);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// CURSOR EFFECT (Only for non-touch devices)
// ============================================
if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #764ba2;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease, border-color 0.3s ease;
        display: none;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    document.querySelectorAll('a, button, .gallery-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.8)';
            cursor.style.borderColor = '#d4af37';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = '#764ba2';
        });
    });
}

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// GALLERY ITEM CLICK EFFECT
// ============================================
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// ============================================
// KEYBOARD NAVIGATION FOR TABS
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeButton = document.querySelector('.tab-btn.active');
        if (activeButton) {
            const buttons = Array.from(tabButtons);
            const currentIndex = buttons.indexOf(activeButton);
            let newIndex;
            
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
            } else {
                newIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
            }
            
            buttons[newIndex].click();
        }
    }
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// RATING FUNCTIONALITY
// ============================================
const stars = document.querySelectorAll('.star');
const ratingFeedback = document.getElementById('ratingFeedback');
const feedbackText = document.getElementById('feedbackText');
const submitFeedback = document.getElementById('submitFeedback');
const ratingThanks = document.getElementById('ratingThanks');
let selectedRating = 0;

stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        selectedRating = index + 1;
        
        // Update stars visual state
        stars.forEach((s, i) => {
            if (i < selectedRating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
        
        // Show feedback form
        ratingFeedback.style.display = 'block';
        ratingThanks.style.display = 'none';
        feedbackText.focus();
    });
    
    star.addEventListener('mouseenter', () => {
        const hoverRating = index + 1;
        stars.forEach((s, i) => {
            if (i < hoverRating) {
                s.style.filter = 'grayscale(0%)';
                s.style.opacity = '1';
            } else {
                s.style.filter = 'grayscale(100%)';
                s.style.opacity = '0.5';
            }
        });
    });
});

// Reset stars on mouse leave (if not clicked)
stars.forEach(star => {
    star.addEventListener('mouseleave', () => {
        if (selectedRating === 0) {
            stars.forEach(s => {
                s.style.filter = 'grayscale(100%)';
                s.style.opacity = '0.5';
            });
        } else {
            stars.forEach((s, i) => {
                if (i < selectedRating) {
                    s.style.filter = 'grayscale(0%)';
                    s.style.opacity = '1';
                } else {
                    s.style.filter = 'grayscale(100%)';
                    s.style.opacity = '0.5';
                }
            });
        }
    });
});

// Submit feedback
if (submitFeedback) {
    submitFeedback.addEventListener('click', () => {
        const feedback = feedbackText.value.trim();
        
        // Save to localStorage (you can send to server later)
        const ratingData = {
            rating: selectedRating,
            feedback: feedback,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('userRating', JSON.stringify(ratingData));
        
        // Show thanks message
        ratingFeedback.style.display = 'none';
        ratingThanks.style.display = 'block';
        
        // Reset after 3 seconds
        setTimeout(() => {
            selectedRating = 0;
            feedbackText.value = '';
            stars.forEach(s => s.classList.remove('active'));
            ratingThanks.style.display = 'none';
        }, 5000);
        
        // Send to server
        fetch('/api/rating', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ratingData)
        }).catch(err => {
            console.log('Rating serverga yuborilmadi, lekin saqlandi:', err);
        });
    });
}

// Load saved rating on page load
window.addEventListener('load', () => {
    const savedRating = localStorage.getItem('userRating');
    if (savedRating) {
        try {
            const data = JSON.parse(savedRating);
            if (data.rating) {
                selectedRating = data.rating;
                stars.forEach((s, i) => {
                    if (i < selectedRating) {
                        s.classList.add('active');
                    }
                });
            }
        } catch (e) {
            console.error('Error loading rating:', e);
        }
    }
});

console.log('🍰 Pishiriqlar sayti yuklandi!');
