import {useState, useEffect} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import allTasks from './tasks';
import AddTask from './components/AddTask';
// import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks, setTasks] = useState(allTasks);
  const [showForm, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/tasks');
      const data = await res.json();
      return data;
    }
    catch(err) {
      console.log(err)
    }
  }

  const deleteTask = async (taskId) => {
      await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE',
      });
      setTasks((prevTasks)=> prevTasks.filter((task)=>task.id !== taskId));
  }

  const toggleShowForm = () => {
    localStorage.setItem('showForm', !showForm);
    setShowForm((prevShowForm) => !prevShowForm);
  }

  const addTask = async (taskInput) => {
    if (taskInput.text && taskInput.day) {
      // const taskInputCopy = {...taskInput, id: uuidv4()}
      // setTasks((prevTasks)=>[...prevTasks, taskInputCopy])
      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(taskInput)
        });
      const data = await res.json();
      setTasks((prevTasks)=>[...prevTasks, data]);
    }
    else {
      alert("Please enter a valid exit");
    }
  }

   // Toggle Reminder
   const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  const getShowFornInStorage = () => {
    const show = localStorage.getItem('showForm');
    if(show) {
      setShowForm(show);
    }
  }

  const editMode = (taskToEdit) => {
    setTaskToEdit(taskToEdit)
    setShowForm(true);
  }

  // edit task
  const editTask = async (taskToEdit) => {
    const res = await fetch(`http://localhost:5000/tasks/${taskToEdit.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(taskToEdit),
    })

    const data = await res.json()

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskToEdit.id ? { ...taskToEdit } : task
      )
    )
    setTaskToEdit(null);
  }

  const cancleEdit = () => {
    setTaskToEdit(null);
    setShowForm(false);
  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
    getShowFornInStorage();
  }, [])

  return (
    <div className='container'>
      <Header toggleShowForm={toggleShowForm} showForm={showForm} taskToEdit={taskToEdit} cancleEdit={cancleEdit} />
      {showForm && <AddTask addTask={addTask} taskToEdit={taskToEdit} editTask={editTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onEditMode={editMode} onDelete={deleteTask} onToggle={toggleReminder}/> : <div>No tasks to show</div>}
    </div>
  )
}

export default App
