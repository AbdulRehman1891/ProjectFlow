import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Button } from 'components';
import Navigation from 'pages/Sidebar';
import { FaCheck, FaCalendarAlt } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TaskDetailsPopup from './taskdetails';

const MyTasksPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [hoveredTask, setHoveredTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);


  useEffect(() => {
    const currentDate = new Date();
    const fetchData = async () => {
      const dummyTasks = [
        { id: 'task-1', name: 'Task 1', dueDate: '2023-11-30', priority: 'High', status: 'Due', description: 'This task does smth smth to ensure smth smth and needs to be done in sm time. Thankyou for oming tomy ted talk' },
        { id: 'task-2', name: 'Task 2', dueDate: '2023-11-20', priority: 'Medium', status: 'Due', description: 'Description 2' },
        { id: 'task-3', name: 'Task 3', dueDate: '2023-11-25', priority: 'Normal', status: 'Overdue', description: 'Description 3' },
        { id: 'task-4', name: 'Task 4', dueDate: '2023-11-30', priority: 'High', status: 'Completed', description: 'Description 4' },
        { id: 'task-5', name: 'Task 5', dueDate: '2023-12-05', priority: 'Medium', status: 'Completed', description: 'Description 5' },
      ];

      // Update the status of tasks based on the due date
      const updatedTasks = dummyTasks.map((task) => {
        const taskDueDate = new Date(task.dueDate);
        if (currentDate > taskDueDate && task.status === 'Due') {
          return { ...task, status: 'Overdue' };
        }
        return task;
      });

      setTasks(updatedTasks);
    };

    fetchData();
  }, []);

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

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleClosePopup = () => {
    setSelectedTask(null);
  };


  const markTaskAsComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: 'Completed' } : task
    );
    setTasks(updatedTasks);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [reorderedItem] = updatedTasks.splice(result.source.index, 1);

    let newStatus;
    switch (result.destination.droppableId) {
      case 'dueTasks':
        newStatus = 'Due';
        break;
      case 'completedTasks':
        newStatus = 'Completed';
        break;
      case 'overdueTasks':
        newStatus = 'Overdue';
        break;
      default:
        newStatus = 'Due';
    }

    const updatedTaskWithStatus = { ...reorderedItem, status: newStatus };
    updatedTasks.splice(result.destination.index, 0, updatedTaskWithStatus);

    setTasks(updatedTasks);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <Navigation />

      <div className="flex flex-col justify-start md:mt-0 mt-[68px] w-[73%] md:w-full">
        <Text
          className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px] cursor-pointer"
          size="txtPoppinsRegular16"
          onClick={() => navigate('/myprofile')}
        >
          My Profile
        </Text>
        <Text
          className="mt-[95px] ml-[50px] sm:text-3xl md:text-[3px] text-[34px] text-left text-indigo-800"
          size="txtPoppinsBold34"
        >
          My Tasks
        </Text>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', margin: '20px 50px' }}>
            {/* Due Tasks */}
            <Droppable droppableId="dueTasks">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: 'white',
                    padding: 10,
                    width: 250,
                    marginBottom: '40px', // Add margin-bottom
                  }}
                >
                  <Text style = {{marginBottom: '20px'}}
                  className="text-base text-indigo-800" size="txtPoppinsBold16">
                    Due
                  </Text>
                  {tasks
                    .filter((task) => task.status === 'Due')
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => handleTaskClick(task)}
                            onMouseEnter={() => setHoveredTask(task)}
                            onMouseLeave={() => setHoveredTask(null)}
                            style={{
                              userSelect: 'none',
                              padding: 16,
                              margin: '0 0 8px 0',
                              minHeight: '50px',
                              backgroundColor: '#FFC436',
                              color: '#323F73',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              ...provided.draggableProps.style,
                            }}
                          >
                            <Text style={{ color: '#323F73', fontFamily: 'Poppins', fontWeight: 'bold' }}>{task.name}</Text>
                            <Text style={{ color: '#6B7280' }}>Due Date: {task.dueDate}</Text>
                            <Text style={{ color: `#${getPriorityColor(task.priority)}` }}>Priority: {task.priority}</Text>
                            <FaCheck  onClick={() => markTaskAsComplete(task.id)} size={20} color={`#323F73`} />
                            {hoveredTask && hoveredTask.id === task.id && (
                              <div>
                                <Text>Description: {task.description}</Text>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Completed Tasks */}
            <Droppable droppableId="completedTasks">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: 'white',
                    padding: 10,
                    width: 250,
                    marginLeft: '20px',
                    marginBottom: '20px', // Add margin-bottom
                  }}
                >
                  <Text style = {{marginBottom: '20px'}}
                  className="text-base text-indigo-800" size="txtPoppinsBold16">
                    Completed
                  </Text>
                  {tasks
                    .filter((task) => task.status === 'Completed')
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => handleTaskClick(task)}
                            onMouseEnter={() => setHoveredTask(task)}
                            onMouseLeave={() => setHoveredTask(null)}
                            style={{
                              userSelect: 'none',
                              padding: 16,
                              margin: '0 0 8px 0',
                              minHeight: '50px',
                              backgroundColor: '#82CD47',
                              color: '#323F73',
                              border: '1px solid #6c906c',
                              borderRadius: '8px',
                              ...provided.draggableProps.style,
                            }}
                          >
                            <Text style={{ color: '#323F73', fontFamily: 'Poppins', fontWeight: 'bold' }}>{task.name}</Text>
                            <Text style={{ color: '#6B7280' }}>Due Date: {task.dueDate}</Text>
                            <Text style={{ color: `#${getPriorityColor(task.priority)}` }}>Priority: {task.priority}</Text>
                            <FaCheck size={20} color={`#${getPriorityColor(task.priority)}`} />
                            {hoveredTask && hoveredTask.id === task.id && (
                              <div>
                                <Text>Description: {task.description}</Text>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Overdue Tasks */}
            <Droppable droppableId="overdueTasks">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: 'white',
                    padding: 10,
                    width: 250,
                    marginLeft: '20px',
                    marginBottom: '20px', // Add margin-bottom
                  }}
                >
                  <Text style = {{marginBottom: '20px'}} className="text-base text-indigo-800" size="txtPoppinsBold16">
                    Overdue
                  </Text>
                  {tasks
                    .filter((task) => task.status === 'Overdue')
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            {...provided.dragHandleProps}
                            onClick={() => handleTaskClick(task)}
                            onMouseEnter={() => setHoveredTask(task)}
                            onMouseLeave={() => setHoveredTask(null)}
                            style={{
                              userSelect: 'none',
                              padding: 16,
                              margin: '0 0 8px 0',
                              minHeight: '50px',
                              backgroundColor: '#E74646',
                              color: '#ffffff',
                              border: '1px solid #ff1a1a',
                              borderRadius: '8px',
                              ...provided.draggableProps.style,
                            }}
                          >
                            <Text style={{ color: '#323F73', fontFamily: 'Poppins', fontWeight: 'bold' }}>{task.name}</Text>
                            <Text style={{ color: '#6B7280' }}>Due Date: {task.dueDate}</Text>
                            <Text style={{ color: `#${getPriorityColor(task.priority)}` }}>Priority: {task.priority}</Text>
                            <FaCheck size={20} color={`#323F73`} onClick={() => markTaskAsComplete(task.id)} />
                            {hoveredTask && hoveredTask.id === task.id && (
                              <div>
                                <Text>Description: {task.description}</Text>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>

        {selectedTask && (
          <TaskDetailsPopup task={selectedTask} onClose={handleClosePopup} />
        )}

      </div>
    </div>
  );
};

export default MyTasksPage;
