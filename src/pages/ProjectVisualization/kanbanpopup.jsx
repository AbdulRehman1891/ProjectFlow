import React, { useState } from 'react';
import { Text, Button } from 'components';
import { useSpring, animated } from 'react-spring';

const KanbanPopup = ({ task, onClose, onAddTask }) => {
  const [editedTask, setEditedTask] = useState({
    name: task.name,
    dueDate: task.dueDate,
    priority: task.priority,
    status: task.status,
    assignee: task.assignee,
    subtasks: task.subtasks ? task.subtasks.join(', ') : '',
    description: task.description,
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red-700_01';
      case 'Medium':
        return 'deep_orange-500_01';
      case 'Normal':
        return 'green-A700_01';
      default:
        return 'gray-900';
    }
  };

  const popupAnimation = useSpring({
    from: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
    to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
  });

  const handleInputChange = (field, value) => {
    setEditedTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));
  };

  const handleAddTask = () => {
    // Call the onAddTask function with the updated task data
    onAddTask(editedTask);
    // Close the popup
    onClose();
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(5px)',
          zIndex: 1,
        }}
      ></div>

      {/* Popup */}
      <animated.div
        className="popup-container"
        style={{
          ...popupAnimation,
          zIndex: 2,
        }}
      >
        <div
          className="bg-gray-50 popup-content"
          style={{
            width: '80%',
            padding: '20px',
            borderRadius: '10px',
            position: 'relative',
            top: '5%',
            left: '100%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Text  style={{ fontFamily: 'Poppins',  fontSize: '16px', marginBottom: '10px' }}>
            Name: {' '}
            <input
              type="text"
              value={editedTask.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              style={{ fontSize: '16px', fontFamily: 'Poppins',  border: 'none', outline: 'none', background: 'none' }}
            />
          </Text>
          <div style={{ marginBottom: '10px' }}>
            <Text style={{ fontSize: '16px', fontFamily: 'Poppins' }}>
              Due Date:{' '}
              <input
                type="date"
                value={editedTask.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                style={{ fontSize: '16px', fontFamily: 'Poppins', border: 'none', outline: 'none', background: 'none' }}
              />
            </Text>
          </div>

          <div style={{ marginBottom: '10px' }}>
          <Text style={{ fontSize: '16px', fontFamily: 'Poppins' }}>
            Task Assignee:{' '}
            <select
                value={editedTask.assignee}
                onChange={(e) => handleInputChange('assignee', e.target.value)}
                style={{ fontSize: '16px', fontFamily: 'Poppins', border: 'none', outline: 'none', background: 'none' }}
            >
                <option value="team-member-1">Team Member 1</option>
                <option value="team-member-2">Team Member 2</option>
                {/* Add more options for other team members */}
            </select>
            </Text>

          </div>

          <div style={{ marginBottom: '10px' }}>
            <Text style={{ fontSize: '16px' , fontFamily: 'Poppins',}}>
              Description:{' '}
              <input
                type="text"
                value={editedTask.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                style={{ fontSize: '16px', fontFamily: 'Poppins', border: 'none', outline: 'none', background: 'none' }}
              />
            </Text>
          </div>

          <div className="flex flex-row justify-end">
            <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" onClick={handleAddTask}>
              Add
            </Button>
          </div>
        </div>
      </animated.div>
    </>
  );
};

export default KanbanPopup;
