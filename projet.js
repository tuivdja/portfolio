/* ============================================================
   FICHE PROJET — construction de la page depuis projets-data.js
   URL attendue : projet.html?id=<clé du projet>
   ============================================================ */

(function initFicheProjet() {
  const racine = document.getElementById('projetRoot');
  if (!racine) return;

  const id = new URLSearchParams(window.location.search).get('id');
  // hasOwnProperty : ?id=constructor ou ?id=__proto__ ne doivent pas être pris pour un projet
  const projet = (typeof PROJETS !== 'undefined' && id && Object.prototype.hasOwnProperty.call(PROJETS, id))
    ? PROJETS[id]
    : null;

  /* ---- Année du pied de page ---- */
  const annee = document.getElementById('year');
  if (annee) annee.textContent = new Date().getFullYear();

  if (!projet) {
    racine.innerHTML = `
      <div class="container projet__404">
        <h1 class="projet__title">Projet introuvable</h1>
        <p class="projet__lead">Le projet demandé n'existe pas ou a été renommé.</p>
        <a href="index.html#projects" class="btn btn--primary">Retour aux projets</a>
      </div>`;
    document.title = 'Projet introuvable — Fuahea Tuihaatala';
    return;
  }

  document.title = projet.titre + ' — Fuahea Tuihaatala';
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && projet.accroche) metaDescription.setAttribute('content', projet.accroche);

  const ICONE_EXTERNE = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" class="btn__icon"><path d="M14 4h6v6M20 4l-8 8M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICONE_DEPOT = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" class="btn__icon"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" stroke-width="1.5"/></svg>';

  /* ---- En-tête ---- */
  const boutons = [];
  if (projet.lien) boutons.push(lienProjet(projet.lien, 'btn btn--primary', ICONE_EXTERNE));
  if (projet.depot) {
    boutons.push(`
      <a href="${echapper(urlSure(projet.depot))}" class="btn btn--ghost" target="_blank" rel="noopener noreferrer">
        ${ICONE_DEPOT} Code source<span class="visually-hidden"> (nouvel onglet)</span>
      </a>`);
  }
  boutons.push('<a href="index.html#projects" class="btn btn--ghost">Retour aux projets</a>');

  const entete = `
    <header class="projet__hero">
      <div class="container">
        <nav class="projet__fil" aria-label="Fil d'Ariane">
          <a href="index.html">Accueil</a> <span aria-hidden="true">/</span>
          <a href="index.html#projects">Projets</a> <span aria-hidden="true">/</span>
          <span aria-current="page">${echapper(projet.titre)}</span>
        </nav>
        <span class="projet__badge">${echapper(projet.badge || 'Projet')}</span>
        <h1 class="projet__title">${echapper(projet.titre)}</h1>
        <p class="projet__lead">${echapper(projet.accroche || '')}</p>
        <ul class="projet__tags" aria-label="Technologies">
          ${(projet.tags || []).map(t => `<li class="tag">${echapper(t)}</li>`).join('')}
        </ul>
        <div class="projet__actions">${boutons.join('')}</div>
      </div>
    </header>`;

  /* ---- Aperçu (image) ---- */
  const apercu = projet.image ? `
    <div class="container">
      <figure class="projet__apercu${projet.imageLogo ? ' projet__apercu--logo' : ''}">
        <img src="${echapper(urlSure(projet.image))}" alt="${echapper(projet.imageAlt || 'Aperçu du projet ' + projet.titre)}" loading="lazy">
      </figure>
    </div>` : '';

  /* ---- Sections du corps (seules celles qui ont du contenu sont affichées) ---- */
  const sections = [];

  if (projet.objectif) {
    sections.push({ id: 'objectif', titre: 'Objectif', html: `
      <p class="projet__objectif">${echapper(projet.objectif)}</p>` });
  }

  if ((projet.contexte || []).length) {
    sections.push({ id: 'contexte', titre: 'Contexte', html:
      projet.contexte.map(p => `<p class="projet__texte">${echapper(p)}</p>`).join('') });
  }

  if ((projet.contribution || []).length) {
    sections.push({ id: 'contribution', titre: 'Ma contribution', html: liste(projet.contribution) });
  }

  if ((projet.fonctionnalites || []).length) {
    sections.push({ id: 'fonctionnalites', titre: 'Fonctionnalités', html: liste(projet.fonctionnalites) });
  }

  if ((projet.choix || []).length) {
    sections.push({ id: 'choix', titre: 'Choix techniques', html: `
      <div class="projet__choix">
        ${projet.choix.map(c => `
          <article class="choix-card">
            <h3 class="choix-card__titre">${echapper(c.titre)}</h3>
            <p class="choix-card__texte">${echapper(c.texte)}</p>
          </article>`).join('')}
      </div>` });
  }

  // Les extraits sont répartis en deux groupes : code réel / pistes d'évolution
  const extraits = (projet.code || []).map((e, index) => ({ ...e, index }));
  const extraitsProjet = extraits.filter(e => e.statut !== 'evolution');
  const extraitsEvolution = extraits.filter(e => e.statut === 'evolution');

  if (extraitsProjet.length) {
    sections.push({ id: 'code', titre: 'Extraits de code', html: blocCode('projet', extraitsProjet) });
  }

  if (extraitsEvolution.length) {
    const evo = projet.evolution || {};
    sections.push({
      id: 'evolution',
      titre: evo.titre || "Piste d'évolution",
      html: `
        ${evo.intro ? `<p class="projet__avertissement">${echapper(evo.intro)}</p>` : ''}
        ${blocCode('evolution', extraitsEvolution)}`
    });
  }

  if ((projet.pistes || []).length) {
    sections.push({ id: 'pistes', titre: "Pistes d'amélioration", html: liste(projet.pistes) });
  }

  /* ---- Sommaire de la fiche ---- */
  const sommaire = sections.length > 2 ? `
    <nav class="projet__sommaire" aria-label="Sur cette page">
      <span class="projet__sommaire-titre">Sur cette page</span>
      <ul>
        ${sections.map(s => `<li><a href="#${s.id}">${echapper(s.titre)}</a></li>`).join('')}
      </ul>
    </nav>` : '';

  /* ---- Métadonnées ---- */
  const meta = (projet.meta || []).length ? `
    <dl class="projet__meta">
      ${projet.meta.map(m => `
        <div class="projet__meta-item">
          <dt class="projet__meta-cle">${echapper(m.cle)}</dt>
          <dd class="projet__meta-valeur">${echapper(m.valeur)}</dd>
        </div>`).join('')}
    </dl>` : '';

  /* ---- Pied de fiche ---- */
  const pied = `
    <section class="projet__bloc projet__cta" aria-label="Aller plus loin">
      ${projet.lien
        ? lienProjet(projet.lien, 'btn btn--primary', ICONE_EXTERNE)
        : '<p class="projet__texte">Ce projet n\'est pas consultable en ligne — n\'hésitez pas à me contacter pour une démonstration.</p>'}
      <a href="index.html#contact" class="btn btn--ghost">Me contacter</a>
    </section>`;

  racine.innerHTML = entete + apercu + `
    <div class="container projet__corps">
      ${meta}
      ${sommaire}
      ${sections.map(s => `
        <section class="projet__bloc" id="${s.id}" aria-labelledby="${s.id}-titre">
          <h2 class="projet__h2" id="${s.id}-titre">${echapper(s.titre)}</h2>
          ${s.html}
        </section>`).join('')}
      ${pied}
    </div>
    <p class="visually-hidden" id="copieStatut" role="status" aria-live="polite"></p>`;

  /* ---- Coloration syntaxique ---- */
  if (window.hljs) {
    racine.querySelectorAll('pre code').forEach(bloc => window.hljs.highlightElement(bloc));
  }

  /* ---- Onglets de fichiers (un jeu d'onglets par groupe) ---- */
  racine.querySelectorAll('.code__tabs').forEach(liste => {
    const onglets = [...liste.querySelectorAll('[role="tab"]')];

    const activer = (onglet, focus) => {
      onglets.forEach(o => {
        const actif = o === onglet;
        o.classList.toggle('code__tab--active', actif);
        o.setAttribute('aria-selected', String(actif));
        o.tabIndex = actif ? 0 : -1;
        const panneau = document.getElementById(o.getAttribute('aria-controls'));
        if (panneau) {
          panneau.hidden = !actif;
          panneau.classList.toggle('code__panel--active', actif);
        }
      });
      if (focus) onglet.focus();
    };

    onglets.forEach(o => o.addEventListener('click', () => activer(o, false)));

    // Clavier : flèches, Début, Fin (motif « tabs » de l'ARIA APG)
    liste.addEventListener('keydown', e => {
      const i = onglets.indexOf(document.activeElement);
      if (i < 0) return;
      let cible = null;
      if (e.key === 'ArrowRight') cible = onglets[(i + 1) % onglets.length];
      else if (e.key === 'ArrowLeft') cible = onglets[(i - 1 + onglets.length) % onglets.length];
      else if (e.key === 'Home') cible = onglets[0];
      else if (e.key === 'End') cible = onglets[onglets.length - 1];
      if (cible) {
        e.preventDefault();
        activer(cible, true);
      }
    });
  });

  /* ---- Bouton « Copier » ---- */
  const statutCopie = document.getElementById('copieStatut');
  racine.querySelectorAll('.code__copy').forEach(bouton => {
    bouton.addEventListener('click', async () => {
      const extrait = (projet.code || [])[Number(bouton.dataset.index)];
      if (!extrait) return;
      let message;
      try {
        await navigator.clipboard.writeText(extrait.source);
        bouton.textContent = 'Copié ✓';
        message = 'Code de ' + extrait.fichier + ' copié dans le presse-papiers.';
      } catch {
        bouton.textContent = 'Copie impossible';
        message = 'La copie a échoué. Sélectionnez le code manuellement.';
      }
      if (statutCopie) statutCopie.textContent = message;
      setTimeout(() => { bouton.textContent = 'Copier'; }, 2000);
    });
  });

  /* ============================================================
     Fonctions utilitaires
     ============================================================ */

  function liste(elements) {
    return `<ul class="projet__liste">${elements.map(f => `<li>${echapper(f)}</li>`).join('')}</ul>`;
  }

  function lienProjet(lien, classes, icone) {
    const externe = lien.externe
      ? ' target="_blank" rel="noopener noreferrer"'
      : '';
    return `
      <a href="${echapper(urlSure(lien.url))}" class="${classes}"${externe}>
        ${icone} ${echapper(lien.label || 'Voir le projet')}${lien.externe ? '<span class="visually-hidden"> (nouvel onglet)</span>' : ''}
      </a>`;
  }

  /* Un groupe d'extraits : liste d'onglets + panneaux (motif ARIA « tabs ») */
  function blocCode(groupe, liste) {
    const idOnglet = e => `onglet-${groupe}-${e.index}`;
    const idPanneau = e => `panneau-${groupe}-${e.index}`;
    const etiquette = groupe === 'evolution' ? 'Fichiers proposés' : 'Fichiers du projet';

    const onglets = liste.length > 1 ? `
      <div class="code__tabs" role="tablist" aria-label="${etiquette}">
        ${liste.map((e, i) => `
          <button class="code__tab${i === 0 ? ' code__tab--active' : ''}" type="button" role="tab"
                  id="${idOnglet(e)}" aria-controls="${idPanneau(e)}"
                  aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${echapper(e.fichier)}</button>`).join('')}
      </div>` : '';

    const panneaux = liste.map((e, i) => `
      <article class="code__panel${i === 0 ? ' code__panel--active' : ''}" id="${idPanneau(e)}"
               ${liste.length > 1 ? `role="tabpanel" aria-labelledby="${idOnglet(e)}" tabindex="0"` : ''}
               ${i === 0 ? '' : 'hidden'}>
        <div class="code__entete">
          ${e.description ? `<p class="code__desc">${echapper(e.description)}</p>` : ''}
          ${badgeStatut(e.statut)}
        </div>
        <div class="code__block">
          <div class="code__bar">
            <span class="code__file">${echapper(e.fichier)}</span>
            <button class="code__copy" type="button" data-index="${e.index}">Copier</button>
          </div>
          <pre><code class="language-${echapper(e.langage || 'plaintext')}">${echapper(e.source)}</code></pre>
        </div>
        ${(e.explication || []).length ? `
          <div class="code__explication">
            <h3 class="code__explication-titre">Explication</h3>
            <ol>${e.explication.map(x => `<li>${echapper(x)}</li>`).join('')}</ol>
          </div>` : ''}
      </article>`).join('');

    return onglets + panneaux;
  }

  function badgeStatut(statut) {
    if (statut === 'projet') return '<span class="code__statut code__statut--projet">Extrait du projet</span>';
    if (statut === 'evolution') return '<span class="code__statut code__statut--evolution">Proposition — non intégrée</span>';
    return '';
  }

  /* N'accepte que les liens relatifs et http(s) / file (bloque javascript:, data:…) */
  function urlSure(url) {
    const valeur = String(url ?? '').trim();
    try {
      const protocole = new URL(valeur, window.location.href).protocol;
      return ['http:', 'https:', 'file:'].includes(protocole) ? valeur : '#';
    } catch {
      return '#';
    }
  }

  /* Échappement HTML : le contenu vient d'un fichier de données,
     mais on reste prudent (notamment pour le code affiché). */
  function echapper(valeur) {
    return String(valeur ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
})();
