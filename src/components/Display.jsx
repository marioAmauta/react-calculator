import PropTypes from 'prop-types'
import { ELEMENT_IDS } from '../lib/constants'

export function Display({ formula, currentCharacter }) {
  return (
    <div
      id={ELEMENT_IDS.DISPLAY}
      className='output'
    >
      <div className='formula'>{formula}</div>
      <div className='current-character'>{currentCharacter}</div>
    </div>
  )
}

Display.propTypes = {
  formula: PropTypes.string.isRequired,
  currentCharacter: PropTypes.string.isRequired
}
