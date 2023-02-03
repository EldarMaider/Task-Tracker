import {useState, useEffect} from 'react'
import Alert from './Alert'


function AddTask({addTask, taskToEdit, editTask}) {
    const [taskInputs, setTaskInputs] = useState({text:"",day:"",reminder:false});
    const [showAlert, setShowAlert] = useState(false);

    const onSubmit = (e) => {
      e.preventDefault();
      if (taskInputs.text && taskInputs.day) {
        if (taskToEdit) {
            editTask(taskInputs);
        }
        else {
            addTask(taskInputs);
        }
        setTaskInputs({text:"",day:"",reminder:false});
      }
      else {
        setShowAlert(true);
      }
    }

    useEffect(() => {
        setTaskInputs(taskToEdit ? taskToEdit : {text:"",day:"",reminder:false});
    }, [taskToEdit])

    return (
        <>
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                <label>Task</label>
                <input
                    type='text'
                    placeholder='Add Task'
                    value={taskInputs.text}
                    onChange={(e)=>setTaskInputs({...taskInputs, text: e.target.value})}
                />
                </div>
                <div className='form-control'>
                <label>Day & Time</label>
                <input
                    type='text'
                    placeholder='Add Day & Time'
                    value={taskInputs.day}
                    onChange={(e) => setTaskInputs({...taskInputs, day: e.target.value})}
                />
                </div>
                <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input
                    type='checkbox'
                    checked={taskInputs.reminder}
                    value={taskInputs.reminder}
                    onChange={(e) => setTaskInputs({...taskInputs, reminder: e.currentTarget.checked})}
                />
                </div>
                <input type='submit' value={taskToEdit ? 'Edit Task' : 'Save Task'} className='btn btn-block' />
            </form>
            {showAlert && <Alert setShowAlert={setShowAlert}/>}
        </>
    )
}

export default AddTask
