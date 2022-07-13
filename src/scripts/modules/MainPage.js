import transition from '../utils/transition'
import Leaderboard from "./Leaderboard";
import Localstorage from "./Localstorage";

class MainPage {
  constructor(obj) {
    this.gameField = obj
    this.gameField.initialize()
  }

  mainPage = document.querySelector('.start-page')
  gameFieldPage = document.querySelector('.game-field')
  leaderboardPage = document.querySelector('.leaderboard')
  manualPage = document.querySelector('.manual')
  userName = document.querySelector('.start-page__input')
  startBtn = document.querySelector('.start')
  goToLeaderboardBtn = document.querySelector('.start-page__leader')
  manualBtn = document.querySelector('.start-page__manual')
  backtoMainFromManual = document.querySelector('.manual__back')

  initialize = () => {
    this.startBtn.addEventListener('click', this.start)
    this.manualBtn.addEventListener('click', () => {
      transition(this.manualPage, this.mainPage)
    })
    this.backtoMainFromManual.addEventListener('click', () => {
      transition(this.mainPage, this.manualPage)
    })

    this.goToLeaderboardBtn.addEventListener('click', () => {
      transition(this.leaderboardPage, this.mainPage)
      new Leaderboard().renderItem('practice')
    })

    window.addEventListener('unload', () => {
      Localstorage.setCurrentGameData()
    })
  }

  start = () => {
    const practice = document.querySelector('#practice-mode')
    const timerElement = document.querySelector('.game-field__timer')

    if (this.userName.value.trim()) {
      Localstorage.initalize()
      Localstorage.setCurrentGameData({
        player: this.userName.value,
        mode: practice.checked ? 'practice' : 'timeAttack'
      })

      if (practice.checked) {
        timerElement.style = 'display: none'
      } else {
        timerElement.style = 'display: block'
      }

      transition(this.gameFieldPage, this.mainPage)

      this.gameField.startGame()
    }
  }
}


export default MainPage