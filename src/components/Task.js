import React from 'react'
import { FaTimes, FaEdit } from 'react-icons/fa';


function Task({task, onEditMode, onDelete, onToggle}) {
  return (
    <div className={`task ${task.reminder && 'reminder'}`} onDoubleClick={() => onToggle(task.id)}>
      <h3>{task.text}
        <div className='actionsWrapper'>
          <button className="edit" onClick={(e)=> onEditMode(task)}><FaEdit /></button>
          <button className="times" onClick={(e)=> onDelete(task.id)}><FaTimes /></button>
        </div>
      </h3>
      <p>{task.day}</p>
    </div>
  )
}

export default Task
