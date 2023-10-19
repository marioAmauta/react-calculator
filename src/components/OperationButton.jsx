import PropTypes from 'prop-types'
import { ACTIONS } from '../lib/constants'

export function OperationButton({ operation, dispatch }) {
  return (
    <button
      onClick={() =>
        dispatch({
          type: ACTIONS.CHOOSE_OPERATION,
          payload: { operation }
        })
      }
    >
      {operation}
    </button>
  )
}

OperationButton.propTypes = {
  operation: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}
