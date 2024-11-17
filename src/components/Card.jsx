import "../styles/Card.css";

export function Card({ card, handleCardClick, cardsFlipped }) {
  let cardShadow;
  if (card.rarity && card.rarity === "common") {
    //common card styles
    cardShadow = "inset 0 0 5px grey";
  } else if (card.rarity && card.rarity === "rare") {
    // rare card styles
    cardShadow = "inset 0 0 5px orange";
  } else if (card.rarity && card.rarity === "epic") {
    // epic card styles
    cardShadow = "inset 0 0 5px magenta";
  }

  const iconUrl = new URL(card.iconUrl);

  return (
    <div className={cardsFlipped ? "card flipped" : "card"} key={card.id}>
      <div
        className="card-front"
        style={{
          background: `url(${iconUrl})`,
          backgroundSize: "150px 215px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          boxShadow: cardShadow,
        }}
        onClick={() => handleCardClick(card.id)}
      ></div>
      <div className="card-back">{/* Add Big Question mark */}?</div>
    </div>
  );
}
