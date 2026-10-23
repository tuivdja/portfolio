/* ============================================================
   DONNÉES DES PROJETS
   ------------------------------------------------------------
   Chaque projet de la page d'accueil (index.html) renvoie vers
   projet.html?id=<clé> . La fiche est construite à partir de cet
   objet par projet.js.

   Pour ajouter / modifier un projet :
     1. ajouter une entrée ici (la clé = valeur de ?id=)
     2. ajouter la carte correspondante dans index.html avec
        href="projet.html?id=<clé>"

   Champs disponibles (tous facultatifs sauf titre) :
     titre, badge, accroche, image, imageAlt, imageLogo (true = petite
     image affichée à sa taille), lien { url, label, externe }, depot,
     meta [{ cle, valeur }], objectif, contexte [], contribution [],
     fonctionnalites [], choix [{ titre, texte }], tags [], pistes [],
     evolution { titre, intro }  → titre/intro du bloc « évolution »,
     code [{ fichier, langage, statut, description, source, explication [] }]
       statut : 'projet'    → extrait réel du projet rendu
                'evolution' → piste proposée, NON intégrée au projet

   ⚠ Les extraits des fiches « access » et « bdd » sont encore des
   exemples de structure : remplace-les par tes vrais bouts de code.
   ============================================================ */

const PROJETS = {

  /* ---------------------------------------------------------- */
  dataviz: {
    titre: 'DataViz — Réserves naturelles de la NC',
    badge: 'DataViz',
    categorie: 'dv',
    accroche: "Page de sensibilisation réalisée en équipe pour le Pacific Dataviz Challenge (thème « Blue Pacific 2050 ») : trois graphiques interactifs et un scénario « Et si on ne fait rien ? » pour défendre les réserves naturelles de Nouvelle-Calédonie.",
    image: 'images/dataviz.png',
    imageAlt: 'Logo du Pacific Dataviz Challenge',
    imageLogo: true,
    lien: { url: 'dataviz.html', label: 'Ouvrir le projet', externe: true },
    depot: null,
    meta: [
      { cle: 'Contexte',     valeur: 'Pacific Dataviz Challenge — BTS SIO' },
      { cle: 'Période',      valeur: '2025' },
      { cle: 'Équipe',       valeur: '3 étudiants' },
      { cle: 'Technologies', valeur: 'HTML5, CSS3, JavaScript, Chart.js' }
    ],
    objectif: "Sensibiliser à la protection des réserves naturelles de Nouvelle-Calédonie, dans l'esprit de la Stratégie 2050 pour le continent Pacifique Bleu, en montrant des chiffres sous forme de graphiques plutôt qu'en longs paragraphes, puis en opposant la situation actuelle à un futur à éviter.",
    contexte: [
      "Le concours invite à promouvoir une vision commune de l'avenir du Pacifique. L'équipe a retenu trois axes : ressources et développement économique, changement climatique et catastrophes, océan et environnement.",
      "Tout le projet tient dans une seule page HTML organisée en trois vues : une présentation du projet, une vue principale avec les graphiques, puis une vue « 2050 : nos réserves détruites ? » qui illustre les conséquences de l'inaction."
    ],
    fonctionnalites: [
      'Trois graphiques Chart.js : répartition des zones protégées (secteurs), évolution du nombre de réserves (barres), visiteurs mensuels (courbe)',
      'Titres, légendes et infobulles au survol fournis par Chart.js',
      'Trois vues dans la même page (présentation, graphiques, scénario 2050), sans rechargement',
      "Diaporama de fond en fondu, qui change d'ambiance selon la vue (paysages calédoniens / images de dégradation)",
      "Quatre cartes cliquables (espèces, pollution, algues invasives, incendies) qui ouvrent une fiche d'information",
      'Mise en page adaptée aux petits écrans (media queries)'
    ],
    choix: [
      {
        titre: 'Chart.js pour les graphiques',
        texte: "La bibliothèque fournit les trois types de graphiques, les titres, les légendes et les infobulles. Chaque graphique se décrit par un simple objet de configuration : l'équipe a pu se concentrer sur le message plutôt que sur le dessin du canvas."
      },
      {
        titre: 'Une page, trois vues',
        texte: "Les vues sont des blocs HTML affichés ou masqués avec la classe .hidden. Les graphiques ne sont créés qu'à l'ouverture de la vue principale, une fois leur conteneur visible."
      },
      {
        titre: 'Données écrites dans le script',
        texte: "Les valeurs sont saisies directement dans la configuration de chaque graphique : aucun serveur n'est nécessaire et la page s'ouvre telle quelle. En contrepartie, changer un chiffre oblige à modifier le code — d'où la piste d'évolution PHP détaillée plus bas."
      },
      {
        titre: 'Texte injecté avec textContent',
        texte: "La fiche d'information lit les attributs data-* de la carte cliquée et les affiche avec textContent, qui n'interprète pas le HTML : le contenu ne peut pas insérer de balises dans la page."
      }
    ],
    tags: ['Chart.js', 'JavaScript', 'HTML5', 'CSS3', 'DataViz'],
    pistes: [
      'Servir les chiffres depuis une base MySQL grâce à une petite API PHP (extraits ci-dessous)',
      'Indiquer la source de chaque chiffre sous son graphique',
      'Figer la version de Chart.js chargée depuis le CDN (ex. chart.js@4.4.1) et ajouter un contrôle d\'intégrité',
      'Rendre les cartes d\'information utilisables au clavier (balise <button>, fermeture avec Échap)'
    ],
    evolution: {
      titre: 'Piste d\'évolution : des données servies en PHP',
      intro: "Cette partie n'existe pas dans le projet rendu, qui n'utilise ni PHP ni base de données. Elle montre comment remplacer les tableaux écrits dans le script par une petite API PHP/MySQL, sans changer l'apparence des graphiques. Elle suppose d'ouvrir la page via un serveur local (XAMPP), car fetch() ne fonctionne pas en ouvrant le fichier directement."
    },
    code: [
      {
        fichier: 'dataviz.html — graphique en barres',
        langage: 'javascript',
        statut: 'projet',
        description: "Création du graphique « Évolution du nombre de réserves » dans la fonction initCharts().",
        source: `// Bar Chart
new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
        labels: ['2015', '2020', '2025'],
        datasets: [{
            label: 'Nombre de réserves',
            data: [12, 18, 24],
            backgroundColor: '#185a9d'
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Évolution du nombre de réserves'
            },
            legend: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 2 }
            }
        }
    }
});`,
        explication: [
          "new Chart(canvas, config) dessine le graphique dans la balise <canvas id=\"barChart\"> de la vue principale.",
          "data.labels donne les étiquettes de l'axe horizontal ; datasets[0].data contient les valeurs, dans le même ordre.",
          "La légende est masquée (display: false) : avec une seule série, le titre suffit.",
          "beginAtZero fait partir l'axe vertical de 0, pour ne pas exagérer visuellement l'écart entre les barres."
        ]
      },
      {
        fichier: 'dataviz.html — navigation entre vues',
        langage: 'javascript',
        statut: 'projet',
        description: "Diaporama de fond et passage de la présentation à la vue des graphiques.",
        source: `function startSlideshow(slidesToShow) {
    // Cache tout
    document.querySelectorAll('.bg-slide').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    // Affiche le bon groupe
    slidesToShow.forEach(s => s.style.display = 'block');
    // Active la première
    currentSlide = 0;
    slidesToShow[currentSlide].classList.add('active');
    // Lance le slideshow
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
        slidesToShow[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slidesToShow.length;
        slidesToShow[currentSlide].classList.add('active');
    }, 4000);
}

// Affiche la page principale et cache la présentation
function showMainContent() {
    document.getElementById('presentation').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    document.getElementById('chaos2050').classList.add('hidden');
    slides = Array.from(document.querySelectorAll('.bg-slide:not(.bg-chaos)'));
    startSlideshow(slides);
    setTimeout(initCharts, 200);
}`,
        explication: [
          "startSlideshow() reçoit un groupe d'images : les paysages pour les deux premières vues, les images de dégradation (.bg-chaos) pour la vue 2050.",
          "clearInterval() arrête l'ancien diaporama avant d'en lancer un nouveau, pour éviter que deux minuteries ne tournent en même temps.",
          "Le modulo (% slidesToShow.length) fait revenir le diaporama à la première image après la dernière ; le fondu vient de la transition CSS sur l'opacité.",
          "showMainContent() bascule les classes .hidden puis appelle initCharts() après 200 ms, quand les canvas sont visibles et mesurables."
        ]
      },
      {
        fichier: 'dataviz.html — fiche d\'information',
        langage: 'javascript',
        statut: 'projet',
        description: "Ouverture et fermeture de la fiche détaillée des cartes de la vue « 2050 ».",
        source: `document.querySelectorAll('.info-img').forEach(function(div) {
    div.addEventListener('click', function() {
        document.getElementById('infoCardTitle').textContent = div.getAttribute('data-title');
        document.getElementById('infoCardText').textContent = div.getAttribute('data-text');
        document.getElementById('infoCardExtra').textContent = div.getAttribute('data-extra') || '';
        document.getElementById('infoCardImg').src = div.getAttribute('data-img') || div.querySelector('img').src;
        document.getElementById('infoCardImg').alt = div.getAttribute('data-title');
        document.getElementById('infoCard').style.display = 'block';
    });
});
document.getElementById('infoCardClose').onclick = function() {
    document.getElementById('infoCard').style.display = 'none';
};
document.getElementById('infoCard').onclick = function(e) {
    if (e.target === this) this.style.display = 'none';
};`,
        explication: [
          "Une seule fiche (#infoCard) sert aux quatre cartes : son contenu est rempli à partir des attributs data-title, data-text, data-extra et data-img de la carte cliquée.",
          "textContent insère du texte brut : même si un attribut contenait des balises, elles seraient affichées et non exécutées.",
          "L'image de la fiche reçoit un texte alternatif (alt) égal au titre de la carte.",
          "Un clic sur la croix ou sur le fond (e.target === this) referme la fiche."
        ]
      },
      {
        fichier: 'indicateurs.sql',
        langage: 'sql',
        statut: 'evolution',
        description: "Table MySQL qui reprend les valeurs aujourd'hui écrites dans dataviz.html.",
        source: `CREATE TABLE indicateur (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    graphique ENUM('zones', 'reserves', 'visiteurs') NOT NULL,
    libelle   VARCHAR(60)   NOT NULL,   -- étiquette (axe ou légende)
    valeur    DECIMAL(10,2) NOT NULL,
    ordre     TINYINT       NOT NULL,   -- ordre d'affichage
    INDEX idx_graphique (graphique, ordre)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Mêmes valeurs que dans dataviz.html
INSERT INTO indicateur (graphique, libelle, valeur, ordre) VALUES
('zones',     'Forêts',            40, 1),
('zones',     'Récifs',            35, 2),
('zones',     'Espèces protégées', 25, 3),
('reserves',  '2015', 12, 1),
('reserves',  '2020', 18, 2),
('reserves',  '2025', 24, 3),
('visiteurs', 'Jan',  2, 1), ('visiteurs', 'Fév',  3, 2),
('visiteurs', 'Mar',  4, 3), ('visiteurs', 'Avr',  6, 4),
('visiteurs', 'Mai',  5, 5), ('visiteurs', 'Juin', 7, 6);`,
        explication: [
          "Une ligne = un point d'un graphique. La colonne graphique indique à quel canvas il appartient (pieChart, barChart ou lineChart).",
          "ENUM limite les valeurs possibles côté base, en plus du contrôle fait en PHP.",
          "La colonne ordre conserve l'ordre des étiquettes (Jan, Fév, Mar…), que l'ordre alphabétique ne respecterait pas.",
          "L'index (graphique, ordre) correspond exactement au filtre et au tri de la requête de l'API."
        ]
      },
      {
        fichier: 'config/db.php',
        langage: 'php',
        statut: 'evolution',
        description: "Connexion PDO partagée par les scripts de l'API.",
        source: `<?php
// config/db.php — connexion PDO partagée
declare(strict_types=1);

try {
    $pdo = new PDO(
        'mysql:host=localhost;dbname=dataviz_nc;charset=utf8mb4',
        getenv('DB_USER') ?: 'root',   // valeurs par défaut de XAMPP en local
        getenv('DB_PASS') ?: '',
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $e) {
    error_log('Connexion BDD : ' . $e->getMessage());   // détail réservé aux logs
    http_response_code(500);
    exit(json_encode(['erreur' => 'Service momentanément indisponible']));
}`,
        explication: [
          "charset=utf8mb4 dans le DSN garantit que les accents (Récifs, Fév) arrivent intacts.",
          "Les identifiants viennent de variables d'environnement ; les valeurs par défaut (root, mot de passe vide) ne servent qu'en local avec XAMPP.",
          "ERRMODE_EXCEPTION transforme toute erreur SQL en exception ; EMULATE_PREPARES à false fait préparer les requêtes par MySQL lui-même.",
          "En cas d'échec, le message technique part dans les logs du serveur et le navigateur ne reçoit qu'un message neutre : aucune information sur la base n'est divulguée."
        ]
      },
      {
        fichier: 'api/donnees.php',
        langage: 'php',
        statut: 'evolution',
        description: "Renvoie les séries d'un graphique au format attendu par Chart.js. Appel : api/donnees.php?graphique=reserves",
        source: `<?php
// api/donnees.php — séries d'un graphique au format Chart.js
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

require __DIR__ . '/../config/db.php';   // fournit $pdo

// 1. Liste blanche : seuls les trois graphiques de la page sont acceptés
$autorises = ['zones', 'reserves', 'visiteurs'];
$graphique = $_GET['graphique'] ?? '';

if (!in_array($graphique, $autorises, true)) {
    http_response_code(400);
    echo json_encode(['erreur' => 'Graphique inconnu']);
    exit;
}

// 2. Requête préparée : la valeur reçue n'est jamais collée dans le SQL
$stmt = $pdo->prepare(
    'SELECT libelle, valeur
       FROM indicateur
      WHERE graphique = :graphique
      ORDER BY ordre'
);
$stmt->execute([':graphique' => $graphique]);
$lignes = $stmt->fetchAll();

// 3. Réponse { labels: [...], data: [...] }
echo json_encode([
    'labels' => array_column($lignes, 'libelle'),
    'data'   => array_map('floatval', array_column($lignes, 'valeur')),
], JSON_UNESCAPED_UNICODE);`,
        explication: [
          "Les en-têtes sont envoyés avant le require : même une erreur de connexion répond en JSON.",
          "in_array(..., true) compare strictement : toute autre valeur (y compris un tableau passé dans l'URL) est refusée avec le code 400.",
          "Le paramètre :graphique est lié par execute() : c'est la protection contre l'injection SQL, en plus de la liste blanche.",
          "array_column() sépare les libellés et les valeurs ; floatval convertit les DECIMAL, que PDO renvoie sous forme de texte, en nombres pour Chart.js."
        ]
      },
      {
        fichier: 'dataviz.html — initCharts() adapté',
        langage: 'javascript',
        statut: 'evolution',
        description: "Même graphique en barres, alimenté par l'API au lieu du tableau écrit en dur.",
        source: `// Charge une série depuis l'API PHP
async function chargerSerie(graphique) {
    const reponse = await fetch('api/donnees.php?graphique=' + encodeURIComponent(graphique));
    if (!reponse.ok) throw new Error('Données indisponibles : ' + graphique);
    return reponse.json();               // { labels: [...], data: [...] }
}

// Recrée un graphique proprement si la vue est rouverte
function dessiner(id, config) {
    Chart.getChart(id)?.destroy();       // évite « Canvas is already in use »
    return new Chart(document.getElementById(id), config);
}

async function initCharts() {
    const reserves = await chargerSerie('reserves');

    dessiner('barChart', {
        type: 'bar',
        data: {
            labels: reserves.labels,     // remplace ['2015', '2020', '2025']
            datasets: [{
                label: 'Nombre de réserves',
                data: reserves.data,     // remplace [12, 18, 24]
                backgroundColor: '#185a9d'
            }]
        },
        options: { /* options identiques à la version actuelle */ }
    });
    // Même principe pour 'zones' (pieChart) et 'visiteurs' (lineChart)
}

// Dans showMainContent() : l'erreur éventuelle est affichée dans la console
setTimeout(() => initCharts().catch(console.error), 200);`,
        explication: [
          "Seules les deux lignes labels et data changent : le type, les couleurs et les options du graphique restent ceux du projet.",
          "encodeURIComponent() protège le paramètre de l'URL ; reponse.ok permet de détecter une erreur 400 ou 500 renvoyée par l'API.",
          "Chart.getChart(id)?.destroy() supprime le graphique existant : sans cela, revenir sur la vue principale relance new Chart() sur un canvas déjà utilisé, ce que Chart.js refuse.",
          "initCharts() devenant asynchrone, .catch() évite qu'une erreur réseau passe inaperçue."
        ]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  poo: {
    titre: 'Programmation orientée objet — Mon Caillou',
    badge: 'POO · Android',
    categorie: 'app',
    accroche: "Application Android touristique de Nouvelle-Calédonie, développée en Java à trois. Ma partie : le module Compte (inscription, connexion, profil) et la page « Lieux à dormir ».",
    image: null,
    lien: null,
    depot: null,
    meta: [
      { cle: 'Contexte',     valeur: 'Module SLAM « Programmation orientée objet »' },
      { cle: 'Période',      valeur: 'Août – septembre 2026' },
      { cle: 'Équipe',       valeur: '3 étudiants' },
      { cle: 'Technologies', valeur: 'Java 17, Android SDK 34, PostgreSQL (Neon), JUnit 4' }
    ],
    objectif: "Livrer une application Android 8.0+ installable (APK) qui présente les communes, les lieux où manger et où dormir et l'actualité calédonienne, en respectant un cahier des charges, une charte graphique et des exigences de sécurité : aucun mot de passe en clair, aucun identifiant de base de données dans l'application, utilisation possible hors connexion.",
    contexte: [
      "L'équipe a reçu un cahier des charges « Caillou Tour », une charte graphique (couleurs, polices Baloo 2 et Inter), les maquettes des écrans et un fichier Excel des restaurants, hébergements et sites. Chaque membre a pris en charge des écrans complets, de l'interface jusqu'à l'accès aux données ; le code est partagé sur un dépôt GitHub commun.",
      "L'application suit une architecture en couches (MVVM / Repository) : un écran (Activity + layout XML) ne touche jamais directement au réseau ni au stockage. Il passe par un ViewModel, qui garde l'état de l'écran, puis par un Repository, qui choisit la source des données."
    ],
    contribution: [
      'Module Compte : inscription, connexion par e-mail ou compte Google, consultation, modification et suppression du profil, changement de mot de passe, déconnexion',
      'Page « Lieux à dormir » : hébergements classés en Hôtels, Gîtes / Tribus et Campings, recherche et fiche détaillée',
      'Tests unitaires du module Compte (JUnit 4 + Robolectric), dont un serveur simulé'
    ],
    fonctionnalites: [
      'Contrôle de chaque champ avant envoi, avec un message d\'erreur sous le champ concerné',
      'Même message pour un e-mail inconnu et pour un mot de passe faux, afin de ne pas révéler quels comptes existent',
      'Suppression du compte protégée par une confirmation et la saisie du mot de passe',
      'Liste des hébergements lue depuis un fichier embarqué quand le réseau ne répond pas',
      'Recherche par nom, commune ou province, sans tenir compte des accents ni des majuscules',
      'Prix affichés en francs Pacifique et en euros (1 000 F = 8,38 €)'
    ],
    choix: [
      {
        titre: 'Encapsulation',
        texte: "Le sel, l'empreinte du mot de passe et la session restent des attributs privés de CompteRepository : les écrans n'utilisent que ses méthodes publiques. Les attributs de Utilisateur sont final, un profil ne peut pas être modifié par erreur."
      },
      {
        titre: 'Interface et polymorphisme',
        texte: "CompteRepository dépend de l'interface ServeurComptes et non de sa classe concrète NeonServeurComptes. En test, on lui fournit un faux serveur sans changer une ligne du code de l'application."
      },
      {
        titre: 'Énumérations et exceptions',
        texte: "TypeHebergement (HOTEL, GITE_TRIBU, CAMPING) porte lui-même la règle de classement. L'exception ServeurException transporte un code (EMAIL_PRIS, IDENTIFIANTS, RESEAU…) que l'écran traduit en message clair."
      },
      {
        titre: 'Héritage',
        texte: "Les écrans héritent d'AppCompatActivity et redéfinissent onCreate (@Override) ; LieuxADormirViewModel hérite d'AndroidViewModel, ce qui conserve l'état de la page lors d'une rotation de l'écran."
      },
      {
        titre: 'Sécurité des mots de passe',
        texte: "En ligne, le mot de passe est confié à Neon Auth. En mode local, seule une empreinte PBKDF2-HMAC-SHA256 est stockée (sel aléatoire de 16 octets, 64 000 itérations), comparée en temps constant."
      },
      {
        titre: 'Travail hors du fil principal',
        texte: "Les opérations longues (réseau, calcul d'empreinte) s'exécutent sur un fil secondaire ; le résultat revient à l'écran par un rappel (Callback), pour ne jamais figer l'interface."
      }
    ],
    tags: ['Java', 'Android', 'POO', 'MVVM', 'PostgreSQL', 'JUnit'],
    pistes: [
      'Ajouter « mot de passe oublié »',
      'Lier des avis et des favoris au compte de l\'utilisateur',
      'Afficher plus de cinq hébergements par famille'
    ],
    code: [
      {
        fichier: 'ServeurComptes.java',
        langage: 'java',
        statut: 'projet',
        description: "Le contrat que doit respecter tout serveur de comptes (extrait).",
        source: `interface ServeurComptes {

    /** Crée le compte d'authentification et ouvre sa session. */
    void inscrire(String email, String motDePasse, String nomAffiche) throws ServeurException;

    /** Ouvre une session avec des identifiants existants. */
    void connecter(String email, String motDePasse) throws ServeurException;

    /** Profil de la session ouverte, ou {@code null} s'il n'a pas encore été créé. */
    Utilisateur lireProfil() throws ServeurException;

    // … creerProfil, modifierProfil, changerMotDePasse, supprimerCompte, deconnecter

    /** Échec d'un appel au serveur, classé pour l'affichage. */
    final class ServeurException extends Exception {

        enum Code { EMAIL_PRIS, IDENTIFIANTS, SESSION_EXPIREE, RESEAU, AUTRE }

        final Code code;

        ServeurException(Code code, String message) {
            super(message);
            this.code = code;
        }
    }
}`,
        explication: [
          "Une interface ne contient que des signatures : elle dit ce qu'un serveur sait faire, pas comment il le fait.",
          "throws ServeurException oblige l'appelant à prévoir l'échec de chaque opération réseau.",
          "ServeurException hérite d'Exception et ajoute un attribut code (une énumération) : l'écran choisit son message selon ce code, sans analyser de texte."
        ]
      },
      {
        fichier: 'CompteRepository.java',
        langage: 'java',
        statut: 'projet',
        description: "Injection du serveur par le constructeur et calcul de l'empreinte du mot de passe (extrait).",
        source: `public final class CompteRepository {

    private static final String ALGO = "PBKDF2WithHmacSHA256";
    private static final int ITERATIONS = 64_000;
    private static final int TAILLE_SEL = 16;
    private static final int TAILLE_CLE_BITS = 256;

    /** {@code null} : comptes uniquement locaux. */
    private final ServeurComptes serveur;

    public CompteRepository(Context context) {
        this(context, ApiConfig.comptesEnLigne() ? NeonServeurComptes.obtenir(context) : null);
    }

    /** Pour les tests : serveur simulé, ou {@code null} pour le mode local. */
    CompteRepository(Context context, ServeurComptes serveur) {
        this.app = context.getApplicationContext();
        this.prefs = app.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        this.serveur = serveur;
    }

    // …

    private static byte[] deriver(String motDePasse, byte[] sel) throws Exception {
        char[] caracteres = motDePasse == null ? new char[0] : motDePasse.toCharArray();
        KeySpec spec = new PBEKeySpec(caracteres, sel, ITERATIONS, TAILLE_CLE_BITS);
        try {
            return SecretKeyFactory.getInstance(ALGO).generateSecret(spec).getEncoded();
        } finally {
            Arrays.fill(caracteres, '\\0');
        }
    }
}`,
        explication: [
          "L'attribut serveur est de type ServeurComptes (l'interface) : le Repository ignore s'il parle à Neon ou à un serveur simulé.",
          "Le constructeur public choisit le vrai serveur ; le second constructeur, visible seulement dans le paquet, permet aux tests d'en fournir un autre.",
          "deriver() est private static : un détail interne, invisible pour les écrans (encapsulation).",
          "Le bloc finally efface le mot de passe de la mémoire (Arrays.fill), même si le calcul échoue."
        ]
      },
      {
        fichier: 'CompteRepositoryEnLigneTest.java',
        langage: 'java',
        statut: 'projet',
        description: "Faux serveur utilisé par les tests unitaires (extrait).",
        source: `/** Neon simulé : comptes (email → mot de passe), profils et session ouverte. */
private static final class ServeurFactice implements ServeurComptes {
    final Map<String, String> motsDePasse = new HashMap<>();
    final Map<String, Utilisateur> profils = new HashMap<>();
    String sessionOuverte;
    boolean horsLigne;

    private void reseau() throws ServeurException {
        if (horsLigne) throw new ServeurException(Code.RESEAU, "hors ligne");
    }

    @Override public void inscrire(String email, String mdp, String nom) throws ServeurException {
        reseau();
        if (motsDePasse.containsKey(email)) throw new ServeurException(Code.EMAIL_PRIS, "pris");
        motsDePasse.put(email, mdp);
        sessionOuverte = email;
    }

    @Override public void connecter(String email, String mdp) throws ServeurException {
        reseau();
        if (!mdp.equals(motsDePasse.get(email))) throw new ServeurException(Code.IDENTIFIANTS, "faux");
        sessionOuverte = email;
    }

    // … autres méthodes de l'interface
}`,
        explication: [
          "implements ServeurComptes : ce faux serveur peut remplacer le vrai partout où l'interface est attendue — c'est le polymorphisme.",
          "Il garde les comptes en mémoire (HashMap) : les tests tournent sur le PC, sans réseau ni base de données.",
          "Le drapeau horsLigne permet de simuler une coupure et de vérifier que l'application réagit correctement.",
          "@Override signale au compilateur que la méthode implémente bien celle de l'interface."
        ]
      },
      {
        fichier: 'TypeHebergement.java',
        langage: 'java',
        statut: 'projet',
        description: "Énumération qui classe chaque hébergement dans une famille (extrait).",
        source: `public enum TypeHebergement {
    HOTEL,
    GITE_TRIBU,
    CAMPING;

    public static TypeHebergement de(Lieu lieu) {
        return classer(normaliser(lieu.type) + " " + normaliser(lieu.nom));
    }

    private static TypeHebergement classer(String texte) {
        if (texte.contains("camping")) return CAMPING;
        if (texte.contains("gite") || texte.contains("tribu") || texte.contains("chez ")
                || texte.contains("chambre d") || texte.contains("maison d")
                || texte.contains("table d") || texte.contains("refuge")
                || texte.contains("accueil")) {
            return GITE_TRIBU;
        }
        return HOTEL;
    }

    /** Minuscules sans accents : « Gîte » et « Gite » se valent. */
    static String normaliser(String valeur) {
        if (valeur == null) return "";
        String sansAccents = Normalizer.normalize(valeur, Normalizer.Form.NFD)
                .replaceAll("\\\\p{M}", "");
        return sansAccents.toLowerCase(Locale.ROOT).trim();
    }
}`,
        explication: [
          "Une énumération limite les familles à trois valeurs connues : impossible d'écrire « Hotel » au lieu de HOTEL sans erreur de compilation.",
          "Le type fourni par les données étant souvent absent ou imprécis, le classement s'appuie sur le type et le nom réunis.",
          "normaliser() retire les accents (décomposition NFD puis suppression des signes diacritiques) et passe en minuscules.",
          "La même méthode normaliser() sert à la recherche de la page : « gite » trouve aussi « Gîte »."
        ]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  parcours: {
    titre: 'Parcours certifs',
    badge: 'Web · Angular',
    categorie: 'web',
    accroche: "Prototype d'une plateforme d'orientation et de suivi des certifications (Pix, ANSSI, DCC, Cisco) : des maquettes d'écrans traduites en pages HTML/CSS, puis en application Angular.",
    image: null,
    lien: null,
    depot: null,
    meta: [
      { cle: 'Contexte',     valeur: 'Projet SLAM — BTS SIO' },
      { cle: 'Période',      valeur: '2026' },
      { cle: 'Versions',     valeur: 'Prototype HTML/CSS/JS, puis application Angular' },
      { cle: 'Technologies', valeur: 'Angular 21, TypeScript, HTML/CSS, JavaScript' }
    ],
    objectif: "Aider les élèves à choisir, préparer et suivre leurs certifications depuis un espace unique, avec des entrées distinctes pour les élèves, les professeurs et l'administration.",
    contexte: [
      "Le projet part de maquettes Figma : accueil, choix de l'espace, connexion, inscription, tableau de bord élève, fiche d'une certification et profil.",
      "Une première version statique en HTML, CSS et JavaScript reprend ces écrans page par page. Une seconde version les réorganise en application Angular monopage : composants réutilisables, routage et données typées.",
      "Il s'agit d'un prototype d'interface : les formulaires ne sont pas encore reliés à une base de données, et les certifications et pourcentages affichés sont des données d'exemple définies dans le code."
    ],
    fonctionnalites: [
      "Sept écrans routés : accueil, choix de l'espace (admin, professeurs, élèves), connexion, inscription, tableau de bord élève, fiche Pix, profil",
      "En-tête commun qui met en évidence la page active",
      'Cartes des certifications partenaires et barres de progression générées à partir des données',
      'Parcours de préparation Pix présenté en cinq étapes',
      "Titre d'onglet propre à chaque page ; une adresse inconnue renvoie vers l'accueil",
      'Version statique : notifications « toast » et état de chargement des boutons'
    ],
    choix: [
      {
        titre: 'Composants autonomes',
        texte: "Chaque page déclare elle-même ce qu'elle utilise (imports: [RouterLink, SiteHeaderComponent]) : pas de module global, les dépendances se lisent directement dans le composant."
      },
      {
        titre: 'Données séparées de l\'affichage',
        texte: "Certifications, progression et étapes du parcours sont regroupées dans site-data.ts et décrites par des interfaces TypeScript. Les gabarits ne font que les parcourir."
      },
      {
        titre: 'Nouvelle syntaxe @for',
        texte: "@for (… ; track …) remplace *ngFor. La clé track (ici le titre) permet à Angular de ne recréer que les éléments qui changent."
      },
      {
        titre: 'Typage strict des gabarits',
        texte: "L'en-tête reçoit la page active par input<NavKey>('home'), où NavKey vaut 'home' | 'roles' | 'login' | 'dashboard' | 'profile'. Avec strictTemplates activé, une valeur mal orthographiée est signalée à la compilation."
      }
    ],
    tags: ['Angular', 'TypeScript', 'HTML/CSS', 'JavaScript', 'Figma'],
    pistes: [
      'Relier connexion et inscription à une API, avec des formulaires Angular validés',
      'Rendre fonctionnel le filtre « Mot clé » du tableau de bord',
      'Remplacer les données d\'exemple par une base de données',
      'Ajouter role="progressbar" et aria-valuenow aux barres de progression'
    ],
    code: [
      {
        fichier: 'app.routes.ts',
        langage: 'typescript',
        statut: 'projet',
        description: "Table de routage de l'application (imports abrégés).",
        source: `import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StudentDashboardPageComponent } from './pages/student-dashboard-page/student-dashboard-page.component';
// … imports des cinq autres pages

export const routes: Routes = [
  { path: '', component: HomePageComponent, title: 'Accueil | Parcours Certifs' },
  { path: 'se-connecter', component: RoleSelectionPageComponent, title: 'Choisir un espace | Parcours Certifs' },
  { path: 'connexion', component: LoginPageComponent, title: 'Connexion | Parcours Certifs' },
  { path: 'inscription', component: RegisterPageComponent, title: 'Inscription | Parcours Certifs' },
  { path: 'eleves', component: StudentDashboardPageComponent, title: 'Espace eleves | Parcours Certifs' },
  { path: 'eleves/certification/pix', component: CertificationDetailPageComponent, title: 'Certification Pix | Parcours Certifs' },
  { path: 'profil-eleve', component: StudentProfilePageComponent, title: 'Profil eleve | Parcours Certifs' },
  { path: '**', redirectTo: '' }
];`,
        explication: [
          "Chaque objet associe une adresse (path) à la page à afficher (component).",
          "La propriété title change le titre de l'onglet du navigateur à chaque navigation.",
          "La route '**' capture toute adresse inconnue et redirige vers l'accueil : l'utilisateur ne tombe jamais sur une page vide."
        ]
      },
      {
        fichier: 'site-data.ts',
        langage: 'typescript',
        statut: 'projet',
        description: "Types et données d'exemple utilisés par le tableau de bord (extrait).",
        source: `export type NavKey = 'home' | 'roles' | 'login' | 'dashboard' | 'profile';

export interface ProgressCard {
  title: string;
  detail: string;
  progress: number;
}

export const studentProgress: ProgressCard[] = [
  { title: 'Cisco CCNA', detail: 'Reseaux et switching', progress: 68 },
  { title: 'Certification Cyber', detail: 'Bonnes pratiques et defense', progress: 24 },
  { title: 'Pix', detail: 'Competences numeriques', progress: 81 }
];`,
        explication: [
          "NavKey est un type union : seules ces cinq chaînes sont acceptées partout où il est utilisé.",
          "L'interface ProgressCard décrit la forme d'une carte ; le tableau studentProgress doit la respecter, sinon la compilation échoue.",
          "Ces pourcentages sont des valeurs d'exemple : ils seront remplacés par les données réelles quand une API sera branchée."
        ]
      },
      {
        fichier: 'student-dashboard-page.component.ts',
        langage: 'typescript',
        statut: 'projet',
        description: "Composant de la page « Espace élèves ».",
        source: `import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SiteHeaderComponent } from '../../components/site-header/site-header.component';
import { partnerCertifications, studentProgress } from '../../data/site-data';

@Component({
  selector: 'app-student-dashboard-page',
  imports: [RouterLink, SiteHeaderComponent],
  templateUrl: './student-dashboard-page.component.html'
})
export class StudentDashboardPageComponent {
  readonly certifications = partnerCertifications;
  readonly progressCards = studentProgress;
}`,
        explication: [
          "Le décorateur @Component relie la classe à son gabarit HTML et liste ce dont elle a besoin (imports).",
          "La classe n'a aucune logique : elle expose seulement les données au gabarit.",
          "readonly empêche de réaffecter ces propriétés par erreur dans le composant."
        ]
      },
      {
        fichier: 'student-dashboard-page.component.html',
        langage: 'xml',
        statut: 'projet',
        description: "Affichage des barres de progression (extrait).",
        source: `<div class="progress-list">
  @for (progress of progressCards; track progress.title) {
    <article class="progress-card">
      <strong>{{ progress.title }}</strong>
      <span class="section-copy">{{ progress.detail }}</span>
      <div class="progress-bar" style="margin-top: 14px;">
        <span [style.width.%]="progress.progress"></span>
      </div>
      <span style="display: inline-block; margin-top: 10px; font-weight: 700; color: var(--primary-dark);">{{ progress.progress }}%</span>
    </article>
  }
</div>`,
        explication: [
          "@for génère une carte par élément de progressCards ; track progress.title identifie chaque carte.",
          "{{ … }} affiche une valeur en l'échappant automatiquement : un texte contenant du HTML ne serait pas interprété.",
          "[style.width.%] lie la largeur de la barre au pourcentage : 68 devient width: 68%."
        ]
      },
      {
        fichier: 'js/app.js',
        langage: 'javascript',
        statut: 'projet',
        description: "Version statique : notification temporaire (« toast »).",
        source: `function showToast(msg, type = 'info') {
  const colors = {
    info:    '#3b82f6',
    success: '#22c55e',
    error:   '#ef4444',
  };
  const el = document.createElement('div');
  el.style.cssText = \`
    position:fixed; bottom:24px; right:24px; z-index:9999;
    background:\${colors[type]}; color:#fff;
    padding:12px 20px; border-radius:12px;
    font-family:'DM Sans',sans-serif; font-size:0.88rem; font-weight:500;
    box-shadow:0 8px 30px rgba(0,0,0,0.15);
    animation: slideUp 0.3s ease both;
  \`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}`,
        explication: [
          "Une seule fonction sert à tous les messages ; le paramètre type choisit la couleur (information, succès, erreur).",
          "Le message est inséré avec textContent : il s'affiche tel quel, sans risque d'injection HTML.",
          "La notification se retire seule après 3 secondes (setTimeout + remove())."
        ]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  access: {
    titre: 'Application Access — Province Sud',
    badge: 'Application',
    categorie: 'app',
    accroche: "Application de gestion des dossiers d'élèves réalisée pendant mon stage à la Direction de l'Éducation et de la Réussite.",
    image: null,
    lien: null,
    depot: null,
    meta: [
      { cle: 'Contexte',    valeur: 'Stage — Province Sud, Direction de l\'Éducation et de la Réussite' },
      { cle: 'Période',     valeur: 'Octobre – Novembre 2025' },
      { cle: 'Rôle',        valeur: 'Analyse des besoins, modélisation, développement' },
      { cle: 'Technologies', valeur: 'Microsoft Access, VBA, UML' }
    ],
    contexte: [
      "Le service traitait la vérification des dossiers d'élèves sur des fichiers dispersés, ce qui rendait le suivi difficile et sujet aux oublis.",
      "J'ai commencé par modéliser le processus existant (diagrammes d'activité UML), puis conçu une base Access centralisant les dossiers, avec des formulaires de saisie et des états de suivi."
    ],
    fonctionnalites: [
      "Saisie centralisée des dossiers d'élèves",
      'Contrôles de cohérence automatiques à la validation',
      'Recherche multicritère (nom, établissement, statut du dossier)',
      'États imprimables pour le suivi du service'
    ],
    tags: ['Microsoft Access', 'VBA', 'UML', 'SQL'],
    code: [
      {
        fichier: 'ControleDossier.vba',
        langage: 'vbnet',
        description: "Contrôle de complétude d'un dossier avant enregistrement.",
        source: `' Vérifie qu'un dossier est complet avant de l'enregistrer
Private Sub btnValider_Click()
    Dim messages As String

    If Nz(Me.txtNom, "") = "" Then
        messages = messages & "- Le nom est obligatoire" & vbCrLf
    End If

    If Not IsDate(Me.txtDateNaissance) Then
        messages = messages & "- Date de naissance invalide" & vbCrLf
    End If

    If Nz(Me.cboEtablissement, 0) = 0 Then
        messages = messages & "- L'établissement doit être sélectionné" & vbCrLf
    End If

    If Len(messages) > 0 Then
        MsgBox "Dossier incomplet :" & vbCrLf & messages, vbExclamation, "Validation"
        Exit Sub
    End If

    Me.statut = "Complet"
    DoCmd.RunCommand acCmdSaveRecord
    MsgBox "Dossier enregistré.", vbInformation
End Sub`
      },
      {
        fichier: 'suivi_dossiers.sql',
        langage: 'sql',
        description: "Requête de suivi : nombre de dossiers par statut et par établissement.",
        source: `SELECT  e.nom_etablissement,
        d.statut,
        COUNT(*) AS nb_dossiers
FROM    Dossier AS d
        INNER JOIN Eleve AS el
            ON d.id_eleve = el.id_eleve
        INNER JOIN Etablissement AS e
            ON el.id_etablissement = e.id_etablissement
WHERE   d.annee_scolaire = 2025
GROUP BY e.nom_etablissement, d.statut
ORDER BY e.nom_etablissement, d.statut;`
      }
    ]
  },

  /* ---------------------------------------------------------- */
  portfolio: {
    titre: 'Portfolio personnel',
    badge: 'Web',
    categorie: 'web',
    accroche: "Ce site : identité visuelle inspirée de la Nouvelle-Calédonie et de Wallis-et-Futuna, animations CSS et canvas, sans framework.",
    image: null,
    lien: { url: 'index.html', label: "Revenir à l'accueil", externe: false },
    depot: null,
    meta: [
      { cle: 'Contexte',    valeur: 'Projet personnel — support de présentation BTS SIO' },
      { cle: 'Période',     valeur: '2025 – 2026' },
      { cle: 'Rôle',        valeur: 'Design, intégration, développement' },
      { cle: 'Technologies', valeur: 'HTML5, CSS3, JavaScript vanilla' }
    ],
    contexte: [
      "Le portfolio devait présenter mon parcours, mes compétences et mes réalisations tout en étant lui-même une démonstration technique.",
      "Tout est écrit à la main, sans framework ni bibliothèque : animations au défilement via IntersectionObserver, fond animé en canvas, navigation accessible au clavier."
    ],
    fonctionnalites: [
      'Animations révélées au défilement (IntersectionObserver)',
      'Fond animé en canvas sur la section d\'accueil',
      'Compétences filtrables par domaine, avec recherche et détails dépliables',
      'Fiches projets détaillées générées depuis un fichier de données',
      'Design responsive et navigation clavier'
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Accessibilité', 'Responsive'],
    code: [
      {
        fichier: 'script.js',
        langage: 'javascript',
        description: "Révélation progressive des éléments au défilement.",
        source: `function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const delai = Number(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('revealed'), delai);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  elements.forEach(el => observer.observe(el));
}`
      },
      {
        fichier: 'style.css',
        langage: 'css',
        description: "Variables de la palette « Profondeurs du Pacifique ».",
        source: `:root {
  --ocean-deep:  #0b1f3a;   /* bleu nuit du lagon profond */
  --ocean-light: #1e6091;   /* bleu lagon clair */
  --aqua:        #00b4d8;   /* turquoise récif */
  --coral:       #e07a5f;   /* corail vivant */
  --sand:        #f4e9d8;   /* sable blanc */
}

.reveal-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity .7s var(--ease), transform .7s var(--ease);
}
.reveal-up.revealed {
  opacity: 1;
  transform: none;
}`
      }
    ]
  },

  /* ---------------------------------------------------------- */
  bdd: {
    titre: 'Modélisation base de données',
    badge: 'Base de données',
    categorie: 'bdd',
    accroche: "Conception et implémentation d'une base relationnelle : du MCD Merise aux requêtes SQL et procédures stockées.",
    image: null,
    lien: { url: 'http://localhost/parcours-certifs/index.php', label: 'Ouvrir le projet', externe: true },
    depot: null,
    meta: [
      { cle: 'Contexte',    valeur: 'Projet de cours — suivi des parcours certifiants' },
      { cle: 'Période',     valeur: '2025' },
      { cle: 'Rôle',        valeur: 'Modélisation, création de la base, développement PHP' },
      { cle: 'Technologies', valeur: 'MySQL, SQL, Merise, PHP' }
    ],
    contexte: [
      "Le sujet consistait à modéliser puis implémenter la base de données d'une application de suivi des parcours certifiants des apprenants.",
      "Après le MCD et le MLD (méthode Merise), la base a été créée sous MySQL, alimentée avec un jeu d'essai, puis interrogée depuis une interface PHP."
    ],
    fonctionnalites: [
      'MCD / MLD complets et normalisés (3FN)',
      'Script de création des tables avec contraintes d\'intégrité',
      'Requêtes d\'analyse (jointures, agrégats, sous-requêtes)',
      'Procédure stockée pour l\'inscription d\'un apprenant',
      'Consultation des données depuis une interface PHP'
    ],
    tags: ['MySQL', 'SQL', 'Merise', 'PHP', 'PDO'],
    code: [
      {
        fichier: 'creation_base.sql',
        langage: 'sql',
        description: "Création des tables et des contraintes d'intégrité référentielle.",
        source: `CREATE TABLE apprenant (
    id_apprenant  INT AUTO_INCREMENT PRIMARY KEY,
    nom           VARCHAR(60)  NOT NULL,
    prenom        VARCHAR(60)  NOT NULL,
    email         VARCHAR(120) NOT NULL UNIQUE,
    date_naissance DATE        NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE certification (
    id_certification INT AUTO_INCREMENT PRIMARY KEY,
    libelle          VARCHAR(120) NOT NULL,
    niveau           TINYINT      NOT NULL,
    duree_heures     SMALLINT     NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE inscription (
    id_apprenant     INT  NOT NULL,
    id_certification INT  NOT NULL,
    date_inscription DATE NOT NULL,
    statut           ENUM('en_cours','validee','abandonnee') NOT NULL DEFAULT 'en_cours',
    PRIMARY KEY (id_apprenant, id_certification),
    CONSTRAINT fk_insc_apprenant
        FOREIGN KEY (id_apprenant) REFERENCES apprenant(id_apprenant)
        ON DELETE CASCADE,
    CONSTRAINT fk_insc_certif
        FOREIGN KEY (id_certification) REFERENCES certification(id_certification)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
      },
      {
        fichier: 'requetes.sql',
        langage: 'sql',
        description: "Taux de réussite par certification.",
        source: `SELECT  c.libelle,
        COUNT(*)                                   AS nb_inscrits,
        SUM(i.statut = 'validee')                  AS nb_validees,
        ROUND(100 * SUM(i.statut = 'validee') / COUNT(*), 1) AS taux_reussite
FROM    inscription AS i
        JOIN certification AS c USING (id_certification)
GROUP BY c.id_certification, c.libelle
HAVING  COUNT(*) >= 5
ORDER BY taux_reussite DESC;`
      },
      {
        fichier: 'index.php',
        langage: 'php',
        description: "Connexion PDO et affichage des inscriptions.",
        source: `<?php
$pdo = new PDO(
    'mysql:host=localhost;dbname=parcours_certifs;charset=utf8mb4',
    'root',
    '',
    [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]
);

$sql = 'SELECT a.nom, a.prenom, c.libelle, i.statut
        FROM inscription i
        JOIN apprenant a USING (id_apprenant)
        JOIN certification c USING (id_certification)
        WHERE i.statut = :statut
        ORDER BY a.nom';

$stmt = $pdo->prepare($sql);
$stmt->execute([':statut' => 'en_cours']);

foreach ($stmt as $ligne) {
    printf(
        "%s %s — %s (%s)\\n",
        htmlspecialchars($ligne['prenom']),
        htmlspecialchars($ligne['nom']),
        htmlspecialchars($ligne['libelle']),
        $ligne['statut']
    );
}`
      }
    ]
  }
};
