import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [blague, setBlague] = useState(null);
  const [statut, setStatut] = useState('initial');
  const [reponseVisible, setReponseVisible] = useState(false);
  const [stats, setStats] = useState(null);
  const [boutonTexte, setBoutonTexte] = useState('🎲 Raconte-moi une blague');
  const [menuOuvert, setMenuOuvert] = useState(false);

  const textesBouton = [
    '🎲 Raconte-moi une blague',
    '✨ Tire une blague',
    '📜 Ouvre le papier',
    '😂 Fais-moi rire',
  ];

  useEffect(() => {
    fetch('https://carambar-api-at3c.onrender.com/api/v1/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => setStats(null));
  }, []);

  const recupererBlague = () => {
    setStatut('chargement');
    setBlague(null);
    setReponseVisible(false);

    fetch('https://carambar-api-at3c.onrender.com/api/v1/blagues/aleatoire')
      .then(res => {
        if (!res.ok) throw new Error('Reponse reseau non ok');
        return res.json();
      })
      .then(data => {
        setBlague(data);
        setStatut('succes');
        const nouveauTexte = textesBouton[Math.floor(Math.random() * textesBouton.length)];
        setBoutonTexte(nouveauTexte);
      })
      .catch(() => {
        setStatut('erreur');
      });
  };

  const copierBlague = () => {
    if (!blague) return;
    const texteACopier = `${blague.question}\n${blague.reponse}`;
    navigator.clipboard.writeText(texteACopier);
  };

  return (
    <div className="page-container">
      <header>
        <div className="header-content">
          <a href="#" className="logo">Carambar & co</a>
          <nav className={menuOuvert ? 'nav-ouverte' : ''}>
            <a href="#api" onClick={() => setMenuOuvert(false)}>API</a>
            <a href="https://carambar-api-at3c.onrender.com/api-docs" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOuvert(false)}>Swagger</a>
            <a href="#" onClick={() => setMenuOuvert(false)}>GitHub</a>
          </nav>
          <span className="slogan">La bonne humeur, en un clic.</span>
          <button 
            className={`bouton-hamburger ${menuOuvert ? 'ouvert' : ''}`}
            onClick={() => setMenuOuvert(!menuOuvert)}
            aria-label="Ouvrir le menu de navigation"
          >
            <div className="barre"></div>
            <div className="barre"></div>
            <div className="barre"></div>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="contenu-centre">
            <h1>La blague du jour ? Clique et souris.</h1>
            <p>Notre mini-app puise ses blagues dans une API maison (Node/Express/SQLite).</p>
            <button onClick={recupererBlague} className="cta-principal" aria-label="Afficher une blague aléatoire">
              {boutonTexte}
            </button>
            <small>Chaque clic affiche une blague aléatoire provenant de l’endpoint /blagues/aleatoire.</small>
          </div>
        </section>

        <section className="blague-zone">
          <div className="contenu-centre">
            <div className="carte-blague">
              {statut === 'initial' && <p>Prêt ? Appuie sur le bouton pour révéler une blague.</p>}
              {statut === 'chargement' && <p>On fouille le paquet…</p>}
              {statut === 'erreur' && <p>Oups, le paquet est vide. Réessaie !</p>}
              {statut === 'succes' && blague && (
                <>
                  <p className="question">{blague.question}</p>
                  {reponseVisible ? (
                    <p className="reponse">{blague.reponse}</p>
                  ) : (
                    <button onClick={() => setReponseVisible(true)} className="cta-secondaire">Voir la chute</button>
                  )}
                  <div className="actions-secondaires">
                    <button onClick={recupererBlague}>Nouvelle blague</button>
                    <button onClick={copierBlague}>Copier</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <section className="bandeau-api" id="api">
        <div className="contenu-centre">
          <h2>Sous le papier, il y a l’API.</h2>
          <div className="etapes">
            <div>
              <h3>Front léger</h3>
              <p>Une page statique (GitHub Pages)</p>
            </div>
            <div>
              <h3>API versionnée</h3>
              <p>Node + Express + Sequelize + SQLite</p>
            </div>
            <div>
              <h3>Endpoint random</h3>
              <p>/blagues/aleatoire → une surprise à chaque clic</p>
            </div>
          </div>
          <a href="https://carambar-api-at3c.onrender.com/api-docs" target="_blank" rel="noopener noreferrer" className="lien-swagger">
            Voir la doc Swagger
          </a>
        </div>
      </section>

      <section className="section-endpoints">
        <div className="contenu-centre">
          <h2>Vous avez une blague caramélisée ? Ajoutez-la via Postman.</h2>
          <ul>
            <li><code>POST /blagues</code> → Ajouter une blague en BDD</li>
            <li><code>GET /blagues</code> → Consulter toutes les blagues</li>
            <li><code>GET /blagues/:id</code> → Consulter une blague précise</li>
            <li><code>GET /blagues/aleatoire</code> → Obtenir une blague au hasard</li>
          </ul>
          <p>La doc complète (schémas, modèles, exemples) est sur Swagger.</p>
        </div>
      </section>

      <section className="section-stats">
        <div className="contenu-centre">
          {stats ? (
            <p>
              <strong>{stats.blaguesEnBdd}</strong> Blagues en BDD | 
              <strong> {stats.requetesAujourdhui}</strong> Requêtes aujourd'hui | 
              <strong> {stats.uptime}</strong> Uptime
            </p>
          ) : (
            <p>Stats indisponibles — on répare le distributeur de blagues.</p>
          )}
        </div>
      </section>

      <section className="section-faq">
        <div className="contenu-centre">
          <h2>FAQ</h2>
          <div>
            <h4>C’est gratuit ?</h4>
            <p>Oui. Aucune inscription nécessaire pour lire une blague.</p>
          </div>
          <div>
            <h4>Je peux proposer une blague ?</h4>
            <p>Oui, via <code>POST /blagues</code> (voir Swagger).</p>
          </div>
          <div>
            <h4>Puis-je l’utiliser sur mobile ?</h4>
            <p>Oui, la page est responsive.</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="contenu-centre">
          <p>Carambar & co © 2025 — Mentions légales — Politique de cookies</p>
          <p>
            <a href="#">Repo Front (GitHub)</a> | 
            <a href="#">Repo Back (GitHub)</a> | 
            <a href="https://carambar-api-at3c.onrender.com/api-docs" target="_blank" rel="noopener noreferrer">Swagger API</a> | 
            <a href="#">Render (API déployée)</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;