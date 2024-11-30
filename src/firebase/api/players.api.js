import { arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { decryptId } from "../../utils/utils";
/**
 * Adds or updates player information in Firestore.
 * @param {Object} player - The player object.
 * @returns {Promise<void>}
 */
export const addOrUpdatePlayer = async (player) => {
    try {
      const decryptedTournamentId = decryptId(player.tournament.id);
      const playerRef = doc(collection(db, 'players'), player.player);
      const playerDoc = await getDoc(playerRef);
  
      const tournamentData = {
        ...player.tournament,
        id: decryptedTournamentId,
      };
  
      if (playerDoc.exists()) {
        // If player exists, update their tournaments array
        await updateDoc(playerRef, {
          tournaments: arrayUnion(tournamentData)
        });
      } else {
        // If player doesn't exist, create a new document
        await setDoc(playerRef, {
          player: player.player,
          tournaments: [tournamentData]
        });
      }
    } catch (error) {
      console.error("Error adding or updating player: ", error);
      throw new Error("Failed to add or update player");
    }
  };

  /**
 * Retrieves all players from Firestore.
 * @returns {Promise<Array>} - A promise that resolves to an array of player objects.
 */
export const getAllPlayers = async () => {
  try {
      const playersCollectionRef = collection(db, 'players');
      const querySnapshot = await getDocs(playersCollectionRef);

      // Map through the documents to extract player data
      const playersList = querySnapshot.docs.map(doc => ({
          ...doc.data()
      }));


      return playersList;
  } catch (error) {
      console.error("Error retrieving players: ", error);
      throw new Error("Failed to retrieve players");
  }
};