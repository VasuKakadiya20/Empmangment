import { mycontext } from "../../App";
import Menu from "@mui/material/Menu";
import { IoMenu } from "react-icons/io5";
import UserImg from "../UserImg/UserImg";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { MdOutlineMenu } from "react-icons/md";
import SearchBox from "../SearchBox/SearchBox";
import { IoMdPersonAdd } from "react-icons/io";
import logo from "../../assets/images/logo.png";
import user from "../../assets/images/user.png";
import { MdOutlineEmail } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { MdOutlineMenuOpen } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import { MdOutlineNotifications } from "react-icons/md";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import { fetchDataFromApi } from "../../uttils/api";

export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [leaveData, setleaveData] = useState([])
  const [taskdata, settaskdata] = useState([])
  const [leaveNotifications, setLeaveNotifications] = useState([]);
  const [isOpennotificationsDrop, setIsOpenNotificationsDrop] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user")) || { user: {} };
  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("emp_notifications")) || []
  );
  const [tasknotification, settasknotification] = useState(
    JSON.parse(localStorage.getItem("task_notifications")) || []
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications(JSON.parse(localStorage.getItem("emp_notifications")) || []);
      settasknotification(JSON.parse(localStorage.getItem("task_notifications")) || []);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const handleOpenNotificationsDrop = () => {
    setIsOpenNotificationsDrop(true);
  };

const handleCloseNotificationsDrop = () => {
  setIsOpenNotificationsDrop(false);

  const storedUser = JSON.parse(localStorage.getItem("user")) || { user: {} };
  const empName = storedUser.user?.name;

  const allNotifications = JSON.parse(localStorage.getItem("emp_notifications")) || [];
  const remainingNotifications = allNotifications.filter(item => item?.name !== empName);
  localStorage.setItem("emp_notifications", JSON.stringify(remainingNotifications));
  setNotifications(remainingNotifications);

  const allTaskNotifications = JSON.parse(localStorage.getItem("task_notifications")) || [];
  const remainingTaskNotifications = allTaskNotifications.filter(item => item?.name?.name !== empName);
  localStorage.setItem("task_notifications", JSON.stringify(remainingTaskNotifications));
  settasknotification(remainingTaskNotifications);
};


  const context = useContext(mycontext);
  const navigate = useNavigate();

  const openMyacc = Boolean(anchorEl);
  const handleOpenMyAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };

  const openNotifications = Boolean(isOpennotificationsDrop);


  const logout = () => {
    context.setislogin(false);
    localStorage.removeItem("user");

    handleCloseMyAccDrop();
    navigate("/");
  }

  useEffect(() => {
    const empname = storedUser.user?.name || "";

    fetchDataFromApi(`/task/taske/${empname}`).then((res) => {
      if (Array.isArray(res)) {
        settaskdata(res);
      } else {
        settaskdata([]);
      }
    });

    fetchDataFromApi(`/leave/status/${empname}`).then((res) => {
      console.log("Leave API response:", res);
      if (Array.isArray(res)) {
        setLeaveNotifications(res);
      } else if (res) {
        setLeaveNotifications([res]); 
      } else {
        setLeaveNotifications([]);
      }
    });
  }, []);




  return (
    <>
      <header className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row d-flex align-items-center w-100">
            <div className="col-sm-2 part1">
              <Link to={"#"} className="d-flex align-items-center logo gap-2">
                <img src={logo} alt="logo" />
                <span className="ml-2">TeamTrack</span>
              </Link>
            </div>
            {context.windowWidth > 992 && (
              <div className="col-sm-3 d-flex align-items-center part2 res-hide gap-2">
                <Button
                  className="rounded-circle mr-3"
                  onClick={() =>
                    context.setIsToggleSidebar(!context.isToggleSidebar)
                  }>
                  {context.isToggleSidebar === false ? (
                    <MdOutlineMenuOpen />
                  ) : (
                    <MdOutlineMenu />
                  )}
                </Button>
                <SearchBox />
              </div>
            )}

            <div className="col-sm-7 d-flex align-items-center justify-content-end gap-3 part3">
              <div className="dropdownWrapper position-relative ml-5">

                <Button
                  className="rounded-circle mr-3"
                  onClick={handleOpenNotificationsDrop}>
                  {" "}
                  <MdOutlineNotifications />
                </Button>


                <Button
                  className="rounded-circle mr-3 isopennav"
                  onClick={() => context.openNav()}>
                  {" "}
                  <IoMenu />
                </Button>

                <Menu
                  anchorEl={isOpennotificationsDrop}
                  id="notifications"
                  className="notifications dropdown_list head"
                  open={openNotifications}
                  onClose={handleOpenNotificationsDrop}
                  onClick={handleCloseNotificationsDrop}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                  <div className="heads pl-3 pb-0">
                    <h4 id="orders" style={{ fontSize: "1.3rem" }}>
                      Notificatrions
                    </h4>
                  </div>

                  <Divider className="mb-1" />

               <div className="scroll">
  {(notifications.length > 0 || tasknotification.length > 0) ? (
    <>
      {notifications
        .filter(item => item?.name === storedUser.user?.name) // Only current user's leave notifications
        .map((item, index) => (
          <MenuItem key={`leave-${index}`} onClick={handleCloseNotificationsDrop}>
            <div><UserImg img={user} /></div>
            <div className="toast-content">
              <p className="toast-title">{item?.name}</p>
              <p className="toast-message">
                Your leave from <b>{item?.data?.leaveFrom}</b> to <br />
                <b>{item?.data?.leaveTo}</b> was{" "}
                <b style={{ color: item?.data?.Status === "Approved" ? "green" : item?.data?.Status === "Rejected" ? "red" : "orange" }}>
                  {item?.data?.Status}
                </b>
              </p>
            </div>
          </MenuItem>
      ))}

      {tasknotification
        .filter(item => item?.name?.name === storedUser.user?.name) 
        .map((item, index) => (
          <MenuItem key={`task-${index}`} onClick={handleCloseNotificationsDrop}>
            <div><UserImg img={user} /></div>
            <div className="toast-content">
              <p className="toast-title">{item?.name?.name}</p>
              <p className="toast-message">
                Hello <b>{item?.name?.name}</b>,<br />
                your task '<b>{item?.title}</b>'<br />
                is due on <b>{item?.duedate}</b>.
              </p>
            </div>
          </MenuItem>
      ))}
    </>
  ) : (
    <p className="px-3 py-2 text-muted">No new notifications</p>
  )}
</div>


                  <div className="pl-5 pr-5 pb-1 mt-2 w-100">
                    <Button className="btn-blue w-100 py-2 px-3">
                      View all notifications
                    </Button>
                  </div>
                </Menu>
              </div>


              {context.islogin !== true ? (
                <Link to={"/"}>
                  <Button className="btn-blue btn-big btn-round">Sign in</Button>
                </Link>
              ) : (
                <div className="myacc-wrapper">
                  <Button
                    className="myacc d-flex align-items-center"
                    onClick={handleOpenMyAccDrop}>
                    <div className="user-img">
                      <span className="rounded-circle">
                        <img src={user} alt="user" />
                      </span>
                    </div>
                    <div className="use-info res-hide">
                      <h4>
                        {storedUser.user.name || "admin"}
                        <MdArrowDropDown style={{ fontSize: "22px" }} />
                      </h4>
                      <p className="mb-0">{storedUser.user.Email || "admin@example.com"}</p>
                    </div>
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={openMyacc}
                    onClose={handleCloseMyAccDrop}
                    onClick={handleCloseMyAccDrop}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                    <MenuItem onClick={handleCloseMyAccDrop}>
                      <ListItemIcon>
                        <IoMdPersonAdd fontSize="small" />
                      </ListItemIcon>
                      My account
                    </MenuItem>
                    <MenuItem onClick={handleCloseMyAccDrop}>
                      <ListItemIcon>
                        <MdOutlineEmail />
                      </ListItemIcon>
                      In Box
                    </MenuItem>
                    <MenuItem onClick={handleCloseMyAccDrop}>
                      <ListItemIcon>
                        <IoSettingsSharp />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem className="logout"
                      onClick={() => logout()}>
                      <ListItemIcon>
                        <LockOutlineIcon fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
