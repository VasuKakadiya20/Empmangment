import React, { useEffect, useState } from 'react'
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
import user from "../../assets/images/user.png"
import { CiChat1 } from "react-icons/ci";
import { fetchDataFromApi } from '../../uttils/api';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
   const [userProfile, setUserProfile] = useState(null);
     const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const role = storedUser.role || "Employee"; 
    const empname = storedUser.user?.name || ""; 

   useEffect(()=>{
      fetchDataFromApi(`/emp/${empname}`).then((emp) => {
          setUserProfile(emp.profileImage || user);
        }).catch(() => {
          setUserProfile(user); 
        });
   })

  const isOpenSubmenu = (index) => {
    setActiveTab(index);
    setIsToggleSubmenu(!isToggleSubmenu);
  };



  return (
    <div className="sidebar mt-3">
      <div className="sidebar-profile">
        <img src={userProfile || user } alt="User Avatar" className="profile-avatar" />
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
              <Button
                className={`w-100 ${activeTab === 4 && isToggleSubmenu ? "active" : ""}`}
                onClick={() => isOpenSubmenu(4)}
              >
                <span className="icons"><SlNote /></span>
                Leave
                <span className="arrows"><FaAngleRight /></span>
              </Button>
              <div
                className={`submenu-wrapper ${activeTab === 4 && isToggleSubmenu ? "expanded" : "collapsed"}`}
              >
                <ul className="submenu">
                  <li><Link to="/leave/Status">Leave Status</Link></li>
                  <li> <Link to="/leave/add">Add Leave</Link></li>
                </ul>
              </div>
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
        <li>
          <Link to="/chat">
          <Button className={`w-100 ${activeTab === 2 ? "active" : ""}`}>
              <span className="icons"><CiChat1  /></span>
            chat
              <span className="arrows"><FaAngleRight /></span>
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar

