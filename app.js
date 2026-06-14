document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Sticky Transition
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Nav Toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('mobile-active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars-staggered';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
            });
        });
    }

    // 3. Project Detail Toggles
    const toggleBtns = document.querySelectorAll('.toggle-details-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const detailsDiv = document.getElementById(targetId);
            
            if (detailsDiv) {
                detailsDiv.classList.toggle('hidden');
                
                const isHidden = detailsDiv.classList.contains('hidden');
                btn.innerHTML = isHidden 
                    ? `View Details <i class="fa-solid fa-chevron-down"></i>`
                    : `Hide Details <i class="fa-solid fa-chevron-up"></i>`;
            }
        });
    });

    // 4. Organizational Experience Tab Switcher
    const tabBtns = document.querySelectorAll('.exp-tab-btn');
    const panels = document.querySelectorAll('.exp-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            panels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            
            const expId = btn.getAttribute('data-exp');
            const targetPanel = document.getElementById(`panel-${expId}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // 5. Copy to Clipboard Utility
    const clipboardCards = document.querySelectorAll('[data-clipboard]');
    const toast = document.getElementById('toast-notif');

    clipboardCards.forEach(card => {
        card.addEventListener('click', () => {
            const textToCopy = card.getAttribute('data-clipboard');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                toast.textContent = `Copied: ${textToCopy} 🚀`;
                toast.classList.remove('hidden');
                
                setTimeout(() => {
                    toast.classList.add('hidden');
                }, 2500);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });

    // 6. Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
        
        // Trigger initial check for elements already in view
        setTimeout(() => {
            revealElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    el.classList.add('active');
                    revealObserver.unobserve(el);
                }
            });
        }, 100);
    }
});
