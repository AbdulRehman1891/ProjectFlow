import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faTimes } from "@fortawesome/free-solid-svg-icons";
import Navigation from "pages/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import { Text, Button } from "components";
import { MyDatePicker } from "components";
import { useSpring, animated } from 'react-spring';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const NewTaskPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [popUp, setPopUp] = useState({ type: "", message: "" });
  const [isMicrophoneClicked, setMicrophoneClicked] = useState(false);
  const [isRecording, setRecording] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [formData, setFormData] = useState({
    projectId: "",
    startDate: "",
    projectName: "",
    creatorName: "",
    assignee: "",
    dueDate: "",
    lastUpdationDate: "",
    priority: "",
    description: "",
  });

  const projects = [
    { id: 1, name: 'Project 1' },
    { id: 2, name: 'Project 2' },
    // Add more projects as needed
  ];

  useEffect(() => {
    // Check if projectId is present in the query parameters
    const queryParams = new URLSearchParams(location.search);
    const projectIdFromQuery = queryParams.get("projectId");

    if (projectIdFromQuery) {
      // If projectId is present, set it to the form data
      setFormData((prevFormData) => ({
        ...prevFormData,
        projectId: projectIdFromQuery,
      }));
    }
  }, [location.search]);

  const handleSpeakNowClick = () => {
    if (!isRecording) {
      SpeechRecognition.startListening();
      setRecording(true);
    } else {
      SpeechRecognition.stopListening();
      setRecording(false);
    }
  };

  const handleMicrophoneClick = () => {
    setMicrophoneClicked(!isMicrophoneClicked);
    if (isMicrophoneClicked) {
      SpeechRecognition.stopListening();
      resetTranscript();
      setRecording(false);
    }
  };

  const handleDateChange = (date, field) => {
    setFormData((prevData) => ({ ...prevData, [field]: date }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateTask = () => {
    // Your logic for creating the task
    // You can set the popUp state based on success or failure
    setPopUp({ type: "success", message: "Task Created Successfully!" });
  };

  const popUpAnimation = useSpring({
    opacity: popUp.type ? 1 : 0,
  });

  const overlayAnimation = useSpring({
    opacity: isMicrophoneClicked ? 1 : 0,
    zIndex: isMicrophoneClicked ? 2 : -1,
  });

  const microphoneAnimation = useSpring({
    transform: isMicrophoneClicked ? "translate(-50%, -50%) scale(2)" : "translate(-50%, -50%) scale(1)",
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      {/* Sidebar */}
      <Navigation />

      <div className="flex flex-col justify-start md:mt-0 mt-[68px] w-[73%] md:w-full">
        <Text
          className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px] cursor-pointer"
          size="txtPoppinsRegular16"
          onClick={() => navigate('/myprofile')}
        >
          My Profile
        </Text>
        <div className="flex items-center">
          <Text
            className="mt-[95px] ml-[50px] sm:text-3xl md:text-[3px] text-[34px] text-left text-indigo-800"
            size="txtPoppinsBold34"
          >
            New Task
          </Text>
          <div className="h-[54px] ml-2">
            <animated.div
              style={{
                ...microphoneAnimation,
                position: 'absolute',
                left: '88%',
                top: '30%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <FontAwesomeIcon
                icon={faMicrophone}
                onClick={handleMicrophoneClick}
                className="h-[54px] text-indigo-800 cursor-pointer"
              />
            </animated.div>
          </div>
        </div>

        <div className="ml-[45px] bg-gray-50 flex flex-col items-center justify-end mt-8 p-[39px] sm:px-5 rounded-[30px] w-full">
          <div className="flex flex-col items-start justify-start mt-[19px] w-[95%] md:w-full">

            {/* Other input fields go here */}
            {/* Example: Task Creation Date */}
            <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
              <Text className="text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                Task Creation Date
              </Text>
              <MyDatePicker
                selectedDate={formData.startDate}
                handleDateChange={(date) => handleDateChange(date, 'startDate')}
              />
            </div>

             {/* Dropdown for selecting projects */}
          <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
            <Text className="text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
              Project
            </Text>
            <select
              name="projectId"
              value={formData.projectId}  // Assuming your formData has a projectId field
              onChange={handleInputChange}
              className="text-base w-[76%] bg-gray-50 border-none border-b-2 border-indigo-800 focus:outline-none"
            >
              <option value="" disabled>Select a project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>


            {/* Task Name */}
            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
              <Text className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                Task Name
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

            {/* Task Creator Name */}
            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
              <Text className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                Task Creator Name
              </Text>
              <div className="border-b bg-gray-50 border-indigo-800 text-base w-[76%]">
                <input
                  type="text"
                  name="creatorName"
                  value={formData.creatorName}
                  onChange={handleInputChange}
                  className="text-base w-full bg-gray-50 border-none border-b-2 border-indigo-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Task Assignee */}
            <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">
              <Text className="md:mt-0 mt-0.5 text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                Task Assignee
              </Text>
              
              <select
            name="assignee"
            value={formData.assignee}
            onChange={handleInputChange}
            className="text-base w-[76%] bg-gray-50 border-none border-b-2 border-indigo-800 focus:outline-none"
          >
            <option value="" disabled>Select a task assignee</option>
            {/* Add your task assignees dynamically here */}
            <option value="Assignee1">Assignee 1</option>
            <option value="Assignee2">Assignee 2</option>
            {/* Add more assignees as needed */}
          </select>
              
            </div>

            {/* Due Date */}
            <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
              <Text className="text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                Due Date
              </Text>
              <MyDatePicker
                selectedDate={formData.dueDate}
                handleDateChange={(date) => handleDateChange(date, 'dueDate')}
              />
            </div>

            {/* Last Updation Date */}
            <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
              <Text className="text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                Last Updation Date
              </Text>
              <MyDatePicker
                selectedDate={formData.lastUpdationDate}
                handleDateChange={(date) => handleDateChange(date, 'lastUpdationDate')}
              />
            </div>

            {/* Priority */}
            <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
              <Text className="text-base text-indigo-800 tracking-[0.44px]" size="txtPoppinsRegular16">
                Priority
              </Text>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="text-base w-[76%] bg-gray-50 border-none border-b-2 border-indigo-800 focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Description */}
            <div className="flex md:flex-col flex-row gap-[22px] items-start justify-between w-[97%] md:w-full mt-[34px]">
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

            <Button
              className="cursor-pointer leading-[normal] min-w-[84px] md:ml-[0] ml-[745px] mt-[63px] text-base text-center tracking-[0.44px]"
              shape="round"
              color="indigo_800"
              onClick={handleCreateTask}
            >
              Create
            </Button>
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
          background: popUp.type === "success" ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <p>
          {popUp.type === "success" ? "Task Created Successfully!" : "Task Creation Failed. Please try again."}
        </p>
      </animated.div>

      <animated.div
        style={{
          ...overlayAnimation,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)',
        }}
      >
        {/* Microphone modal content */}
        <animated.div style={{ ...microphoneAnimation, textAlign: 'center' }}>
          <FontAwesomeIcon
            icon={faMicrophone}
            className="h-[54px] text-indigo-800 mb-4"
          />
          <button
            style={{
              position: 'absolute',
              bottom: '100px',
              left: '200px',
            }}
            onClick={handleMicrophoneClick} className="text-white text-lg cursor-pointer">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <button
            onClick={handleSpeakNowClick}
            className="text-white text-sm cursor-pointer bg-indigo-800 p-2 rounded-md mt-2"
            style={{
              position: 'absolute',
              bottom: '-50px',
              left: "-4px", // Adjust this value to fine-tune the position
              color: 'white',
              width: '50',
            }}
          >
            {isRecording ? 'Stop Recording' : 'Speak Now'}
          </button>
          <div
            className={`text-white mt-2 ${transcript ? '' : 'hidden'}`}
            style={{ position: 'absolute', bottom: '-50px', left: "100px", color: 'white' }}
          >
            Recorded Text: {transcript}
          </div>
        </animated.div>
      </animated.div>
    </div>
  );
};

export default NewTaskPage;

