import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { getArtworkImage } from "../../utils/utils";

export const ListBox = ({ player, showList }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleShowList = () => {
    showList(player);
  };

  useEffect(() => {
    const fetchImage = async () => {
      const cardName = player.list?.deck?.main[0]?.cardName;
      if (cardName) {
        try {
          const url = await getArtworkImage(cardName);
          setImageUrl(url);
        } catch (error) {
          console.error("Error fetching artwork image:", error);
          setImageUrl("/path/to/default/image.jpg"); // Default image
        }
      }
    };

    fetchImage();
  }, [player.list?.deck?.main[0]?.cardName]);

  return (
    <>
      <Helmet>
        <meta name="description" content={`Check out the deck ${player.list.listName} by ${player.player}.`} />
        <meta name="keywords" content={`${player.list.listName}, ${player.player}, deck, Magic: The Gathering`} />
      </Helmet>
      <div
        onClick={handleShowList}
        role="button"
        aria-label={`Show list for ${player.player}`}
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="w-full cursor-pointer hover:opacity-80 h-[200px] bg-cover bg-center rounded-xl overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-50"
      >
        <div className="relative z-20 max-w-screen-lg p-10 h-full flex flex-col justify-between">
          <p className="absolute top-5 bg-white w-8 h-8 font-bold justify-center items-center flex rounded-full">{player.position}°</p>
          <p className="text-white font-bold text-xl mt-5">{player.player}</p>
          <p className="text-white font-bold text-l">{player.list.listName}</p>
        </div>
      </div>
    </>
  );
};
