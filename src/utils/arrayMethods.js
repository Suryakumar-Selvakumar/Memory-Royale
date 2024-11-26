import sampleSize from "lodash.samplesize";

// Function to get 12 random cards
function getRandomCards(cards, n) {
  return sampleSize(cards, n);
}

export { getRandomCards };
