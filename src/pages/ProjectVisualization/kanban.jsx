// Import necessary modules and styles
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button } from 'components'; // Assuming Button is imported from 'components'
import { useNavigate } from 'react-router-dom';
import ProjectProgress from './details';
import KanbanPopup from './kanbanpopup';
import './KanbanComponent.css'; // Import your CSS file with responsive styles

const KanbanComponent = ({}) => {
  const navigate = useNavigate();

  // State for tasks and new category
  const [tasks, setTasks] = useState({
    todo: [
      { id: '1', content: 'Task 1' },
      { id: '2', content: 'Task 2' },
    ],
    inProgress: [
      { id: '3', content: 'Task 3' },
    ],
    done: [
      { id: '4', content: 'Task 4' },
    ],
  });
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false);
  const [showKanbanPopup, setShowKanbanPopup] = useState(false);
  const [categoryToAddTask, setCategoryToAddTask] = useState('');

  // Drag and drop handling
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const newTasks = { ...tasks };

    if (!newTasks[destination.droppableId]) {
      newTasks[destination.droppableId] = [];
    }

    const sourceTasks = [...newTasks[source.droppableId]];
    const [removedTask] = sourceTasks.splice(source.index, 1);

    const destinationTasks = [...newTasks[destination.droppableId]];
    destinationTasks.splice(destination.index, 0, removedTask);

    newTasks[source.droppableId] = sourceTasks;
    newTasks[destination.droppableId] = destinationTasks;

    setTasks(newTasks);
  };

  // Add a new category
  const handleAddCategory = () => {
    if (newCategory.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        [newCategory]: [],
      }));
      setNewCategory('');
      setShowAddCategoryPopup(false);
    }
  };

  // Delete a category
  const handleDeleteCategory = (category) => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[category];
    setTasks(updatedTasks);
  };

  // Open KanbanPopup for adding a task to a category
  const handleAddTaskToCategory = (category) => {
    setCategoryToAddTask(category);
    setShowKanbanPopup(true);
  };

  // Close KanbanPopup
  const closeKanbanPopup = () => {
    setShowKanbanPopup(false);
    setCategoryToAddTask('');
  };

  // Add a new task to a category
  const handleAddTask = (newTaskData, category) => {
    setTasks((prevTasks) => {
      const categoryTasks = [...prevTasks[category]];
      const newTask = {
        id: String(Date.now()),
        content: newTaskData.name,
        projectId: newTaskData.projectId,
        startDate: newTaskData.startDate,
        creatorName: newTaskData.creatorName,
        assignee: newTaskData.assignee,
        dueDate: newTaskData.dueDate,
        lastUpdationDate: newTaskData.lastUpdationDate,
        priority: newTaskData.priority,
        description: newTaskData.description,
      };

      categoryTasks.push(newTask);

      return {
        ...prevTasks,
        [category]: categoryTasks,
      };
    });

    setShowKanbanPopup(false);
  };

  return (
    <div>
      <ProjectProgress />

      <div className="kanban-container">
        {/* KanbanComponent content */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="kanban-columns">
            {/* Render existing categories */}
            {Object.keys(tasks)
              .sort()
              .map((columnId) => (
                <div key={columnId} className="kanban-column">
                  <div className="column-header">
                    <h3>{columnId === 'inProgress' ? 'In Progress' : columnId.toUpperCase()}</h3>
                    <div className="column-buttons">
                      <Button shape="round" onClick={() => handleDeleteCategory(columnId)} className="delete-button">
                        -
                      </Button>
                      <Button
                        shape="round"
                        color="indigo_800_01"
                        onClick={() => handleAddTaskToCategory(columnId)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? '#A3BFFA' : '#EDF2F7',
                          padding: '16px',
                          minHeight: '150px',
                          borderRadius: '8px',
                        }}
                      >
                        {tasks[columnId]?.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  userSelect: 'none',
                                  padding: '16px',
                                  margin: '0 0 16px 0',
                                  minHeight: '50px',
                                  backgroundColor: snapshot.isDragging ? '#4299E1' : '#2C5282',
                                  color: 'white',
                                  borderRadius: '8px',
                                  ...provided.draggableProps.style,
                                }}
                              >
                                {task.content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}

            {/* Render the new category if it exists */}
            {newCategory.trim() !== '' && (
              <div key={newCategory} className="kanban-column">
                <div className="column-header">
                  <h3>{newCategory.toUpperCase()}</h3>
                  <div className="column-buttons">
                    <Button shape="round" onClick={() => handleDeleteCategory(newCategory)} className="delete-button">
                      -
                    </Button>
                    <Button shape="round" color="indigo_800_01" onClick={() => handleAddTaskToCategory(newCategory)}>
                      +
                    </Button>
                  </div>
                </div>
                <Droppable droppableId={newCategory} key={newCategory}>
                  {/* Content for the new category */}
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver ? '#A3BFFA' : '#EDF2F7',
                        padding: '16px',
                        minHeight: '150px',
                        borderRadius: '8px',
                      }}
                    >
                      {tasks[newCategory]?.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: 'none',
                                padding: '16px',
                                margin: '0 0 16px 0',
                                minHeight: '50px',
                                backgroundColor: snapshot.isDragging ? '#4299E1' : '#2C5282',
                                color: 'white',
                                borderRadius: '8px',
                                ...provided.draggableProps.style,
                              }}
                            >
                              {task.content}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            )}
          </div>
        </DragDropContext>

       {/* Add category popup */}
       {showAddCategoryPopup && (
          <div className="add-category-popup">
            <label htmlFor="newCategory">Enter Category Name: </label>
            <input
              type="text"
              id="newCategory"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button shape="round" color="indigo_800_01" onClick={handleAddCategory}>
              Add
            </Button>
            <Button shape="round" onClick={() => setShowAddCategoryPopup(false)} className="cancel-button">
              Cancel
            </Button>
          </div>
        )}

        {/* Kanban popup */}
        {showKanbanPopup && (
          <KanbanPopup
            task={{
              name: '',
              dueDate: '',
              assignee: '',
              description: '',
            }}
            onClose={closeKanbanPopup}
            onAddTask={(newTaskData) => handleAddTask(newTaskData, categoryToAddTask)}
          />
        )}

        {/* Button to add a new category */}
        <div className="add-category-button">
          <Button style={{ position: 'absolute', top: 400, right: 80, margin: '8px' }} shape="round" color="indigo_800_01" onClick={() => setShowAddCategoryPopup(true)}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KanbanComponent;
