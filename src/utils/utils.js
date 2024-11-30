import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import IMG, { toExlude } from '../assets';

export const getEventType = (type) => {
    switch (type) {
        case 0:
            return "Torneo" 
        case 1:
            return "Lega"
        case 2:
            return "IPT"
        default:
            break;
    }
}

export const eventsMapping = {
    "Tutti": null,
    "Tornei": 0,
    "Leghe": 1,
    "IPT": 2
};

export const getFormattedDate = (date) => {
    const now = new Date(date);
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const eventTypes = ["Tornei", "Leghe", "IPT"];


export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    // Clean up listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};


// Function to encrypt the ID
export const encryptId = (id) => {
  const secretKey = 'sbdiwjbfwij1bowsfosnfwondns';
  const encrypted = CryptoJS.AES.encrypt(id, secretKey).toString();
  return encodeURIComponent(encrypted);
};

// Function to decrypt the ID
export const decryptId = (encryptedId) => {
  const secretKey = 'sbdiwjbfwij1bowsfosnfwondns';
  const decoded = decodeURIComponent(encryptedId);
  const bytes = CryptoJS.AES.decrypt(decoded, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const excludeKeys = toExlude;

export const getRandomImage = () => {
    // Create an array of keys excluding those in the excludeKeys array
    const keys = Object.keys(IMG).filter(key => !excludeKeys.includes(key));
    // Select a random key from the filtered array
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    // Return the URL of the randomly selected image
    return IMG[randomKey];
}

export const getArtworkImage = async (cardName) => {
  try {
      // Fetch card data from Scryfall
      const response = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`);
      const cardData = await response.json();      
      // Check if the card data was successfully fetched
      if (cardData && cardData.image_uris) {
          return cardData.image_uris.art_crop; // URL of the normal-sized image
      } else {
          console.error('Card image not found for', cardName);
          return null;
      }
  } catch (error) {
      console.error('Error fetching card image:', error);
      return null;
  }
};

export const getCardImage = async (cardName) => {
  try {
      // Fetch card data from Scryfall
      const response = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`);
      const cardData = await response.json();
      // Check if the card data was successfully fetched
      if (cardData && cardData.image_uris) {
        console.log(cardData);
          return cardData.image_uris.normal; // URL of the normal-sized image
      } else {
          console.error('Card image not found for', cardName);
          return null;
      }
  } catch (error) {
      console.error('Error fetching card image:', error);
      return null;
  }
};

export const getCardType = async (cardName) => {
  try {
      // Fetch card data from Scryfall
      const response = await fetch(`https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`);
      const cardData = await response.json();
      
      // Check if the card data was successfully fetched
      if (cardData && cardData.type_line) {
        console.log(cardData.type_line);
          return cardData.type_line; // Return the card type (e.g., "Creature — Elf Warrior")
      } else {
          console.error('Card type not found for', cardName);
          return null;
      }
  } catch (error) {
      console.error('Error fetching card type:', error);
      return null;
  }
};

export const getEventStatus = (date) => {
  return new Date(date) > new Date() ? "In Corso": "Terminato";
}