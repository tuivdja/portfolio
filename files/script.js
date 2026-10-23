/**
 * PORTFOLIO BTS SIO — SCRIPT.JS
 * Logique interactive complète
 * Thème : "Profondeurs du Pacifique"
 */

'use strict';

/* ============================================================
   1. LOADER — Masquage après chargement
   ============================================================ */
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const hide = () => {
    loader.classList.add('hidden');
    // Déclencher les animations d'entrée du hero
    revealOnScroll();
    animateHeroCanvas();
  };

  if (document.readyState === 'complete') {
    setTimeout(hide, 600);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 600));
  }
})();


/* ============================================================
   2. CURSEUR PERSONNALISÉ
   ============================================================ */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;
  if (window.innerWidth <= 600) return; // Pas de curseur perso sur mobile

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  // Follower avec interpolation douce
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Effets hover sur éléments interactifs
  const hoverTargets = 'a, button, summary, input, .project-card, .skill-card, .skill-item, .veille-card, .tool-badge';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.add('cursor--hover');
      follower.classList.add('cursor-follower--hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.remove('cursor--hover');
      follower.classList.remove('cursor-follower--hover');
    }
  });
})();


/* ============================================================
   3. BARRE DE PROGRESSION DE LECTURE
   ============================================================ */
(function initReadingProgress() {
  const bar = document.createElement('div');
  bar.className = 'reading-progress';
  bar.setAttribute('role', 'progressbar');
  bar.setAttribute('aria-label', 'Progression de lecture');
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const progress     = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width    = Math.min(progress, 100) + '%';
    bar.setAttribute('aria-valuenow', Math.round(progress));
  }, { passive: true });
})();


/* ============================================================
   4. NAVIGATION — Sticky, active link, burger mobile
   ============================================================ */
(function initNav() {
  const navbar    = document.getElementById('navbar');
  const burger    = document.getElementById('navBurger');
  const mobile    = document.getElementById('navMobile');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');
  const navLinks  = document.querySelectorAll('.nav__link');

  if (!navbar) return;

  // Scroll : état sticky
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);

    // Bouton retour en haut
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }

    // Lien actif selon la section visible
    updateActiveNav();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial

  // Burger : toggle menu mobile
  if (burger && mobile) {
    burger.addEventListener('click', () => {
      const isOpen = mobile.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fermer au clic sur un lien
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobile.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Fermer en cliquant en dehors
    document.addEventListener('click', (e) => {
      if (mobile.classList.contains('open') && !mobile.contains(e.target) && !burger.contains(e.target)) {
        mobile.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Active nav link
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  // Smooth scroll pour les liens nav
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();


/* ============================================================
   5. BOUTON RETOUR EN HAUT
   ============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ============================================================
   6. ANIMATIONS AU SCROLL (Intersection Observer)
   ============================================================ */
function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
          // Animer les barres de compétences si présentes
          const fill = entry.target.querySelector('.skill-card__fill');
          if (fill) {
            fill.style.width = fill.dataset.level + '%';
          }
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));

  // Observer dédié pour les barres de compétences (dans onglets non actifs)
  const skillFills = document.querySelectorAll('.skill-card__fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.level + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillFills.forEach(fill => barObserver.observe(fill));
}

// Lancer au DOMContentLoaded aussi (au cas où le loader est déjà passé)
if (document.readyState !== 'loading') {
  revealOnScroll();
} else {
  document.addEventListener('DOMContentLoaded', revealOnScroll);
}


/* ============================================================
   7. CANVAS HERO — Particules / Vagues animées
   Inspiré des motifs de l'océan Pacifique
   ============================================================ */
function animateHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = 0, H = 0;
  let particles = [];
  let animId;

  // Dimensionnement
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  // Classe particule (bulles / étoiles de mer stylisées)
  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x   = Math.random() * W;
      this.y   = initial ? Math.random() * H : H + 20;
      this.r   = Math.random() * 2.5 + 0.5;
      this.vx  = (Math.random() - 0.5) * 0.3;
      this.vy  = -(Math.random() * 0.4 + 0.2);
      this.alpha = Math.random() * 0.4 + 0.1;
      this.pulse = Math.random() * Math.PI * 2;
      this.color = Math.random() > 0.5 ? '#00b4d8' : '#e07a5f';
    }

    update() {
      this.x    += this.vx;
      this.y    += this.vy;
      this.pulse += 0.04;
      this.alpha  = (Math.sin(this.pulse) * 0.2 + 0.25);
      if (this.y < -20) this.reset();
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle   = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Vagues
  class Wave {
    constructor(amplitude, period, speed, yOffset, color) {
      this.amplitude = amplitude;
      this.period    = period;
      this.speed     = speed;
      this.yOffset   = yOffset;
      this.color     = color;
      this.phase     = 0;
    }

    update() { this.phase += this.speed; }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 4) {
        const y = this.yOffset + Math.sin((x / this.period) + this.phase) * this.amplitude
                               + Math.sin((x / (this.period * 0.6)) + this.phase * 1.3) * (this.amplitude * 0.4);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 80 }, () => new Particle());

    waves = [
      new Wave(18, 280, 0.008, H * 0.82, 'rgba(0, 100, 180, 0.12)'),
      new Wave(14, 220, 0.012, H * 0.88, 'rgba(0, 140, 200, 0.10)'),
      new Wave(10, 180, 0.018, H * 0.94, 'rgba(0, 180, 216, 0.07)'),
    ];
  }

  let waves = [];

  function loop() {
    ctx.clearRect(0, 0, W, H);

    waves.forEach(w => { w.update(); w.draw(); });
    particles.forEach(p => { p.update(); p.draw(); });

    animId = requestAnimationFrame(loop);
  }

  // Gestion resize
  const ro = new ResizeObserver(() => {
    cancelAnimationFrame(animId);
    init();
    loop();
  });
  ro.observe(canvas);

  init();
  loop();
}


/* ============================================================
   8. OUTILS & COMPÉTENCES — Filtres par domaine + recherche
   ============================================================ */
(function initSkillsExplorer() {
  const root = document.getElementById('skillsExplorer');
  if (!root) return;

  const toolbar = root.querySelector('.skills__toolbar');
  const chips   = [...root.querySelectorAll('.chip[data-domain]')];
  const search  = root.querySelector('#skillsSearch');
  const status  = root.querySelector('#skillsStatus');
  const empty   = root.querySelector('.skills__empty');
  const reset   = root.querySelector('.skills__reset');
  const tools   = root.querySelector('.skills__tools');
  const groups  = [...root.querySelectorAll('.skills__group[data-domain]')];
  if (!toolbar || !search || !groups.length) return;

  // Amélioration progressive : sans JS, la barre reste masquée et tout est visible
  toolbar.hidden = false;

  // Minuscules sans accents : « modelisation » trouve « Modélisation »
  const normaliser = (texte) => texte
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();

  // Texte de recherche de chaque élément, calculé une seule fois
  const items = [...root.querySelectorAll('[data-skill]')];
  const index = new Map(items.map(el => [
    el,
    normaliser(el.textContent + ' ' + (el.dataset.keywords || ''))
  ]));

  // Compteurs des pastilles
  chips.forEach(chip => {
    const domaine = chip.dataset.domain;
    const nb = domaine === 'all'
      ? items.length
      : root.querySelectorAll(`.skills__group[data-domain="${domaine}"] [data-skill]`).length;
    const compteur = chip.querySelector('.chip__count');
    if (compteur) compteur.textContent = nb;
  });

  let domaineActif = 'all';

  function appliquer(interaction = true) {
    const requete = normaliser(search.value);
    let total = 0;

    groups.forEach(group => {
      const domaineOk = domaineActif === 'all' || group.dataset.domain === domaineActif;
      let visibles = 0;

      group.querySelectorAll('[data-skill]').forEach(el => {
        const ok = domaineOk && (!requete || index.get(el).includes(requete));
        el.hidden = !ok;
        if (ok) visibles++;
      });

      group.hidden = visibles === 0;
      // Un élément ré-affiché ne doit pas rester invisible en attendant l'animation
      if (interaction && !group.hidden) {
        group.querySelectorAll('.reveal-up').forEach(el => el.classList.add('revealed'));
        if (group.classList.contains('reveal-up')) group.classList.add('revealed');
      }
      total += visibles;
    });

    if (tools) {
      tools.hidden = [...tools.querySelectorAll('.skills__group')].every(g => g.hidden);
    }
    if (empty) empty.hidden = total > 0;

    status.textContent = total === 0
      ? 'Aucun résultat.'
      : `${total} compétence${total > 1 ? 's' : ''} et outil${total > 1 ? 's' : ''} affiché${total > 1 ? 's' : ''}.`;
  }

  function choisirDomaine(domaine) {
    domaineActif = domaine;
    chips.forEach(chip => {
      const actif = chip.dataset.domain === domaine;
      chip.classList.toggle('chip--active', actif);
      chip.setAttribute('aria-pressed', String(actif));
    });
    appliquer();
  }

  chips.forEach(chip => chip.addEventListener('click', () => choisirDomaine(chip.dataset.domain)));

  // Recherche : légère temporisation pour ne pas recalculer à chaque frappe
  let minuterie;
  search.addEventListener('input', () => {
    clearTimeout(minuterie);
    minuterie = setTimeout(appliquer, 120);
  });
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && search.value) {
      search.value = '';
      appliquer();
    }
  });

  reset?.addEventListener('click', () => {
    search.value = '';
    choisirDomaine('all');
    search.focus();
  });

  appliquer(false);
})();


/* ============================================================
   9. FILTRES PROJETS
   ============================================================ */
(function initProjectFilters() {
  const boutons = [...document.querySelectorAll('.projects__toolbar .chip[data-filter]')];
  const cartes  = [...document.querySelectorAll('#projectsGrid .project-card')];
  const statut  = document.getElementById('projectsStatus');
  if (!boutons.length || !cartes.length) return;

  // data-category peut contenir plusieurs catégories séparées par un espace
  const categories = (carte) => (carte.dataset.category || '').split(/\s+/);

  // Nombre de projets par filtre, affiché dans chaque bouton
  boutons.forEach(btn => {
    const filtre = btn.dataset.filter;
    const nb = filtre === 'all'
      ? cartes.length
      : cartes.filter(c => categories(c).includes(filtre)).length;
    const compteur = btn.querySelector('.chip__count');
    if (compteur) compteur.textContent = nb;
  });

  boutons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filtre = btn.dataset.filter;

      boutons.forEach(b => {
        const actif = b === btn;
        b.classList.toggle('chip--active', actif);
        b.setAttribute('aria-pressed', String(actif));
      });

      let visibles = 0;
      cartes.forEach(carte => {
        const ok = filtre === 'all' || categories(carte).includes(filtre);
        carte.hidden = !ok;
        if (!ok) return;
        visibles++;
        carte.classList.add('revealed');
        // Relance la petite animation d'apparition
        carte.classList.remove('is-entering');
        void carte.offsetWidth;
        carte.classList.add('is-entering');
      });

      if (statut) {
        statut.textContent = `${visibles} projet${visibles > 1 ? 's' : ''} affiché${visibles > 1 ? 's' : ''}.`;
      }
    });
  });
})();


/* ============================================================
   10. FORMULAIRE DE CONTACT — Validation & soumission simulée
   ============================================================ */
(function initContactForm() {
  const form       = document.getElementById('contactForm');
  if (!form) return;

  const nameInput    = document.getElementById('formName');
  const emailInput   = document.getElementById('formEmail');
  const messageInput = document.getElementById('formMessage');
  const submitBtn    = document.getElementById('formSubmitBtn');
  const successMsg   = document.getElementById('formSuccess');

  const nameError    = document.getElementById('nameError');
  const emailError   = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Validation en temps réel
  nameInput?.addEventListener('input', () => validateField(nameInput, nameError, validateName));
  emailInput?.addEventListener('input', () => validateField(emailInput, emailError, validateEmail));
  messageInput?.addEventListener('input', () => validateField(messageInput, messageError, validateMessage));

  function validateName(val) {
    if (!val.trim()) return 'Veuillez entrer votre nom.';
    if (val.trim().length < 2) return 'Nom trop court (minimum 2 caractères).';
    return '';
  }

  function validateEmail(val) {
    if (!val.trim()) return 'Veuillez entrer votre adresse email.';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(val)) return 'Adresse email invalide.';
    return '';
  }

  function validateMessage(val) {
    if (!val.trim()) return 'Veuillez entrer un message.';
    if (val.trim().length < 10) return 'Message trop court (minimum 10 caractères).';
    return '';
  }

  function validateField(input, errorEl, validator) {
    const error = validator(input.value);
    if (errorEl) errorEl.textContent = error;
    input.classList.toggle('error', !!error);
    return !error;
  }

  // Soumission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const validName    = validateField(nameInput,    nameError,    validateName);
    const validEmail   = validateField(emailInput,   emailError,   validateEmail);
    const validMessage = validateField(messageInput, messageError, validateMessage);

    if (!validName || !validEmail || !validMessage) return;

    // État de chargement
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn__text').textContent = 'Envoi en cours…';

    // Simulation d'envoi (remplacez par un vrai appel fetch à votre backend)
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Succès
    form.style.opacity = '0';
    form.style.transform = 'translateY(8px)';
    form.style.transition = 'opacity 0.4s, transform 0.4s';
    setTimeout(() => {
      form.hidden = true;
      if (successMsg) {
        successMsg.hidden = false;
        successMsg.style.animation = 'fadeInUp 0.5s ease';
      }
    }, 400);
  });
})();


/* ============================================================
   11. ANNÉE DYNAMIQUE FOOTER
   ============================================================ */
(function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ============================================================
   12. EFFET DE PARALLAXE LÉGER SUR LE HERO
   ============================================================ */
(function initParallax() {
  const heroContent = document.querySelector('.hero__content');
  const heroDeco    = document.querySelectorAll('.hero__deco');

  if (!heroContent) return;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll < window.innerHeight) {
      heroContent.style.transform = `translateY(${scroll * 0.25}px)`;
      heroContent.style.opacity   = 1 - scroll / (window.innerHeight * 0.85);
      heroDeco.forEach((el, i) => {
        el.style.transform = `translateY(${scroll * (0.1 + i * 0.05)}px)`;
      });
    }
  }, { passive: true });
})();


/* ============================================================
   13. ANIMATION DU TITRE HERO — Effet de frappe
   ============================================================ */
(function initTypingEffect() {
  const lines = document.querySelectorAll('.hero__title-line');
  // On applique juste un effet de stagger à l'apparition
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(20px)';
    line.style.transition = `opacity 0.8s ease ${i * 0.2 + 0.5}s, transform 0.8s ease ${i * 0.2 + 0.5}s`;
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 700 + i * 200);
  });
})();


/* ============================================================
   14. COMPTEURS ANIMÉS — Section résumé / stats
   (Prêt à l'emploi si vous ajoutez des éléments .counter)
   ============================================================ */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const update = () => {
    start = Math.min(start + step, target);
    el.textContent = Math.round(start);
    if (start < target) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// Observer pour déclencher les compteurs quand visibles
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.dataset.target, 10);
      if (!isNaN(target)) animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));


/* ============================================================
   15. GESTION DES ERREURS GLOBALES — Robustesse
   ============================================================ */
window.addEventListener('error', (e) => {
  console.warn('[Portfolio] Erreur JS :', e.message, 'à', e.filename, ':', e.lineno);
});

/* ============================================================
   15. MODAL VISUALISATION CV
   ============================================================ */
(function initCvModal() {
  const viewBtn  = document.getElementById('cvViewBtn');
  const modal    = document.getElementById('cvModal');
  const closeBtn = document.getElementById('cvModalClose');
  const overlay  = document.getElementById('cvModalOverlay');

  if (!viewBtn || !modal) return;

  const openModal = () => {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeBtn?.focus(), 50);
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
    viewBtn?.focus();
  };

  viewBtn.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
})();
