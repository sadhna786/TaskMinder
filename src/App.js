import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Filter from './components/Filter';
import HowToDoTask from './components/HowToDoTask';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // For filtering tasks based on their status

  // Load tasks from localStorage when the app starts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    
    if (savedTasks) {
      setTasks(savedTasks); // Load tasks if they exist
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = (taskText) => {
    if (taskText.trim() === '') return; // Prevent empty tasks
    setTasks([...tasks, { id: Date.now(), task: taskText.trim(), completed: false }]);
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task =>
    filter === 'all' ? true :
    filter === 'completed' ? task.completed :
    !task.completed
  );

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskForm onAddTask={addTask} />
      <Filter filter={filter} setFilter={setFilter} />
      <TaskList
        tasks={filteredTasks}
        onToggleTask={toggleTaskCompletion}
        onDeleteTask={deleteTask}
      />
      <HowToDoTask />
    </div>
  );
};

export default App;
