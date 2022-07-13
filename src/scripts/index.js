import '../styles/index.scss'

import MainPage from "./modules/MainPage";
import Localstorage from "./modules/Localstorage";
import Leaderboard from "./modules/Leaderboard";
import GameOver from "./modules/GameOver";
import GameField from "./modules/GameField/GameField";


window.addEventListener('DOMContentLoaded', () => {
  const gameField = new GameField()
  new GameOver(gameField).initialize()
  new MainPage(gameField).initialize()
  new Leaderboard().initialize()
})