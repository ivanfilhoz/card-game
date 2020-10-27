import _ from 'lodash'

export const CARD_JOKER = {
  suit: 'joker'
}

export const CARD_COVER = {
  suit: 'cover'
}

const cardValues = _.range(1, 14)
const cardSuits = ['spades', 'hearts', 'diamonds', 'clubs']

export const DEFAULT_DECK = _.flatten(
  _.map(cardValues, value =>
    _.map(cardSuits, suit => ({
      value,
      suit
    }))
  )
)

export const GAME_STATE_HOME = 0
export const GAME_STATE_STARTED = 1
export const GAME_STATE_FINISHED = 2

export const GAME_DIFFICULTY_EASY = 0
export const GAME_DIFFICULTY_NORMAL = 1
export const GAME_DIFFICULTY_HARD = 2
