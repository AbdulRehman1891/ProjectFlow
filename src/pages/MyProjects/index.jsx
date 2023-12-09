import React, { useState, useEffect } from "react";
import { Sidebar } from "react-pro-sidebar";
import { useNavigate } from "react-router-dom";
import { Button, Img, Text } from "components";
import { useSpring, animated } from 'react-spring';
import Lottie from 'lottie-react';


const MyProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAddButtonClick = () => {
    setLoading(true);

    // Simulate asynchronous operation (API call, etc.)
    setTimeout(() => {
      setLoading(false);
      
    }, 2000);
  };

  useEffect(() => {
    const id = localStorage.getItem("userid");
    console.log("User ID from localStorage:", id);

    let token=localStorage.getItem("token");
    // Make a GET request to your backend API to fetch projects for the user
    fetch(`http://127.0.0.1:3000/api/v1/users/${id}/projects`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const apiProjects = data.data.projects;

        const mappedProjects = apiProjects.map((project) => ({
          id: project._id,
          title: project.name,
          dueDate: project.end_date,
        }));

        setProjects(mappedProjects);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  // Dummy data for testing
  const dummyProjects = [
    {
      id: '1',
      title: 'Project 1',
      dueDate: '2023-12-01',
    },
    {
      id: '2',
      title: 'Project 2',
      dueDate: '2023-12-15',
    },
    // Add more dummy projects as needed
  ];
  return (
       <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
        {/* Sidebar */}
        <div style={{ width: '23%', position: 'relative', backgroundColor: '#EDEFF5' }}>
        <Sidebar
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, #EDEFF5 0%, white 100%)',
            cursor: 'pointer',
          }}
        >
          <div className="absolute flex flex-col inset-x-[0] justify-start mx-auto top-[6%] w-[45%]">
            <animated.div>
              <Text className="font-bold text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl">
                ProjectFlow
              </Text>
            </animated.div>
            <animated.div >
              <Text onClick={() => navigate('/dashboard')} className="ml-7 md:ml-[0] mt-[102px] text-base text-indigo-800 tracking-[0.44px]">
                Dashboard
              </Text>
            </animated.div>
            <animated.div>
              <div className="flex flex-col gap-[46px] items-start justify-start md:ml-[0] ml-[35px] mt-[47px]">
                <Text onClick={() => navigate('/myprojects')} className="md:ml-[0] ml-[3px] text-base text-indigo-800 tracking-[0.44px]">
                  Projects
                </Text>
                <Text onClick={() => navigate('/mytasks')} className="text-base text-indigo-800 tracking-[0.44px]">
                  My Tasks
                </Text>
                <Text onClick={() => navigate('/apps')} className="md:ml-[0] ml-[7px] text-base text-indigo-800 tracking-[0.44px]">
                  Apps
                </Text>
              </div>
            </animated.div>
          </div>
        </Sidebar>
      </div>
          <div className="flex md:flex-1 flex-col md:gap-10 gap-[97px] justify-start md:mt-0 mt-[68px] w-3/4 md:w-full">
            <Text
              className="md:ml-[0] ml-[851px] text-base text-indigo-800 tracking-[0.44px]"
              size="txtPoppinsRegular16"
              onClick={() => navigate("/myprofile")}
            >
              My Profile
            </Text>
            {/* Your My Profile component here */}
            <div className="flex flex-col gap-[51px] items-start justify-start w-full">
          <div className="flex sm:gap-10 gap-[639px] items-start justify-start md:ml-[0] ml-[3px] w-[92%] md:w-full">
            <Text
              className="ml-[50px] sm:text-3xl md:text-[3px] text-[34px] text-left text-indigo-800 flex items-center"
              size="txtPoppinsBold34"
            >
            Projects
            </Text>
            <Button
                className="common-pointer cursor-pointer leading-[normal] min-w-[109px] mt-2.5 text-base text-center tracking-[0.44px]"
                onClick={() => {
                  handleAddButtonClick();
                  // Assuming `handleAddButtonClick` is responsible for navigating to the new project page
                  navigate("/newproject");
                }}
                shape="round"
                color="indigo_800_01"
              >
                Create
              </Button>

                 {/* Loading animation */}
              {loading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <Img
                          className="h-[100px] w-[100px]"
                          src="images/loading.gif"
                          alt="Loading"
                        />
                      </div>
                    )}
              </div>
             
              {/* Projects component*/}
              <div className=" ml-[50px] gap-16 md:gap-5 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 justify-center min-h-[auto] w-full">
                {projects.length > 0
                  ? projects.map((project) => (
                      <div
                        key={project.id}
                        className="common-pointer bg-cover bg-no-repeat flex flex-1 flex-col h-[252px] items-center justify-end p-7 sm:px-5 w-full"
                        style={{ backgroundImage: "url('images/img_group6.svg')" }}
                        onClick={() => navigate(`/updateproject/${project.id}`)}
                      >
                        <div className="flex flex-col items-center justify-start mt-2.5 w-[71%] md:w-full">
                          <div className="flex flex-col items-center justify-end p-[31px] sm:px-5 rounded-[15px] w-full">
                            <Img
                              className="h-12 md:h-auto object-cover w-full"
                              src="images/engineering_6755119.png"
                              alt="Project Image"
                            />
                          </div>
                          <Text
                            className="mt-[33px] text-base text-indigo-800 tracking-[0.44px]"
                            size="txtPoppinsRegular16"
                          >
                            {project.title}
                          </Text>
                          <Text
                            className="mt-[15px] text-base text-indigo-800 tracking-[0.44px]"
                            size="txtPoppinsRegular16"
                          >
                            Due {project.dueDate ? project.dueDate.substring(0, 10) : ""}
                          </Text>
                        </div>
                      </div>
                    ))
                  : dummyProjects.map((project) => (
                      <div
                        key={project.id}
                        className="common-pointer bg-cover bg-no-repeat flex flex-1 flex-col h-[252px] items-center justify-end p-7 sm:px-5 w-full"
                        style={{ backgroundImage: "url('images/img_group6.svg')" }}
                        onClick={() => navigate(`/details/`)}
                      >
                       <div className="flex flex-col items-center justify-start mt-2.5 w-[71%] md:w-full">
                          <div className="flex flex-col items-center justify-end p-[31px] sm:px-5 rounded-[15px] w-full">
                            <Img
                              className="h-12 md:h-auto object-cover w-full" // Adjust the height and width classes
                              src="images/engineering_6755119.png"
                              alt="Project Image"
                            />
                          </div>
                        </div>

                          <Text
                            className="mt-[33px] text-base text-indigo-800 tracking-[0.44px]"
                            size="txtPoppinsRegular16"
                          >
                            {project.title}
                          </Text>
                          <Text
                            className="mt-[15px] text-base text-indigo-800 tracking-[0.44px]"
                            size="txtPoppinsRegular16"
                          >
                            Due {project.dueDate ? project.dueDate.substring(0, 10) : ""}
                          </Text>
                        </div>
                      
                    ))}
              </div>
            </div>
          </div>
        </div>

  );
};

export default MyProjectsPage;
