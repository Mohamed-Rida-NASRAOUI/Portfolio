# Portfolio – Mohamed-Rida Nasraoui

Site vitrine statique bilingue (FR/EN), en HTML5, CSS3 et JavaScript natif. Aucune dépendance, aucune donnée collectée.

## Structure
- `index.html` : le contenu (en français)
- `css/style.css` : le design et les animations
- `js/script.js` : menu mobile, bascule FR/EN (objet `EN` = textes anglais), effets
- `assets/images/` : photo et captures · `assets/cv/` : le CV en PDF

## Tester en local
VS Code > ouvrir le dossier > clic droit sur `index.html` > « Open with Live Server ».

## Publier sur GitHub Pages
1. Crée un dépôt public sur github.com, puis dans le dossier : `git init`, `git add .`, `git commit -m "V1"`, `git branch -M main`, `git remote add origin https://github.com/TON-PSEUDO/portfolio.git`, `git push -u origin main`.
2. Dépôt > Settings > Pages > Branch `main`, dossier `/ (root)` > Save.
3. Le site est en ligne à `https://TON-PSEUDO.github.io/portfolio/` après 1 à 2 minutes.

## Ajouter un projet avec ses liens
1. **Mets le projet sur GitHub** : un dépôt par projet, avec un `README.md` (objectif, technologies, comment le lancer, une capture). C’est ce lien qu’un recruteur ouvrira.
2. **Copie le modèle** : dans `index.html`, section Projets, il y a un bloc `<article class="card">` en commentaire. Copie-le sous les autres, supprime les marqueurs `<!--` et `-->`.
3. **Remplis le contenu** : titre, 1 à 2 phrases (objectif + ce que *toi* tu as fait), technologies dans `<p class="meta">`.
4. **Mets les liens** dans `<p class="links">` :
   - Code source : `https://github.com/TON-PSEUDO/nom-du-depot`
   - Démo en ligne (si le projet est un site, activer GitHub Pages sur son dépôt) : `https://TON-PSEUDO.github.io/nom-du-depot/`
   - Rapport ou présentation : mets le PDF dans `assets/` puis `href="assets/rapport.pdf"`
   - Garde `target="_blank" rel="noopener"` pour les liens externes. Supprime les liens qui n’existent pas encore.
5. **Traduis en anglais** : donne des clés uniques aux textes (`data-i18n="p3.t"`, `p3.d`, etc.) et ajoute-les dans l’objet `EN` de `js/script.js` : `"p3.t":"Project title","p3.d":"Goal, what I did, result.",`
6. **Ajoute une capture (optionnel)** : place l’image dans `assets/images/` (JPG ou WebP, moins de 300 Ko) et ajoute dans la carte : `<img src="assets/images/projet.jpg" alt="Description utile de la capture" loading="lazy" width="800" height="450">`.
7. **Publie la mise à jour** : `git add .`, `git commit -m "Ajout du projet X"`, `git push`. Recharge le site avec Ctrl+F5.

## Astuces
- Teste chaque lien après publication : aucun lien provisoire ou cassé (critère du cahier des charges).
- Mets 3 à 4 projets qui comptent plutôt que beaucoup de petits.
- Décris ta contribution réelle avec des verbes justes (réalisé, participé, analysé) et n’invente pas de chiffres.
- Ne publie jamais de données confidentielles (clients, mots de passe, clés API, captures internes). Ajoute-les à `.gitignore` si besoin.
- Pense à un `README` clair sur chaque dépôt projet : c’est souvent lu avant le portfolio.
- Mets le lien du portfolio sur ton CV et ton LinkedIn (section Coordonnées et « À propos »).
- Remplace la photo en gardant le nom `assets/images/photo.jpg` (format carré, environ 560 × 560 px).
- Les couleurs se changent en haut de `css/style.css` (variables `--accent`, `--accent2`, `--bg`).

## Avant publication
- Ajouter l’URL GitHub dans Contact et les liens des projets.
- Compléter la section Engagement (Linkee) ou la supprimer.
- Valider les niveaux de compétences et les textes FR/EN.
- Vérifier que le CV dans `assets/cv/` est à jour.
