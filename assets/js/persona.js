/**
 * Persona Filtering System
 * Handles persona chips, content filtering, URL params, and localStorage persistence
 * Portfolio Enhancement - October 2025
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    STORAGE_KEY: 'selectedPersona',
    URL_PARAM: 'persona',
    DEFAULT_PERSONA: 'all',
    CHIP_SELECTOR: '[data-persona-chip]',
    ITEM_SELECTOR: '[data-personas]',
    CONTAINER_SELECTOR: '#persona-chips-container',
    ANIMATION_DURATION: 250
  };

  // State
  let currentPersona = CONFIG.DEFAULT_PERSONA;
  let personas = [];

  /**
   * Initialize the persona system
   */
  function init() {
    loadPersonasFromContent();
    restorePersonaFromStorage();
    checkURLParameter();
    renderPersonaChips();
    attachEventListeners();
    applyPersonaFilter(currentPersona, false);
  }

  /**
   * Load personas from content/site.json
   */
  async function loadPersonasFromContent() {
    try {
      const response = await fetch('/content/site.json');
      if (response.ok) {
        const data = await response.json();
        personas = data.personas || ['chemical-engineer', 'researcher', 'ai-ml'];
      } else {
        // Fallback personas if fetch fails
        personas = ['chemical-engineer', 'researcher', 'ai-ml'];
      }
    } catch (error) {
      console.warn('Could not load personas from content/site.json, using defaults:', error);
      personas = ['chemical-engineer', 'researcher', 'ai-ml'];
    }
  }

  /**
   * Restore persona selection from localStorage
   */
  function restorePersonaFromStorage() {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
    if (stored && isValidPersona(stored)) {
      currentPersona = stored;
    }
  }

  /**
   * Check URL parameter for persona
   */
  function checkURLParameter() {
    const urlParams = new URLSearchParams(window.location.search);
    const personaParam = urlParams.get(CONFIG.URL_PARAM);
    
    if (personaParam && isValidPersona(personaParam)) {
      currentPersona = personaParam;
      savePersonaToStorage(currentPersona);
    }
  }

  /**
   * Check if persona is valid
   */
  function isValidPersona(persona) {
    return persona === 'all' || personas.includes(persona);
  }

  /**
   * Render persona chips in the container
   */
  function renderPersonaChips() {
    const container = document.querySelector(CONFIG.CONTAINER_SELECTOR);
    if (!container) {
      console.warn('Persona chips container not found');
      return;
    }

    // Clear existing chips
    container.innerHTML = '';

    // Create "All" chip
    const allChip = createPersonaChip('all', 'All');
    container.appendChild(allChip);

    // Create persona chips
    personas.forEach(persona => {
      const label = formatPersonaLabel(persona);
      const chip = createPersonaChip(persona, label);
      container.appendChild(chip);
    });

    // Set active chip
    updateActiveChip(currentPersona);
  }

  /**
   * Create a persona chip element
   */
  function createPersonaChip(persona, label) {
    const chip = document.createElement('button');
    chip.className = 'persona-chip';
    chip.setAttribute('data-persona-chip', persona);
    chip.setAttribute('type', 'button');
    chip.setAttribute('role', 'button');
    chip.setAttribute('aria-pressed', persona === currentPersona ? 'true' : 'false');
    chip.textContent = label;
    
    chip.addEventListener('click', () => handleChipClick(persona));
    
    return chip;
  }

  /**
   * Format persona slug to readable label
   */
  function formatPersonaLabel(persona) {
    return persona
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Handle chip click event
   */
  function handleChipClick(persona) {
    if (persona === currentPersona) return;
    
    currentPersona = persona;
    savePersonaToStorage(persona);
    updateURL(persona);
    updateActiveChip(persona);
    applyPersonaFilter(persona, true);
  }

  /**
   * Update active chip styling
   */
  function updateActiveChip(persona) {
    const chips = document.querySelectorAll(CONFIG.CHIP_SELECTOR);
    chips.forEach(chip => {
      const chipPersona = chip.getAttribute('data-persona-chip');
      const isActive = chipPersona === persona;
      
      if (isActive) {
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
      } else {
        chip.classList.remove('active');
        chip.setAttribute('aria-pressed', 'false');
      }
    });
  }

  /**
   * Apply persona filter to all filterable items
   */
  function applyPersonaFilter(persona, animate = false) {
    const items = document.querySelectorAll(CONFIG.ITEM_SELECTOR);
    
    items.forEach((item, index) => {
      const itemPersonas = item.getAttribute('data-personas');
      const shouldShow = shouldShowItem(persona, itemPersonas);
      
      if (animate) {
        // Fade out first
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
          if (shouldShow) {
            item.classList.remove('hidden');
            item.removeAttribute('hidden');
            // Fade in with stagger
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, index * 30);
          } else {
            item.classList.add('hidden');
            item.setAttribute('hidden', '');
          }
        }, CONFIG.ANIMATION_DURATION);
      } else {
        // No animation
        if (shouldShow) {
          item.classList.remove('hidden');
          item.removeAttribute('hidden');
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        } else {
          item.classList.add('hidden');
          item.setAttribute('hidden', '');
        }
      }
    });

    // Announce to screen readers
    announceFilterChange(persona, countVisibleItems());
  }

  /**
   * Determine if item should be shown based on persona
   */
  function shouldShowItem(selectedPersona, itemPersonas) {
    if (selectedPersona === 'all') return true;
    if (!itemPersonas) return true; // Show items without persona attribute
    
    const personaList = itemPersonas.split(',').map(p => p.trim());
    return personaList.includes(selectedPersona);
  }

  /**
   * Count visible items after filter
   */
  function countVisibleItems() {
    const items = document.querySelectorAll(CONFIG.ITEM_SELECTOR);
    let count = 0;
    items.forEach(item => {
      if (!item.classList.contains('hidden')) count++;
    });
    return count;
  }

  /**
   * Announce filter change to screen readers
   */
  function announceFilterChange(persona, count) {
    const message = persona === 'all' 
      ? `Showing all ${count} items`
      : `Filtered by ${formatPersonaLabel(persona)}, showing ${count} items`;
    
    // Create or update live region
    let liveRegion = document.getElementById('persona-filter-announce');
    if (!liveRegion) {
      liveRegion = document.createElement('div');
      liveRegion.id = 'persona-filter-announce';
      liveRegion.className = 'sr-only';
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      document.body.appendChild(liveRegion);
    }
    
    liveRegion.textContent = message;
  }

  /**
   * Save persona to localStorage
   */
  function savePersonaToStorage(persona) {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY, persona);
    } catch (error) {
      console.warn('Could not save persona to localStorage:', error);
    }
  }

  /**
   * Update URL with persona parameter
   */
  function updateURL(persona) {
    if (!window.history || !window.history.replaceState) return;
    
    const url = new URL(window.location);
    
    if (persona === 'all') {
      url.searchParams.delete(CONFIG.URL_PARAM);
    } else {
      url.searchParams.set(CONFIG.URL_PARAM, persona);
    }
    
    window.history.replaceState({}, '', url.toString());
  }

  /**
   * Attach event listeners
   */
  function attachEventListeners() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      checkURLParameter();
      updateActiveChip(currentPersona);
      applyPersonaFilter(currentPersona, true);
    });

    // Keyboard navigation for chips
    document.addEventListener('keydown', handleKeyboardNavigation);
  }

  /**
   * Handle keyboard navigation between chips
   */
  function handleKeyboardNavigation(event) {
    const chips = Array.from(document.querySelectorAll(CONFIG.CHIP_SELECTOR));
    const currentIndex = chips.findIndex(chip => chip === document.activeElement);
    
    if (currentIndex === -1) return;
    
    let nextIndex;
    
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : chips.length - 1;
        chips[nextIndex].focus();
        break;
      
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        nextIndex = currentIndex < chips.length - 1 ? currentIndex + 1 : 0;
        chips[nextIndex].focus();
        break;
      
      case 'Home':
        event.preventDefault();
        chips[0].focus();
        break;
      
      case 'End':
        event.preventDefault();
        chips[chips.length - 1].focus();
        break;
    }
  }

  /**
   * Public API
   */
  window.PersonaSystem = {
    init,
    setPersona: (persona) => {
      if (isValidPersona(persona)) {
        handleChipClick(persona);
      }
    },
    getCurrentPersona: () => currentPersona,
    getPersonas: () => [...personas],
    refresh: () => {
      applyPersonaFilter(currentPersona, true);
    }
  };

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
