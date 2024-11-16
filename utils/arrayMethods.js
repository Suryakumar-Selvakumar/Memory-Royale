import sampleSize from "lodash.samplesize";

// Function to get random cards from the deck
function getRandomCards(cards) {
  return sampleSize(cards, 12);
}

export { getRandomCards };
