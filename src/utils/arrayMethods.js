import sampleSize from "lodash.samplesize";

// Function to get 12 random cards
function getRandomCards(cards) {
  return sampleSize(cards, 12);
}

export { getRandomCards };
