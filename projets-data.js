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
     code [{ fichier, langage, statut, description, source, explication [],
             capture { src, alt, legende } }]
       statut : 'projet'    → extrait réel du projet rendu
                'evolution' → piste proposée, NON intégrée au projet
       capture : écran produit par l'extrait, affiché au-dessus du code.
                 Si l'image n'existe pas encore, elle est simplement masquée.

   Présentation orale (10 min) : 1 ou 2 extraits par projet, 3 points
   d'explication maximum par extrait.

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
        texte: "Les valeurs sont saisies directement dans la configuration de chaque graphique : aucun serveur n'est nécessaire et la page s'ouvre telle quelle. En contrepartie, changer un chiffre oblige à modifier le code — d'où la première piste d'amélioration."
      },
      {
        titre: 'Texte injecté avec textContent',
        texte: "La fiche d'information lit les attributs data-* de la carte cliquée et les affiche avec textContent, qui n'interprète pas le HTML : le contenu ne peut pas insérer de balises dans la page."
      }
    ],
    tags: ['Chart.js', 'JavaScript', 'HTML5', 'CSS3', 'DataViz'],
    pistes: [
      'Servir les chiffres depuis une base MySQL grâce à une petite API PHP',
      'Indiquer la source de chaque chiffre sous son graphique',
      'Figer la version de Chart.js chargée depuis le CDN (ex. chart.js@4.4.1) et ajouter un contrôle d\'intégrité',
      'Rendre les cartes d\'information utilisables au clavier (balise <button>, fermeture avec Échap)'
    ],
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
        capture: {
          src: 'images/projets/dataviz-barres.jpg',
          alt: "Graphique en barres « Évolution du nombre de réserves » : 12 réserves en 2015, 18 en 2020, 24 en 2025",
          legende: "Le graphique dessiné par ce code, dans la vue principale de DataViz."
        },
        explication: [
          "new Chart(canvas, config) dessine le graphique dans la balise <canvas id=\"barChart\"> de la page.",
          "data.labels donne les années de l'axe horizontal ; datasets[0].data contient les valeurs, dans le même ordre.",
          "beginAtZero fait partir l'axe vertical de 0, pour ne pas exagérer visuellement l'écart entre les barres."
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
        capture: {
          src: 'images/projets/moncaillou-inscription.png',
          alt: "Écran « Créer un compte » de l'application Mon Caillou : nom, prénom, e-mail, téléphone, mot de passe et confirmation",
          legende: "Écran « Créer un compte » : le mot de passe saisi ici n'est jamais enregistré en clair."
        },
        explication: [
          "L'attribut serveur est de type ServeurComptes (une interface) : le Repository fonctionne aussi bien avec Neon qu'avec le faux serveur des tests (polymorphisme).",
          "deriver() calcule l'empreinte PBKDF2 du mot de passe avec un sel et 64 000 itérations ; elle est private static, donc invisible pour les écrans (encapsulation).",
          "Le bloc finally efface le mot de passe de la mémoire (Arrays.fill), même si le calcul échoue."
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
        capture: {
          src: 'images/projets/moncaillou-lieux-a-dormir.png',
          alt: "Page « Lieux à dormir » de Mon Caillou avec les familles Hôtels, Gîtes / Tribus et Campings",
          legende: "Page « Lieux à dormir » : chaque hébergement est rangé dans sa famille par cette énumération."
        },
        explication: [
          "Une énumération limite les familles à trois valeurs connues : impossible d'écrire « Hotel » au lieu de HOTEL sans erreur de compilation.",
          "classer() s'appuie sur le type et le nom réunis, car le type fourni par les données est souvent absent ou imprécis.",
          "normaliser() retire les accents et passe en minuscules : la recherche « gite » trouve aussi « Gîte »."
        ]
      }
    ]
  },

  /* ---------------------------------------------------------- */
  parcours: {
    titre: 'Parcours certifs',
    badge: 'Web · PHP / MySQL',
    categorie: 'web',
    accroche: "Plateforme de suivi des certifications (Pix, Cisco, Cyber, Back-end, DCC) : comptes élèves et professeurs, inscriptions et progression enregistrées dans une base MySQL.",
    image: null,
    lien: { url: 'http://100.112.110.70/~etud2-04/parcours-certifs/', label: 'Ouvrir le projet', externe: true },
    depot: null,
    meta: [
      { cle: 'Contexte',     valeur: 'Projet SLAM — BTS SIO' },
      { cle: 'Période',      valeur: '2026' },
      { cle: 'Architecture', valeur: 'Pages HTML/JS → API PHP (JSON) → base MySQL' },
      { cle: 'Technologies', valeur: 'PHP 8, MySQL, PDO, JavaScript, HTML/CSS' },
      { cle: 'Hébergement',  valeur: 'Développé sous XAMPP, puis mis en ligne (compte etud2-04)' }
    ],
    objectif: "Permettre aux élèves de s'inscrire aux certifications et de suivre leur progression, et aux professeurs de voir l'avancement de tous les élèves, depuis une même plateforme reliée à une base de données.",
    contexte: [
      "Le site est découpé en trois parties : des pages HTML (dossier pages/) pour l'interface, des scripts PHP (dossier api/) qui lisent et écrivent dans la base puis répondent en JSON, et une base MySQL avec trois tables : users, certifications et inscriptions.",
      "La page d'accueil, index.php, est générée côté serveur : elle affiche directement les certifications actives lues en base.",
      "Une partie des règles métier est confiée à la base elle-même : des triggers fixent le statut des inscriptions et des vues préparent les requêtes de lecture.",
      "Une première version de l'interface avait été réalisée en Angular avec des données d'exemple ; cette version-ci fonctionne avec une vraie base de données."
    ],
    fonctionnalites: [
      "Création de compte et connexion ; mot de passe haché avec un sel propre à chaque compte",
      "Choix de l'espace à la connexion : professeur ou élève",
      "Catalogue des certifications chargé depuis la base, avec recherche par mot clé",
      "Inscription à une certification avec date souhaitée et commentaire",
      "Espace élève : certifications suivies et barre de progression pour chacune",
      "Espace professeur : tableau des élèves (classe, certifications, progression moyenne, statut) filtrable par nom et par statut, avec compteurs",
      "Profil modifiable : nom, prénom, e-mail, téléphone, classe, genre",
      "Page view_database.php : statistiques de la plateforme lues dans une vue SQL"
    ],
    choix: [
      {
        titre: 'Requêtes préparées',
        texte: "Chaque requête qui reçoit une donnée saisie passe par prepare() et des paramètres nommés (:username, :uid…). Les valeurs ne sont jamais collées dans le texte SQL : une saisie malveillante ne peut pas modifier la requête."
      },
      {
        titre: 'Règles métier dans la base',
        texte: "Des triggers garantissent qu'une inscription démarre « en cours » à 0 % et passe à « obtenu » à 100 %. La règle s'applique quelle que soit la page ou l'API qui modifie la ligne, sans être recodée en PHP."
      },
      {
        titre: 'Vues pour la lecture',
        texte: "Les jointures et les calculs (progression moyenne, compteurs) sont enregistrés dans des vues. Le PHP lit ensuite vue_mes_inscriptions ou vue_stats comme une simple table."
      },
      {
        titre: 'API JSON au format unique',
        texte: "Chaque script du dossier api/ répond { ok, msg, … } avec un code HTTP adapté (401 identifiants incorrects, 405 méthode non autorisée). Côté navigateur, apiCall() traite toutes les réponses de la même façon."
      },
      {
        titre: 'Erreurs techniques cachées',
        texte: "Dans les pages PHP et les fonctions de connexion, une erreur de base affiche un message neutre au visiteur. Le détail (code SQLSTATE, utilisateur MySQL…) est écrit dans les logs du serveur avec error_log()."
      }
    ],
    tags: ['PHP', 'MySQL', 'SQL', 'JavaScript', 'HTML/CSS', 'XAMPP'],
    pistes: [
      "Passer à password_hash() / password_verify() : un algorithme volontairement lent (bcrypt ou Argon2), plus adapté aux mots de passe que SHA-256",
      "Identifier l'utilisateur côté serveur avec une session PHP : aujourd'hui l'API fait confiance à l'identifiant envoyé par le navigateur (en-tête X-User-Id ou cookie)",
      "Contrôler le rôle côté serveur : l'accès à l'espace professeur n'est vérifié que dans le navigateur",
      "Échapper les textes venant de la base avant de les insérer avec innerHTML dans les espaces élève et professeur",
      "Ajouter un écran pour mettre à jour la progression d'un élève (elle ne change aujourd'hui que directement en base)",
      "Utiliser la vue vue_eleves_certifs dans l'API de l'espace professeur, qui refait encore la jointure complète"
    ],
    code: [
      {
        fichier: 'database.sql · triggers',
        langage: 'sql',
        statut: 'projet',
        description: "Deux des trois triggers de la base : ils fixent le statut et la progression d'une inscription, quelle que soit la page qui modifie la ligne.",
        source: `DELIMITER $$

DROP TRIGGER IF EXISTS trg_inscription_init$$

CREATE TRIGGER trg_inscription_init
BEFORE INSERT ON inscriptions
FOR EACH ROW
BEGIN
    SET NEW.statut      = 'en_cours';
    SET NEW.progression = 0;
END$$

DROP TRIGGER IF EXISTS trg_progression_statut$$

CREATE TRIGGER trg_progression_statut
BEFORE UPDATE ON inscriptions
FOR EACH ROW
BEGIN
    IF NEW.progression >= 100 AND NEW.statut != 'echec' THEN
        SET NEW.statut     = 'obtenu';
        SET NEW.progression = 100;
    ELSEIF NEW.progression < 100 AND OLD.statut = 'obtenu' THEN
        SET NEW.statut = 'en_cours';
    END IF;
END$$

DELIMITER ;`,
        capture: {
          src: 'images/projets/parcours-triggers.jpg',
          alt: "Espace élève, « Mes inscriptions & progressions » : Certification Pix 100 %, Certification CISCO 45 %, Certification Cyber 0 %",
          legende: "Espace élève (base de test) : Cyber vient d'être ajoutée et démarre à 0 %. Pix a reçu 120 % : le trigger l'a ramenée à 100 % et passée « obtenu »."
        },
        explication: [
          "trg_inscription_init (BEFORE INSERT) : toute nouvelle inscription démarre « en_cours » à 0 %, même si la requête envoie une autre valeur.",
          "trg_progression_statut (BEFORE UPDATE) : à 100 % ou plus, le statut passe à « obtenu » et la progression est plafonnée à 100 ; si elle redescend, le statut revient à « en_cours ».",
          "DELIMITER $$ change le séparateur, car le corps d'un trigger contient des « ; ». Le troisième trigger, non montré, supprime les inscriptions d'une certification désactivée."
        ]
      },
      {
        fichier: 'auth.php',
        langage: 'php',
        statut: 'projet',
        description: "Hachage salé du mot de passe et vérification à la connexion (extrait).",
        source: `// Génère un sel aléatoire (suite de caractères unique par utilisateur)
function generateSalt(): string
{
    return bin2hex(random_bytes(SALT_BYTES));
}

// Hache le mot de passe en le combinant avec le sel
function hashPassword(string $password, string $salt): string
{
    return hash('sha256', $password . $salt);
}

// … registerUser() (création du compte)

// Vérifie les identifiants d'un utilisateur
// Retourne le tableau utilisateur si ok, ou false
function loginUser(string $username, string $password): array|false
{
    try {
        $db   = getDB();
        $stmt = $db->prepare('SELECT * FROM users WHERE username = :username');
        $stmt->execute([':username' => $username]);
        $user = $stmt->fetch();

        if (!$user) {
            return false;
        }

        $tentative = hashPassword($password, $user['salt']);

        if (hash_equals($user['password_hash'], $tentative)) {
            return $user;
        }

        return false;

    } catch (PDOException $e) {
        error_log('[loginUser] ' . $e->getMessage());
        return false;
    }
}`,
        capture: {
          src: 'images/projets/parcours-connexion.jpg',
          alt: "Formulaire « Se connecter » de Parcours certifs avec le choix Admin, Professeurs ou Élèves",
          legende: "Page de connexion : loginUser() vérifie le mot de passe saisi dans ce formulaire."
        },
        explication: [
          "Le mot de passe n'est jamais enregistré : la table users garde un sel aléatoire propre à chaque compte et l'empreinte SHA-256 de « mot de passe + sel ».",
          "À la connexion, loginUser() recalcule l'empreinte et la compare avec hash_equals(), dont la durée ne révèle pas où les deux chaînes diffèrent.",
          "Le nom saisi passe par une requête préparée (:username) : une saisie malveillante ne peut pas modifier la requête SQL."
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
    lien: { url: 'http://100.112.110.70/~etud2-04/parcours-certifs/', label: 'Ouvrir le projet', externe: true },
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
