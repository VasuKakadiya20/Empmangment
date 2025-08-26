import './App.css';
import './responsive.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddLeave from './pages/Leave/addLeave';
import Header from './components/Header/header';
import LoginSignupForm from './pages/login/login';
import Sidebar from './components/sidebar/sidebar';
import { createContext, useEffect, useState } from 'react';
import AddAttendance from './pages/Attendance/addAttendance';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Taskemplist from './pages/task/taskemp';
import EmployeeNotifications from './components/notification/notification';
import { Toaster } from "react-hot-toast";
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
          <EmployeeNotifications/>
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
                <Route path="/attendence/add" element={<AddAttendance />} exact={true} />
                <Route path='/leave/add'element = {<AddLeave/>} exact={true}/>
                <Route path='/taskemp'element ={<Taskemplist/>}exact={true}/>
              </Routes>
            </div>
          </div>
        </mycontext.Provider>
      </BrowserRouter>
         {/* <Toaster position="top-right" reverseOrder={false} /> */}
           <Toaster position="bottom-right" reverseOrder={false} />

    </>
  );
}

export default App;
export { mycontext }