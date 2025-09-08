import UrlShortener from "./UrlShortener";
import StaticsPage from "./Statics";
import { useState } from "react";
import './App.css';

function App() {
  const [showingStatics, setShowingStatics] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>URL SHORTENER</h1>
        <nav className="app-nav">
          <h2
            className={!showingStatics ? 'nav-item active' : 'nav-item'}
            onClick={() => setShowingStatics(false)}
          >
            SHORTEN URL
          </h2>
          <h2
            className={showingStatics ? 'nav-item active' : 'nav-item'}
            onClick={() => setShowingStatics(true)}
          >
            STATISTICS
          </h2>
        </nav>
      </header>
      <main className="app-content">
        {showingStatics ? <StaticsPage /> : <UrlShortener />}
      </main>
    </div>
  );
}

export default App;