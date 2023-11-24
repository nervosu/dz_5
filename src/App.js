import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editedTask, setEditedTask] = useState({ id: null, text: '' });
  const [searchId, setSearchId] = useState('');
  const [searchedTask, setSearchedTask] = useState(null);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setEditedTask({ id, text: taskToEdit.text });
  };

  const updateTask = () => {
    setTasks(tasks.map(task => (task.id === editedTask.id ? { ...task, text: editedTask.text } : task)));
    setEditedTask({ id: null, text: '' });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const searchTask = () => {
    const foundTask = tasks.find(task => task.id === parseInt(searchId));
    setSearchedTask(foundTask || null);
  };

  return (
    <div className="App">
      <h1>ToDo List</h1>
      <div>
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New Task" />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>
        <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} placeholder="Search Task by ID" />
        <button onClick={searchTask}>Search</button>
      </div>
      <ul>
        {searchedTask ? (
          <li key={searchedTask.id} className="searched-task">
            {searchedTask.text}
          </li>
        ) : (
          tasks.map(task => (
            <li key={task.id}>
              {task.id === editedTask.id ? (
                <div>
                  <input type="text" value={editedTask.text} onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })} />
                  <button onClick={updateTask}>Update</button>
                </div>
              ) : (
                <div>
                  {task.text}
                  <button onClick={() => editTask(task.id)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
