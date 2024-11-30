import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { formattedDeck, listExample } from '../../utils/cardsFormat';

export const ListGenerator = ({ isOpen, onClose, onSave }) => {
    const [listName, setListName] = useState("");
    const [listText, setListText] = useState("");
  
    const handleSubmit = () => {
      onSave({ listName, deck: formattedDeck(listText) });
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <>
        <Helmet>
          <title>{`Add List - ${listName}`}</title>
          <meta name="description" content="Create and save your deck list." />
          <meta name="keywords" content={`${listName}, deck list, card game`} />
        </Helmet>
        <div className="fixed inset-0 flex w-full items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-5 w-[90%] md:w-[70%] rounded-md shadow-lg">
            <h3 className="text-lg font-bold mb-4">Aggiungi Lista</h3>
            <label className="block mb-2">
              Nome Lista:
              <input
                type="text"
                placeholder='Nome Lista'
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                className="p-2 border rounded-md w-full"
              />
            </label>
            <label className="block mb-4">
              Testo Lista:
              <textarea
                value={listText}
                placeholder={listExample}
                onChange={(e) => setListText(e.target.value)}
                className="p-2 h-80 border rounded-md w-full"
              />
            </label>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 px-4 py-2 rounded-md text-white mr-2"
            >
              Aggiungi
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 px-4 py-2 rounded-md text-white"
            >
              Annulla
            </button>
          </div>
        </div>
      </>
    );
};
