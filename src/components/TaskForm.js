import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTask(task); // Pass the task to the parent component
      setTask(''); // Clear the input field after submitting
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)} // Update the task state
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
