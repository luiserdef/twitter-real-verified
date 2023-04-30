import React from 'react'
import DropdownIcon from '../assets/dropdownIcon.svg'
function BadgeColorSelection ({ Badge, currentUserColor, title, isBadgeSelected, updateSelection }) {
  const selectedPickerStyle = {
    width: '20px',
    height: '20px'
  }
  return (
    <div style={{ width: '95px' }} className='no-resize column-center'>
      <div style={selectedPickerStyle}>
        {isBadgeSelected &&
          <DropdownIcon
            className='picker-selection'
            width={selectedPickerStyle.width}
            height={selectedPickerStyle.heigth}
          />}
      </div>
      <div onClick={updateSelection} className='no-resize column-center '>
        <div className='row-center  badge-color-container select-badge-color'>
          <div className='bg-badge select-badge-color'>
            <Badge fill={currentUserColor} />
          </div>
          <div className='bg-badge '>
            <Badge fill={currentUserColor} />
          </div>
        </div>
        <p style={{ textAlign: 'center' }}>{title}</p>
      </div>
    </div>
  )
}

export default BadgeColorSelection
