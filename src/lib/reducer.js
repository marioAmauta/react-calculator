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
  currentCharacter: '0',
  result: ''
}

export function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_CHARACTER: {
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          formula: state.formula.concat(payload.character),
          currentCharacter: payload.character
        }
      }

      if (payload.character === '0' && state.formula === '0' && state.currentCharacter === '0') {
        return state
      }

      if (!isNaN(payload.character) && state.formula === '0' && state.currentCharacter === '0') {
        return {
          ...state,
          formula: payload.character,
          currentCharacter: payload.character
        }
      }

      if (payload.character === '.' && state.formula.at(-1) === '.') {
        return state
      }

      if (payload.character === '.' && isNaN(Number(state.formula.at(-1))) && state.currentCharacter !== '.') {
        return {
          ...state,
          formula: state.formula.concat('0.'),
          currentCharacter: payload.character
        }
      }

      if (payload.character === '.' && state.formula === '' && state.currentCharacter === '0') {
        return {
          ...state,
          formula: '0.',
          currentCharacter: payload.character
        }
      }

      if (payload.character === '.' && state.formula !== '' && state.currentCharacter === '0') {
        return {
          ...state,
          formula: state.formula.concat('.'),
          currentCharacter: payload.character
        }
      }

      return {
        ...state,
        formula: state.formula.concat(payload.character),
        currentCharacter: payload.character
      }
    }

    case ACTIONS.DELETE_DIGIT: {
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          formula: ''
        }
      }

      if (!state.currentOperand) return state

      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: '' }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    }

    case ACTIONS.CLEAR: {
      return initialState
    }

    case ACTIONS.EVALUATE: {
      if (!state.formula || state.formula === '0') {
        return state
      }

      return {
        ...state,
        overwrite: true,
        formula: '',
        result: evaluate(state.formula),
        currentCharacter: evaluate(state.formula)
      }
    }
  }
}
