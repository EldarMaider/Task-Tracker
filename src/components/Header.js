import React from 'react'

const Header = ({toggleShowForm, showForm, taskToEdit, cancleEdit}) => {
  return (
    <header className='header'>
      <h1>Task Tracker</h1>
      <div>
        {taskToEdit && <button className='btn' onClick={() => cancleEdit()}>Cancle Edit</button>}
        <button className={`btn ${showForm ? 'close' : 'add'}`} onClick={() => toggleShowForm()}>{showForm ? 'Close' : taskToEdit? 'Edit' : 'Add'}</button>
      </div>
    </header>
  )
}

export default Header
