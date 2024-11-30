import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { getEventById } from "../../firebase/api/events.api";
import Rank from "../../components/rank/rank";
import { Navbar } from "../../components/navbar/navbar";
import Widget from "../../components/widget/widget";
import Loader from "../../components/loader/loader";

export const Ranking = () => {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [averagePlayers, setAveragePlayers] = useState(0);
  const [stagesPlayed, setStagesPlayed] = useState(0);
  const [mostPlayedDecks, setMostPlayedDecks] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
        const avgPlayers = calculatePlayerAvg(eventData.stages);
        const stages = numberOfStagesPlayed(eventData.stages);
        setAveragePlayers(avgPlayers);
        setStagesPlayed(stages);
        const topDecks = getMostPlayedDecks(eventData.stages);
        setMostPlayedDecks(topDecks);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const calculatePlayerAvg = (stages) => {
    const validStages = stages.filter((stage) => stage.players.length > 0);
    const totalPlayers = validStages.reduce(
      (acc, stage) => acc + stage.players.length,
      0
    );
    const numberOfStages = validStages.length;
    return numberOfStages > 0 ? totalPlayers / numberOfStages : 0;
  };

  const numberOfStagesPlayed = (stages) => {
    return stages.filter((stage) => stage.players.length > 0).length;
  };

  const getMostPlayedDecks = (stages) => {
    const deckCount = {};
    stages.forEach(entry => {
      entry.rank.forEach(rank => {
        if (rank.list.listName) {
          const deckName = rank.list.listName.toLowerCase().replace(" ", "_");
          deckCount[deckName] = (deckCount[deckName] || 0) + 1;
        }
      });
    });

    const sortedDecks = Object.entries(deckCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return sortedDecks.map(([deckName]) => deckName);
  };

  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>No event found</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Classifica di Lega - {event.name}</title>
        <meta name="description" content={`Scopri la classifica della lega ${event.name}. Analizza le prestazioni e i deck più utilizzati.`} />
        <meta name="keywords" content="classifica, Lega Pauper, tornei, eventi, ranking" />
      </Helmet>
      <Navbar item={"home"} />
      <div className="p-10 md:p-20 rounded-lg mx-auto">
        <button
          onClick={() => (window.location.href = "/league")}
          className="bg-gray-100 p-4 rounded-full shadow-md my-5"
        >
          <p className="font-bold text-sm">
            <i className="bi bi-chevron-left"></i> Torna alle Leghe
          </p>
        </button>
        <h1 className="font-bold text-4xl">
          Classifica della lega:{" "}
          <span className="text-yellow-500">{event.name}</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          <Widget title="Tappe Giocate" value={stagesPlayed} icon="bi bi-calendar-check-fill" color="green" />
          <Widget title="Totale Partecipanti" value={event.rank.length} icon="bi bi-people-fill" color="blue" />
          <Widget title="Media Partecipanti" value={averagePlayers} icon="bi bi-people" color="purple" />
        </div>
        <div className="mt-5">
          <h2 className="text-2xl font-bold">Top 5 Decks Giocati</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-5">
            {mostPlayedDecks.length > 0 ? (
              mostPlayedDecks.map((deck, index) => (
                <p className="capitalize px-4 py-3 rounded-full text-gray-800 font-bold text-md shadow-md bg-gray-50" key={index}>
                    <i className="bi bi-box2-heart-fill text-yellow-700 mx-2"></i> <span className="capitalize">{deck.replace("_", " ")}</span>
                </p>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-4xl font-bold">Classifica di Lega</h2>
          <Rank rank={event.rank} />
        </div>
      </div>
    </div>
  );
};

export default Ranking;
