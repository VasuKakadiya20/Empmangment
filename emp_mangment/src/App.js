import './App.css';
import './responsive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import Header from './components/Header/header';
import Sidebar from './components/sidebar/sidebaer';
import Dashboard from './pages/Deshbord/Dashbord';
import Attendance from './pages/Attendance/attendance';
import AddAttendance from './pages/Attendance/addAttendance';
import LeaveRequests from './pages/Leave/leave';
import AllEmployees from './pages/employee/emplist';
import AddEmployeeForm from './pages/employee/addemp';
import LoginSignupForm from './pages/login/login';
import EmployeeCharts from './components/chart2/chart2';
import AddLeave from './pages/Leave/addLeave';
const mycontext = createContext()

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [islogin, setislogin] = useState(false)
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
      <HashRouter>
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
                <Route path="/attendence/add" element={<AddAttendance />} exact={true} />
                <Route path="/leave" element={<LeaveRequests />} exact={true} />
                <Route path='/leave/add'element = {<AddLeave/>} exact={true}/>
              </Routes>
            </div>
          </div>
        </mycontext.Provider>
      </HashRouter>
    </>
  );
}

export default App;
export { mycontext }