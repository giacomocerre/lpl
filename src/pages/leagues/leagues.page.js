import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getLeagues } from "../../firebase/api/events.api";
import { Navbar } from "../../components/navbar/navbar";
import { encryptId, getEventStatus, getRandomImage } from "../../utils/utils";
import Loader from "../../components/loader/loader";
import { Link } from "react-router-dom";

const LeaguesPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getLeagues();
        // Sort events by dateStart in descending order (most recent first)
        const sortedEvents = eventsData.sort((a, b) => {
          const dateA = new Date(a.dateStart);
          const dateB = new Date(b.dateStart);
          return dateB - dateA; // Descending order (most recent first)
        });
        setEvents(sortedEvents);
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
      <Loader/>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg font-semibold text-red-500">
        Errore: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Leghe - Lega Pauper Livorno</title>
        <meta name="description" content="Discover all the leagues and past stages of Lega Pauper Livorno. Click on a league to see details and lists of each stage." />
        <meta name="keywords" content="leagues, Lega Pauper, tournaments, events" />
      </Helmet>
      <Navbar item={"league"} />
      <div className="p-10 md:p-20 rounded-lg mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Le Nostre Leghe</h1>
        <p className="mt-4 text-gray-600">
          Scopri tutte le leghe e le tappe passate. Clicca su una lega per
          vedere i dettagli e le liste di ogni tappa.
        </p>

        {events.length === 0 ? (
          <p className="text-center text-gray-500 mt-6">
            Nessuna lega trovata. Riprova più tardi!
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {events.map((event) => (
              <Link to={"/event/"+event.urlName} state={{type: event.type+"", id: event.id }}>
              <div
                key={event.id}
                style={{
                  backgroundImage: `url(${getRandomImage()})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="relative cursor-pointer bg-gray-100 px-5 py-12 rounded-lg shadow hover:bg-gray-200 transition-colors"
              >
                <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
                <div className="relative z-10 flex justify-between items-center">
                  <span className="text-md font-medium md:text-lg text-white">
                    {event.name}
                  </span>
                </div>
                <span className="text-white z-90">{event.dateEnd.split('-')[0]}</span>
                <span
                  className={`text-sm absolute bottom-2 right-2 ${
                    getEventStatus(event.dateEnd).includes("In Corso")
                      ? "bg-green-600 px-2 py-1 text-xs rounded-full text-white"
                      : "bg-red-600 px-2 py-1 text-xs rounded-full text-white"
                  }`}
                >
                  {getEventStatus(event.dateEnd)}
                </span>
              </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaguesPage;
