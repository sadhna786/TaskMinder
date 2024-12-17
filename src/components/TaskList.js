import React from 'react';

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <div className="task-content">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
              className="task-checkbox"
            />
            <span className="task-text">{task.task}</span>
          </div>
          <div className="task-buttons">
            <button onClick={() => onDeleteTask(task.id)} className="delete-button">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
