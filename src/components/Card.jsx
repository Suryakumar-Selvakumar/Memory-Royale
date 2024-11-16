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
  } else {
    // champion styles
  }

  const iconUrl = new URL(card.iconUrl);

  return (
    <div className={cardsFlipped ? "card flipped" : "card"} key={card.id}>
      <div
        className="card-front"
        style={{
          background: `url(${iconUrl})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
        onClick={() => handleCardClick(card.id)}
      ></div>
      <div className="card-back">{/* Add Big Question mark */}</div>
    </div>
  );
}
