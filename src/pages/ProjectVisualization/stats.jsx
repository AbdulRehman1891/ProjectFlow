import React, { useState, useEffect } from 'react';
import { useSpring,animated } from 'react-spring';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PieChart } from 'react-minimal-pie-chart';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { Text, Img, Button } from 'components';
import ProjectProgress from './details';
import './TaskDetailsPopup.css';


const TaskDetailsPopup = ({ task, onClose, onDelete }) => {
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Add logic to save the edited task details
    console.log('Saving changes:', editedTask);
    // You may want to make an API call or update state with the edited task
  };

  const popupAnimation = useSpring({
    from: { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
    to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
  });

  return (
    <>
      {/* Background Overlay */}
      <div
        className="popup-overlay"
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
        onClick={onClose} // Close the popup if clicked outside the form
      ></div>

      {/* Popup */}
      <animated.div
        className="task-details-popup"
        style={{
          ...popupAnimation,
          zIndex: 2,
        }}
      >
        <h2>Edit Task: {editedTask.name}</h2>
        
        <div className="field">
          <label>Task Name:</label>
          <input
            type="text"
            name="name"
            value={editedTask.name}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="field">
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="field">
          <label>Assignee:</label>
          <select
            name="assignee"
            value={editedTask.assignee}
            onChange={handleInputChange}
          >
            <option value="team-member-1">Team Member 1</option>
            <option value="team-member-2">Team Member 2</option>
            {/* Add more options for other team members */}
          </select>
        </div>

        <Button style={{backgroundColor: " #48BB78", color: "#ffffff"}}onClick={handleSaveChanges}>Save Changes</Button>
        <Button style={{backgroundColor: " #BE3144", color: "#ffffff"}} onClick={onDelete}>Delete Task</Button>
        <Button style={{backgroundColor: " #323F73", color: "#ffffff"}} onClick={onClose}>Close</Button>
      </animated.div>
    </>
  );
};


const TaskTable = ({ tasks, projectId }) => {


  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handlePopupClose = () => {
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    // Implement task deletion logic here
    // You may want to use an API call or update state to remove the task
    console.log('Deleting task:', selectedTask);
    handlePopupClose(); // Close the popup after deletion
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'poppins', marginTop: '80px' }}>
        <h2 style={{ color: '#323F73', marginBottom: '10px', fontFamily: 'poppins', fontSize: "30px" }}>Task List</h2>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginRight: '50px', marginBottom: '20px' }}>
            {/* '+' Button for Creating Tasks */}
            <Link to={`/newtask?projectId=${projectId}`}>
              <Button
                style={{
                  cursor: "pointer",
                  minWidth: "40px",
                  marginRight: "50px",
                  fontSize: "30px",
                  color: "#323F73",
                  width: "40px",
                  height: "40px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  border: "1px solid #323F73",
                  transition: "background-color 0.3s, color 0.3s",
                }}
                onClick={() => navigate('/newtask')}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#323F73";
                  e.currentTarget.style.color = "#F8FAFC";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "";
                  e.currentTarget.style.color = "#323F73";
                }}
              >
                +
              </Button>
            </Link>

            {/* Button to Invite */}
            <Button
              className="cursor-pointer leading-[normal] min-w-[84px] text-base text-center tracking-[0.44px]"
              shape="round"
              style={{ backgroundColor: "#860A35", color: "#ffffff", marginRight: "50px" }}
              onClick={() => navigate('/invite')}
            >
              Invite
            </Button>
          </div>
        </div>
      </div>
      <TableContainer component={Paper} style={{ marginBottom: '10px', background: '#f5f5f5', fontFamily: 'poppins' }}>
        <Table style={{ minWidth: 650, background: '#f5f5f5' }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: '#323F73' }}>Task Name</TableCell>
              <TableCell style={{ color: '#323F73' }}>Due Date</TableCell>
              <TableCell style={{ color: '#323F73' }}>Task Assignee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {tasks.map((task, index) => (
              <TableRow key={index} onClick={() => handleTaskClick(task)} style={{ cursor: 'pointer' }}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>{task.assignee}</TableCell>
              </TableRow>
            ))}
            
          </TableBody>
        </Table>
      </TableContainer>

      {/* TaskDetailsPopup */}
      {selectedTask && (
        <TaskDetailsPopup
          task={selectedTask}
          onClose={handlePopupClose}
          onDelete={handleDeleteTask}
        />
      )}

    </div>
  );
};




const ProjectStats = ({
  statisticsData,
  pieChartSize,
  pieChartData,
  tasks,
  projectId,
}) => {
  const [hoveredPie, setHoveredPie] = useState(false);

  const progressAnimation = useSpring({
    opacity: 1,
    value: pieChartData[0]?.value || 0,
    from: { opacity: 0, value: 0 },
  });

  return (
    <div>
      <ProjectProgress />
      <div style={{ marginLeft: '350px', marginTop: '-180px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '-20px' }}>
          <div style={{ width: '40%' }}>
            {/* Line chart for project statistics */}
            <ResponsiveContainer width="100%" height={200}>
            <LineChart data={statisticsData} margin={{ top: 5, right: 10, left: 10, bottom: 30 }}>
              <XAxis dataKey="name" label={{ position: 'insideBottom', offset: -10 }} />
              <YAxis label={{ value: 'Tasks', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="progress" stroke="#860A35" activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="completedTasks" stroke="#48BB78" activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="remainingTasks" stroke="#F6E05E" activeDot={{ r: 6 }} />
            </LineChart>

            </ResponsiveContainer>
          </div>

          <div style={{ width: '60%' }} onMouseEnter={() => setHoveredPie(true)} onMouseLeave={() => setHoveredPie(false)}>
            {/* Animated Pie Chart */}
            <ResponsiveContainer width="100%" height={200}>
              <PieChart
                animate
                animationDuration={1000}
                animationEasing="ease-out"
                center={[pieChartSize / 2, pieChartSize / 2]}
                data={pieChartData}
                label={({ dataEntry }) => Math.round(dataEntry.value) + '%'}
                labelPosition={50}
                labelStyle={{
                  fontSize: '10px',
                  fontFamily: 'sans-serif',
                  fill: '#323F73',
                  pointerEvents: 'none',
                }}
                lengthAngle={360}
                lineWidth={30}
                onClick={() => console.log('Click on pie chart')}
                onMouseEnter={() => console.log('Mouse enter')}
                onMouseLeave={() => console.log('Mouse leave')}
                paddingAngle={0}
                radius={100}
                startAngle={0}
                viewBoxSize={[pieChartSize, pieChartSize]}
              />
            </ResponsiveContainer>
            {hoveredPie && (
              <div
                style={{
                  marginTop: '10px',
                  color: '#323F73',
                  fontWeight: 'bold',
                }}
              >
                {Math.round(progressAnimation.value)}%
              </div>
            )}
          </div>
        </div>
        {/* Display Task List */}
        <TaskTable tasks={tasks} projectId={projectId} />
      </div>
    </div>
  );
};

const ProjectVisualization = () => {
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    // Fetch project details based on the project ID (replace with your actual logic)
    const projectId = 'your_project_id';
    const placeholderProjectDetails = {
      progress: 60,
      statisticsData: [
        { name: 'Week 0', progress: 10, completedTasks: 0, remainingTasks: 20 },
        { name: 'Week 1', progress: 20, completedTasks: 5, remainingTasks: 15 },
        { name: 'Week 2', progress: 50, completedTasks: 25, remainingTasks: 25 },
        // ... more data points
      ],
      tasks: [
        { name: 'Task 1', dueDate: '2023-01-01', assignee: 'User 1' },
        { name: 'Task 2', dueDate: '2023-02-01', assignee: 'User 2' },
        // ... more tasks
      ],
      pieChartData: [
        { value: 60, color: '#860A35' },
        { value: 30, color: '#e0e0e0' },
        { value: 10, color: '#323F73' },
      ],
    };
    setProjectDetails(placeholderProjectDetails);
  }, []);

  if (!projectDetails) {
    // Placeholder loading state
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <Img className="h-[100px] w-[100px]" src="images/loading.gif" alt="Loading" />
      </div>
    );
  }

  return (
    <div>
      {/* Render the progress component */}
      <ProjectStats
        projectId={projectDetails.projectId}
        handleCategoryChange={() => {}} // Placeholder functions, replace with your logic
        handleNavigate={() => {}}
        handleDeletionProject={() => {}}
        loading={false} // Placeholder loading state
        successPopupAnimation={{ opacity: 0, transform: 'scale(0)' }} // Placeholder animation state
        statisticsData={projectDetails.statisticsData}
        pieChartSize={200}
        hovered={false} // Placeholder hover state
        pieChartData={projectDetails.pieChartData}
        tasks={projectDetails.tasks}
      />
    </div>
  );
};

export default ProjectVisualization;
