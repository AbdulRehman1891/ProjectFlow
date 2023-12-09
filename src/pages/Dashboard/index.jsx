import React, { useState, useEffect } from 'react';
import { Sidebar } from 'react-pro-sidebar';
import { useNavigate } from 'react-router-dom';
import { Img, Text, List } from 'components';

// Styles
const projectContainerStyles = {
  position: 'relative',
  perspective: '1000px',
};

const styles = {
  projectItem: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d',
  },
};

const dummyProjects = [
  { id: 1, name: 'Project A', dueDate: '2023-12-15' },
  { id: 2, name: 'Project B', dueDate: '2023-12-20' },
  { id: 3, name: 'Project C', dueDate: '2023-12-25' },
];

const dummyTasks = [
  { id: 101, name: 'Task 1', dueDate: '2023-12-18' },
  { id: 102, name: 'Task 2', dueDate: '2023-12-22' },
  { id: 103, name: 'Task 3', dueDate: '2023-12-28' },
];

const DashboardPage = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateButton, setShowCreateButton] = useState(false);
  const [projectButton, setProjectButton] = useState(false);

  let name = localStorage.getItem("username");

  useEffect(() => {
    // For the sake of this example, using dummy data instead of fetching from an API
    setProjects(dummyProjects);
    setTasks(dummyTasks.map((task) => ({ ...task, hovered: false })));

    setLoading(false);
  }, []);

  const handleProjectsHover = () => {
    setProjectButton(true);
  };

  const handleProjectsLeave = () => {
    if (projectButton) {
      setProjectButton(false);
    }
  };

  const handleTasksHover = () => {
    setShowCreateButton(true);
  };

  const handleTasksLeave = () => {
    if (showCreateButton) {
      setShowCreateButton(false);
    }
  };

  const handleCreateClick = () => {
    navigate('/newproject');
  };

  const handleTaskClick = () => {
    navigate('/newtask');
  };

  const renderProjects = () => {
    return (
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <div
              style={{ ...styles.projectItem }}
              onMouseEnter={handleProjectsHover}
              onMouseLeave={handleProjectsLeave}
            >
              <Text
                className="common-pointer"
                size="txtPoppinsRegular16"
                color="indigo-800"
                onClick={() => navigate(`/project/${project.id}`)}
              >
                {project.name}
              </Text>
              <Text color="indigo-800">{`Due ${project.dueDate}`}</Text>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  const renderTasks = () => {
    return (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div
              style={{ ...styles.projectItem }}
              onMouseEnter={handleTasksHover}
              onMouseLeave={handleTasksLeave}
            >
              <Text
                className="common-pointer"
                size="txtPoppinsRegular16"
                color="indigo-800"
                onClick={() => navigate(`/task/${task.id}`)}
              >
                {task.name}
              </Text>
              <Text color="indigo-800">{`Due ${task.dueDate}`}</Text>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
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
            <Text className="font-bold text-[22px] text-center text-indigo-800 sm:text-lg md:text-xl">
              ProjectFlow
            </Text>
            <Text onClick={() => navigate('/dashboard')} className="ml-7 md:ml-[0] mt-[102px] text-base text-indigo-800 tracking-[0.44px]">
              Dashboard
            </Text>
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
          </div>
        </Sidebar>
      </div>

      <div style={{ width: '73%', padding: '20px' }}>
        <Text
          className="flex flex-row items-baseline justify-around md:ml-[0] ml-[800px] text-base text-indigo-800 tracking-[0.44px]"
          onClick={() => navigate('/myprofile')}
          style={{ fontSize: '18px', cursor: 'pointer' }}
        >
          My Profile
        </Text>

        <div className="flex sm:flex-col flex-row gap-[58px] items-start justify-start md:ml-[0] ml-[139px] mt-2 w-[54%] md:w-full">
          <Img className="h-[148px] md:h-auto object-cover w-[36%] sm:w-full" src="images/welcome.gif" alt="welcome" />
          <div>
            <Text className="grid justify-center sm:mt-0 mt-[59px] sm:text-3xl md:text-[32px] text-[31px] text-center text-indigo-800" size="txtPoppinsBold34">
              Welcome, {name}
            </Text>
          </div>
        </div>

        <List
          className="sm:flex-col flex-row md:gap-10 gap-[70px] grid md:grid-cols-1 grid-cols-2 justify-center mt-[49px] w-full"
          orientation="horizontal"
        >
          <div
            onMouseEnter={handleProjectsHover}
            onMouseLeave={handleProjectsLeave}
            className="bg-gray-50 flex flex-1 flex-col items-center justify-start p-8 sm:px-5 rounded-[30px] w-full"
          >
            <div>
              <div className="flex flex-col md:gap-10 gap-[81px] justify-start mb-[186px] mt-[23px] w-full">
                <Text
                  onClick={handleCreateClick}
                  style={{
                    fontSize: projectButton ? '40px' : '22px',
                    color: '#323F73',
                    height: '32px',
                    width: '152px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: projectButton ? '200px 0' : '0',
                  }}
                  size="txtPoppinsBold22"
                >
                  {projectButton ? 'Create' : 'My Projects'}
                </Text>
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex flex-row items-start justify-between ml-1 md:ml-[0] mt-[42px] w-[84%] md:w-full">
                    {renderProjects()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            onMouseEnter={handleTasksHover}
            onMouseLeave={handleTasksLeave}
            className="bg-gray-50 flex flex-1 flex-col items-center justify-center p-[30px] sm:px-5 rounded-[30px] w-full"
          >
            <div>
              <div className="flex flex-col items-center justify-center mb-[189px] mt-[26px] w-[99%] md:w-full relative">
                <div>
                  <Text
                    onClick={handleTaskClick}
                    style={{
                      fontSize: showCreateButton ? '40px' : '22px',
                      color: '#323F73',
                      height: '32px',
                      width: '165px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: showCreateButton ? '200px 0' : '0',
                    }}
                    size="txtPoppinsBold22"
                  >
                    {showCreateButton ? 'Create' : 'My Tasks'}
                  </Text>
                  <div className="flex flex-col gap-11 items-start justify-start md:ml-[0] ml-[17px] mt-[78px] w-[84%] md:w-full">
                    <div className="flex flex-row items-center justify-between w-full">
                      {renderTasks()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </List>
      </div>
    </div>
  );
};

export default DashboardPage;
