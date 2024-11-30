// src/App.js
import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Opener from './pages/opener/opener';
import PrivateView from './context/privateView';
import { HomePage } from './pages/home/home.page';
import { LeagueCreator } from './pages/reservedPages/creators/leagueCreator';
import StatsPage from './pages/stats/stats.page';
import EventsPage from './pages/events/events.page';
import LoginPage from './pages/login/login.page';
import { EventCreator } from './pages/reservedPages/creators/eventCreator';
import { Event } from './pages/singleEvent';
import LeaguesPage from './pages/leagues/leagues.page';
import { Manage } from './pages/reservedPages/managers/manage';
import { Single } from './pages/single/single';
import MaintenancePage from './pages/maintenance/maintenace';
import { Ranking } from './pages/ranking/ranking';
import { ContactsPage } from './pages/contacts/contacts';

function App() {
  const isUnderMaintenance = false; // Set this to true to enable maintenance mode

  return (
    <div className="App">
      <Helmet>
        <title>Lega Pauper Livorno</title>
        <meta name="description" content="Benvenuto nella Lega Pauper Livorno. Scopri eventi, leghe, e tanto altro!" />
        <meta name="keywords" content="Lega Pauper, tornei, eventi, leghe" />
      </Helmet>
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            {isUnderMaintenance ? (
              <Route path="*" element={<MaintenancePage />} />
            ) : (
              <>
                <Route path="/" element={<Opener />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/league" element={<LeaguesPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/stats" element={<StatsPage />} />
                <Route path="/contacts" element={<ContactsPage />} />
                <Route path="/event/:name" element={<Event />} state={{type: 'someType', id: '12345' }} />
                {/* <Route path="/event/:type/:id" element={<Event />} /> */}
                <Route path="/rank/:type/:id" element={<Ranking />} />
                <Route path="/creation/league" element={<PrivateView component={<LeagueCreator />} />} />
                <Route path="/creation/event" element={<PrivateView component={<EventCreator />} />} />

                <Route path="/event/:event/:stage" element={<Single />} state={{eventId: 'id', stageNumber: 'stageNumber' }}/>
                <Route path="/creation/:event/:stage" element={<PrivateView component={<Manage />} state={{eventId: 'id', stageNumber: 'stageNumber' }}/>} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
