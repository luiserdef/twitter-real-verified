import React from 'react'
import { hsvaToHex, hexToHsva } from '@uiw/color-convert'
import Hue from '@uiw/react-color-hue'
import ShadeSlider from '@uiw/react-color-shade-slider'
import Reload from '../assets/reload.svg'
import { VERIFIED_BADGE_DEFAULT_COLOR } from '../../constants'

function ColorPicker ({ propertyKey, currentUserColor, updateCurrentColor }) {
  function updateColor (color) {
    updateCurrentColor(propertyKey, color)
  }
  return (
    <>
      <div className='row-center' style={{ gap: '.5em', marginLeft: '10%' }}>
        <div className='color-picker-sliders'>
          <Hue
            width='120px'
            hue={hexToHsva(currentUserColor).h}
            onChange={(newHue) => {
              const convertedValue = { ...hexToHsva(currentUserColor), ...newHue }
              updateColor(hsvaToHex(convertedValue))
            }}
          />
          <ShadeSlider
            hsva={hexToHsva(currentUserColor)}
            onChange={(newShade) => {
              const convertedValue = { ...hexToHsva(currentUserColor), ...newShade }
              updateColor(hsvaToHex(convertedValue))
            }}
          />
        </div>
        <Reload
          style={{ cursor: 'pointer' }}
          fill='#ffffff'
          onClick={(color) => updateColor(VERIFIED_BADGE_DEFAULT_COLOR)}
        />
      </div>
    </>
  )
}
export default ColorPicker
