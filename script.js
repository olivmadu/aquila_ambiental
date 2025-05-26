// Custom Cursor
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    // Main cursor
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    // Follower cursor
    followerX += (mouseX - followerX) * 0.05;
    followerY += (mouseY - followerY) * 0.05;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(updateCursor);
}

updateCursor();

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .service-card, .project-nav-btn, .portfolio-item, .filter-btn');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.borderColor = '#2d5a27';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.borderColor = 'rgba(45, 90, 39, 0.3)';
    });
});

// Mobile Navigation
const navToggle = document.getElementById('nav-toggle');
const navList = document.getElementById('nav-list');

if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        
        // Animate hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navList.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on links
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navList) {
            navList.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Smooth scrolling for navigation links
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Projects Navigation
const projectNavBtns = document.querySelectorAll('.project-nav-btn');
const projectItems = document.querySelectorAll('.project-item');

projectNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        
        // Remove active class from all buttons and items
        projectNavBtns.forEach(b => b.classList.remove('active'));
        projectItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to clicked button and corresponding item
        btn.classList.add('active');
        const targetItem = document.querySelector(`[data-project="${target}"]`);
        if (targetItem) {
            targetItem.classList.add('active');
        }
    });
});

// Auto-rotate projects
let currentProject = 1;
const totalProjects = 3;

function rotateProjects() {
    currentProject = currentProject >= totalProjects ? 1 : currentProject + 1;
    
    projectNavBtns.forEach(btn => btn.classList.remove('active'));
    projectItems.forEach(item => item.classList.remove('active'));
    
    const targetBtn = document.querySelector(`[data-target="${currentProject}"]`);
    const targetItem = document.querySelector(`[data-project="${currentProject}"]`);
    
    if (targetBtn) targetBtn.classList.add('active');
    if (targetItem) targetItem.classList.add('active');
}

if (projectNavBtns.length > 0) {
    setInterval(rotateProjects, 5000);
}

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                item.style.display = 'block';
            } else {
                item.classList.add('hidden');
                setTimeout(() => {
                    if (item.classList.contains('hidden')) {
                        item.style.display = 'none';
                    }
                }, 500);
            }
        });
    });
});

// Testimonials Navigation
const testimonialNavBtns = document.querySelectorAll('.testimonial-nav-btn');
const testimonialItems = document.querySelectorAll('.testimonial-item');

testimonialNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        
        // Remove active class from all buttons and items
        testimonialNavBtns.forEach(b => b.classList.remove('active'));
        testimonialItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to clicked button and corresponding item
        btn.classList.add('active');
        const targetItem = document.querySelector(`[data-testimonial="${target}"]`);
        if (targetItem) {
            targetItem.classList.add('active');
        }
    });
});

// Auto-rotate testimonials
let currentTestimonial = 1;
const totalTestimonials = 3;

function rotateTestimonials() {
    currentTestimonial = currentTestimonial >= totalTestimonials ? 1 : currentTestimonial + 1;
    
    testimonialNavBtns.forEach(btn => btn.classList.remove('active'));
    testimonialItems.forEach(item => item.classList.remove('active'));
    
    const targetBtn = document.querySelector(`[data-target="${currentTestimonial}"]`);
    const targetItem = document.querySelector(`[data-testimonial="${currentTestimonial}"]`);
    
    if (targetBtn) targetBtn.classList.add('active');
    if (targetItem) targetItem.classList.add('active');
}

if (testimonialNavBtns.length > 0) {
    setInterval(rotateTestimonials, 6000);
}

// Service card interactions
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Portfolio item interactions
const portfolioItemsHover = document.querySelectorAll('.portfolio-item');

portfolioItemsHover.forEach(item => {
    item.addEventListener('click', () => {
        // Add click animation
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = 'translateY(-10px)';
        }, 150);
    });
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

// Add fade-in class to elements and observe them
const animateElements = document.querySelectorAll('.section-title, .service-card, .about-description, .contact-info, .portfolio-item, .award-item');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'ENVIANDO...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'MENSAGEM ENVIADA!';
            submitBtn.style.background = '#7fb069';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '#2d5a27';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
        
        console.log('Form submitted:', data);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Dynamic text animation for hero
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const titleLines = heroTitle.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        line.style.animationDelay = `${0.5 + index * 0.2}s`;
    });
}

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple styles
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 600ms linear;
        background-color: rgba(255, 255, 255, 0.6);
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Apply ripple effect to buttons
const buttons = document.querySelectorAll('button, .submit-btn');
buttons.forEach(button => {
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.addEventListener('click', createRipple);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for keyboard navigation
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #2d5a27 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(keyboardStyle);

// Awards timeline animation on scroll
const awardItems = document.querySelectorAll('.award-item');
const awardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200);
        }
    });
}, { threshold: 0.3 });

awardItems.forEach(item => {
    awardObserver.observe(item);
});

// Portfolio item click handler for modal (future enhancement)
portfolioItemsHover.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h3')?.textContent || 'Portfolio Item';
        const description = item.querySelector('p')?.textContent || 'Description';
        console.log(`Portfolio item clicked: ${title} - ${description}`);
        // Future: Open modal with project details
    });
});

// Smooth reveal animation for sections
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    sectionObserver.observe(section);
});

// Add counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Trigger counter animations when stats come into view
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            if (number) {
                entry.target.textContent = '0';
                setTimeout(() => {
                    animateCounter(entry.target, number);
                }, 500);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Configuração do PDF
const PDF_CONFIG = {
    url: 'Portfolio.pdf', 
    filename: 'Aquila-Portfolio-2025.pdf'
};

const downloadBtn = document.getElementById('download-portfolio');
const viewBtn = document.getElementById('view-portfolio');
const pdfContainer = document.getElementById('pdf-container');

let isViewerOpen = false;

// Função para verificar se o PDF existe
async function checkPDFExists() {
    try {
        const response = await fetch(PDF_CONFIG.url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.warn('PDF não encontrado:', error);
        return false;
    }
}

// Download PDF functionality
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // Add download animation
        downloadBtn.style.transform = 'scale(0.95)';
        downloadBtn.innerHTML = '<span class="btn-icon">⏳</span> PREPARANDO...';
        
        setTimeout(() => {
            try {
                // Criar link de download real
                const link = document.createElement('a');
                link.href = PDF_CONFIG.url;
                link.download = PDF_CONFIG.filename;
                link.target = '_blank'; // Abre em nova aba como fallback
                
                // Adicionar ao DOM temporariamente
                document.body.appendChild(link);
                
                // Trigger download
                link.click();
                
                // Remover do DOM
                document.body.removeChild(link);
                
                // Feedback de sucesso
                downloadBtn.style.transform = 'scale(1)';
                downloadBtn.innerHTML = '<span class="btn-icon">✓</span> DOWNLOAD INICIADO';
                downloadBtn.style.background = '#7fb069';
                
                setTimeout(() => {
                    downloadBtn.innerHTML = '<span class="btn-icon">📄</span> BAIXAR PORTFÓLIO PDF';
                    downloadBtn.style.background = '#2d5a27';
                }, 2000);
                
            } catch (error) {
                console.error('Erro no download:', error);
                
                // Feedback de erro
                downloadBtn.style.transform = 'scale(1)';
                downloadBtn.innerHTML = '<span class="btn-icon">⚠️</span> ERRO NO DOWNLOAD';
                downloadBtn.style.background = '#e74c3c';
                
                setTimeout(() => {
                    downloadBtn.innerHTML = '<span class="btn-icon">📄</span> BAIXAR PORTFÓLIO PDF';
                    downloadBtn.style.background = '#2d5a27';
                }, 3000);
            }
        }, 1500);
    });
}

// View PDF online functionality
if (viewBtn && pdfContainer) {
    viewBtn.addEventListener('click', () => {
        if (!isViewerOpen) {
            // Show loading
            pdfContainer.innerHTML = `
                <div class="pdf-loading">
                    <div class="loading-spinner"></div>
                    <p>Carregando portfólio...</p>
                </div>
            `;
            
            setTimeout(() => {
                // Tentar abrir PDF em iframe
                const pdfUrl = PDF_CONFIG.url;
                
                pdfContainer.innerHTML = `
                    <div class="pdf-viewer-frame">
                        <div class="pdf-controls">
                            <button class="pdf-control-btn" id="pdf-close">✕</button>
                            <span class="pdf-page-info">Portfólio EcoVision 2024</span>
                            <button class="pdf-control-btn" id="pdf-external">🔗</button>
                        </div>
                        <iframe 
                            src="${pdfUrl}" 
                            width="100%" 
                            height="500px"
                            style="border: none; border-radius: 0 0 20px 20px;"
                            title="Portfólio EcoVision">
                            <p>Seu navegador não suporta visualização de PDF. 
                            <a href="${pdfUrl}" target="_blank">Clique aqui para abrir em nova aba</a></p>
                        </iframe>
                    </div>
                `;
                
                isViewerOpen = true;
                viewBtn.innerHTML = '<span class="btn-icon">✕</span> FECHAR VISUALIZAÇÃO';
                viewBtn.style.background = '#e74c3c';
                viewBtn.style.borderColor = '#e74c3c';
                viewBtn.style.color = '#fff';
                
                // Adicionar event listeners para os novos controles
                const pdfCloseBtn = document.getElementById('pdf-close');
                const pdfExternalBtn = document.getElementById('pdf-external');
                
                if (pdfCloseBtn) {
                    pdfCloseBtn.addEventListener('click', () => {
                        viewBtn.click(); // Fechar visualização
                    });
                }
                
                if (pdfExternalBtn) {
                    pdfExternalBtn.addEventListener('click', () => {
                        window.open(pdfUrl, '_blank'); // Abrir em nova aba
                    });
                }
                
            }, 2000);
        } else {
            // Close viewer
            pdfContainer.innerHTML = `
                <div class="pdf-placeholder">
                    <div class="pdf-icon">📋</div>
                    <h4>Portfólio EcoVision 2024</h4>
                    <p>Clique em "Visualizar Online" para ver o portfólio completo ou baixe o PDF para acesso offline.</p>
                    <div class="pdf-info">
                        <span>📄 32 páginas</span>
                        <span>📊 15 projetos detalhados</span>
                        <span>🏆 Certificações e prêmios</span>
                    </div>
                </div>
            `;
            
            isViewerOpen = false;
            viewBtn.innerHTML = '<span class="btn-icon">👁️</span> VISUALIZAR ONLINE';
            viewBtn.style.background = 'transparent';
            viewBtn.style.borderColor = '#2d5a27';
            viewBtn.style.color = '#2d5a27';
        }
    });
}

// Verificar PDF na inicialização
document.addEventListener('DOMContentLoaded', async () => {
    if (downloadBtn) {
        const pdfExists = await checkPDFExists();
        
        if (!pdfExists) {
            // Desabilitar botão se PDF não existir
            downloadBtn.disabled = true;
            downloadBtn.innerHTML = '<span class="btn-icon">⚠️</span> PDF NÃO DISPONÍVEL';
            downloadBtn.style.background = '#ccc';
            downloadBtn.style.cursor = 'not-allowed';
            
            // Atualizar placeholder
            const pdfPlaceholder = document.querySelector('.pdf-placeholder');
            if (pdfPlaceholder) {
                pdfPlaceholder.innerHTML = `
                    <div class="pdf-icon">⚠️</div>
                    <h4>Portfólio Temporariamente Indisponível</h4>
                    <p>O arquivo PDF do portfólio está sendo atualizado. Tente novamente em breve.</p>
                    <div class="pdf-info">
                        <span>📧 Entre em contato para mais informações</span>
                    </div>
                `;
            }
            
            // Desabilitar também o botão de visualizar
            if (viewBtn) {
                viewBtn.disabled = true;
                viewBtn.innerHTML = '<span class="btn-icon">⚠️</span> INDISPONÍVEL';
                viewBtn.style.background = '#ccc';
                viewBtn.style.borderColor = '#ccc';
                viewBtn.style.cursor = 'not-allowed';
            }
        }
    }
});

// Keyboard navigation for PDF viewer
document.addEventListener('keydown', (e) => {
    if (isViewerOpen) {
        if (e.key === 'Escape') {
            if (viewBtn) {
                viewBtn.click();
            }
        }
    }
});

// Highlight numbers animation for portfolio
const highlightNumbers = document.querySelectorAll('.highlight-number');
const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/[0-9]/g, '');
            
            if (number) {
                entry.target.textContent = '0' + suffix;
                setTimeout(() => {
                    animateCounter(entry.target, number, 1500);
                    // Re-add suffix after animation
                    setTimeout(() => {
                        if (!entry.target.textContent.includes(suffix) && suffix) {
                            entry.target.textContent = entry.target.textContent + suffix;
                        }
                    }, 1600);
                }, 300);
            }
        }
    });
}, { threshold: 0.5 });

highlightNumbers.forEach(number => {
    highlightObserver.observe(number);
});

// Enhanced counter animation that preserves suffixes
function animateCounterWithSuffix(element, target, suffix = '', duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    }
    
    updateCounter();
}

// Console log for debugging
console.log('EcoVision website loaded successfully!');
console.log('PDF Configuration:', PDF_CONFIG);

// Add smooth transitions for all interactive elements
const interactiveElements = document.querySelectorAll('button, a, .service-card, .portfolio-item, .award-content');
interactiveElements.forEach(element => {
    element.style.transition = 'all 0.3s ease';
});