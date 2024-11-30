export const formattedDeck = (text) => {
    // Dividi il testo in base alle intestazioni
    const sections = text.split(/MAIN|SIDEBOARD/).map(section => section.trim()).filter(section => section.length > 0);
    
    // Sezione MAIN
    const mainSection = sections[0].split('\n').map(line => {
      const [quantity, ...cardNameParts] = line.split(' ');
      const cardName = cardNameParts.join(' ');
      return { cardName, quantity: parseInt(quantity, 10) };
    });

    // Sezione SIDEBOARD
    const sideboardSection = sections[1].split('\n').map(line => {
      const [quantity, ...cardNameParts] = line.split(' ');
      const cardName = cardNameParts.join(' ');
      return { cardName, quantity: parseInt(quantity, 10) };
    });

    // Costruisci l'oggetto finale
    const data = {
      main: mainSection,
      sideboard: sideboardSection,
    };

    return data;
  };
// Example usage with listExample
export const listExample = `MAIN
1 Prismatic Ending
2 Path to Exile
2 Surgical Extraction
2 Jace, the Perfected Mind
4 Tasha's Hideous Laughter
4 Visions of Beyond
4 Preordain
4 Fractured Sanity
4 Archive Trap
3 Snapcaster Mage
4 Ruin Crab
4 Hedron Crab
1 Oboro, Palace in the Clouds
1 Misty Rainforest
1 Otawara, Soaring City
1 Watery Grave
1 Plains
1 Shelldock Isle
2 Scalding Tarn
2 Hallowed Fountain
4 Field of Ruin
4 Island
4 Flooded Strand
SIDEBOARD
1 Engineered Explosives
3 Soul-Guide Lantern
2 Hurkyl's Recall
4 Ensnaring Bridge
1 Prismatic Ending
2 Path to Exile
2 Surgical Extraction`;