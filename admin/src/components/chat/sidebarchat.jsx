// import React, { useState, useEffect } from "react";
// import "./sidebarchat.css";
// import userImg from "../../assets/images/user.png";
// import { deletedata, fetchDataFromApi } from "../../uttils/api";
// import {FaEllipsisV} from "react-icons/fa";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import { MdDelete } from "react-icons/md";
// import LockOutlineIcon from "@mui/icons-material/LockOutline";

// function EmployeeList({ onSelectChat }) {
//   const [employees, setEmployees] = useState([]);
//     const [anchorEl, setAnchorEl] = React.useState(null);

//     const openMyacc = Boolean(anchorEl);
//   const handleOpenMyAccDrop = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleCloseMyAccDrop = () => {
//     setAnchorEl(null);
//   };

//   useEffect(() => {
//     fetchDataFromApi("/chat").then((res) => {
//       setEmployees(res)
//   })
//   });


//   return (
//     <div className="sidebars">
//       {employees.map((emp) => (
//        <>
//        <div className="name">
//          <div 
//           key={emp._id} 
//           className="employee-item" 
//           onClick={() => onSelectChat(emp._id, emp.employeeName)}
//         >
//           <img src={userImg} alt="emp" className="employee-avatar" />
//           <div>
//   <b>{emp.employeeName}</b>
// <p className="latest-msg">
//   {emp.latestMessage?.message
//     ? emp.latestMessage.message.substr(0, 25) + "..."
//     : "No messages yet"}
// </p>

// </div>

//         </div>
//          {/* <div className="actions">
//         <FaEllipsisV className="icon" onClick={handleOpenMyAccDrop}/>
//            <Menu
//                     anchorEl={anchorEl}
//                     id="account-menu"
//                     open={openMyacc}
//                     onClose={handleCloseMyAccDrop}
//                     onClick={handleCloseMyAccDrop}
//                     slotProps={{
//                       paper: {
//                         elevation: 0,
//                         sx: {
//                           overflow: "visible",
//                           filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//                           mt: 1.5,
//                           "& .MuiAvatar-root": {
//                             width: 32,
//                             height: 32,
//                             ml: -0.5,
//                             mr: 1,
//                           },
//                           "&::before": {
//                             content: '""',
//                             display: "block",
//                             position: "absolute",
//                             top: 0,
//                             right: 14,
//                             width: 10,
//                             height: 10,
//                             bgcolor: "background.paper",
//                             transform: "translateY(-50%) rotate(45deg)",
//                             zIndex: 0,
//                           },
//                         },
//                       },
//                     }}
//                     transformOrigin={{ horizontal: "right", vertical: "top" }}
//                     anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
//                     <MenuItem className="logout"
//                       onClick={handleCloseMyAccDrop}>
//                       <ListItemIcon>
//                         <MdDelete fontSize="small" />
//                       </ListItemIcon>
//                       Delete
//                     </MenuItem>
//                   </Menu>
//       </div> */}
//        </div>
//        </>
//       ))}
//     </div>
//   );
// }

// export default EmployeeList;

import React, { useState, useEffect } from "react";
import "./sidebarchat.css";
import userImg from "../../assets/images/user.png";
import { fetchDataFromApi } from "../../uttils/api";

function EmployeeList({ onSelectChat }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetchDataFromApi("/chat");

        // For each employee, fetch profile image
        const updatedEmployees = await Promise.all(
          res.map(async (emp) => {
            try {
              const empData = await fetchDataFromApi(`/emp/${emp.employeeName}`);
              return { ...emp, profileImage: empData.profileImage || userImg };
            } catch {
              return { ...emp, profileImage: userImg }; // fallback
            }
          })
        );

        setEmployees(updatedEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="sidebars">
      {employees.map((emp) => (
        <div key={emp._id} className="name">
          <div
            className="employee-item"
            onClick={() => onSelectChat(emp._id, emp.employeeName)}
          >
            <img
              src={emp.profileImage}
              alt={emp.employeeName}
              className="employee-avatar"
            />
            <div>
              <b>{emp.employeeName}</b>
              <p className="latest-msg">
                {emp.latestMessage?.message
                  ? emp.latestMessage.message.substr(0, 25) + "..."
                  : "No messages yet"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;

