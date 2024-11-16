import "../styles/Card.css";

export function Card({ card, handleCardClick, cardsFlipped }) {
  if (card.rarity === "common") {
    //common card styles
  } else if (card.rarity === "rare") {
    // rare card styles
  } else if (card.rarity === "epic") {
    // epic card styles
  } else if (card.rarity === "legendary") {
    // legendary card styles
  }

  const iconUrl = new URL(card.iconUrl);

  return (
    <div className={cardsFlipped ? "card flipped" : "card"} key={card.id}>
      <div
        className="card-front"
        style={{ background: `url(${iconUrl})` }}
        onClick={() => handleCardClick(card.id)}
      >
        {card.name}
      </div>
      <div className="card-back">{/* Add Big Question mark */}</div>
    </div>
  );
}
