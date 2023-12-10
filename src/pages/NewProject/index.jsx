import React, { useState, useEffect } from 'react';
import { Button, Text } from 'components';
import { useNavigate } from 'react-router-dom';
import { MyDatePicker } from 'components'; // Make sure this is the correct import path
import Navigation from 'pages/Sidebar'; // Make sure this is the correct import path
import { useSpring, animated } from 'react-spring';

const NewProjectPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: '',
    startDate: null,
    dueDate: null,
    description: '',
  });

  const [popUp, setPopUp] = useState({
    type: null, // 'success' or 'error'
  });

  const handleDueDateChange = (date) => {
    setFormData({ ...formData, dueDate: date });
  };

  const handleStartDateChange = (date) => {
    setFormData({ ...formData, startDate: date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateProject = () => {
    if (!formData.projectName || !formData.description || !formData.dueDate) {
      console.error('Please fill out all required fields.');
      setPopUp({ type: 'error' });
      return;
    }

    const projectData = {
      name: formData.projectName,
      end_date: formData.dueDate,
      description: formData.description,
    };

    let token = localStorage.getItem('token');

    fetch('http://127.0.0.1:3000/api/v1/projects', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    })
      .then((response) => response.json())
      .then((data) => {
        setPopUp({ type: 'success' });
        navigate('/myprojects');
      })
      .catch((error) => {
        setPopUp({ type: 'error' });
        console.error('Project creation failed', error);
      });
  };

  const popUpAnimation = useSpring({
    opacity: popUp.type ? 1 : 0,
    pointerEvents: popUp.type ? 'auto' : 'none',
  });

  useEffect(() => {
    // Set a timer to clear the pop-up after 3000 milliseconds (3 seconds)
    const timer = setTimeout(() => {
      setPopUp({ type: null });
    }, 3000);

    // Clear the timer when the component unmounts or when popUp.type changes
    return () => clearTimeout(timer);
  }, [popUp.type]);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        {/* Sidebar */}
        <Navigation />
        {/* New Project Form */}
        <div className="flex flex-col justify-start md:mt-0 mt-[68px] w-[73%] md:w-full">
          <Text
            className="md:ml-[0] ml-[849px] text-base text-indigo-800 tracking-[0.44px]"
            size="txtPoppinsRegular16"
            onClick={() => navigate('/myprofile')}
          >
            My Profile
          </Text>
          <Text
            className="ml-[50px] sm:text-3xl md:text-[3px] text-[34px] text-left text-indigo-800 flex items-center"
            size="txtPoppinsBold34"
          >
            New Project
          </Text>
          <div className="ml-[45px] bg-gray-50 flex flex-col items-center justify-end mt-8 p-[39px] sm:px-5 rounded-[30px] w-full">
            <div className="flex flex-col items-start justify-start mt-[19px] w-[95%] md:w-full">
              {/* Project Creation Date */}
              <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
                <Text className="text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                  Project Start Date
                </Text>
                <MyDatePicker selectedDate={formData.startDate} handleDateChange={handleStartDateChange} />
              </div>

              {/* Project Name */}
              <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
                <Text className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                  Project Name
                </Text>
                <div className="border-b bg-gray-50 border-indigo-800 text-base w-[76%]">
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    className="text-base w-full bg-gray-50 border-none border-b-2 border-indigo-800 focus:outline-none"
                  />
                </div>
              </div>

              {/* Project Creation Date */}
              <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
                <Text className="text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                  Due Date
                </Text>
                <MyDatePicker selectedDate={formData.dueDate} handleDateChange={handleDueDateChange} />
              </div>

              {/*Description*/}
              <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-9 w-[97%] md:w-full">
                <Text className="text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                  Description
                </Text>
                <div className="border-b bg-gray-50 border-indigo-800 text-base w-[76%]">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="text-base w-full bg-gray-50 border-none border-b-2 border-indigo-800 focus:outline-none"
                  />
                </div>
              </div>
               {/* Button to Invite Team Member */}
              {/* Button to Invite */}
                <Button
                  className="cursor-pointer leading-[normal] min-w-[84px] ml-[635px] mt-[63px] text-base text-center tracking-[0.44px]"
                  shape="round"
                  style = {{backgroundColor: "#860A35", color: "#ffffff"}}
                  onClick={() => navigate('/invite')}
                  
                >
                  Invite
                </Button>

                {/* Button to Create Project */}
                <Button
                  className="cursor-pointer leading-[normal] min-w-[84px] ml-[745px] mt-[-42px] text-base text-center tracking-[0.44px]"
                  shape="round"
                  color="indigo_800"
                  onClick={handleCreateProject}
                >
                  Create
                </Button>

            </div>
          </div>
        </div>
      </div>

      <animated.div
        style={{
          ...popUpAnimation,
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: popUpAnimation.opacity.interpolate((opacity) => `translate(-50%, -50%) scale(${opacity})`),
          background: popUp.type === 'success' ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <p>
          {popUp.type === 'success' ? 'Project Created Successfully!' : 'Project Creation Failed. Please try again.'}
        </p>
      </animated.div>
    </>
  );
};

export default NewProjectPage;
