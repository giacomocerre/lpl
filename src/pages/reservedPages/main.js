import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getCurrentUser } from "../../firebase/api/user.api";
import { Table } from "../../components/eventsTable/table";
import { getAllEvents } from "../../firebase/api/events.api";
import { useIsMobile } from "../../utils/utils";

const ReservedArea = () => {
  const [userData, setUserData] = useState(null);
  const [events, setEvents] = useState([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        console.log(userData);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const eventsList = await getAllEvents();
        const currentDate = new Date();

        const sortedEvents = !isMobile
          ? eventsList
              .map(event => ({
                name: event.name,
                id: event.id,
                type: event.type,
                status: new Date(event.dateEnd) > currentDate,
                dateStart: event.dateStart,
                dateEnd: event.dateEnd,
              }))
              .sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart))
          : eventsList
              .map(event => ({
                name: event.name,
                type: event.type,
                id: event.id
              }))
              .sort((a, b) => new Date(b.dateStart) - new Date(a.dateStart));

        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchUserData();
    fetchEvents();
  }, [isMobile]);

  const columns = isMobile
    ? ["Nome"]
    : ["Nome", "Data Inizio", "Data Fine", "Tipo", "Status"];

  return (
    <div>
      <Helmet>
        <title>Area Riservata - Lega Pauper Livorno</title>
        <meta name="description" content="Gestisci eventi e leghe nella tua area riservata." />
        <meta name="keywords" content="area riservata, gestione eventi, Lega Pauper" />
      </Helmet>
      {userData ? (
        <div>
          <h1 className="font-bold text-3xl">
            Ciao,
            <span className="text-yellow-800">
              {userData.nikname
                ? userData.nikname
                : userData.name + " " + userData.surname}
            </span>
          </h1>
          <p className="font-normal text-xl">
            Benvenuto nell'area riservata per gestire le informazioni
            all'interno della webapp.
          </p>
          <div className="flex flex-wrap space-x-0 sm:space-x-3 mt-10">
            <button className="w-full sm:w-auto p-[3px] relative hover:opacity-85 mb-3 sm:mb-0" onClick={() => window.location.href = "/creation/league"}>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-800 rounded-lg " />
              <div className="px-10 py-3 rounded-[6px] relative group">
                <div className="flex space-x-3">
                  <p className="text-l text-white">
                    <i className="bi bi-trophy-fill"></i>
                  </p>
                  <h2 className="font-bold text-white text-l">Nuova Lega</h2>
                </div>
              </div>
            </button>
            <button className="w-full sm:w-auto p-[3px] relative hover:opacity-85 mb-3 sm:mb-0" onClick={() => window.location.href = "/creation/event"}>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-800 rounded-lg " />
              <div className="px-10 py-3 rounded-[6px] relative group">
                <div className="flex space-x-3">
                  <p className="text-l text-white">
                    <i className="bi bi-star-fill"></i>
                  </p>
                  <h2 className="font-bold text-white text-l">Nuovo Evento</h2>
                </div>
              </div>
            </button>
            <button className="w-full sm:w-auto p-[3px] relative mb-3 sm:mb-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg" />
              <div className="px-10 py-3 rounded-[6px] bg-white text-blue-500 hover:text-white relative group transition duration-20 hover:bg-transparent">
                <div className="flex space-x-3">
                  <p className="text-l">
                    <i className="bi bi-pencil-square"></i>
                  </p>
                  <h2 className="font-bold text-l">Nuovo Articolo</h2>
                </div>
              </div>
            </button>
          </div>

          <Table
            title="Eventi"
            emptyMessage="Non ci sono ancora tornei o leghe..."
            cols={columns}
            rows={events}
          />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default ReservedArea;
