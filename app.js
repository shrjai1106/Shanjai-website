document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* ==========================================
     1. STICKY NAV & ACTIVE LINKS
     ========================================== */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Sticky header background
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active nav link highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksList = document.querySelector('.nav-links');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinksList.style.display = navLinksList.style.display === 'flex' ? 'none' : 'flex';
      navLinksList.style.flexDirection = 'column';
      navLinksList.style.position = 'absolute';
      navLinksList.style.top = '80px';
      navLinksList.style.left = '0';
      navLinksList.style.width = '100%';
      navLinksList.style.background = 'rgba(8, 5, 14, 0.95)';
      navLinksList.style.padding = '2rem';
      navLinksList.style.borderBottom = '1px solid var(--border-color)';
    });
  }

  /* ==========================================
     2. DYNAMIC COUNTER ANIMATION
     ========================================== */
  const statsSection = document.getElementById('stats-section');
  const statNums = document.querySelectorAll('.stat-num');
  let statsAnimated = false;

  const animateCounters = () => {
    statNums.forEach(num => {
      const target = parseInt(num.getAttribute('data-target'), 10);
      const suffix = num.getAttribute('data-suffix') || '';
      let currentVal = 0;
      const duration = 1500; // ms
      const stepTime = Math.max(Math.floor(duration / target), 12);
      const increment = Math.ceil(target / (duration / stepTime));

      const counter = setInterval(() => {
        currentVal += increment;
        if (currentVal >= target) {
          num.innerText = target.toLocaleString() + suffix;
          clearInterval(counter);
        } else {
          num.innerText = currentVal.toLocaleString() + suffix;
        }
      }, stepTime);
    });
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        animateCounters();
        statsAnimated = true;
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  /* ==========================================
     3. SKILL BARS LOADING ANIMATION
     ========================================== */
  const skillsSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.skill-progress-bar');

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const widthVal = bar.getAttribute('data-width');
          bar.style.width = widthVal;
        });
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }

  /* ==========================================
     4. PORTFOLIO & CERTIFICATIONS FILTER ENGINE
     ========================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filter === 'all' || itemCat === filter) {
          item.classList.add('show');
        } else {
          item.classList.remove('show');
        }
      });
    });
  });

  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
  const certItems = document.querySelectorAll('.cert-item');

  certFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      certItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filter === 'all' || itemCat === filter) {
          item.classList.add('show');
        } else {
          item.classList.remove('show');
        }
      });
    });
  });

  /* ==========================================
     5. LIGHTBOX MODAL LOGIC
     ========================================== */
  const lightbox = document.getElementById('portfolio-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxTag = document.getElementById('lightbox-tag');
  const lightboxStat1 = document.getElementById('lightbox-stat1');
  const lightboxStat2 = document.getElementById('lightbox-stat2');
  const lightboxLbl1 = document.getElementById('lightbox-lbl1');
  const lightboxLbl2 = document.getElementById('lightbox-lbl2');
  const lightboxClose = document.getElementById('lightbox-close');

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.getAttribute('data-title');
      const desc = item.getAttribute('data-desc');
      const cat = item.getAttribute('data-category');
      const index = item.getAttribute('data-index');
      
      const stat1 = item.getAttribute('data-stat1');
      const lbl1 = item.getAttribute('data-lbl1');
      const stat2 = item.getAttribute('data-stat2');
      const lbl2 = item.getAttribute('data-lbl2');

      // Set lightbox values
      lightboxImg.src = `assets/portfolio_page_${index}.png`;
      lightboxImg.alt = title;
      lightboxTitle.innerText = title;
      lightboxDesc.innerText = desc;
      lightboxTag.innerText = cat === 'gov' ? 'Government & Elections' :
                             cat === 'social' ? 'Social Media Organic Growth' :
                             cat === 'design' ? 'Branding & SME Design' : 'Workshops & Training';
      
      lightboxStat1.innerText = stat1;
      lightboxLbl1.innerText = lbl1;
      lightboxStat2.innerText = stat2;
      lightboxLbl2.innerText = lbl2;

      // Show lightbox
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop background scroll
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Resume background scroll
  };

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  // Close when clicking outside content box
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  /* ==========================================
     6. TESTIMONIALS SLIDER
     ========================================== */
  const wrapper = document.getElementById('testimonials-wrapper');
  const slides = document.querySelectorAll('.testimonial-slide');
  const btnPrev = document.getElementById('slide-prev');
  const btnNext = document.getElementById('slide-next');
  const dotsContainer = document.getElementById('slider-dots');
  
  let currentIndex = 0;
  const slideCount = slides.length;
  let autoplayTimer;

  // Create slide dots
  if (dotsContainer) {
    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  const updateDots = () => {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  const goToSlide = (index) => {
    if (index < 0) {
      currentIndex = slideCount - 1;
    } else if (index >= slideCount) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }
    
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1);
  };

  if (btnPrev && btnNext) {
    btnPrev.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
    btnNext.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  // Autoplay functionality
  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 5000); // Change slide every 5s
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  if (wrapper && slideCount > 0) {
    startAutoplay();
  }
});
