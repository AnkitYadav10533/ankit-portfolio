document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CUSTOM MOUSE CURSOR (Awwwards Style)
       ========================================================================== */
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const interactiveElements = document.querySelectorAll('a, button, .social-icon, .project-card, .skill-card, .menu-toggle, input, textarea');

    // Reveal cursor on mouse move
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });

    // Hide cursor if it leaves the screen
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    // Hover effect expansions
    interactiveElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        elem.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });

    /* ==========================================================================
       2. ENTRANCE CURTAIN (LOADING PAGE)
       ========================================================================== */
    const curtain = document.querySelector('.entrance-curtain');
    
    // Smooth loading simulation
    setTimeout(() => {
        curtain.classList.add('loaded');
        // Trigger reveal animations on entrance
        revealOnScroll();
    }, 1800);

    /* ==========================================================================
       3. HERO TYPING EFFECT
       ========================================================================== */
    const typedTextSpan = document.querySelector('.typed-text');
    const textArray = ["B.Tech CSE Student", "Data Analytics Enthusiast", "Aspiring AI/ML Engineer"];
    const typingSpeed = 100;
    const erasingSpeed = 60;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingSpeed + 100);
        }
    }

    // Initialize typing loop after curtain slides out
    setTimeout(type, 2000);

    /* ==========================================================================
       4. MOBILE HAMBURGER MENU TOGGLE
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('open');
        navbar.classList.toggle('open');
    });

    // Close navbar when clicking any nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('open');
            navbar.classList.remove('open');
        });
    });

    /* ==========================================================================
       5. SCROLL ACTIVE INDICATORS & SCROLLED HEADER
       ========================================================================== */
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Change header background color on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link highlight depending on section in viewport
        let currentSectionId = '';
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 150;
            const secHeight = sec.offsetHeight;
            if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       6. INTERSECTION OBSERVER FOR SCROLL REVEAL & SKILLS PROGRESS BARS
       ========================================================================== */
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    const progressFillElements = document.querySelectorAll('.progress-bar-fill');

    function revealOnScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        // General slide/fade reveals
        scrollRevealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });

        // Trigger skills progress fill animations
        progressFillElements.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < triggerBottom) {
                const targetWidth = bar.getAttribute('data-progress');
                bar.style.width = targetWidth;
            }
        });
    }

    // Attach scroll listener
    window.addEventListener('scroll', revealOnScroll);
    // Run on initial load
    revealOnScroll();

    /* ==========================================================================
       7. CONTACT FORM SUBMISSION & CUSTOM TOAST
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name && email && subject && message) {
            // Success State
            showToast(`Thank you, ${name}! Your message was sent successfully.`, true);
            contactForm.reset();
            
            // Remove floating labels styling reset
            document.querySelectorAll('.input-group input, .input-group textarea').forEach(input => {
                input.blur();
            });
        } else {
            // Error State
            showToast('Please fill out all fields before submitting.', false);
        }
    });

    function showToast(msg, isSuccess) {
        toastMessage.textContent = msg;
        const toastIcon = toast.querySelector('.toast-icon');

        if (isSuccess) {
            toastIcon.className = 'bx bx-check-circle toast-icon';
            toastIcon.style.color = 'var(--primary)';
        } else {
            toastIcon.className = 'bx bx-error-circle toast-icon';
            toastIcon.style.color = '#ff4d4d';
        }

        toast.classList.add('show');

        // Automatic hide after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    /* ==========================================================================
       8. STATISTICS COUNTER ANIMATION
       ========================================================================== */
    const statNumbers = document.querySelectorAll('.stat-num');
    let counted = false;

    function animateNumbers() {
        statNumbers.forEach(num => {
            const target = +num.getAttribute('data-target');
            let count = 0;
            const duration = 1500; // 1.5 seconds duration
            const frameRate = 1000 / 60; // 60 fps
            const totalFrames = Math.round(duration / frameRate);
            const increment = target / totalFrames;
            let currentFrame = 0;

            const counterInterval = setInterval(() => {
                currentFrame++;
                count += increment;
                if (currentFrame >= totalFrames) {
                    num.textContent = target;
                    clearInterval(counterInterval);
                } else {
                    num.textContent = Math.floor(count);
                }
            }, frameRate);
        });
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                animateNumbers();
            }
        });
    }, { threshold: 0.2 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});
