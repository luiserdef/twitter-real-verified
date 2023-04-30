import * as React from 'react'
import DropdownIcon from '../assets/dropdownIcon.svg'

function Dropdown ({ title, children }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownContentRef = React.useRef(null)

  React.useEffect(() => {
    if (isOpen) {
      dropdownContentRef.current.style.height = `${dropdownContentRef.current.scrollHeight}px`
    } else {
      dropdownContentRef.current.style.height = '0px'
    }
  }, [isOpen])

  return (
    <div className='dropdown'>
      <button onClick={() => setIsOpen(last => !last)} className='dropdown-bt'>
        {title}
        <DropdownIcon
          className={`${isOpen ? 'dropdown-open' : 'dropdown-close'}`}
          fill='#ffffff'
          width='15'
          height='15'
        />
      </button>
      <div ref={dropdownContentRef} className='dropdown-content'>
        {children}
      </div>
      {/* {isOpen && children} */}
    </div>
  )
}

export default Dropdown
