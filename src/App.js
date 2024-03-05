import React, { useState, useContext, createContext } from 'react';
import './App.css'; 
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};

const TaskList = () => {
  const { tasks, deleteTask } = useTasks();

  return (
    <div className="tasks">
      {tasks.map((task) => (
        <div key={task.id} className="task" style={{ color: task.priority }}>
          {task.name}
          <button className="delete" onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
      <div>Task count: {tasks.length}</div>
    </div>
  );
};

const AddTask = () => {
  const { addTask } = useTasks();
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('red');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ id: Date.now(), name, priority });
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="red">High</option>
        <option value="yellow">Medium</option>
        <option value="green">Low</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

const App = () => {
  return (
    <TaskProvider>
      <h1>Todo List</h1>
      <AddTask />
      <TaskList />
    </TaskProvider>
  );
};

export default App;
