// Init AOS (Animation On Scroll)
        AOS.init({
            duration: 800,
            offset: 100,
            once: true
        });

        // Navbar Scroll Effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile Menu Toggle
        const menuToggle = document.getElementById('mobile-menu');
        const navLinks = document.getElementById('nav-links');
        
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });

        // Counter Animation using requestAnimationFrame
        const counters = document.querySelectorAll('.counter');
        const speed = 2000; // 2 seconds

        const animateCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = speed;
                let startTimestamp = null;
                
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    
                    // easeOutQuart
                    const easeProgress = 1 - Math.pow(1 - progress, 4);
                    
                    counter.innerText = Math.floor(easeProgress * target) + (target > 100 ? '+' : '%');
                    
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        counter.innerText = target + (target > 100 ? '+' : '%');
                    }
                };
                window.requestAnimationFrame(step);
            });
        };

        // Intersection Observer for Counter triggers
        const counterSection = document.getElementById('counter-section');
        let animated = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animateCounters();
                    animated = true;
                }
            });
        }, { threshold: 0.5 });

        if (counterSection) {
            observer.observe(counterSection);
        }

        // Show More Button Logic
        document.querySelectorAll('.show-more-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const content = this.closest('.service-entry-panel').querySelector('.more-content');
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    this.innerHTML = 'Fold <i class="fa-solid fa-chevron-up"></i>';
                } else {
                    content.style.display = 'none';
                    this.innerHTML = 'More <i class="fa-solid fa-chevron-down"></i>';
                }
            });
        });

        // Folder Tab Switcher
        window.switchFolderTab = function(tabIndex) {
            // Update tabs
            document.querySelectorAll('.folder-tab').forEach((tab, index) => {
                if (index === tabIndex - 1) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });

            // Update panels
            document.querySelectorAll('.service-entry-panel').forEach((panel, index) => {
                if (index === tabIndex - 1) {
                    panel.style.display = (panel.classList.contains('pet-platform-panel') || panel.classList.contains('obesity-platform-panel') || panel.classList.contains('isolated-death-panel') || panel.classList.contains('restroom-panel')) ? 'block' : 'flex';
                } else {
                    panel.style.display = 'none';
                }
            });
        };