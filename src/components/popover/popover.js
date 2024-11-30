import React from 'react';
import { Helmet } from 'react-helmet';

const Popover = ({ card, onClose }) => {
  return (
    <>
      <Helmet>
        <title>{`${card.cardName} - Card Details`}</title>
        <meta name="description" content={`Details about the card: ${card.cardName}.`} />
        <meta name="keywords" content={`${card.cardName}, card, details`} />
      </Helmet>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-4 border border-gray-300 rounded shadow-lg">
          <button onClick={onClose} className="text-gray-500">X</button>
          <img src={card.cardImage} alt={card.cardName} className="w-64" />
          <p className="mt-2 text-center font-bold">{card.cardName}</p>
        </div>
      </div>
    </>
  );
};

export default Popover;
