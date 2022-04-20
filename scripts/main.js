// window.addEventListener('DOMContentLoaded', function() {
//   // Execute after page load
// })
const results = document.getElementById('results')
const dealerPoints = document.getElementById('dealer-points')
const dealerHand = document.getElementById('dealer-hand')
const playerPoints = document.getElementById('player-points')
const playerHand = document.getElementById('player-hand')
const dealBtn = document.getElementById('deal-button')
const hitBtn = document.getElementById('hit-button')
const standBtn = document.getElementById('stand-button')


let cardDeck = []
let dealersHand = []
let playersHand = []
let dealersTurn = false
// let playerTotalPoints = 0
// let dealerTotalPoints = 0


const suffleCards = (deck) => {
  let suffledCards = deck.sort((a,b) => 0.5 - Math.random())
  return suffledCards
}

const createDeck = () =>{
  const cardSuit = ['hearts', 'diamonds', 'clubs', 'spades']
  const cardValue = [2,3,4,5,6,7,8,9,10,10,10,10,11]
  for(suit of cardSuit){
    cardValue.forEach((value, cardIndex) =>{
      if(cardIndex <9){
        return cardDeck.push({value:value, suit:suit, image:`${value}_of_${suit}.png`})
      }
      if(cardIndex == 9){
        return cardDeck.push({value:value, suit:suit, image:`jack_of_${suit}.png`})
      }
      if(cardIndex == 10){
        return cardDeck.push({value:value, suit:suit, image:`queen_of_${suit}.png`})
      }
      if(cardIndex == 11){
        return cardDeck.push({value:value, suit:suit, image:`king_of_${suit}.png`})
      }
      if(cardIndex == 12){
        return cardDeck.push({value:value, suit:suit, image:`ace_of_${suit}.png`})
      }
    }) 
  }
  cardDeck = suffleCards(cardDeck)
}

const allowDealBtn = () =>{
  dealBtn.disabled = false
  hitBtn.disabled = true
  standBtn.disabled = true
}

const allowPlayBtns = () =>{
  dealBtn.disabled = true
  hitBtn.disabled = false
  standBtn.disabled = false
}

const disableAllBtns = () => {
  dealBtn.disabled = true
  hitBtn.disabled = true
  standBtn.disabled = true
}

const clearTable = () => {
    results.innerHTML = ''
    playersHand = []
    dealersHand = []
    dealersTurn = false
    dealerPoints.style.display = 'none'
    // playerTotalPoints = 0
    // dealerTotalPoints = 0
    playerPoints.innerHTML = 0
    dealerPoints.innerHTML = 0
    playerHand.innerHTML = ''
    dealerHand.innerHTML = ''
    allowDealBtn()
}



const handResult = (finalResult) => {
  disableAllBtns()
  if(finalResult == 'win' && playerPoints.innerHTML == 21){
    results.innerHTML = `Blackjack Baby!!!`
  }
  else if(finalResult == 'win'){
    results.innerHTML = 'You Win'
  }
  else if(finalResult == 'tie'){
    results.innerHTML = 'Well this is awkward'
  }
  else{
   results.innerHTML = 'You Lose'
  }
  setTimeout(() =>{
    clearTable()
  },3000)
}

const totalPoints = (hand, player) =>{
  total = 0
  hand.forEach((card) =>{
    total += card.value
  })
  if(player){
    // playerTotalPoints = total
    playerPoints.innerHTML = total
    if(total>21){
      handResult('lose')
    }
    else if(total == 21){
      handResult('win')
    }
  }
  else{
    // dealerTotalPoints = total
    dealerPoints.innerHTML = total
  }
}

const updateUI = (hand, player) =>{
  card = hand[hand.length-1]
  const cardImage = document.createElement('img')
  cardImage.classList.add('card')
  if(player){
    cardImage.setAttribute('src', `images/${card.image}`)
    playerHand.append(cardImage)
  }
  else if (!dealersTurn){
    cardImage.setAttribute('src', `images/cardBack.png`)
    cardImage.classList.add('dealerCard')
    dealerHand.append(cardImage)
  }
  else{
    cardImage.setAttribute('src', `images/${card.image}`)
    dealerHand.append(cardImage)
    cardImage.classList.add('dealerCard')
  }
}





const hit = (hand, player) =>{
  hand.push(cardDeck.pop())
  updateUI(hand, player)
  totalPoints(hand, player)
}

const dealerTurn = () => {
  disableAllBtns()
  dealersTurn = true
  dealerPoints.style.display = 'block'
  for(let i = 0; i<2; i++){
    card= dealersHand[i]
    let turnDealerCard = document.getElementsByClassName('dealerCard')[i]
    turnDealerCard.setAttribute('src', `images/${card.image}`)
  }
  dealerPlay()
}

const dealerPlay = () => {
  if(dealerPoints.innerHTML <16){
    setTimeout(() =>{
      hit(dealersHand, false)
      dealerPlay()
    },500)
  }
  else if(dealerPoints.innerHTML > 21 || dealerPoints.innerHTML < playerPoints.innerHTML){
    handResult('win')
  }
  else if(dealerPoints.innerHTML == playerPoints.innerHTML){
    handResult('tie')
  }
  else{
    handResult('lose')
  }
}

const dealCards = () => {
  
  allowPlayBtns()
  if(cardDeck.length<10){
    cardDeck = []
    createDeck()
  }
  
  for(i=0; i<4; i++){
      if(i%2){
        hit(playersHand, true)
        
      }
      else{
          hit(dealersHand, false)
      }
  }
  // console.log(`player: ${playerTotalPoints}, dealer: ${dealerTotalPoints}`)
}

createDeck()
allowDealBtn()
const weirdBtn = () => {
  hit(playersHand, true)
}

dealBtn.addEventListener('click', dealCards)
hitBtn.addEventListener('click', weirdBtn)
standBtn.addEventListener('click', dealerTurn)




  