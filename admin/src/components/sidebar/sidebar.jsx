import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { MdDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { SlNote } from "react-icons/sl";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineTaskAlt } from "react-icons/md";
import Admin from "../../assets/images/user.png"

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);

  const isOpenSubmenu = (index) => {
    setActiveTab(index);
    setIsToggleSubmenu(!isToggleSubmenu);
  };

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const role = storedUser.role || "Admin"; 

  return (
    <div className="sidebar mt-3">
      <div className="sidebar-profile">
        <img src={Admin} alt="User Avatar" className="profile-avatar" />
        <h5 className="profile-name">{storedUser.user?.name || "Admin"}</h5>
        <p className="profile-role">{role}</p>
      </div>

      <ul>
            <li>
          <Link to="/Dashboard">
            <Button className={`w-100 ${activeTab === 0 ? "active" : ""}`}>
              <span className="icons"><MdDashboard /></span>
              Dashboard
              <span className="arrows"><FaAngleRight /></span>
            </Button>
          </Link>
        </li>

            <li>
              <Button
                className={`w-100 ${activeTab === 1 && isToggleSubmenu ? "active" : ""}`}
                onClick={() => isOpenSubmenu(1)}
              >
                <span className="icons"><FiUsers /></span>
                Employees
                <span className="arrows"><FaAngleRight /></span>
              </Button>
              <div
                className={`submenu-wrapper ${activeTab === 1 && isToggleSubmenu ? "expanded" : "collapsed"}`}
              >
                <ul className="submenu">
                  <li><Link to="/Emplyees">Employees List</Link></li>
                  <li><Link to="/Emplyees/add">Employees Add</Link></li>
                </ul>
              </div>
            </li>

               <li>
          <Link to="/attendence">
            <Button className={`w-100 ${activeTab === 2 ? "active" : ""}`}>
              <span className="icons"><BsFillClipboardDataFill /></span>
              Attendance
              <span className="arrows"><FaAngleRight /></span>
            </Button>
          </Link>
        </li>

          <li>
              <Link to="/leave">
                <Button className={`w-100 ${activeTab === 3 ? "active" : ""}`}>
                  <span className="icons"><SlNote /></span>
                  Leave Requests
                  <span className="arrows"><FaAngleRight /></span>
                </Button>
              </Link>
            </li>

            <li>
              <Button
                className={`w-100 ${activeTab === 4 && isToggleSubmenu ? "active" : ""}`}
                onClick={() => isOpenSubmenu(4)}
              >
                <span className="icons"><MdOutlineTaskAlt /></span>
                Task
                <span className="arrows"><FaAngleRight /></span>
              </Button>
              <div
                className={`submenu-wrapper ${activeTab === 4 && isToggleSubmenu ? "expanded" : "collapsed"}`}
              >
                <ul className="submenu">
                  <li><Link to="/task">Task List</Link></li>
                  <li><Link to="/task/add">Task Add</Link></li>
                  <li><Link to="/chat">chat</Link></li>
                </ul>
              </div>
            </li>

            <li>
              <Link to="/Dashboard">
                <Button className={`w-100 ${activeTab === 5 ? "active" : ""}`}>
                  <span className="icons"><IoMdNotifications /></span>
                  Notifications
                  <span className="arrows"><FaAngleRight /></span>
                </Button>
              </Link>
            </li>

            <li>
              <Link to="/Dashboard">
                <Button className="w-100">
                  <span className="icons"><IoSettingsSharp /></span>
                  Setting
                  <span className="arrows"><FaAngleRight /></span>
                </Button>
              </Link>
            </li>
              </ul>
    </div>
  );
};

export default Sidebar

