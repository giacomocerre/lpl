import React, { useState } from "react";
import IMG from "../../../assets";
import { getFormattedDate } from "../../../utils/utils";
import { addEvent } from "../../../firebase/api/events.api";
import { Navbar } from "../../../components/navbar/navbar";
import { SectionHead } from "../../../components/sectionHead/sectionHead";
import { Helmet } from "react-helmet";

export const LeagueCreator = () => {
  const [leagueName, setLeagueName] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [stages, setStages] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [currentStage, setCurrentStage] = useState(null);
  const [stageDate, setStageDate] = useState("");
  const [editDate, setEditDate] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    leagueName: "",
    dateStart: "",
    dateEnd: "",
    stages: "",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Confirmation modal state

  const handleLeagueName = (e) => {
    setLeagueName(e.target.value);
    if (errors.leagueName) setErrors((prevErrors) => ({ ...prevErrors, leagueName: "" }));
  };

  const handleDateStart = (e) => {
    setDateStart(e.target.value);
    if (errors.dateStart) setErrors((prevErrors) => ({ ...prevErrors, dateStart: "" }));
  };

  const handleDateEnd = (e) => {
    setDateEnd(e.target.value);
    if (errors.dateEnd) setErrors((prevErrors) => ({ ...prevErrors, dateEnd: "" }));
  };

  const handleStageDate = (e) => {
    setStageDate(e.target.value);
    if (error) setError("");
  };

  const handleEditDate = (e) => {
    setEditDate(e.target.value);
    if (error) setError("");
  };

  const sortAndReassignStageNumbers = (stagesList) => {
    return stagesList
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((stage, index) => ({ ...stage, number: index + 1 }));
  };

  const handleAddStage = () => {
    if (!stageDate) {
      setError("Per favore, scegli una data per la tappa.");
      return;
    }
    setError(""); // Clear error message if date is valid

    const newStage = { number: stages.length + 1, date: stageDate, players: [], rank: [] };
    const updatedStages = sortAndReassignStageNumbers([...stages, newStage]);
    setStages(updatedStages);
    setStageDate(""); // Reset date input
    setShowPopup(false); // Close pop-up
    setErrors((prevErrors) => ({ ...prevErrors, stages: "" })); // Clear stages error
  };

  const handleEditStage = () => {
    if (!editDate) {
      setError("Per favore, scegli una data per la tappa.");
      return;
    }
    setError(""); // Clear error message if date is valid

    const updatedStages = stages.map((stage) =>
      stage.number === currentStage.number
        ? { ...stage, date: editDate }
        : stage
    );
    setStages(sortAndReassignStageNumbers(updatedStages));
    setEditDate(""); // Reset date input
    setShowEditPopup(false); // Close edit pop-up
  };

  const handleDeleteStage = (stageNumber) => {
    const updatedStages = stages.filter((stage) => stage.number !== stageNumber);
    setStages(sortAndReassignStageNumbers(updatedStages));
  };

  const handleLeagueCreation = () => {
    const newErrors = {
      leagueName: "",
      dateStart: "",
      dateEnd: "",
      stages: "",
    };

    if (!leagueName) newErrors.leagueName = "Per favore, inserisci il nome della lega.";
    if (!dateStart) newErrors.dateStart = "Per favore, inserisci la data di inizio.";
    if (!dateEnd) newErrors.dateEnd = "Per favore, inserisci la data di fine.";
    if (stages.length === 0) newErrors.stages = "Per favore, aggiungi almeno una tappa.";

    if (stages.length > 0) {
      const sortedStages = sortAndReassignStageNumbers(stages);
      const firstStageDate = sortedStages[0].date;
      const lastStageDate = sortedStages[sortedStages.length - 1].date;

      if (dateStart !== firstStageDate) newErrors.dateStart = `La data di inizio deve essere ${firstStageDate}.`;
      if (dateEnd !== lastStageDate) newErrors.dateEnd = `La data di fine deve essere ${lastStageDate}.`;
    }

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    setErrors({ leagueName: "", dateStart: "", dateEnd: "", stages: "" });
    setShowConfirmModal(true); // Show confirmation modal
  };

  const handleConfirmCreation = async () => {
    try {
      // Wait for the event to be added
      await addEvent({
        name: leagueName,
        dateStart: dateStart,
        dateEnd: dateEnd,
        stages: stages,
        rank: [],
        uniquePlayers: [],
        type: 1,
      });
  
      // Redirect to /league after the event is saved
      window.location.href = "/league";
    } catch (error) {
      console.error("Error creating event:", error);
      // Optionally, handle the error (e.g., show a message to the user)
    }
  };

  const handleCancelCreation = () => {
    setShowConfirmModal(false); // Close confirmation modal without doing anything
  };

  return (
    <div>
      <Helmet>
        <title>Crea Lega - Lega Pauper Livorno</title>
        <meta name="description" content="Crea una nuova lega per la Lega Pauper Livorno. Inserisci nome, date e tappe per avviare il tuo evento." />
        <meta name="keywords" content="crea lega, Lega Pauper, torneo, eventi" />
      </Helmet>
      <Navbar item={"creatorLeague"} />
      <div className="p-0 md:p-10 bg-[#f6f6f6]">
        <div className="rounded-xl shadow-md w-full">
          <SectionHead background={IMG.league} title={"Crea Nuova Lega"} backButton={"/login"} />
          <div className="rounded-b-xl p-10 bg-white overflow-hidden">
            <h2 className="font-bold text-2xl">Inizamo a creare la Lega.</h2>
            <p className="mt-2 mb-10 font-normal">Questa scheda è il tuo strumento per mettere in piedi <b>nuove leghe</b> sul sito. Qui puoi inserire il nome della lega, impostare le date di inizio e fine, e aggiungere le tappe che faranno da guida durante la competizione.</p>
            <div className="mb-6">
              <input
                type="text"
                id="leagueName"
                value={leagueName}
                onChange={handleLeagueName}
                className={`border bg-gray-50 h-12 text-center text-xl placeholder:text-lg placeholder:font-normal outline-none font-extrabold rounded-lg w-full ${errors.leagueName ? 'border-red-500' : ''}`}
                placeholder="Inserisci il nome della lega"
              />
              {errors.leagueName && (
                <p className="text-red-500 text-sm">{errors.leagueName}</p>
              )}
            </div>

            <div className="lg:flex block space-x-0 lg:space-x-5">
              <div className="lg:w-1/2 w-full">
                <div className="mb-6">
                  <label htmlFor="leagueDateStart" className="block text-gray-700 text-sm font-bold mb-2">
                    Data Inizio:
                  </label>
                  <input
                    type="date"
                    id="leagueDateStart"
                    value={dateStart}
                    onChange={handleDateStart}
                    className={`border border-gray-300 p-2 shadow-md rounded-lg w-full ${errors.dateStart ? 'border-red-500' : ''}`}
                  />
                  {errors.dateStart && (
                    <p className="text-red-500 text-sm">{errors.dateStart}</p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="leagueDateEnd" className="block text-gray-700 text-sm font-bold mb-2">
                    Data Fine:
                  </label>
                  <input
                    type="date"
                    id="leagueDateEnd"
                    value={dateEnd}
                    onChange={handleDateEnd}
                    className={`border border-gray-300 p-2 shadow-md rounded-lg w-full ${errors.dateEnd ? 'border-red-500' : ''}`}
                  />
                  {errors.dateEnd && (
                    <p className="text-red-500 text-sm">{errors.dateEnd}</p>
                  )}
                </div>
              </div>
              <div className="w-full border border-gray-300 rounded-xl shadow-md">
                <div className="flex justify-between items-center rounded-t-xl p-2 mb-4 bg-gray-100">
                  <h3 className="text-xl font-bold ml-3">Tappe</h3>
                  <button
                    className="bg-blue-800 text-white py-1 font-bold px-3 mr-3 text-m rounded-md"
                    onClick={() => setShowPopup(true)}
                  >
                    +
                  </button>
                </div>
                <ul className="px-5">
                  {stages.length === 0 && <p className="bg-gray-50 text-center text-gray-300 p-2 rounded-md">Ancora nesuna tappa</p>}
                  {stages.map((stage) => (
                    <li key={stage.number} className="py-2 border-b border-gray-200 flex justify-between items-center">
                      <span><i className="bi bi-calendar-event"></i><span className="ml-2 font-bold">Tappa {stage.number}</span> - {stage.date}</span>
                      <div>
                        <button
                          className="bg-yellow-500 text-white text-sm py-1 px-2 rounded-md mr-2"
                          onClick={() => {
                            setCurrentStage(stage);
                            setEditDate(stage.date);
                            setShowEditPopup(true);
                          }}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="bg-red-500 text-white text-sm py-1 px-2 rounded-md"
                          onClick={() => handleDeleteStage(stage.number)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                {errors.stages && (
                  <p className="text-red-500 text-sm ml-5 ">{errors.stages}</p>
                )}
              </div>
            </div>
            <div className="float-right mt-10">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                onClick={handleLeagueCreation}
              >
                Crea Lega
              </button>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-bold mb-4">Confermi la creazione della lega?</h4>
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                  onClick={handleConfirmCreation}
                >
                  Si
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                  onClick={handleCancelCreation}
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Existing Popups */}
        {showPopup && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-bold mb-4">Aggiungi Tappa</h4>
              <input
                type="date"
                value={stageDate}
                onChange={handleStageDate}
                className={`border border-gray-300 p-2 rounded-lg mb-4 w-full ${error ? 'border-red-500' : ''}`}
              />
              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                  onClick={handleAddStage}
                >
                  Salva
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                  onClick={() => setShowPopup(false)}
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditPopup && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-lg font-bold mb-4">Modifica Tappa</h4>
              <input
                type="date"
                value={editDate}
                onChange={handleEditDate}
                className={`border border-gray-300 p-2 rounded-lg mb-4 w-full ${error ? 'border-red-500' : ''}`}
              />
              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                  onClick={handleEditStage}
                >
                  Salva
                </button>
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                  onClick={() => setShowEditPopup(false)}
                >
                  Annulla
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
