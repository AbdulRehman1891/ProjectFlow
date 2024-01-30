import React, { useEffect, useState } from 'react';
import { Text, Button } from 'components';
import Navigation from 'pages/Sidebar';
import ProjectProgress from './details';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = ({
  loading,
  successPopupAnimation,
  statisticsData,
  pieChartSize,
  hovered,
  pieChartData,
  tasks,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Calendar');
  const navigate = useNavigate();

    const {projectId}=useParams();

    const [task, setTask] = useState([]);

  useEffect(() => {
    // Fetch project details from the API based on the 'projectId' parameter
    const token = localStorage.getItem("token");

    // Fetch the project details using a GET request
    fetch(`http://127.0.0.1:3000/api/v1/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Project not found");
        }
        return response.json();
      })
      .then((data) => {
        
        console.log(data.data.project.tasks);
       
        setTask(data.data.project.tasks);
       
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, [projectId]);

  const events = task.map((task) => ({
    id: task.id,
    title: task.name,
    start: new Date(task.start_date),
    end: new Date(task.end_date),
  }));

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleNavigate = () => {
    console.log(`Navigate to ${selectedCategory} view`);
  };

  const handleDeletionProject = () => {
    console.log(`Delete project in ${selectedCategory} view`);
  };

  const handleEventClick = (event) => {
    console.log(`Clicked on event: ${event.title}`);
  };

  return (
    <div>
      <ProjectProgress
        handleCategoryChange={handleCategoryChange}
        handleNavigate={handleNavigate}
        handleDeletionProject={handleDeletionProject}
        loading={loading}
        successPopupAnimation={successPopupAnimation}
        statisticsData={statisticsData}
        pieChartSize={pieChartSize}
        hovered={hovered}
        pieChartData={pieChartData}
        tasks={tasks}
      />
      <div>
        <div style={{ marginTop: '-250px', marginLeft: '350px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h3 style={{ color: '#323F73' }}>Calendar View</h3>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, marginTop: '20px' }}
            onSelectEvent={handleEventClick}
            eventPropGetter={(event, start, end, isSelected) => {
              const backgroundColor = isSelected ? '#4299E1' : '#2C5282';
              const borderColor = isSelected ? '#4299E1' : '#2C5282';
              return { style: { backgroundColor, borderColor, color: 'white' } };
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;