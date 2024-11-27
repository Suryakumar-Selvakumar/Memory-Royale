import "../styles/Card.css";

export function Card({
  card,
  handleCardClick,
  cardsFlipped,
  showCard,
  gameStartState,
  gameOver,
}) {

  let cardShadow;
  if (card.rarity && card.rarity === "common") {
    //common card styles
    cardShadow =
      "inset 0 -1.5rem 4rem grey, inset 0 0.5rem 1rem grey, 0 0 15px grey";
  } else if (card.rarity && card.rarity === "rare") {
    // rare card styles
    cardShadow =
      "inset 0 -1.5rem 4rem rgb(241, 157, 0), inset 0 0.5rem 1rem rgb(241, 157, 0), 0 0 15px rgb(241, 157, 0)";
  } else if (card.rarity && card.rarity === "epic") {
    // epic card styles
    cardShadow =
      "inset 0 -1.5rem 4rem magenta, inset 0 0.5rem 1rem magenta, 0 0 15px magenta";
  }

  const iconUrl = new URL(card.iconUrl);

  return (
    <div
      className={
        cardsFlipped
          ? "card flipped"
          : gameStartState
          ? "card first-draw"
          : "card"
      }
      key={card.id}
    >
      <div
        className="card-front"
        style={{
          boxShadow: showCard ? cardShadow : setTimeout(() => "none", 250),
        }}
        onClick={() => handleCardClick(card.id)}
      >
        <img id="card-image" src={card.iconUrl} alt={card.name} />
        <span id="card-name">{card.name}</span>
      </div>
      <div
        className={
          cardsFlipped
            ? "card-back flipped"
            : gameStartState
            ? "card-back first-draw"
            : "card-back"
        }
      >
        ?
      </div>
    </div>
  );
}
