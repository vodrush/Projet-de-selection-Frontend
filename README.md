# Projet Carambar & Co - Application de Blagues

Bienvenue sur le projet de mini-application de blagues Carambar & Co ! Ce projet a été réalisé dans le cadre de la sélection CDA et consiste en une application web full-stack permettant d'afficher des blagues de manière aléatoire.

## 🚀 Liens Rapides

- **Documentation de l'API (Swagger) :** []
- **Dépôt GitHub (Frontend) :** `[]`
- **Dépôt GitHub (Backend) :** `[]`
- **Application Frontend Déployée (GitHub Pages) :** `[]`
- **API Backend Déployée (Render) :** `[]`

---

## 📋 Cahier des Charges

Le projet respecte le cahier des charges initial :

- **Landing Page** stylisée aux couleurs de la marque.
- **API versionnée** (`/api/v1/`).
- **4 endpoints** pour la gestion des blagues.
- Environnement **Node.js, Express, Sequelize & SQLite**.
- Approche **MVC** pour le backend.
- **API documentée** avec Swagger.

---

## 🛠️ Installation et Lancement en Local

Pour lancer ce projet sur votre machine, suivez ces étapes.

### Prérequis

- [Node.js](https://nodejs.org/)
- Un gestionnaire de paquets comme `npm`

### 1. Backend (Le serveur API)

Ouvrez un premier terminal à la racine du projet :

```bash
# Allez dans le dossier du backend
cd backend

# Installez les dépendances
npm install

# Lancez le serveur de développement
npm start
```

Le serveur sera accessible à l'adresse `http://localhost:3000`.

### 2. Frontend (L'application React)

Ouvrez un second terminal à la racine du projet :

```bash
# Allez dans le dossier du frontend
cd frontend

# Installez les dépendances
npm install

# Lancez le serveur de développement
npm run dev
```

L'application web sera accessible à l'adresse indiquée dans le terminal (généralement `http://localhost:5173`).

---

## 📚 Documentation de l'API

L'API est documentée via Swagger UI. Une fois le serveur backend lancé, vous pouvez accéder à la documentation interactive directement dans votre navigateur à l'adresse suivante :

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Vous y trouverez la liste de tous les endpoints, les schémas de données, et vous pourrez même tester les routes directement depuis l'interface.
