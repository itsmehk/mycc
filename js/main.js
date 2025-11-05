// Main JavaScript for additional functionality

// Scroll reveal animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all feature cards and FAQ items
    document.querySelectorAll('.feature-card, .faq-item, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Initialize scroll animations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

// Track scroll depth for analytics (placeholder)
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
    const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        // In production: send to analytics
        // console.log('Max scroll depth:', maxScrollDepth);
    }
});

// Handle navigation highlighting on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Console welcome message
console.log('%cCardMatch Pro', 'font-size: 24px; font-weight: bold; color: #1e40af;');
console.log('%cBuilt with ❤️ for better credit card decisions', 'font-size: 14px; color: #475569;');
console.log('%cInterested in the code? Visit https://github.com/cardmatchpro', 'font-size: 12px; color: #64748b;');
