import transition from "../utils/transition";
import Localstorage from "./Localstorage";
import Leaderboard from "./Leaderboard";

class GameOver {
  constructor(obj) {
    this.gameField = obj
  }

  gameOverPage = document.querySelector('.game-over')
  mainPage = document.querySelector('.start-page')
  leaderboard = document.querySelector('.leaderboard')
  gameFieldPage = document.querySelector('.game-field')
  backToMainBtn = document.querySelector('.game-over__back')
  goToLeaderboardBtn = document.querySelector('.game-over__leaderboard-btn')
  playAgainBtn = document.querySelector('.game-over__again-btn')


  initialize = () => {
    this.backToMainBtn.addEventListener('click', () => {
      transition(this.mainPage, this.gameOverPage)
    })

    this.goToLeaderboardBtn.addEventListener('click', () => {
      transition(this.leaderboard, this.gameOverPage)
      new Leaderboard().renderItem()
    })

    this.playAgainBtn.addEventListener('click', this.playAgain)
  }

  playAgain = () => {
    if(this.gameField) {
      this.gameField.startGame()
      transition(this.gameFieldPage, this.gameOverPage)
    }
  }

  setScore = (props) => {
    const {score, correctScore, incorrectScore} = props
    const scoreElement = document.querySelector('.game-over__score-amount')
    const correctScoreElement = document.querySelector('.game-over__score-correct span')
    const incorrectScoreElement = document.querySelector('.game-over__score-incorrect span')

    const mode = Localstorage.getCurrentGameData('mode')
    const currentPlayer = Localstorage.getCurrentGameData('player')

    scoreElement.textContent = score
    correctScoreElement.textContent = correctScore
    incorrectScoreElement.textContent = incorrectScore

    Localstorage.setData(mode, {score, name: currentPlayer})
  }
}

export default GameOver