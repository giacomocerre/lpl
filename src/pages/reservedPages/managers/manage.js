import React, { useEffect, useState } from "react";
import { Navbar } from "../../../components/navbar/navbar";
import { Link, useParams } from "react-router-dom";
import {
  getEventById,
  updateEventSingleRank,
  updatePlayerList,
  updateRank,
} from "../../../firebase/api/events.api";
import { useIsMobile } from "../../../utils/utils";
import { ListGenerator } from "../../../components/listGenerator/listGenerator";
import {
  addOrUpdatePlayer,
  getAllPlayers,
} from "../../../firebase/api/players.api";
import { Helmet } from "react-helmet";
import Loader from "../../../components/loader/loader";

export const Manage = () => {
  const { id, stageNumber } = useParams();
  const [event, setEvent] = useState(null);
  const [stage, setStage] = useState(null);
  const [listActive, setListActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalPlayers, setTotalPlayers] = useState(0); // Initialize with 0 or appropriate default value
  const [existingPlayers, setExistingPlayers] = useState([]);
  const [players, setPlayers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
  const [succesSave, setSuccesSave] = useState({
    status: false,
    error: false,
    message: "",
  });

  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id);
        const existPlayers = await getAllPlayers();
        const stage = eventData.stages[stageNumber - 1];
        setEvent(eventData);
        setExistingPlayers(existPlayers);
        setStage(stage);
        if (eventData.stages[stageNumber - 1].players) {
          setPlayers(eventData.stages[stageNumber - 1].rank);
          setTotalPlayers(eventData.stages[stageNumber - 1].players.length)
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id, stageNumber]);

  const handlePlayerCountChange = (e) => {
    const newTotal = parseInt(e.target.value, 10) || 0;
    setTotalPlayers(newTotal);
    setPlayers(
      Array.from({ length: newTotal }, (_, index) => ({
        position: index + 1,
        player: "",
        points: 0,
        list: "",
      }))
    );
  };

  const handlePlayerChange = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value || "" }; // Ensure value is never undefined
    setPlayers(updatedPlayers);
  };

  const openPopup = (index) => {
    setCurrentPlayerIndex(index);
    setIsPopupOpen(true);
  };

  const handleSaveList = (list) => {
    if (currentPlayerIndex !== null) {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex] = {
        ...updatedPlayers[currentPlayerIndex],
        list: list,
      };
      setPlayers(updatedPlayers);
    }
  };

  const getSingleRankEventPlayers = async () => {
    await updateEventSingleRank(id, stageNumber, players);
  };

  const getAllPlayersPositions = async () => {
    const allPlayers = players.map((player) => ({
      player: player.player,
      tournament: {
        id: id,
        stageNumber: stageNumber,
        list: player.list,
        position: player.position,
        points: player.points,
      },
    }));
    for (const player of allPlayers) {
      await addOrUpdatePlayer(player);
    }
  };

  const getAllPlayersNames = async () => {
    const playersNames = players.map((player) => player.player);
    await updatePlayerList(id, stageNumber, playersNames);
  };

  const getRankedPlayers = async () => {
    const rankedPlayers = players.map((player) => ({
      player: player.player,
      points: player.points,
    }));
    await updateRank(id, rankedPlayers);
  };

  const handleSaveStageInfo = async () => {
    try {
      await getRankedPlayers();
      await getAllPlayersNames();
      await getSingleRankEventPlayers();
      await getAllPlayersPositions();
      setSuccesSave({
        status: true,
        error: false,
        message: "Lista dei giocatori Aggiunta!",
      });
      console.log("Success save state set to true");
    } catch (error) {
      console.error("Failed to save player:", error);
      setSuccesSave({
        status: true,
        error: true,
        message: "error: " + error.message,
      });
    }
  };

  // Filter existing players to exclude those already selected
  const availablePlayers = existingPlayers.filter(
    (ep) => !players.some((p) => p.player === ep.player)
  );

  return (
    <div>
      <Helmet>
        <title>Gestione Giocatori - {event ? event.name : "Lega Pauper Livorno"}</title>
        <meta name="description" content="Gestisci i giocatori per la tappa selezionata della lega." />
        <meta name="keywords" content="gestione, giocatori, Lega Pauper, torneo" />
      </Helmet>
      <Navbar item={id} />
      <div className="p-5 md:p-20 bg-[#f6f6f6]">
        {loading ? (
          <Loader/>
        ) : (
          event && (
            <div>
              <p className="p-2 bg-green-500 w-fit rounded-full text-sm font-bold text-white mb-3">
                {event.name}
              </p>
              <h1 className="font-bold text-3xl">
                Risultati
                <span className="text-yellow-600"> Tappa {stage.number}</span>
              </h1>
              <p>Iserisci i risultati relativi a questa tappa.</p>

              {/* Player Input Table */}
              <div className="bg-white p-10 mt-5 border rounded-md shadow-sm">
                <div className="flex items-baseline space-x-5">
                  <h3 className="text-xl font-bold mb-4">Aggiungi Giocatori</h3>
                  <button
                    onClick={() => setListActive(!listActive)}
                    className={`p-2 rounded-md font-bold ${
                      listActive
                        ? "bg-blue-500 border border-blue-500 text-white"
                        : "border border-blue-500 text-blue-500"
                    }`}
                  >
                    {!listActive ? "Attiva" : "Disattiva"} Liste Globali
                  </button>
                </div>
                <p>
                  Aggiugni tutti i giocatori e le liste della top8 per questa
                  tappa. Se vuoi puoi attivare le liste per tutti i giocatori
                  non solo per la top8.
                </p>
                <p className="mt-5">
                  <i className="bi bi-people-fill"></i> Numero Giocatori:
                  <input
                    type="number"
                    value={totalPlayers}
                    placeholder="n°"
                    onChange={handlePlayerCountChange}
                    className="ml-2 p-1 border w-20 rounded-md shadow-md"
                  />
                </p>

                {/* Datalist */}
                <datalist id="players-list">
                  {availablePlayers.map((player, index) => (
                    <option key={index} value={player.player} />
                  ))}
                </datalist>

                <div className="overflow-x-auto mt-5">
                  <table className="min-w-0 md:min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {isMobile ? "Pos." : "Posizione"}
                        </th>
                        <th className="py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Giocatore
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Punti
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Lista
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {players.length === 0 && (
                        <tr>
                          <td colSpan="4">
                            <p className="opacity-50 mt-5 p-2">
                              Ancora nessun giocatore registrato
                            </p>
                          </td>
                        </tr>
                      )}
                      {players.map((player, index) => (
                        <tr key={index}>
                          <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            #{player.position}
                          </td>
                          <td className="py-4 whitespace-nowrap">
                            <input
                              type="text"
                              placeholder="Nome Giocatore"
                              value={player.player || ""} // Ensure value is always a string
                              onChange={(e) =>
                                handlePlayerChange(
                                  index,
                                  "player",
                                  e.target.value
                                )
                              }
                              className="p-1 border rounded-md w-full"
                              list="players-list"
                            />
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            <input
                              type="number"
                              placeholder="Punti"
                              value={player.points || ""} // Ensure value is always a number or empty string
                              onChange={(e) =>
                                handlePlayerChange(
                                  index,
                                  "points",
                                  parseInt(e.target.value, 10) || 0
                                )
                              }
                              className="p-1 border rounded-md w-20"
                            />
                          </td>
                          <td className="px-3 py-2 whitespace-nowrap">
                            {player.list ? (
                              <span
                                className="cursor-pointer p-2 text-white rounded-md bg-green-500"
                                onClick={() => openPopup(index)}
                              >
                                {player.list.listName}
                              </span>
                            ) : listActive ? (
                              <button
                                className="bg-blue-500 p-2 rounded-md text-white"
                                onClick={() => openPopup(index)}
                              >
                                Lista <i className="bi bi-plus"></i>
                              </button>
                            ) : index < 8 ? (
                              <button
                                className="bg-blue-500 p-2 rounded-md text-white"
                                onClick={() => openPopup(index)}
                              >
                                Lista <i className="bi bi-plus"></i>
                              </button>
                            ) : (
                              <span>-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        )}
        <button onClick={getSingleRankEventPlayers}>Vedi Info</button>
        <button
          className="bg-blue-500 px-12 rounded-md text-white hover:opacity-85 mt-10 py-3"
          onClick={handleSaveStageInfo}
        >
          Salva Risultati
        </button>
      </div>
      <div className="w-full">
        <ListGenerator
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSave={handleSaveList}
        />
      </div>
      {succesSave.status && (
        <div className="w-full h-screen bg-black absolute top-0 left-0 bg-opacity-50 flex justify-center items-center">
          <div className="text-white bg-gray-900 py-20 px-80 rounded">
            {succesSave.error && (
              <>
                <p className="text-red-500 font-bold w-full">
                  {succesSave.message}
                </p>{" "}
                <button className="bg-blue-500 px-12 rounded-md text-white hover:opacity-85 mt-10 py-3">
                  Torna alla lega
                </button>
              </>
            )}
            {!succesSave.error && (
              <>
                <p className="text-green-500 font-bold w-full">
                  {succesSave.message}
                </p>{" "}
                <Link to="/home">
                  <button className="bg-blue-500 px-12 rounded-md text-white hover:opacity-85 mt-10 py-3">
                    Torna alla lega
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
