import * as React from 'react'
import DropdownIcon from '../assets/dropdownIcon.svg'

function Dropdown ({ title, documentHeight, children }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownContentRef = React.useRef(null)

  // This fixes issues when the content changes to avoid scrollbar in Firefox browser.
  function contentChanged (isContentExpanded, expandedValue) {
    if (typeof browser !== 'undefined') {
      if (isContentExpanded) {
        documentHeight.current.style.height = `${documentHeight.current.clientHeight + expandedValue}px`
      } else {
        documentHeight.current.style.height = '100%'
      }
    }
  }

  React.useEffect(() => {
    if (isOpen) {
      dropdownContentRef.current.style.height = `${dropdownContentRef.current.scrollHeight}px`
      contentChanged(true, dropdownContentRef.current.scrollHeight)
    } else {
      dropdownContentRef.current.style.height = '0px'
      contentChanged(false)
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
