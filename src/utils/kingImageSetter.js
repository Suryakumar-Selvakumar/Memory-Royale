import kingThumbsUp from "../assets/King-Thumbs-Up.png";
import kingBook from "../assets/King-Book.png";
import kingAngry from "../assets/King-Angry.png";
import kingTenPoints from "../assets/King-10-Points.png";

export function setKingEmote(score, gameOver, gameStartState) {
  let imgSrc;

  if (gameStartState) {
    imgSrc = kingBook;
  } else {
    if (!gameOver) {
      if (score == 10) {
        imgSrc = kingTenPoints;
      } else {
        imgSrc = kingThumbsUp;
      }
    } else {
      imgSrc = kingAngry;
    }
  }

  return imgSrc;
}
