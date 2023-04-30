import * as React from 'react'

function CheckboxInput ({ propertyKey, checkboxStatus, updateFunction, text }) {
  return (
    <div className='input-option'>
      <input
        id={propertyKey}
        className='checkbox-input'
        type='checkbox'
        onChange={() => updateFunction(propertyKey, !checkboxStatus)}
        checked={checkboxStatus}
      />
      <label className='row-center' style={{ gap: '2px' }} htmlFor={propertyKey}>
        {text}
      </label>
    </div>
  )
}

export default CheckboxInput
