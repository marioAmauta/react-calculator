export function evaluate({ currentOperand, previousOperand, operation }) {
  const previous = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)

  if (isNaN(previous) || isNaN(current)) {
    return ''
  }

  let computation = ''

  switch (operation) {
    case '+':
      computation = previous + current
      break
    case '-':
      computation = previous - current
      break
    case '*':
      computation = previous * current
      break

    case '÷':
      computation = previous / current
      break
  }

  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
})

export function formatOperand(operand) {
  if (operand == null) {
    return
  }

  const [integer, decimal] = operand.split('.')

  if (decimal == null) {
    return INTEGER_FORMATTER.format(integer)
  }

  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}
