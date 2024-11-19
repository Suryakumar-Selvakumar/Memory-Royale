import kingThumbsUp from "../assets/King-Thumbs-Up-Emote.png";
import kingBook from "../assets/King-Book-Emote.png";
import kingAngry from "../assets/King-Angry-Emote.png";
import kingTenPoints from "../assets/King-10-Points-Emote.png";
import kingVictory from "../assets/King-Victory-Emote.png";
import kingHappy from "../assets/King-Happy-Emote.png";
import kingPixelLaugh from "../assets/King-Pixel-Laugh-Emote.png";
import kingPirate from "../assets/King-Pirate-Emote.png";
import kingEmperor from "../assets/King-Emperor-Emote.png";

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
      } else if (score == 15) {
        imgSrc = kingPixelLaugh;
      } else if (score == 20) {
        imgSrc = kingPirate;
      } else if (score == 25) {
        imgSrc = kingEmperor;
      } else if (score == 30) {
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
