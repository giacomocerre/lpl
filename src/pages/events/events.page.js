import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getTournaments } from '../../firebase/api/events.api';
import { Navbar } from '../../components/navbar/navbar';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getTournaments();
        setEvents(eventsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-gray-800">Navigando i mari per raccogliere le nuove avventure...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-red-600">Oh no! Qualcosa è andato storto. Codice di errore: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Eventi - Lega Pauper Livorno</title>
        <meta name="description" content="Scopri gli eventi della Lega Pauper Livorno. Resta aggiornato sulle ultime competizioni e avventure." />
        <meta name="keywords" content="eventi, Lega Pauper, tornei, competizioni" />
      </Helmet>
      <Navbar item={"events"} />
      <main className="p-10 md:p-20 bg-[#f6f6f6]">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Eventi</h1>
        {events.length === 0 ? (
          <p className="text-lg text-gray-600">Nessun evento trovato nei nostri archivi. Resta all'erta per nuove scoperte!</p>
        ) : (
          <ul className="list-disc pl-5">
            {events.map(event => (
              <li key={event.id} className="text-lg text-gray-700 mb-2">{event.name}</li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default EventsPage;
