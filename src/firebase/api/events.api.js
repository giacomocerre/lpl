import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase";
import { decryptId } from "../../utils/utils";

/**
 * Adds a new league to Firestore.
 * @param {Object} event - The data for the new league.
 * @returns {Promise<string>} - The ID of the created events document.
 */
export const addEvent = async (event) => {
  try {
    const eventRef = doc(collection(db, 'events'));
    await setDoc(eventRef, {
      id: eventRef.id,
      ...event,
    });
    return eventRef.id; // Return the document ID
  } catch (error) {
    console.error("Error creating event: ", error);
    throw new Error("Failed to create event");
  }
};
/**
 * Fetches events based on the specified type from Firestore.
 * @param {number} type - The type of events to fetch.
 * @returns {Promise<Array>} - An array of event objects with the specified type.
 */
const getEventsByType = async (type) => {
  try {
    const eventsCollection = collection(db, 'events');
    const eventsQuery = query(eventsCollection, where("type", "==", type));
    const eventSnapshot = await getDocs(eventsQuery);
    return eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching events: ", error);
    throw new Error("Failed to fetch events");
  }
};

/**
 * Fetches all leagues (type = 1) from Firestore.
 * @returns {Promise<Array>} - An array of league objects.
 */
export const getLeagues = () => getEventsByType(1);

/**
 * Fetches all tournaments (type = 0) from Firestore.
 * @returns {Promise<Array>} - An array of tournament objects.
 */
export const getTournaments = () => getEventsByType(0);

/**
 * Fetches all events from Firestore.
 * @returns {Promise<Array>} - An array of event objects.
 */
export const getAllEvents = async () => {
    try {
      const eventsCollection = collection(db, 'events');
      const eventSnapshot = await getDocs(eventsCollection);
      const eventsList = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return eventsList;
    } catch (error) {
      console.error("Error fetching events: ", error);
      throw new Error("Failed to fetch events");
    }
  };

  /**
 * Fetches a specific event by its ID from Firestore.
 * @param {string} id - The ID of the event to fetch.
 * @returns {Promise<Object>} - The event object with the specified ID.
 */
export const getEventById = async (id) => {
  try {
    const eventId = id;
    const eventDoc = doc(db, 'events', eventId);
    const eventSnapshot = await getDoc(eventDoc);
    if (eventSnapshot.exists()) {
      return { eventId: eventSnapshot.eventId, ...eventSnapshot.data() };
    } else {
      throw new Error("Event not found");
    }
  } catch (error) {
    console.error("Error fetching event: ", error);
    throw new Error("Failed to fetch event");
  }
};


export const updateRank = async (id, newPlayers) => {
  try {
    const eventId = decryptId(id); // Assuming decryptId is a function you have
    const eventDocRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventDocRef);

    if (!eventDoc.exists()) {
      throw new Error("Event not found");
    }

    const eventData = eventDoc.data();
    const rank = eventData.rank || [];

    const rankMap = new Map(rank.map(player => [player.player, player.points]));

    newPlayers.forEach(({ player, points }) => {
      if (rankMap.has(player)) {
        rankMap.set(player, rankMap.get(player) + points);
      } else {
        rankMap.set(player, points);
      }
    });

    // Convert the map back to an array and sort by points in descending order
    const updatedRank = Array.from(rankMap, ([player, points]) => ({ player, points }))
      .sort((a, b) => b.points - a.points);

    // Update document
    await updateDoc(eventDocRef, { rank: updatedRank });

  } catch (error) {
    console.error("Error updating player list: ", error);
  }
}

export const updatePlayerList = async (id, stageNumber, playerList) => {
  try {
    const eventId = decryptId(id);
    const eventDocRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventDocRef);

    if (!eventDoc.exists()) {
      throw new Error("Event not found");
    }

    const eventData = eventDoc.data();
    const uniquePlayers = eventData.uniquePlayers || []; // Default to empty array if undefined
    const stages = eventData.stages || [];
    const stage = stages[stageNumber - 1];

    // Add new players to uniquePlayers
    const newUniquePlayers = Array.from(new Set([...uniquePlayers, ...playerList]));

    // Update stage players
    stage.players = playerList;

    // Update document
    await updateDoc(eventDocRef, { stages, uniquePlayers: newUniquePlayers });

  } catch (error) {
    console.error("Error updating player list: ", error);
  }
}

/**
* Updates the stages.rank field of a specific event in Firestore.
* @param {string} id - The ID of the event to update.
* @param {number} stageNumber - The stage number to update.
* @param {Array} newSingleRankStructure - The new structure for the top8 field.
* @returns {Promise<void>}
*/
export const updateEventSingleRank = async (id, stageNumber, newSingleRankStructure) => {
 try {
   const eventId = decryptId(id);
   const eventDocRef = doc(db, 'events', eventId);
   
   // Get the current document
   const eventDoc = await getDoc(eventDocRef);
   if (!eventDoc.exists()) {
     throw new Error("Event not found");
   }

   const eventData = eventDoc.data();
   const stages = eventData.stages;
   const stage = stages[stageNumber-1]
   stage.rank = newSingleRankStructure;

   await updateDoc(eventDocRef, { stages });

 } catch (error) {
   console.error("Error updating event newSingleRankStructure: ", error);
   throw new Error("Failed to update event newSingleRankStructure");
 }
};

export const getStage = async (id, stageNumber) => {
  try {
    const eventId = id;
    const eventDocRef = doc(db, 'events', eventId);
    const eventDoc = await getDoc(eventDocRef);

    if (!eventDoc.exists()) {
      throw new Error("Event not found");
    }

    const eventData = eventDoc.data();
    return eventData.stages[stageNumber-1]

  } catch (error) {
    console.error("Error fetching event: ", error);
    throw new Error("Failed to fetch event");
  }
};