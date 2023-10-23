import PropTypes from 'prop-types'

export function Button({ id, label, onClick, customClass = '' }) {
  return (
    <button
      id={id}
      className={customClass}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  customClass: PropTypes.string
}
