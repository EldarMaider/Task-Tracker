import {useState} from 'react'
import Task from './Task';

const Tasks = ({tasks, onEditMode, onDelete, onToggle}) => {

  return (
    <div>
      {tasks.map((task)=> <Task key={task.id} task={task} onEditMode={onEditMode} onDelete={onDelete} onToggle={onToggle} />)}
    </div>
  )
}

export default Tasks
