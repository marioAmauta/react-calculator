import Mexp from 'math-expression-evaluator'
import { CALCULATOR_CHARACTERS } from './constants'

export function evaluate(expression) {
  const mexp = new Mexp()

  const newValue = Object.values(expression)
    .map(value => {
      if (value === CALCULATOR_CHARACTERS.DIVIDE.CHARACTER) {
        return '/'
      }

      if (value === CALCULATOR_CHARACTERS.MULTIPLY.CHARACTER) {
        return '*'
      }

      return value
    })
    .join('')

  return mexp.eval(newValue).toString()
}

export function formatOperand(operand) {
  if (operand == null) {
    return
  }

  const INTEGER_FORMATTER = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  })

  const [integer, decimal] = operand.split('.')

  if (decimal == null) {
    return INTEGER_FORMATTER.format(integer)
  }

  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}
