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

// Sound Initializations
// const [kingThumbsUp1Sound] = useSound(kingThumbsUp1Sound);
// const [kingThumbsUp2Sound] = useSound(kingThumbsUp2Sound);
// const [kingThumbsUp3Sound] = useSound(kingThumbsUp3Sound);
// const [kingTenPointsSound] = useSound(kingTenPointsSound);
// const [kingHappySound] = useSound(kingHappySound);
// const [kingPixelLaughSound] = useSound(kingPixelLaughSound);
// const [kingPirateSound] = useSound(kingPirateSound);
// const [kingVictorySound] = useSound(kingVictorySound);
// const [kingMad1Sound] = useSound(kingMad1Sound);
// const [kingMad2Sound] = useSound(kingMad2Sound);
// const [kingMad3Sound] = useSound(kingMad3Sound);
// const [kingMad4Sound] = useSound(kingMad4Sound);

function setKingEmote(score, gameOver, gameStartState) {
  let imgSrc;

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

function setKingEmoteSound(score, gameOver, gameStartState) {
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

  if (gameStartState) {
  } else {
    if (!gameOver) {
      if (score < 5) {
        emoteSound = kingThumbsUp2Sound;
      } else if (score == 5) {
        emoteSound = kingPixelLaughSound;
      } else if (score > 5 && score < 10) {
        emoteSound = kingThumbsUp1Sound;
      } else if (score == 10) {
        emoteSound = kingTenPointsSound;
      } else if (score > 10 && score < 15) {
        emoteSound = kingThumbsUp3Sound;
      } else if (score == 15) {
        emoteSound = kingPirateSound;
      } else if (score > 15 && score < 20) {
        emoteSound = kingThumbsUp2Sound;
      } else if (score == 20) {
        emoteSound = kingVictorySound;
      } else if (score > 20 && score < 25) {
        emoteSound = kingThumbsUp1Sound;
      } else if (score == 25) {
        emoteSound = kingHappySound;
      } else {
        emoteSound = kingThumbsUp3Sound;
      }
    } else {
      emoteSound = kingMad1Sound;
    }
  }

  return emoteSound;
}

export { setKingEmote, setKingEmoteSound };
