import { CALCULATOR_CHARACTERS } from './constants'
import { evaluate } from './utils'

export const ACTIONS = {
  ADD_CHARACTER: 'add-character',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

export const initialState = {
  overwrite: false,
  formula: '',
  output: '',
  lastResult: ''
}

export function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_CHARACTER: {
      if (
        (payload.character === CALCULATOR_CHARACTERS.ZERO.CHARACTER &&
          state.formula === CALCULATOR_CHARACTERS.ZERO.CHARACTER &&
          state.output === CALCULATOR_CHARACTERS.ZERO.CHARACTER) ||
        (payload.character === CALCULATOR_CHARACTERS.DECIMAL.CHARACTER &&
          state.output.includes(CALCULATOR_CHARACTERS.DECIMAL.CHARACTER))
      ) {
        return state
      }

      if (
        state.lastResult &&
        isNaN(payload.character) &&
        payload.character !== CALCULATOR_CHARACTERS.DECIMAL.CHARACTER
      ) {
        return {
          ...state,
          overwrite: false,
          formula: state.lastResult.concat(payload.character),
          output: payload.character
        }
      }

      if (
        state.overwrite ||
        (state.output.startsWith(CALCULATOR_CHARACTERS.ZERO.CHARACTER) &&
          state.output[1] !== CALCULATOR_CHARACTERS.DECIMAL.CHARACTER &&
          payload.character !== CALCULATOR_CHARACTERS.DECIMAL.CHARACTER)
      ) {
        return {
          ...state,
          overwrite: false,
          formula: payload.character,
          output: payload.character
        }
      }

      if (
        payload.character === CALCULATOR_CHARACTERS.DECIMAL.CHARACTER &&
        isNaN(state.formula.at(0)) &&
        state.formula.at(0) !== CALCULATOR_CHARACTERS.ZERO.CHARACTER
      ) {
        return {
          ...state,
          formula: state.formula.concat('0.'),
          output: state.formula.concat('0.')
        }
      }

      if (
        (isNaN(payload.character) && payload.character !== CALCULATOR_CHARACTERS.DECIMAL.CHARACTER) ||
        (isNaN(state.output.at(0)) && !isNaN(payload.character))
      ) {
        return {
          ...state,
          formula: state.formula.concat(payload.character),
          output: payload.character
        }
      }

      return {
        ...state,
        formula: state.formula.concat(payload.character),
        output: state.output.concat(payload.character)
      }
    }

    case ACTIONS.DELETE_DIGIT: {
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          formula: '',
          output: '0'
        }
      }

      if (!state.formula) {
        return {
          ...state,
          output: '0'
        }
      }

      return {
        ...state,
        formula: state.formula.slice(0, -1)
      }
    }

    case ACTIONS.EVALUATE: {
      if (
        !state.formula ||
        !state.formula.match(/\d/) ||
        (isNaN(Number(state.formula.at(0))) && isNaN(Number(state.formula.at(1)))) ||
        (isNaN(Number(state.formula.at(-2))) && isNaN(Number(state.formula.at(-1))))
      ) {
        return state
      }

      let newFormula = ''
      let result = ''
      let isRepeatedOperatorRemoved = false
      let repeatedOperators = ''

      for (let i = 0; i < state.formula.length; i++) {
        if (
          isNaN(state.formula[i]) &&
          isNaN(state.formula[i + 1]) &&
          state.formula[i + 1] !== CALCULATOR_CHARACTERS.DECIMAL.CHARACTER &&
          state.formula[i + 1] !== CALCULATOR_CHARACTERS.SUBTRACT.CHARACTER
        ) {
          newFormula = state.formula.slice(0, i).concat(state.formula.slice(i + 1))

          const formattedFormula = newFormula
            .split('')
            .map(el => {
              if (isNaN(el)) {
                repeatedOperators = repeatedOperators.concat(el)

                if (!isRepeatedOperatorRemoved) {
                  isRepeatedOperatorRemoved = true

                  return ''
                }
              }

              return el
            })
            .join('')

          result = evaluate(repeatedOperators.length > 1 ? formattedFormula : newFormula)

          return {
            ...state,
            overwrite: true,
            formula: '',
            output: result,
            lastResult: result
          }
        }
      }

      result = evaluate(state.formula)

      return {
        ...state,
        overwrite: true,
        formula: '',
        output: result,
        lastResult: result
      }
    }

    case ACTIONS.CLEAR: {
      return initialState
    }
  }
}
