The GOAL of this project is to get used to useEffect hooks, API Calls in React, get more proficient with Animations/Transitions, explore sound additions in web-apps. Make something Flashy!

1.  What are the components I need for this project?

    1.1. I need a Game component where the game is actually played.

    1.2. I need a Card component for each of the cards in the game.

    1.3. I need a Home component for the homepage of the game

2.  GAME Component:

    2.1. JSX:

        2.1.1. Cards JSX:

            i) Create a div to hold the cards.

            ii) Iterate through the deck array state

            iii) Pass each of the card objects to the Card components as props each of which will return a div with the card details


        2.1.2. Scoreboard JSX:

            i) Quite simple, just display the score and bestScore states in spans or p tags

            ii) Put em in a div


        2.1.3. Mute button JSX:

            i) Just a simple button that will allow the user to mute all sounds.

            ii) Worry about the logic of this after implementing sounds using useSound successfully.


        2.1.4. Restart Game Modal:

            i) This model is originally hidden and only appear when the game is over

            ii) Its a div with a Game Over! text and a Restart button.


        2.1.5. Clash Royale King:

            i) An image of the Clash Royale king emoticon


        2.1.5. Exit button:

            i) It will reset all the states of the game

            ii) It will go back to the Home-page.

    2.2. LOGIC:

        2.2.1. Score board states:

            2.2.1.1. score state

                i) For this, first you need a solid game-over condition.

                ii) Simply increment the score in an useEffect or the cardClickEventHandler() until gameOver is true.


            2.2.1.2. bestScore state:

                i) The best score is a state that gets its value from localStorage.

                ii) Originally initialize it with 0.

                iii) Create an useEffect which checks whether the current score is greater than the bestScore every time current score changes. Add score as a dependency for this.

                iv) Create another useEffect inside which store the bestScore value to localStorage everytime it changes, i.e., add it as a dependency.


        2.2.2. deck state

                i) This state is an array and it will hold all the Card objects

                ii) This is the state that will get updated by the data fetched from the API


        2.2.3. selectedCards state

                i) This state is also an array and will contain the IDs of the cards that were clicked on by the user.

                ii) It updates inside the click eventListener function of the card.


        2.2.4. currentCards state

                i) This is also an an array and this state is the one that contains the cards that will be shown on screen.

                ii) It updates with the array returned by the getRandomCards() function.


        2.2.5. handleCardClick(cardId) function:

                i) It will exist in all the Cards

                ii) It will take in the id of the card as a parameter

                iii) Using the cardId, check if it already exists in the selectedCards array.

                iv) If it does, then it’s game-over because the user has failed to remember the card and avoid clicking on it .

                v) Otherwise, add that id to the selectedCards state.


        2.2.5. getRandomCards(deck) function:

                i) This function will take the deck state as input

                ii) It will get random cards from the deck state. How?

                    - You can easily do this with the _.sampleSize() function from Lodash
                    - Just pass in the array and for your purposes, choose 12 as the sample size

                iii) Optional: Shuffle the cards that you got from the _.sampleSize() function.

                    - It’s optional because that function already returns the card objs at random so it may not be necessary to shuffle them.
                    - Do look out for this scenario - the cards returned always get put in the same position on the screen.
                    - If the above happens consistently then you can use the _.shuffle() function from Lodash.

                iv) Return the chosen cards as an array. This array will be used to set the currentCards state.


        2.2.6. useEffect for API Call:

                i) When should you fetch new images & data for the next set of cards? When the user clicks on the Cards

                ii) What state updates when the user clicks on the cards? the selectedCards state.

                iii) There you go! The API call for the next set of cards should occur when the selectedCards state change so you can add that as the useEffect’s dependency.

                iv) This works because the selectedCards state will only update if the game is not actually over. If the game is over, it won’t update and the API call won’t be made.


        2.2.7. restartGame() function:

                i) This will run when the restart game button is clicked

                ii) This will reset the score back to zero

                iii) The selectedCards back to empty

                iv) Cool thing is because selectedCards becomes empty, 3.2.5. useEffect will run and the deck state will be updated with new cards from an API call automatically.


        2.2.8. Clash Royale king

                i) The king makes the thumbs up emoji when the user wins the round

                ii) The king makes defeat or angry or sad or disappointed emoji when the user loses the game.

                iii) Find gifs for both conditions and add either as the src at the end of a round based on win or lose.

    2.3. STYLING:

        i) For the background, Create a linear/radial gradient with shades of black and blue, essentially make it look the app background in Clash Royale.

        ii) For the Cards, just put em all in a div and display in the center

        iii) For the mute button, probably make it a white color and unique styles for mute state and audible state. Maybe even load different images for the different states, one is normal speaker icon, another is strike-through speaker icon on mute.

        iv) The restart modal will have an opacity of 0. Once the Game ends, its opacity will come back to 1 in a transition. Also, Make the Play again button look like the Play again button from clash royale.

        v) Position the King image on the left/right side of the app normally and the top/bottom in the mobile layout.

    2.4. ANIMATIONS/TRANSITIONS:

        2.4.1. Cards Flip Transition: DONE

            Every time the user clicks on the card and the game is still not over, this animation should flip/rotate the card.

        i)  Logic:

            - Create a state cardFlipped to store the state of the cards and set it to false by default.
            - When the user clicks on a card, this state will update to true
            - Add a class flipped to the card when this state becomes true
            - Add the flipped property to this extra class and so the card will flip and the transition will run.
            - Then either inside the useEffect after the API call or inside the handleCardClick() function, set the cardFlipped state to false after a certain period of time, enough time for the transition to run which will make the card return back to the default state.
            - Make sure to pass this state in as a prop to the Card component, inside it is where you would change the div’s class.

        ii) Working:

            - Set transform: rotateY(180deg) to the flipped class.
            - Add the transition, something like transform 500ms ease to the card itself.
            - Manipulate the backface-visibility property to achieve the 3D effect

        2.4.2. Cards Place one-by-one: DONE

            The cards have to spawn from the book and go to their respective spots on the screen.

        i) Logic:

            - Declare row & column offsets, animation delay in CSS vars
            - Adjust each row’s height offset calculation so that it matches the book pos
            - Adjust each column’s width offset calculation so that it matches the book position
            - Multiply the delay for each consecutive card child, increasing the nos. progressively
            - Use nth child props to select rows and column groups as appropriate

3.  CARD Component:

    3.1. JSX:

        3.1.1. A card-front div with an image tag showing the fetched image and it will be passed in as props.

        3.1.2. A card-back div with the content to show for when the card is flipped.

    3.2. LOGIC:

        3.2.1. handleCardClick() function

        i) Pass in the parent’s handleCardClick() function and have it run when the user clicks on the image, div or the name.

        ii) Pass in the card’s id value with the function

    3.3. STYLING

        3.2.1. Style the face of the card to look exactly like a Clash Royale card-back

        3.2.2. How should the back of the card look? Either make it a Question Mark in coc font or make it a clash royale logo.

    3.4. ANIMATIONS/TRANSITIONS:

        3.4.1. Card Tilt Animation: SCRAPPED

        The cards should tilt in 3D when a user hovers over it.

        i) You would retrieve the pointer’s X and Y coordinates. How? Using clientX and clientY on the event object

        ii) Maybe create states for both values.

        iii) When those states change, calculate rotateX and rotateY angle values for the card component, calculate the correct angles using those values and apply those dynamically for the card component.

        Do I really have to add this? Well, why not? I’m thinking this could mess with the click events, flip logic or the feel of the app. Get it done anyways, as long you’re satisfied with the effect and it doesn’t mess with the game logic, you should be golden. Ditch it if it looks uncanny or if the latter happens. Fine.

        3.4.2. Ensure to add anything necessary to make the transition from 3.4.1. run.

4. HOME Component:

    4.1. JSX:

        4.1.1. It will have the logo of the app – Memory Royale. Which I think will be a book with the Clash Royale crown inside it.

        4.1.2. A Play button to start the game.

        4.1.3. Mute sounds button

        4.1.4. Mute bg music button

        4.1.5. Tool-tip button

        i) It opens and provides instructions on how to play the game when clicked

        ii) Use the king explaining icon

        iii) Dude pops out from below

        iv) Add a bar which has the instruction in it.

    4.2. LOGIC:

        4.2.2. Play button:

        i) When the Play button is pressed, the context should switch to the gamepage

        ii) You can do this easily with DOM manipulation.


        4.2.3. Does it need any states at all? I don’t think so. There’s literally only one function for the entire page and that function will use the prop to update the context state.

    4.3. STYLING:

        4.3.1. For the background, use an image, if it looks bad, then stick to a linear-gradient.

        4.3.2. Make the logo look nice

        4.3.3. Make the Play button look like the play button from Clash Royale

    4.4. ANIMATIONS/TRANSITIONS:

        4.4.1. Try to make the play button have the same animation effects that the Battle button in clash royale has.

        4.4.2. Grow effect:

        The logo and the play button has to grow in 3D from nothing to their actual size

        i) Logic / Working:

            • Its kinda ez, just set this – scale3d(0, 0, 0) in an animation at 0%
            • Have it grow to scale(1, 1, 1) at 100%
            • The animation starts running as soon as the Home page loads.
            • Maybe add a delay.

        4.4.3. Slide-up:

        The buttons in the bottom-right corner have to slide-up from below when the homepage loads.

        i) Logic/Working:

            • Give the buttons class a position: relative property
            • In the Key-frames – make the top: 250px or something closer at 0%
            • Then at 100%, make the top: 0
            • Add the correct timing-function. Maybe ease-out?

5. LOADING Component:

    5.1. JSX:

        5.1.1. Loading/Progress bar

        i) Try using a progress element

        ii) If that doesn't work, then use a normal div or span inside a bigger div.

        
        5.1.2. Load Number

        i) It's a span element

    
        5.1.3. Crown (Optional)

        i) Consider adding the crown GIF to the loading screen.

    5.2. LOGIC:

        5.2.1. progress state:

        i) Initialize it as 0

        ii) It's a number that increments along with the progress bar in sync, indicating the loading progress.

        iii) How will it increase? Maybe use a setInterval() inside a setTimeout() and use it increase the count at regular intervals for the time set in setTimeout().

        
        5.2.2 Loading/progress bar working:

        i) How am I supposed to make this work?

            - Create an animation, that colors the progress bar or div. Refer 5.4.1. for animation logic.

    5.3. STYLING:

        Copy Clash Royale's loading screen styles as closely as you can

        5.3.1. Loading number:

        i) It will have the same supercell font

        ii) It will have a % symbol next to it

        
        5.3.2. Progress bar:

        i) Use same color as Clash Royale loading bar

        ii) Have it take maybe 75% of the page width

        5.3.3. Crown:

        i) Just add it the left or side of the loading bar or actually add it to the top-right/left of the screen.

    5.4. ANIMATIONS/TRANSITIONS:

        5.4.1. Progress bar loading animation.

        i) Create a span inside another div

        ii) Give the span the background color you want.

        iii) Animate the width of the inner span from 0 to 100% of the outer div over the course of the animation.

        iv) So as the span grows, because of its background color, it will simulate a loading effect, cool init.

6. MOBILE LAYOUT:

    So, one thing, avoid making the user scroll to play the game on mbl. Everything has to fit inside the screen. Design it for the smallest phone from devtools’ device toolbar, then automatically it’ll work for all the other variants.

    How will the components change?

    6.1. CARD Component:

    i) I don’t think it needs to change, simply use grid auto-fill for the cards layout, then they should automatically take the next line when the screen size shrinks.

    ii) Use flex-wrap if that doesn’t quite cut it.

    iii) Maybe shrink them? Use the device toolbar to see how how the app looks on mobile devices before deciding

    
    ACTUAL METHOD:

        6.1.1. Decrease cards no.:

        i) Decrease the number of cards to from 12 to 10 or 9, maybe even 8 depending on how many fit on the screen. Update the getRandomCards() function to take a parameter n which specifies the no. of cards.

        ii) Using the window.watchMedia() method, add a screen size check for when the size pixels size matches a mobile.

        iii) Using .matches, you can conditionally pass in the correct value for the n parameter.

        
        6.1.2. Decrease card size:

        i) Decrease the card size just enough for 3 cards to fit in one row on the screen, if that looks too small then go with just 2 cards.

        I think remaining props can stay the same, maybe decrease the box-shadow pixels if it looks too bright. You can use the same mediaQuery.matches command.

    6.2. GAME Component:

        6.2.1. Get rid of the king:

        i) Unfortunately, the screen maybe too small for the king to stay.

        ii) Try incorporating him into the layout, but if it looks weird, then remove him and use only the emotes to show game states.

        Iii) If you choose to get rid get of him, then use the same mediaQuery.matches method to conditionally render the JSX so that only PC screens show him.

        
        6.2.2. Switch up the Grid Layout of Cards:

        i) The grid layout is going to turn into either 3x3 or 2x4 layout. Again, dependent on how the screen looks.

        
        6.2.3. Reposition score-board-div:

        i) Put the score-board-div inside the same column as cards, it should be right above the cards themselves.

        
        6.2.4. Sound and Exit buttons:

        i) I think they can be left as they are in terms of their position.

        ii) However, consider reducing their size, if they look gargantuan.

        
        6.2.5. Background:

        Refer 6.3.1.

        
        6.2.6. Layout Switching

        So the thing is when I'm in the different layout, the scrolling has to be allowed to use that one so I've set overflow: visible on the body but for the normal Game layout, I've set the overflow: hidden, so now when I switch to the zoomed in layout, scroll down and zoom back out, the screen gets stuck halfway on the main game layout and if I enable scroll on the Game layout, the line and white screen under the background image is visible and its ugly. Is there any way I can automatically make the main game layout scroll back up to the top? Dude. Calm down. Think.

        Oh. OOOOOOOH. THE LIGHT, I SEE IT.

        i) Okay, you have to use a state that updates automatically when mediaQuery changes, that is the only way to force a component re-render making the layout serve up different JSX and scroll to top

        ii) Add an eventListener in the original useEffect() that runs when the component mounts, that is, the one with the empty dependency array []

        iii) Inside it initialize an eventlistener that runs everytime the mediaQuery changes and using that event and .matches you can update the state that reporesents it

        iv) Inside there, also use window.scrollTo(0, 0) to get back to the top of the page. This way you don’t even need to change the overflow properties, zoomed in stuff can be scrollable and normal layout can be unscrollable.

        v) But wait, I want the PC zoomed-in layout to have scrolling and the mobile layout to not have it. Alright, seems like you can use @media (any-pointer: coarse) to apply mobile specific styles, so inside there use overflow: hidden. Outside it, stick to visible.

    6.3. HOME Component:

        6.3.1. Background:

        i) Make the backgroundSize equal “cover”

        ii) Make backgroundRepeat equal “no-repeat”

        iii) That should fix the background getting cut off issues

        
        6.3.2. Buttons

        i) Shrink the Play button if needed.

        ii) Shrink the sound and exit buttons if needed.

    6.4. LOADING Component:

        6.4.1. Background:

        i) Adjust background and make sure it matches the screen size.

        ii) Just apply the same changes as in HOME.

        
        6.4.2. Loading bar

        i) Ensure it spans the whole screen width like in PC version.

        ii) The font size is bonkers, reduce it.

7. SOUND-EFFECTS:

    Explore the useSound hook’s documentation, use that for sounds. Worry about adding sounds after getting the app working, styling done, transitions/animations done and mobile layout done. Sounds are the icing on top of the Cake.

    7.1. What sound effects should the app have?

        i) Button press sound - use clash Royale button press sound - DONE

        ii) Home background music - use clash royale's home background music. Use same variable from localStorage to control the music and button images in the Home page as well. But the audio tag’s src will point to a home background music instead. - DONE

        iii) Game background music - use clash royale's game background music - DONE

        iv) cards flip sound - Do I actually want to implement a cards flip sound? It may be overkill. There's already 2 sounds including the background music running and the emote sound after card click, it may become unpleasant to hear with a card flip sound. But hey, maybe you can add a card click sound just for some user feedback. That might just enhance the game experience.

        v) cards shuffle sound

        vi) Emoji sounds: 1. Thumbs up emoji sound 2. Angry emoji sound 3. Celebration sound

        vii) Intro Sounds – DONE

        viii) Loading Sounds - DONE

    7.2. How to implement the sounds?

        i) UseSound hook enables you to load an mp3 audio and gives you a bunch of functions like play, stop, pause, playback rate, volume and so on. That should be plenty for you to implement all that you need

        ii) Get all the sounds from Henrylq/Clash-Royale-SFX GitHub repo. All the sounds are ogg files, convert the sounds you need into mp3 files and use those sounds

        iii) For the emote sounds, consider creating a sprite for the performance benefit.

        
        7.2.1. How to implement the chest sound for the cards place animation during game start?

        i) Create a new audio tag that only renders when both showKingEmote and gameStartState are true.

        ii) Add the chest sound, set auto-play and loop to true.

        iii) For the normal king emotes make it so that the particular audio tag will only run when gameStartState is false.

        That's it.

        
        7.2.2. How to implement cardsFlip sound when cards are clicked?

        i) First off, you need to find an audio for this. Maybe use the same card audio from Gravity Falls game

        ii) This can be a useSound hook that has the chosen sound loaded and simply call the play function when the card is clicked.

        iii) Alternative is to use an audio tag that plays when cardsFlipped state is true. Could be an easier way to implement it but may lead to complications as you'd have to account for every single occurrence of the state being set to true, which could become tedious.

        
        7.2.3. How to implement cardsShuffle sound?

        i) I mean the simplest way would be to create another audio tag, add the cards fly in sound, turn on loop and auto-play and just have it run till gameStartState is true but you'd have to make sure the audio playback rate matches each card's place animation which has 300ms time and 250ms delay from the previous sound.

        ii) What's the other way?

        The other way would be to use an audio editor, make 12 duplicates of the cards fly in audio, separated by a gap of 250ms with each iteration being 300ms and have this audio play at the start of the game. But dude the where can you call the play() func, it can be from a button press coz it's the game start, then I guess I'm kinda stuck with the audio tag approach but you can still try combining everything tho if you'd like to. Okay I'll see what I can do.

    7.3. A mute button:

        i) It should allow to mute all the sound effects including the background music. Your web-app should be accessible.

8. APP Component:

    8.1. JSX:

        It will group Home, Loading and Game components.

    
    8.2. LOGIC:

        8.2.1. Component Switching

        i) Create a state currentPage

        ii) Initialize it to “home”

        iii) Make it so that loading and game pages display only when currentPage equals their respective values.

        iv) Pass the stateSetter of currentPage into each component as a property

        v) HOME Component – When Play button is clicked, set currentPage to “loading” which opens the loading screen.

        vi) LOADING Component – When Loading ends, set currentPage to “Game”

        vii) Game component – When exit button is clicked, set currentPage to “Home”

9. INTRO Component

    9.1. JSX:

        9.1.1. Logo

        i) One para saying SUP

        ii) One para saying ERC

        iii) One para saying ELL

        iv) Put those three in a div

    9.2. STYLING:

        i) Align the logo div in the center of the page.

        ii) Make the background black

    9.3. ANIMATION:

        1. Logo Pop in

        i) opacity rises from 0 to 1 corresponding to 0% to 10% of the animation

        ii) Scale is 1.1 or 1.2 at the start and then becomes 1 at the end of the animation

10. BUGS TO FIX:

    10.1. I want the King ThumbsUp emoji to use all three of its sounds and the sounds produced have to be randomized, for that I used sampleSize from lodash to get a random sound each sound, however the function to set the sound as the src for the audio tag is getting called 3 times so that leads three sounds playing for the emote when only one is supposed to be playing.

        i) Why is that?

        I think it's because the component gets torn down and rebuilt every time a state change occurs so the JSX being returned is rendering multiple times.

        ii) How to fix it?

        I think you can create a state to store the sound src(s) and call the function inside the stateSetter along with the other stateSetters, probably inside the handleCardClick() function. This will lead to react batching the state updates and so the function will only run once.

        But what about the audio tag? It needs to run only once, right? Yes either make it run only when showKingEmote() is true or when the new state kingEmoteSound() has a value or is not null/undefined. Maybe make it null when showKingEmote is false but dude, each emote sound has a different time duration. Well, then there's no need to make it null or false. When it gets the audio from setKingEmoteSound() function, it will play the audio, that's it. You're overthinking it.

    10.2. Currently, the sound for the Cards Place Animation is a bit off when the game starts, it's starts too soon and it's not syncing with the cards that are being placed.

        i) Why does this happen?

        Yeah, it's just coz you've configured the audio to align perfectly for when one round is over and when the next one is starting, not for when the game begins.

        ii) How do I fix this?

        It's quite simple, make the gameStartState false in the first render instead of true which is what it's currently set to. Then inside the useEffect that runs on component mount, just make it true inside a setTimeout that runs after the same amount of time as when the gameStartState is set to true after the game ends. You may have to increase the time after which gameStartState is set to false to make the audio perfectly sync up.
