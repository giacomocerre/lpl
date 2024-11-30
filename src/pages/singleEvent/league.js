import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { getEventById } from "../../firebase/api/events.api";
import { Navbar } from "../../components/navbar/navbar";
import IMG from "../../assets";
import { Stage } from "../../components/stage/stage";
import { SectionHead } from "../../components/sectionHead/sectionHead";
import { getEventStatus } from "../../utils/utils";
import Loader from "../../components/loader/loader";
import { Link } from "react-router-dom";

export const League = ({ id }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [urlType, setUrlType] = useState("info");

  const fetchEvent = useCallback(async () => {
    if (!id) return;
    try {
      const eventData = await getEventById(id);
      setEvent(eventData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);


  if (loading) return <Loader/>;
  if (error) return (
    <div>
      <p>Error: {error}</p>
      <button onClick={fetchEvent}>Retry</button>
    </div>
  );

  return (
    <div>
      <Helmet>
        <title>{event.name} - Lega Pauper Livorno</title>
        <meta name="description" content={`Dettagli dell'evento ${event.name} con le tappe e le classifiche.`} />
        <meta name="keywords" content={`lega, torneo, ${event.name}, Lega Pauper Livorno`} />
      </Helmet>
      <Navbar item={id} />
      <div className="p-0 md:p-20 bg-[#f6f6f6]">
        <div className="shadow-md md:rounded-b-xl">
          <SectionHead
            background={IMG.factory}
            title={event.name}
            infoRight={getEventStatus(event.dateEnd)}
          />
          <div className="bg-white rounded-xl p-10">
            <div className="flex flex-wrap space-x-0 sm:space-x-3">
              <button
                className="w-full sm:w-auto p-[3px] relative hover:opacity-85 mb-3 sm:mb-0"
                onClick={() => (window.location.href = `/rank/1/${encodeURIComponent(id)}`)}
                aria-label="View Rankings"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-800 rounded-lg" />
                <div className="px-10 py-3 rounded-[6px] relative group">
                  <div className="flex space-x-3">
                    <p className="text-l text-white">
                      <i className="bi bi-trophy-fill"></i>
                    </p>
                    <h2 className="font-bold text-white text-l">Classifica</h2>
                  </div>
                </div>
              </button>
              <button
                className="w-full sm:w-auto p-[3px] relative hover:opacity-85 mb-3 sm:mb-0"
                onClick={() => (window.location.href = "/stats")}
                aria-label="View Statistics"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-800 rounded-lg" />
                <div className="px-10 py-3 rounded-[6px] relative group">
                  <div className="flex space-x-3">
                    <p className="text-l text-white">
                      <i className="bi bi-pie-chart-fill"></i>
                    </p>
                    <h2 className="font-bold text-white text-l">Statistiche Lega</h2>
                  </div>
                </div>
              </button>
            </div>
            <div className="mt-5">
              <h3 className="my-5 font-bold text-3xl">Le Tappe</h3>
              {event ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {event.stages.map((stage, index) => (
                      <Stage
                        event={event}
                        key={index}
                        stage={stage}
                        final={index === event.stages.length - 1}
                      />
                  ))}
                </div>
              ) : (
                <p>No event found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
