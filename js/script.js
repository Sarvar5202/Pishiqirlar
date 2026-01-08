// Dark Mode Functionality - Kreativ versiya
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check localStorage for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
    darkModeToggle.style.transform = 'rotate(180deg)';
}

// Kreativ Dark Mode Toggle
darkModeToggle.addEventListener('click', function() {
    // Animatsiya efekti
    this.style.transform = 'rotate(360deg) scale(0.8)';
    
    setTimeout(() => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            this.textContent = '☀️';
            // Qora mavzu uchun qo'shimcha effektlar
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.style.filter = 'brightness(0.9)';
            });
        } else {
            localStorage.setItem('theme', 'light');
            this.textContent = '🌙';
            // Yengi mavzu uchun
            document.querySelectorAll('.gallery-item').forEach(item => {
                item.style.filter = 'brightness(1)';
            });
        }
        
        this.style.transform = 'rotate(0deg) scale(1)';
    }, 200);
});

// Scroll animations
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

// Observe sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Observe gallery items with stagger effect
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    observer.observe(item);
    item.style.transitionDelay = `${index * 0.05}s`;
});

// Parallax effect on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('header');
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-20px)';
        header.style.opacity = '0.9';
    } else {
        header.style.transform = 'translateY(0)';
        header.style.opacity = '1';
    }
    
    lastScroll = currentScroll;
});

// Image loading animation
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '0';
        setTimeout(() => {
            this.style.transition = 'opacity 0.5s ease';
            this.style.opacity = '1';
        }, 100);
    });
});

// Smooth scroll for better UX
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

// Kreativ emoji animatsiyalari
const emojis = document.querySelectorAll('h1, .section-title');
emojis.forEach(element => {
    const text = element.innerHTML;
    element.innerHTML = text.replace(/([\u{1F300}-\u{1F9FF}])/gu, '<span class="emoji">$1</span>');
});

// Kreativ CSS qo'shish
const style = document.createElement('style');
style.textContent = `
    .emoji {
        display: inline-block;
        animation: float 3s ease-in-out infinite;
        cursor: pointer;
    }
    
    .emoji:hover {
        animation: bounce 0.5s ease;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-10px) rotate(5deg);
        }
    }
    
    @keyframes bounce {
        0%, 100% {
            transform: translateY(0) scale(1);
        }
        50% {
            transform: translateY(-15px) scale(1.2);
        }
    }
`;
document.head.appendChild(style);

// Rasm hover effektlari - kreativ
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05) rotateY(5deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
    });
});

// Scroll animatsiyasi - kreativ
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('header');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Kreativ loading effekti
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Kreativ cursor effekti
const cursor = document.createElement('div');
cursor.style.cssText = `
    width: 20px;
    height: 20px;
    border: 2px solid #764ba2;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    display: none;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});

document.querySelectorAll('a, button, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#a78bfa';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#764ba2';
    });
});
