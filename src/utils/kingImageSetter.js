import kingThumbsUp from "../assets/King-Thumbs-Up.png";
import kingBook from "../assets/King-Book.png";
import kingAngry from "../assets/King-Angry.png";
import kingTenPoints from "../assets/King-10-Points.png";
import kingVictory from "../assets/King-Victory.png";
import kingHappy from "../assets/King-Happy.png";
import kingPixelLaugh from "../assets/King-Pixel-Laugh.png";
import kingPirate from "../assets/King-Pirate.png";
import kingEmperor from "../assets/King-Emperor.png";

export function setKingEmote(score, bestScore, gameOver, gameStartState) {
  let imgSrc;

  if (gameStartState) {
    imgSrc = kingBook;
  } else {
    if (!gameOver) {
      if (bestScore == score) {
        imgSrc = kingVictory;
      } else if (score == 10) {
        imgSrc = kingTenPoints;
      } else if (score == 20) {
        imgSrc = kingPixelLaugh;
      } else if (score == 30) {
        imgSrc = kingPirate;
      } else if (score == 40) {
        imgSrc = kingEmperor;
      } else if (score == 50) {
        imgSrc = kingHappy;
      } else {
        imgSrc = kingThumbsUp;
      }
    } else {
      imgSrc = kingAngry;
    }
  }

  return imgSrc;
}
