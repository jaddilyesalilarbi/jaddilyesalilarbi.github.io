# ⚡ GITHUB SETUP — Jadd Engineering Portfolio

## 1️⃣ CRÉER LE REPO

Sur GitHub.com :
- **New Repository**
- **Name** : `portfolio` (ou `jadd-engineering`)
- **Description** : Mechanical Engineer | Structural & Composite Engineering
- **Public** (pour montrer le code)
- **.gitignore** : Node
- Pas de README pour l'instant (on le crée)

**URL finale** : `https://github.com/jadd-ilyes/portfolio`

---

## 2️⃣ CLONER EN LOCAL

```bash
cd ~/Documents/Engineering\ Consulting
git clone https://github.com/jadd-ilyes/portfolio.git
cd portfolio
```

---

## 3️⃣ STRUCTURE INITIALE

Créer cette arborescence :

```
portfolio/
├── index.html                 # Page unique
├── styles.css                 # CSS monolithique
├── script.js                  # JS - logique générale
├── data.js                    # ← ICI : données structurées
├── assets/
│   ├── images/               # Logo, photos projets
│   ├── icons/                # SVG icons
│   └── cv-source.html        # Sauvegarde du CV source (ref)
├── .gitignore
├── README.md
├── CHANGELOG.md
└── .claude/
    └── config.toml           # Config Claude Code (optional)
```

---

## 4️⃣ .GITIGNORE

Créer `.gitignore` à la racine :

```
node_modules/
.DS_Store
.env
.env.local
.claude/
*.log
tmp/
dist/
build/
```

---

## 5️⃣ COMMITS INITIAUX

```bash
# Ajouter les fichiers existants du site
cp ~/Documents/Engineering\ Consulting/index.html .
cp ~/Documents/Engineering\ Consulting/styles.css .
cp ~/Documents/Engineering\ Consulting/script.js .

# Créer data.js vide (on le remplit après)
touch data.js

# Première commit
git add .
git commit -m "chore: initial portfolio structure

- Add existing HTML/CSS/JS foundation
- Set up project structure for data-driven site
- Ready for content integration

Co-Authored-By: Claude Sonnet <noreply@anthropic.com>"

# Push
git push -u origin main
```

---

## 6️⃣ CRÉER BRANCHE DEV (pour itérations)

```bash
git checkout -b dev
git push -u origin dev
```

À partir de maintenant :
- Travailler sur `dev`
- Merger vers `main` quand prêt
- `main` = version "en production"

---

## 7️⃣ OPTIONNEL : Claude Code Config

Créer `.claude/config.toml` :

```toml
[github]
# Token : Settings → Developer settings → Personal access tokens → Generate
# Scope : repo (full control)
token = "your_github_token_here"
repo = "jadd-ilyes/portfolio"

[claude-code]
auto_commit = true
commit_prefix = "feat|fix|docs|style|refactor|perf|chore"
branch = "dev"
```

---

## ✅ C'EST PRÊT

Une fois fait, tu peux :
- Accéder au repo sur GitHub
- Me confirmer le lien
- On continue avec **data.js + site integration**

Questions ?
