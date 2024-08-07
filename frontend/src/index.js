import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import PlayersPage from './PlayersPage';
import PlayerNamePage from './PlayerNamePage';
import HistoryPage from './HistoryPage';
import GamePage from './GamePage';

//Creaters the root container
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderizar la aplicación con el enrutador
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/playerName" element={<PlayerNamePage />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

