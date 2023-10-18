import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "pages/NotFound";
const NewProject = React.lazy(() => import("pages/NewProject"));
const CalendarView = React.lazy(() => import("pages/CalendarView"));
const Graphs = React.lazy(() => import("pages/Graphs"));
const MyTasks = React.lazy(() => import("pages/MyTasks"));
const Dashboard = React.lazy(() => import("pages/Dashboard"));
const Apps = React.lazy(() => import("pages/Apps"));
const NewTask = React.lazy(() => import("pages/NewTask"));
const Kanbanview = React.lazy(() => import("pages/Kanbanview"));
const Signuprole = React.lazy(() => import("pages/Signuprole"));
const Signup = React.lazy(() => import("pages/Signup"));
const Signin = React.lazy(() => import("pages/Signin"));
const MyProjects = React.lazy(() => import("pages/MyProjects"));
const MyProfile = React.lazy(() => import("pages/MyProfile"));
const Startingpage = React.lazy(() => import("pages/Startingpage"));
const UpdateProject = React.lazy(()=> import ("pages/MyProjects/update"))

const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Startingpage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/myprojects" element={<MyProjects />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signuprole" element={<Signuprole />} />
          <Route path="/kanbanview" element={<Kanbanview />} />
          <Route path="/newtask" element={<NewTask />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mytasks" element={<MyTasks />} />
          <Route path="/graphs" element={<Graphs />} />
          <Route path="/calendarview" element={<CalendarView />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/updateproject" element={<UpdateProject />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
