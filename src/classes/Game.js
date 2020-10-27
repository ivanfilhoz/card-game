import {
  CARD_COVER,
  GAME_DIFFICULTY_EASY,
  GAME_DIFFICULTY_HARD,
  GAME_DIFFICULTY_NORMAL,
  GAME_STATE_FINISHED,
  GAME_STATE_HOME,
  GAME_STATE_STARTED
} from '../util/constants'
import { $, formatTime } from '../util/helpers'
import rules from '../util/rules'
import Counter from './Counter'
import Deck from './Deck'
import Slot from './Slot'

export default class Game {
  //
  // Initialization & events
  //
  constructor() {
    this.counter = new Counter($('counter'))
    this.slots = {
      odd: new Slot($('slot-odd')),
      face: new Slot($('slot-face')),
      even: new Slot($('slot-even')),
      deck: new Slot($('slot-deck')),
      input: new Slot($('slot-input'))
    }

    this.setupEvents()
    this.home()
  }

  setupEvents() {
    $('button-easy').addEventListener('click', () =>
      this.start(GAME_DIFFICULTY_EASY)
    )
    $('button-normal').addEventListener('click', () =>
      this.start(GAME_DIFFICULTY_NORMAL)
    )
    $('button-hard').addEventListener('click', () =>
      this.start(GAME_DIFFICULTY_HARD)
    )
    $('button-retry').addEventListener('click', () => this.retry())
    $('button-home').addEventListener('click', () => this.home())

    window.addEventListener('keydown', event => {
      if (
        this.state === GAME_STATE_STARTED &&
        Object.keys(rules).includes(event.key)
      ) {
        event.preventDefault()
        this.moveCard(event.key)
      }
    })
  }

  //
  // Draw & render
  //
  showHomeOverlay() {
    $('window-home').style.display = 'block'
    $('window-finish').style.display = 'none'
    $('overlay').style.display = 'flex'
  }

  showFinishOverlay(win) {
    $('window-home').style.display = 'none'
    $('window-finish').style.display = 'block'
    $('finish-win').style.display = win ? 'block' : 'none'
    $('finish-lose').style.display = win ? 'none' : 'block'
    $('span-result').innerHTML = formatTime(this.counter.getTime())
    $('overlay').style.display = 'flex'
  }

  hideOverlay() {
    $('overlay').style.display = 'none'
  }

  //
  // Game flow
  //
  home() {
    this.reset()
    this.state = GAME_STATE_HOME
    this.showHomeOverlay()
  }

  reset() {
    for (const slot in this.slots) {
      this.slots[slot].clear()
    }

    this.counter.reset()
  }

  start(difficulty) {
    this.difficulty = difficulty
    this.deck = new Deck(difficulty > GAME_DIFFICULTY_EASY ? 4 : 0)
    this.state = GAME_STATE_STARTED

    this.hideOverlay()
    this.slots.deck.addCard(CARD_COVER)
    this.pickCard()
    this.counter.start()
  }

  retry() {
    this.reset()
    this.start()
  }

  pickCard() {
    const [card] = this.deck.pick(1)

    this.inputCard = card
    this.slots.input.addCard(card)

    if (!this.deck.count()) this.slots.deck.clear()
  }

  moveCard(key) {
    const { test, slot } = rules[key]

    if (!test(this.inputCard)) return this.wrongMove()

    this.slots.input.clear()
    if (slot) this.slots[slot].addCard(this.inputCard)

    if (!this.deck.count()) return this.end(true)

    this.pickCard()
  }

  wrongMove() {
    if (this.difficulty === GAME_DIFFICULTY_HARD) return this.end(false)

    this.counter.penalty()
  }

  end(win) {
    this.state = GAME_STATE_FINISHED
    this.showFinishOverlay(win)
    this.counter.stop()
  }
}
