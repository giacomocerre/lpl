import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getCardImage, getCardType } from "../../utils/utils";
import Popover from "../popover/popover";

export const List = ({ player, onClose }) => {
  const [listName, setListName] = useState(null);
  const [cardLists, setCardLists] = useState({ main: [], sideboard: [] });
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [view, setView] = useState("text");

  useEffect(() => {
    if (player?.list?.deck) {
      setListName(player.list.listName);
      setCardLists({
        main: player.list.deck.main,
        sideboard: player.list.deck.sideboard,
      });
      setLoading(true);
    }
  }, [player]);

  const fetchCardInfo = async (cards) => {
    return Promise.all(
      cards.map(async (card) => {
        try {
          const cardImage = await getCardImage(card.cardName);
          const cardType = await getCardType(card.cardName);
          return { ...card, cardImage, cardType };
        } catch (error) {
          console.error("Error fetching card image:", error);
          return { ...card, cardImage: null };
        }
      })
    );
  };

  useEffect(() => {
    if (loading) {
      const fetchImages = async () => {
        if (cardLists.main.length || cardLists.sideboard.length) {
          const [mainWithImages, sideboardWithImages] = await Promise.all([
            fetchCardInfo(cardLists.main),
            fetchCardInfo(cardLists.sideboard),
          ]);
          setCardLists({
            main: mainWithImages,
            sideboard: sideboardWithImages,
          });
          setLoading(false);
        }
      };

      fetchImages();
    }
  }, [cardLists, loading]);

  const typeOrder = {
    Land: 1,
    Creature: 2,
    "Instant & Sorcery": 3,
    Other: 4,
  };

  const getCardTypePriority = (cardType) => {
    if (cardType.includes("Land")) return typeOrder.Land;
    if (cardType.includes("Creature")) return typeOrder.Creature;
    if (cardType.includes("Instant") || cardType.includes("Sorcery"))
      return typeOrder["Instant & Sorcery"];
    return typeOrder.Other;
  };

  const categorizeCards = (cards) => {
    const categorized = {
      Land: [],
      Creature: [],
      "Instant & Sorcery": [],
      Other: [],
    };

    cards.forEach((card) => {
      const priority = getCardTypePriority(card.cardType || "Other");
      if (priority === typeOrder.Land) categorized.Land.push(card);
      else if (priority === typeOrder.Creature) categorized.Creature.push(card);
      else if (priority === typeOrder["Instant & Sorcery"])
        categorized["Instant & Sorcery"].push(card);
      else categorized.Other.push(card);
    });

    return categorized;
  };

  const renderCardCategory = (cards, categoryName) => (
    <>
      <h2 className="font-medium bg-blue-500 text-xs text-white w-fit py-1 px-5 my-3 rounded-full">
        {categoryName}
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {cards.map((card, index) => (
          <div key={index} className="relative">
            {card.cardImage && (
              <div className="relative">
                <img
                  src={card.cardImage}
                  alt={card.cardName}
                  style={{ display: card.cardImage ? "block" : "none" }}
                  className="w-full"
                  onClick={() => setSelectedCard(card)} // Set the selected card on click
                />
                <p className="absolute bottom-3 font-bold right-5 bg-white shadow-lg shadow-black rounded-full w-7 h-7 justify-center items-center flex p-1 text-xs">
                  {card.quantity}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );

  const renderCategorizedCards = (cards, onlyText) => {
    const categorizedCards = categorizeCards(cards);

    if (!onlyText) {
      return (
        <>
          {categorizedCards.Land.length > 0 &&
            renderCardCategory(categorizedCards.Land, "Land")}
          {categorizedCards.Creature.length > 0 &&
            renderCardCategory(categorizedCards.Creature, "Creature")}
          {categorizedCards["Instant & Sorcery"].length > 0 &&
            renderCardCategory(
              categorizedCards["Instant & Sorcery"],
              "Instant & Sorcery"
            )}
          {categorizedCards.Other.length > 0 &&
            renderCardCategory(categorizedCards.Other, "Other")}
        </>
      );
    } else {
      return (
        <>
          {categorizedCards.Land.length > 0 &&
            renderTextCardCategory(categorizedCards.Land, "Land")}
          {categorizedCards.Creature.length > 0 &&
            renderTextCardCategory(categorizedCards.Creature, "Creature")}
          {categorizedCards["Instant & Sorcery"].length > 0 &&
            renderTextCardCategory(
              categorizedCards["Instant & Sorcery"],
              "Instant & Sorcery"
            )}
          {categorizedCards.Other.length > 0 &&
            renderTextCardCategory(categorizedCards.Other, "Other")}
        </>
      );
    }
  };

  const renderSideboard = (cards) => (
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 mt-12 ml-0 md:ml-10 gap-1 w-fit">
      {cards.map((card, index) => (
        <div key={index} className="relative">
          {card.cardImage && (
            <div className="relative">
              <img
                src={card.cardImage}
                alt={card.cardName}
                className="w-full"
                style={{ display: card.cardImage ? "block" : "none" }}
                onClick={() => setSelectedCard(card)} // Set the selected card on click
              />
              {card.quantity && (
                <p className="absolute font-bold bottom-3 right-3 bg-white shadow-lg shadow-black rounded-full w-7 h-7 justify-center items-center flex p-1 text-xs">
                  {card.quantity}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderTextCardCategory = (cards, categoryName) => (
    <>
      <h2 className="font-bold text-blue-500">{categoryName}</h2>
      <div className="grid grid-cols-1 mb-5">
        {cards.map((card, index) => (
          <p
            className="cursor-pointer"
            key={"main" + card.cardName + index}
            onClick={() => setSelectedCard(card)}
          >
            {card.quantity} {card.cardName}
          </p>
        ))}
      </div>
    </>
  );

  const renderTextSideboard = (cards) => (
    <div className="grid grid-cols-1 w-fit">
      {cards.map((card, index) => (
        <p
          key={"side" + card.cardName + index}
          onClick={() => setSelectedCard(card)}
        >
          {card.quantity} {card.cardName}
        </p>
      ))}
    </div>
  );

  return (
    <div className="mt-10 bg-gray-200 p-10 rounded-md relative">
      <Helmet>
        <title>{`${player.player} - ${listName} Deck`}</title>
        <meta name="description" content={`View the deck list for ${player.player}: ${listName}.`} />
        <meta name="keywords" content={`${listName}, ${player.player}, deck, card game`} />
      </Helmet>
      <p
        className="text-sm flex items-center justify-center bg-gray-400 text-white rounded-full w-fit px-5 py-2"
        onClick={() => onClose()}
      >
        <i className="bi bi-chevron-left mr-2"></i> Lega
      </p>
      <h1 className="font-extrabold text-3xl mt-5">{player.player}</h1>
      <h2 className="font-bold text-2xl">{listName}</h2>
      <div className="flex space-x-2 mt-5">
        <p
          className="bg-gray-300 rounded-md px-5 py-1"
          onClick={() => setView("text")}
        >
          <i className="bi bi-card-text"></i>
        </p>
        <p
          className="bg-gray-300 rounded-md px-5 py-1"
          onClick={() => setView("images")}
        >
          <i className="bi bi-images"></i>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1">
        {/* Text */}
        {view === "text" && (
          <div className="grid grid-cols-2 mt-5">
            <div className="">
              <h1 className="font-bold text-xl">Main</h1>
              {renderCategorizedCards(cardLists.main, true)}
            </div>
            <div>
              <h1 className="font-bold text-xl">Sideboard</h1>
              {renderTextSideboard(cardLists.sideboard)}
            </div>
          </div>
        )}
        {view === "images" && (
          <div className="grid md:grid-cols-2 mt-5 mb-10">
            <div className="">
              <h1 className="font-bold text-xl">Main</h1>
              {renderCategorizedCards(cardLists.main, false)}
            </div>
            <div>
              <div className="mt-10 md:mt-0">
                <h1 className="font-bold text-xl ml-0 md:ml-10">Sideboard</h1>
                {renderSideboard(cardLists.sideboard)}
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedCard && (
        <Popover
          card={selectedCard}
          onClose={() => setSelectedCard(null)} // Close popover
        />
      )}
    </div>
  );
};
