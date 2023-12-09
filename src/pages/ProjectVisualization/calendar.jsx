import React, { useState } from 'react';
import { Text, Button } from 'components';
import Navigation from 'pages/Sidebar';
import ProjectProgress from './details';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

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

  const [events, setEvents] = useState([
    { id: 1, title: 'Task 1', start: new Date('2023-12-01'), end: new Date('2023-12-02') },
    { id: 2, title: 'Task 2', start: new Date('2023-12-05'), end: new Date('2023-12-06') },
    { id: 3, title: 'Task 3', start: new Date('2023-12-10'), end: new Date('2023-12-11') },
    // Add more tasks as needed
  ]);

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
        <div style={{ marginTop: '20px', marginLeft: '350px' }}>
          <h3>Calendar View</h3>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={handleEventClick}
            eventPropGetter={(event, start, end, isSelected) => {
              const backgroundColor = isSelected ? '#4299E1' : '#2C5282';
              const borderColor = isSelected ? '#4299E1' : '#2C5282';
              return { style: { backgroundColor, borderColor } };
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarComponent;
