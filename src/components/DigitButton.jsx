import PropTypes from 'prop-types'
import { ACTIONS } from '../lib/constants'

export function DigitButton({ digit, dispatch }) {
  return (
    <button
      onClick={() =>
        dispatch({
          type: ACTIONS.ADD_DIGIT,
          payload: { digit }
        })
      }
    >
      {digit}
    </button>
  )
}

DigitButton.propTypes = {
  digit: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}
