import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (input.trim() === '') {
      alert('Please enter a task!');
      return;
    }
    setTasks([...tasks, { text: input.trim(), done: false }]);
    setInput('');
  }

  function toggleDone(index) {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  }

  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText !== null && newText.trim() !== '') {
      const updated = [...tasks];
      updated[index].text = newText.trim();
      setTasks(updated);
    }
  }

  const remaining = tasks.filter(t => !t.done).length;

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.done;
    if (filter === 'done') return task.done;
    return true;
  });

  return (
    <div className="container">
      <h1>My To-Do List</h1>
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>
      <p>{remaining} {remaining === 1 ? 'task' : 'tasks'} left</p>
      <div className="filters">
        <button
          className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('all')}
        >All</button>
        <button
          className={filter === 'active' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('active')}
        >Active</button>
        <button
          className={filter === 'done' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('done')}
        >Done</button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index} className={task.done ? 'done' : ''}>
            <span onClick={() => toggleDone(index)} onDoubleClick={() => editTask(index)}>
              {task.text}
            </span>
            <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;