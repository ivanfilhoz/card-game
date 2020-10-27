import _ from 'lodash'
import { CARD_JOKER, DEFAULT_DECK } from '../util/constants'

export default class Deck {
  constructor(numberOfJokers = 0, shuffle = true) {
    const jokers = _.map(_.range(numberOfJokers), () => CARD_JOKER)
    this.cards = [...DEFAULT_DECK, ...jokers]
    if (shuffle) this.shuffle()
  }

  shuffle() {
    this.cards = _.shuffle(this.cards)
  }

  count() {
    return this.cards.length
  }

  pick(number = 1) {
    const taken = _.slice(this.cards, 0, number)
    this.cards = _.slice(this.cards, number)
    return taken
  }

  return(cards) {
    cards = Array.isArray(cards) ? cards : [cards]
    this.cards = [...cards, ...this.cards]
  }
}
