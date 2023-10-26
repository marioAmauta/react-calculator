import PropTypes from 'prop-types'
import { ELEMENT_IDS } from '../lib/constants'

export function Display({ formula, output }) {
  return (
    <div className='output'>
      <div className='formula'>{formula}</div>
      <div
        id={ELEMENT_IDS.DISPLAY}
        className='current-character'
      >
        {output}
      </div>
    </div>
  )
}

Display.propTypes = {
  formula: PropTypes.string.isRequired,
  output: PropTypes.string.isRequired
}
