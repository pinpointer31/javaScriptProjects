//
//BlackJack
//by Zoltan Timar
//

let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
  
let values = ["Ace", "King", "Queen", "Jack",
"Ten", "Nine", "Eight", "Seven","Six",
"Five", "Four", "Three", "Two"];

//
let textArea = document.getElementById("text-area");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");

//Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];



hitButton.style.display = "none";
stayButton.style.display = "none";
showStatus();

//EventHandlers
newGameButton.addEventListener("click", function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  
  deck = createDeck();
  shuffleDeck(deck);
  
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()],
  updateScores();
  checkForEndOfGame();
  newGameButton.style.display = "none";
  hitButton.style.display = "inline";
  stayButton.style.display = "inline";
  showStatus();
});

hitButton.addEventListener("click", function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stayButton.addEventListener("click", function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});




function createDeck(){
let deck = [];
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex++){
    for(let valueIndex = 0; valueIndex < values.length; valueIndex++){
      let card = {
        suit: suits[suitIndex],
        value: values[valueIndex]
      };
      
      deck.push(card);
    }
}
return deck;
}

function shuffleDeck(deck){
for (let i = 0; i < deck.length; i++){
  let randomIndex = Math.trunc(Math.random() * deck.length);
  let temp = deck[randomIndex];
  deck[randomIndex] = deck[i];
  deck[i] = temp;
}
}

function getCardString(card){
return card.value + " of " + card.suit;
}

function getNextCard(){
return deck.shift();
}


function getCardNumericValue(card) {
switch (card.value){
  case "Ace":
    return 1;
  case "Two":
    return 2;
  case "Three":
    return 3;
  case "Four":
    return 4;
  case "Five":
    return 5;
  case "Six":
    return 6;
  case "Seven":
    return 7;
  case "Eight":
    return 8;
  case "Nine":
    return 9;
  default:
    return 10;
}
}


function getScore(cardArray){
let score = 0;
let hasAce = false;

for (let i = 0; i < cardArray.length; i++){
  let card = cardArray[i];
  score += getCardNumericValue(card);
  
  if (card.value === "Ace"){
    hasAce = true;
  }
}
if(hasAce && (score + 10) <= 21){
  return score + 10;
}

return score;
}


function updateScores(){
dealerScore = getScore(dealerCards);
playerScore = getScore(playerCards);
}

function checkForEndOfGame(){
updateScores();

if(gameOver) {
  //let dealer take cards
while (dealerScore < playerScore 
      && playerScore <= 21
      && dealerScore <= 21){
        dealerCards.push(getNextCard());
        updateScores();
  }
}

if (playerScore > 21 || dealerScore === 21){
  playerWon = false;
  dealerWon = true;
  gameOver = true;
}
else if (dealerScore > 21 || playerScore === 21){
  playerWon = true;
  dealerWon = false;
  gameOver  = true;
}
else if (playerScore === 21 && dealerScore === 21){
  playerWon = true;
  dealerWon = true;
  gameOver = true;
}
else if (gameOver){
  if (playerScore > dealerScore) {
    playerWon = true;
    dealerWon = false;
  }
  else{
    playerWon = false;
    dealerWon = true;
  } 
  
  newGameButton.style.display = "inline";
  hitButton.style.display = "none";
  stayButton.style.display = "none";
}
}




function showStatus(){
if(!gameStarted){
  textArea.innerText = "Welcome to Blackjack!";
  return;
}

let dealerCardString = "";
for (let i = 0; i < dealerCards.length; i++){
  dealerCardString += getCardString(dealerCards[i])+ "\n";
}

let playerCardString = "";
for (let i = 0; i < playerCards.length; i++){
  playerCardString += getCardString(playerCards[i])+ "\n";
}

updateScores();

textArea.style.fontWeight = "bolder";

textArea.innerText  = 
"Dealer has:\n\n" + 
dealerCardString + "(score: " + dealerScore + ")\n\n" +
"Player has:\n\n" +
playerCardString + "(score: " + playerScore + ")\n\n";

if (gameOver) {
  if (playerWon) textArea.innerText += "YOU WIN";
  if (dealerWon) textArea.innerText += "DEALER WINS";  
  if (dealerWon && playerWon) textArea.innerText += "TIE"
  
  newGameButton.style.display = "inline";
  hitButton.style.display = "none";
  stayButton.style.display = "none";
}
}


