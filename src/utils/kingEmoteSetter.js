// Libraries
import useSound from "use-sound";
import sampleSize from "lodash.samplesize";

// Emote Imgs
import kingThumbsUp from "../assets/emotes/King-Thumbs-Up-Emote.png";
import kingBook from "../assets/emotes/King-Book-Emote.png";
import kingAngry from "../assets/emotes/King-Angry-Emote.png";
import kingTenPoints from "../assets/emotes/King-10-Points-Emote.png";
import kingVictory from "../assets/emotes/King-Victory-Emote.png";
import kingHappy from "../assets/emotes/King-Happy-Emote.png";
import kingPixelLaugh from "../assets/emotes/King-Pixel-Laugh-Emote.png";
import kingPirate from "../assets/emotes/King-Pirate-Emote.png";

// Emote Sounds
import kingThumbsUp1Sound from "../assets/sounds/emote sounds/King-Thumbs-Up-1-Sound.mp3";
import kingThumbsUp2Sound from "../assets/sounds/emote sounds/King-Thumbs-Up-2-Sound.mp3";
import kingThumbsUp3Sound from "../assets/sounds/emote sounds/King-Thumbs-Up-3-Sound.mp3";
import kingTenPointsSound from "../assets/sounds/emote sounds/King-10-Points-Sound.mp3";
import kingHappySound from "../assets/sounds/emote sounds/King-Happy-Sound.mp3";
import kingPixelLaughSound from "../assets/sounds/emote sounds/King-Pixel-Laugh-Sound.mp3";
import kingPirateSound from "../assets/sounds/emote sounds/King-Pirate-Sound.mp3";
import kingVictorySound from "../assets/sounds/emote sounds/King-Victory-Sound.mp3";
import kingMad1Sound from "../assets/sounds/emote sounds/King-Mad-1-Sound.mp3";
import kingMad2Sound from "../assets/sounds/emote sounds/King-Mad-2-Sound.mp3";
import kingMad3Sound from "../assets/sounds/emote sounds/King-Mad-3-Sound.mp3";
import kingMad4Sound from "../assets/sounds/emote sounds/King-Mad-4-Sound.mp3";

function setKingEmote(score, gameOver, gameStartState) {
  let imgSrc;

  if (gameStartState) {
    imgSrc = kingBook;
  } else {
    if (!gameOver) {
      if (score == 5) {
        imgSrc = kingPixelLaugh;
      } else if (score == 10) {
        imgSrc = kingTenPoints;
      } else if (score == 15) {
        imgSrc = kingPirate;
      } else if (score == 20) {
        imgSrc = kingVictory;
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

function setKingEmoteSound(score, gameOver) {
  let emoteSound;

  const thumbsUpSounds = [
    kingThumbsUp1Sound,
    kingThumbsUp2Sound,
    kingThumbsUp3Sound,
  ];
  const madSounds = [
    kingMad1Sound,
    kingMad2Sound,
    kingMad3Sound,
    kingMad4Sound,
  ];

  if (!gameOver) {
    if (score == 4) {
      emoteSound = kingPixelLaughSound;
    } else if (score == 9) {
      emoteSound = kingTenPointsSound;
    } else if (score == 14) {
      emoteSound = kingPirateSound;
    } else if (score == 19) {
      emoteSound = kingVictorySound;
    } else if (score == 24) {
      emoteSound = kingHappySound;
    } else {
      emoteSound = sampleSize(thumbsUpSounds)[0];
    }
  } else {
    emoteSound = sampleSize(madSounds)[0];
  }

  return emoteSound;
}

export { setKingEmote, setKingEmoteSound };
