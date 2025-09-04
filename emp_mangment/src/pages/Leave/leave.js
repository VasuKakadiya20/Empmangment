import "./leave.css";
import { useEffect } from "react";
import Box from '@mui/material/Box';
import React, { useState } from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FaChevronLeft } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronRight } from "react-icons/fa";
import InputLabel from '@mui/material/InputLabel';
import userimg from "../../assets/images/user.png"
import { fetchDataFromApi } from "../../uttils/api";
import FormControl from '@mui/material/FormControl';


const LeaveRequests = () => {
  const [age, setAge] = React.useState('');
  const [leaveData, setleaveData] = useState([])
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const empname = storedUser.user?.name || ""; 
    fetchDataFromApi(`/leave/status/${empname}`).then((res) => {
      setleaveData(res)
    })

    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <div className="attendance mt-5">
        <div className="attendance-container mt-5">
          <h2 className="table-title">Leave Status</h2>
          <div className="table-wrapper">
            <div className="table-header">
              <span>Leave Status</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Employee Name</th>
                  <th>Leave Type</th>
                  <th>Leave From</th>
                  <th>Leave To</th>
                  <th>Number of Days</th>
                  <th>Status</th>
                  <th>Reason</th>
                  <th>Requested On</th>
                </tr>
              </thead>
              <tbody>
                {leaveData.sort((a, b) => new Date(b.RequestedOn) - new Date(a.RequestedOn)).map((item, index) => (
                  <tr key={item.id}>
                    <td><input type="checkbox" /></td>
                    <td className="emp-name">
                      <img src={userimg} alt={item.name} />
                      {item.name}
                    </td>
                    <td>{item.leavetype}</td>
                    <td>{item.leaveFrom}</td>
                    <td>{item.leaveTo}</td>
                    <td>{item.Numberofdays}</td>
                    <td>
                      <span className={`status ${item.Status || "pending"}`}>
                        {item.Status || "pending"}
                      </span>
                    </td>

                    <td>{item.Reason}</td>
                    <td>{item.RequestedOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <div className="page">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label mr-5 ml-5">Page</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={age}
                      label="Age"
                      onChange={handleChange}
                    >
                      <MenuItem value={10} selected>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <span>1 – 10 of 13</span>
              <span className="arrows">
                <span style={{ marginRight: '20px' }}><FaChevronLeft /></span>
                <span><FaChevronRight /></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveRequests;