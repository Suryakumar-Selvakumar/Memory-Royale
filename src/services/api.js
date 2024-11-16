import { getRandomCards } from "../../utils/arrayMethods";

async function fetchCards(apiUrl, apiToken) {
  const response = await fetch(apiUrl, {
    mode: "cors",
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  const cardsData = await response.json();
  const cards = cardsData.items;

  if (cards && response.status !== 400) {
    return getRandomCards(
      cards.map((cardObj) => {
        return {
          id: cardObj.id,
          name: cardObj.name,
          rarity: cardObj.rarity,
          iconUrl: cardObj.iconUrls.medium,
        };
      })
    );
  }
}

export { fetchCards };
