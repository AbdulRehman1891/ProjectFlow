import React, { useState, useEffect } from 'react';
import { Button, Text } from 'components';
import { useNavigate } from 'react-router-dom';
import { MyDatePicker } from 'components';
import Navigation from 'pages/Sidebar';
import { useSpring, animated } from 'react-spring';

const InviteMembers = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  
    emailAddresses: [''], // Initial email field
  });

  const [popUp, setPopUp] = useState({
    type: null, // 'inviteSuccess' or 'projectSuccess' or 'error'
  });

  const [showInviteModal, setShowInviteModal] = useState(false);



  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEmails = [...formData.emailAddresses];
    updatedEmails[index] = value;
    setFormData({ ...formData, emailAddresses: updatedEmails });
  };

  const handleAddEmailField = () => {
    setFormData((prevFormData) => {
      const newEmailAddresses = [...prevFormData.emailAddresses, ''];
      return { ...prevFormData, emailAddresses: newEmailAddresses };
    });
  };
  

  const handleInvite = () => {
    // Placeholder for invite logic
    // You can implement the actual invitation logic here

    // For demonstration purposes, let's just show the invite success pop-up
    setPopUp({ type: 'inviteSuccess' });
    setShowInviteModal(false);
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
        setPopUp({ type: 'projectSuccess' });
        navigate('/myprojects');
      })
      .catch((error) => {
        setPopUp({ type: 'error' });
        console.error('Project creation failed', error);
      });
  };

  const renderEmailFields = () => {
    return (
      <div className="flex flex-col items-end justify-between mt-[34px] w-[97%] md:w-full">
        {formData.emailAddresses.map((email, index) => (
          <div key={index} className="flex flex-col ml-4 mt-4">
            {/* Email Label */}
            <Text style={{ fontSize: "16px", fontFamily: "Poppins", color: "#323F73" }}>
              Email Address
            </Text>
            <div style={{ borderBottom: '1px solid #323F73', backgroundColor: '#F8FAFC', fontSize: '1rem', width: '76%' }}>
              <input
                type="text"
                name={`emailAddress-${index}`}
                value={email}
                onChange={(e) => handleInputChange(e, index)}
                className="text-base w-full bg-gray-50 border-none border-b-2 border-indigo-800 focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    );
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
            Invite Members
          </Text>
          

          <div className="ml-[45px] bg-gray-50 flex flex-col items-center justify-end mt-8 p-[39px] sm:px-5 rounded-[30px] w-full">
            <div className="flex flex-col items-start justify-start mt-[19px] w-[95%] md:w-full">
               {/* '+' Button to Add Email Field */}
               <Button
                style={{
                  cursor: "pointer",
                  minWidth: "40px",
                  marginLeft: "760px",
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
                onClick={handleAddEmailField}
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
             <div className="flex md:flex-col flex-row md:gap-10 items-start justify-between mt-[34px] w-[97%] md:w-full">             
                {/* Image on the left side */}
                <img src="images/team.png" alt="Email Icon" style={{ width: '50%', marginRight: '8px' }} />
                {/* Email Input Fields */}
                {renderEmailFields()}                
              </div>             
              {/* Invite Button */}
              <Button
                className="cursor-pointer leading-[normal] min-w-[28px] ml-[635px] mt-[20px] text-base text-center tracking-[0.44px]"
                shape="round"
                style={{ backgroundColor: "#860A35", color: "#ffffff" }}
                onClick={handleInvite}
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

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="invite-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowInviteModal(false)}>
              &times;
            </span>
            <p>Invite has been sent!</p>
          </div>
        </div>
      )}

      {/* Pop-up */}
      <animated.div
        style={{
          ...popUpAnimation,
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: popUpAnimation.opacity.interpolate((opacity) => `translate(-50%, -50%) scale(${opacity})`),
          background: popUp.type === 'inviteSuccess' ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <p>
          {popUp.type === 'inviteSuccess' ? 'Invite Sent Successfully!' : 'Project Creation Failed. Please try again.'}
        </p>
      </animated.div>
    </>
  );
};

export default InviteMembers;
