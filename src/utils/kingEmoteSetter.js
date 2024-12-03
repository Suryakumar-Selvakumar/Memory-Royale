import kingThumbsUp from "../assets/emotes/King-Thumbs-Up-Emote.png";
import kingBook from "../assets/emotes/King-Book-Emote.png";
import kingAngry from "../assets/emotes/King-Angry-Emote.png";
import kingTenPoints from "../assets/emotes/King-10-Points-Emote.png";
import kingHappy from "../assets/emotes/King-Happy-Emote.png";
import kingPixelLaugh from "../assets/emotes/King-Pixel-Laugh-Emote.png";
import kingPirate from "../assets/emotes/King-Pirate-Emote.png";
import kingEmperor from "../assets/emotes/King-Emperor-Emote.png";

export function setKingEmote(score, bestScore, gameOver, gameStartState) {
  let imgSrc;

  if (gameStartState) {
    imgSrc = kingBook;
  } else {
    if (!gameOver) {
      if (score == 5) {
        imgSrc = kingTenPoints;
      } else if (score == 10) {
        imgSrc = kingPixelLaugh;
      } else if (score == 15) {
        imgSrc = kingPirate;
      } else if (score == 20) {
        imgSrc = kingEmperor;
      } else if (score == 25) {
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
