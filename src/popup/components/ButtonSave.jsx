import * as React from 'react'

function ButtonSave ({ txt, isThereChanges, saveChanges }) {
  return (
    <div className='action-bt'>
      <button
        disabled={!isThereChanges}
        className={`${isThereChanges ? 'bt-save' : ''} bt bt-save-action`}
        id='txt-bt-save'
        onClick={saveChanges}
      >
        {txt('bt_save')}
      </button>
    </div>
  )
}

export default ButtonSave
