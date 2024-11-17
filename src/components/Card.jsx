import "../styles/Card.css";

export function Card({ card, handleCardClick, cardsFlipped }) {
  let cardShadow;
  if (card.rarity && card.rarity === "common") {
    //common card styles
    cardShadow = "inset 0 0 30px grey, 0 0 15px grey";
  } else if (card.rarity && card.rarity === "rare") {
    // rare card styles
    cardShadow = "inset 0 0 30px orange, 0 0 15px orange";
  } else if (card.rarity && card.rarity === "epic") {
    // epic card styles
    cardShadow = "inset 0 0 30px magenta, 0 0 15px magenta";
  }

  const iconUrl = new URL(card.iconUrl);

  return (
    <div className={cardsFlipped ? "card flipped" : "card"} key={card.id}>
      <img
        className="card-front"
        style={{
          boxShadow: cardShadow,
        }}
        onClick={() => handleCardClick(card.id)}
        src={card.iconUrl}
        alt={card.name}
      />
      <div className="card-back">{/* Add Big Question mark */}?</div>
    </div>
  );
}
