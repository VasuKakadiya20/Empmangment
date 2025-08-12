import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { SlNote } from "react-icons/sl";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { mycontext } from "../../App";
import { FaUser } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import Admin from "../../assets/images/admin.png"

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
  const context = useContext(mycontext);

  const isOpenSubmenu = (index) => {
    setActiveTab(index);
    setIsToggleSubmenu(!isToggleSubmenu);
  }

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <>
      <div className='sidebar'>
        <div className="sidebar-profile">
          <img
            src={Admin}
            alt="Sarah Smith"
            className="profile-avatar"
          />
          <h5 className="profile-name"> {storedUser.name || "Admin"}</h5>
          <p className="profile-role">Admin</p>
        </div>

        <ul>
          <li>
            <Link to="/Dashboard">
              <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`} >
                <span className='icons'><MdDashboard /></span>
                Dashboard
                <span className='arrows'><FaAngleRight /></span>
              </Button>
            </Link>
          </li>
          <li>
            <Button className={`w-100 ${activeTab === 1 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(1)}>
              <span className="icons"><FiUsers /></span>
              Employees
              <span className="arrows"><FaAngleRight /></span>
            </Button>
            <div className={`submenu-wrapper ${activeTab === 1 && isToggleSubmenu === true ? 'expanded' : 'collapsed'}`}>
              <ul className="submenu">
                <li> <Link to="/Emplyees"> Employees List</Link> </li>
                <li> <Link to="/Emplyees/add"> Employees Upload</Link> </li>
              </ul>
            </div>
          </li>
          <li>
            <Button className={`w-100 ${activeTab === 2 && isToggleSubmenu === true ? 'active' : ''}`} onClick={() => isOpenSubmenu(2)}>
              <span className="icons"><BsFillClipboardDataFill /></span>
              Attendance
              <span className="arrows"><FaAngleRight /></span>
            </Button>
            <div className={`submenu-wrapper ${activeTab === 2 && isToggleSubmenu === true ? 'expanded' : 'collapsed'}`}>
              <ul className="submenu">
                <li> <Link to="/attendence">Today Attendance</Link> </li>
                <li> <Link to="/attendence/add">Add Employees Attendance</Link> </li>
              </ul>
            </div>
          </li>
          <li>
            <Link to="/leave">
              <Button className={`w-100 ${activeTab === 3 ? 'active' : ''}`} >
                <span className="icons"><SlNote /></span>
                Leave Requests
                <span className="arrows"><FaAngleRight /></span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button className={`w-100 ${activeTab === 0 ? 'active' : ''}`} >
                <span className="icons"><IoMdNotifications /></span>
                Notificatrions
                <span className="arrows"><FaAngleRight /></span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button className='w-100'>
                <span className="icons"><IoSettingsSharp /></span>
                Setting
                <span className="arrows"><FaAngleRight /></span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <Button className='w-100'>
                <span className="icons"><FaUser /></span>
                Login
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <Button className='w-100'>
                <span className="icons"><FaUser /></span>
                Sign Up
              </Button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar