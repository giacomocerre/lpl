import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "react-router-dom";
import { Navbar } from "../../components/navbar/navbar";
import { getEventById, getStage } from "../../firebase/api/events.api";
import { ListBox } from "../../components/listBox/listBox";
import { List } from "../../components/list/list";
import Loader from "../../components/loader/loader";

export const Single = () => {
  const location = useLocation();
  const { eventId, stageNumber } = location.state || {}; // default to empty object if state is not found

  const [stage, setStage] = useState(null);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      console.log(eventId, stageNumber)
      try {
        const fetchedStage = await getStage(eventId, stageNumber);
        const fetchedEvent = await getEventById(eventId);
        setStage(fetchedStage);
        setEvent(fetchedEvent);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, stageNumber]);

  if (loading) return <Loader/>;
  if (error) return (
    <div>
      <p>Error: {error}</p>
      <button onClick={() => setLoading(true)}>Retry</button>
    </div>
  );

  const isFinalStage = stageNumber === event.stages.length.toString();

  return (
    <div>
      <Helmet>
        <title>{event ? `${event.name} - Tappa ${isFinalStage ? "Finale" : stageNumber}` : "Dettagli Evento"}</title>
        <meta name="description" content={`Dettagli della tappa ${stageNumber} per l'evento ${event ? event.name : ""}.`} />
        <meta name="keywords" content="tappa, evento, leghe, Lega Pauper" />
      </Helmet>
      <Navbar item={eventId} />
      <div className="p-5 md:p-20 bg-[#f6f6f6]">
        <div className="mt-10 md:mt-0">
          <p>{event.dateStart}</p>
          <h1 className="font-bold text-2xl">{event.name} - Tappa {isFinalStage ? "Finale" : stageNumber}</h1>
          <h3>Top 8</h3>
        </div>
        <div>
          {selectedPlayer && <List onClose={() => setSelectedPlayer(null)} player={selectedPlayer} />}
          {!selectedPlayer && stage && (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {stage.rank.slice(0, 8).map((player, index) => (
                <ListBox key={index} player={player} showList={(player) => setSelectedPlayer(player)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
