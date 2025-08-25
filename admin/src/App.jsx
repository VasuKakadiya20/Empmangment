import './App.css';
import './responsive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeaveRequests from './pages/Leave/leave.jsx';
import Header from './components/Header/header.jsx';
import LoginSignupForm from './pages/login/login.jsx';
import Dashboard from './pages/Deshbord/Dashbord.jsx';
import Sidebar from './components/sidebar/sidebar.jsx';
import AllEmployees from './pages/employee/emplist.jsx';
import AddEmployeeForm from './pages/employee/addemp.jsx';
import Attendance from './pages/Attendance/attendance.jsx';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Addtask from './pages/task/addtask.jsx';
import Tasklist from './pages/task/task.jsx';
const mycontext = createContext()

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [islogin, setislogin] = useState(true)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenNav, setIsOpenNav] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const openNav = () => {
    setIsOpenNav(true);
  };

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isHideSidebarAndHeader,
    setIsHideSidebarAndHeader,
    islogin,
    setislogin,
    windowWidth,
    openNav,
    isOpenNav,
    setIsOpenNav
  }

  return (
    <>
      <BrowserRouter>
        <mycontext.Provider value={values}>
          {
            isHideSidebarAndHeader !== true &&
            <Header />
          }

          <div className='main d-flex'>

            {
              isHideSidebarAndHeader !== true && (
                <>
                  <div className={`side-bar-overlay d-none ${isOpenNav === true ? 'show' : ''}`}
                    onClick={() => setIsOpenNav(false)}>
                  </div>
                  <div className={`sidebar-wrapper ${isToggleSidebar === true ? 'toggle' : ''} 
                    ${isOpenNav === true ? 'open' : ''}`}>
                    <Sidebar />
                  </div>
                </>
              )}

            <div className={`content ${isHideSidebarAndHeader === true && 'full '} ${isToggleSidebar === true ? 'toggle' : ''}`}>
              <Routes>
                <Route path="/" element={<LoginSignupForm />} exact={true} />
                <Route path="/Dashboard" element={<Dashboard />} exact={true} />
                <Route path="/Emplyees" element={<AllEmployees />} exact={true} />
                <Route path="/Emplyees/add" element={<AddEmployeeForm />} exact={true} />
                <Route path="/attendence" element={<Attendance />} exact={true} />
                <Route path="/leave" element={<LeaveRequests />} exact={true} />
                <Route path='/task' element ={<Tasklist/>} exact={true}/>
                <Route path='/task/add' element = {<Addtask/>} exact={true}/>
              </Routes>
            </div>
          </div>
        </mycontext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
export { mycontext }