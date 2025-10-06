/**
 * UI Utilities
 * Theme toggle, lazy loading, and other UI enhancements
 * Portfolio Enhancement - October 2025
 */

(function() {
  'use strict';

  /**
   * Theme Management
   */
  const ThemeManager = {
    STORAGE_KEY: 'theme',
    THEME_ATTR: 'data-theme',
    LIGHT: 'light',
    DARK: 'dark',

    init() {
      this.loadTheme();
      this.attachToggleListeners();
      this.watchSystemPreference();
    },

    loadTheme() {
      // Check localStorage first
      const stored = localStorage.getItem(this.STORAGE_KEY);
      
      if (stored) {
        this.setTheme(stored, false);
      } else {
        // Use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(prefersDark ? this.DARK : this.LIGHT, false);
      }
    },

    setTheme(theme, save = true) {
      const html = document.documentElement;
      
      if (theme === this.DARK) {
        html.setAttribute(this.THEME_ATTR, this.DARK);
      } else {
        html.setAttribute(this.THEME_ATTR, this.LIGHT);
      }

      if (save) {
        try {
          localStorage.setItem(this.STORAGE_KEY, theme);
        } catch (error) {
          console.warn('Could not save theme preference:', error);
        }
      }

      // Update toggle buttons
      this.updateToggleButtons(theme);
      
      // Announce to screen readers
      this.announceThemeChange(theme);
    },

    toggleTheme() {
      const current = document.documentElement.getAttribute(this.THEME_ATTR);
      const next = current === this.DARK ? this.LIGHT : this.DARK;
      this.setTheme(next);
    },

    attachToggleListeners() {
      const toggles = document.querySelectorAll('[data-theme-toggle]');
      
      toggles.forEach(toggle => {
        toggle.addEventListener('click', () => this.toggleTheme());
        
        // Keyboard support
        toggle.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.toggleTheme();
          }
        });
      });
    },

    updateToggleButtons(theme) {
      const toggles = document.querySelectorAll('[data-theme-toggle]');
      const label = theme === this.DARK ? 'Switch to light mode' : 'Switch to dark mode';
      
      toggles.forEach(toggle => {
        toggle.setAttribute('aria-label', label);
        toggle.setAttribute('title', label);
        
        // Update icon if present
        const icon = toggle.querySelector('.theme-toggle-icon');
        if (icon) {
          icon.innerHTML = theme === this.DARK 
            ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>';
        }
      });
    },

    watchSystemPreference() {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      mediaQuery.addEventListener('change', (e) => {
        // Only update if user hasn't set a preference
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.setTheme(e.matches ? this.DARK : this.LIGHT, false);
        }
      });
    },

    announceThemeChange(theme) {
      const message = `Theme changed to ${theme} mode`;
      announceToScreenReader(message);
    }
  };

  /**
   * Lazy Loading for Images
   */
  const LazyLoader = {
    init() {
      // Use native lazy loading if supported
      if ('loading' in HTMLImageElement.prototype) {
        this.useNativeLazyLoading();
      } else {
        this.useIntersectionObserver();
      }
    },

    useNativeLazyLoading() {
      const images = document.querySelectorAll('img[data-src]');
      
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.setAttribute('loading', 'lazy');
      });
    },

    useIntersectionObserver() {
      const images = document.querySelectorAll('img[data-src]');
      
      if (!('IntersectionObserver' in window)) {
        // Fallback: load all images immediately
        images.forEach(img => {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        });
        return;
      }

      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      images.forEach(img => imageObserver.observe(img));
    }
  };

  /**
   * Smooth Scroll Enhancement
   */
  const SmoothScroll = {
    init() {
      // Add smooth scrolling to all anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          
          // Skip empty anchors
          if (href === '#' || href === '#!') return;
          
          const target = document.querySelector(href);
          if (!target) return;
          
          e.preventDefault();
          
          // Scroll to target
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without scrolling
          if (window.history && window.history.pushState) {
            window.history.pushState(null, null, href);
          }
          
          // Focus target for accessibility
          if (target.hasAttribute('tabindex')) {
            target.focus();
          } else {
            target.setAttribute('tabindex', '-1');
            target.focus();
            target.addEventListener('blur', () => {
              target.removeAttribute('tabindex');
            }, { once: true });
          }
        });
      });
    }
  };

  /**
   * Form Validation
   */
  const FormValidator = {
    init() {
      const forms = document.querySelectorAll('form[data-validate]');
      forms.forEach(form => this.attachFormValidation(form));
    },

    attachFormValidation(form) {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        // Validate on blur
        input.addEventListener('blur', () => this.validateField(input));
        
        // Clear error on input
        input.addEventListener('input', () => this.clearFieldError(input));
      });

      // Validate on submit
      form.addEventListener('submit', (e) => {
        if (!this.validateForm(form)) {
          e.preventDefault();
        }
      });
    },

    validateForm(form) {
      const inputs = form.querySelectorAll('input, textarea, select');
      let isValid = true;

      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });

      return isValid;
    },

    validateField(field) {
      // Skip honeypot fields
      if (field.classList.contains('form-honeypot') || field.name === 'honeypot') {
        return true;
      }

      const value = field.value.trim();
      const type = field.type;
      const required = field.hasAttribute('required');
      let isValid = true;
      let errorMessage = '';

      // Required validation
      if (required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
      }
      // Email validation
      else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address';
        }
      }
      // URL validation
      else if (type === 'url' && value) {
        try {
          new URL(value);
        } catch {
          isValid = false;
          errorMessage = 'Please enter a valid URL';
        }
      }
      // Min length validation
      else if (field.hasAttribute('minlength') && value) {
        const minLength = parseInt(field.getAttribute('minlength'), 10);
        if (value.length < minLength) {
          isValid = false;
          errorMessage = `Please enter at least ${minLength} characters`;
        }
      }

      if (!isValid) {
        this.showFieldError(field, errorMessage);
      } else {
        this.clearFieldError(field);
      }

      return isValid;
    },

    showFieldError(field, message) {
      field.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
      
      // Find or create error message element
      let errorEl = field.parentElement.querySelector('.form-error');
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        errorEl.setAttribute('role', 'alert');
        field.parentElement.appendChild(errorEl);
      }
      
      errorEl.textContent = message;
      field.setAttribute('aria-describedby', errorEl.id || `${field.id}-error`);
    },

    clearFieldError(field) {
      field.classList.remove('error');
      field.removeAttribute('aria-invalid');
      
      const errorEl = field.parentElement.querySelector('.form-error');
      if (errorEl) {
        errorEl.textContent = '';
      }
    }
  };

  /**
   * Mobile Menu Toggle
   */
  const MobileMenu = {
    init() {
      const toggles = document.querySelectorAll('[data-mobile-menu-toggle]');
      const menu = document.querySelector('[data-mobile-menu]');
      
      if (!menu) return;

      toggles.forEach(toggle => {
        toggle.addEventListener('click', () => this.toggle(menu, toggle));
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !Array.from(toggles).some(t => t.contains(e.target))) {
          this.close(menu);
        }
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
          this.close(menu);
        }
      });
    },

    toggle(menu, toggle) {
      const isOpen = menu.classList.contains('open');
      
      if (isOpen) {
        this.close(menu, toggle);
      } else {
        this.open(menu, toggle);
      }
    },

    open(menu, toggle) {
      menu.classList.add('open');
      menu.setAttribute('aria-hidden', 'false');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'true');
      }
      document.body.style.overflow = 'hidden';
    },

    close(menu, toggle) {
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
      if (toggle) {
        toggle.setAttribute('aria-expanded', 'false');
      }
      document.body.style.overflow = '';
    }
  };

  /**
   * Announce message to screen readers
   */
  function announceToScreenReader(message) {
    let liveRegion = document.getElementById('ui-announce');
    
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'ui-announce';
      liveRegion.className = 'sr-only';
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = message;
  }

  /**
   * Detect reduced motion preference
   */
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Public API
   */
  window.UIUtils = {
    theme: ThemeManager,
    announceToScreenReader,
    prefersReducedMotion
  };

  /**
   * Initialize all utilities
   */
  function init() {
    ThemeManager.init();
    LazyLoader.init();
    SmoothScroll.init();
    FormValidator.init();
    MobileMenu.init();
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
