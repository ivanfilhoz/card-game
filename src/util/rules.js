const rules = {
  ArrowLeft: {
    test: card => card.value && card.value < 11 && card.value % 2,
    slot: 'odd'
  },
  ArrowRight: {
    test: card => card.value && card.value < 11 && !(card.value % 2),
    slot: 'even'
  },
  ArrowUp: {
    test: card => card.value > 10,
    slot: 'face'
  },
  ArrowDown: {
    test: card => card.suit === 'joker'
  }
}

export default rules
