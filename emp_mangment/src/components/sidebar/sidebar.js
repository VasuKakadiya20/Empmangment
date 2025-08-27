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
    <div className="sidebar">
      <div className="sidebar-profile">
        <img src={Admin} alt="User Avatar" className="profile-avatar" />
        <h5 className="profile-name">{storedUser.user?.name || "Employee"}</h5>
        <p className="profile-role">{role || "Employee" }</p>
      </div>

      <ul>
              <li>
          <Link to="/attendence/add">
            <Button className={`w-100 ${activeTab === 0 ? "active" : ""}`}>
              <span className="icons"><BsFillClipboardDataFill /></span>
              Add Attendance
              <span className="arrows"><FaAngleRight /></span>
            </Button>
          </Link>
        </li>

        <li>
          <Link to="/leave/add">
          <Button className={`w-100 ${activeTab === 1 ? "active" : ""}`}>
              <span className="icons"><SlNote /></span>
              Add Leave
              <span className="arrows"><FaAngleRight /></span>
            </Button>
          </Link>
        </li>

        <li>
          <Link to="/taskemp">
          <Button className={`w-100 ${activeTab === 2 ? "active" : ""}`}>
              <span className="icons"><MdOutlineTaskAlt  /></span>
            Task
              <span className="arrows"><FaAngleRight /></span>
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar

