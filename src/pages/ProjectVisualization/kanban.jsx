import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, MyDatePicker } from 'components'; // Assuming MyDatePicker is imported from 'components'
import { useNavigate } from 'react-router-dom';
import ProjectProgress from './details';
import KanbanPopup from './kanbanpopup';

const KanbanComponent = ({}) => {
  const navigate = useNavigate();
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

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
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

  const handleDeleteCategory = (category) => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[category];
    setTasks(updatedTasks);
  };

  const handleAddTaskToCategory = (category) => {
    setCategoryToAddTask(category);
    setShowKanbanPopup(true);
  };

  const closeKanbanPopup = () => {
    setShowKanbanPopup(false);
    setCategoryToAddTask('');
  };

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

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '250px', marginTop: '-300px' }}>
        {/* KanbanComponent content */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
            {Object.keys(tasks).map((columnId) => (
              <div key={columnId} style={{ margin: '16px', backgroundColor: '#E2E8F0', borderRadius: '8px', padding: '16px', width: '300px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3>{columnId.toUpperCase()}</h3>
                  <div>
                    <Button shape="round" onClick={() => handleDeleteCategory(columnId)} style={{ marginRight: '8px', backgroundColor: '#BE3144', color: '#ffffff' }}>
                      -
                    </Button>
                    <Button shape="round" color="indigo_800_01" onClick={() => handleAddTaskToCategory(columnId)} style={{ color: '#ffffff' }}>
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
                      {tasks[columnId].map((task, index) => (
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
          </div>
        </DragDropContext>

        {showAddCategoryPopup && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(253, 249, 249, 0.8)', padding: '16px', borderRadius: '8px', backdropFilter: 'blur(5px)' }}>
            <label htmlFor="newCategory">Enter Category Name: </label>
            <input
              type="text"
              id="newCategory"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button color="indigo_800_01" shape="round" onClick={handleAddCategory} style={{ color: '#ffffff', marginRight: '8px' }}>
              Add
            </Button>
            <Button shape="round" onClick={() => setShowAddCategoryPopup(false)} style={{ backgroundColor: '#BE3144', color: '#ffffff' }}>
              Cancel
            </Button>
          </div>
        )}

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

        <div>
          <Button shape="round" color="indigo_800_01" onClick={() => setShowAddCategoryPopup(true)} style={{ color: '#ffffff' }}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KanbanComponent;
