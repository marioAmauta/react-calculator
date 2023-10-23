import { useReducer } from 'react'
import { ACTIONS, initialState, reducer } from './lib/reducer'
import { CALCULATOR_CHARACTERS } from './lib/constants'
import { Display } from './components/Display'
import { Button } from './components/Button'

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  console.log(state)

  return (
    <div className='calculator-grid'>
      <Display
        formula={state.formula}
        currentCharacter={state.currentCharacter}
      />
      {Object.values(CALCULATOR_CHARACTERS).map(({ ID, CHARACTER }) => (
        <Button
          key={ID}
          id={ID}
          label={CHARACTER}
          customClass={
            ID === CALCULATOR_CHARACTERS.CLEAR.ID || ID === CALCULATOR_CHARACTERS.EQUALS.ID ? 'span-two' : ''
          }
          onClick={
            ID === CALCULATOR_CHARACTERS.CLEAR.ID
              ? () => dispatch({ type: ACTIONS.CLEAR })
              : ID === CALCULATOR_CHARACTERS.DELETE.ID
              ? () => dispatch({ type: ACTIONS.DELETE_DIGIT })
              : ID === CALCULATOR_CHARACTERS.EQUALS.ID
              ? () => dispatch({ type: ACTIONS.EVALUATE })
              : () => dispatch({ type: ACTIONS.ADD_CHARACTER, payload: { character: CHARACTER } })
          }
        />
      ))}
    </div>
  )
}
