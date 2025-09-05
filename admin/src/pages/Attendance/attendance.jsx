import React from "react";
import "./attendance.css";
import { useState } from "react";
import { useEffect } from "react";
import Box from '@mui/material/Box';
import { FaEdit } from "react-icons/fa";
import Select from '@mui/material/Select';
import Dialog from "@mui/material/Dialog";
import MenuItem from '@mui/material/MenuItem';
import { FaChevronLeft } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronRight } from "react-icons/fa";
import InputLabel from '@mui/material/InputLabel';
import userimg from "../../assets/images/user.png";
import FormControl from '@mui/material/FormControl';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from "react-toastify";
import DialogContent from "@mui/material/DialogContent";
import { deletedata, editdata, fetchDataFromApi } from "../../uttils/api";

const Attendance = () => {
  const [age, setAge] = React.useState('');
  const [attendance, setattendance] = useState([])
  const [openDialog, setOpenDialog] = useState(false);
  const [updatedate, setupdatedate] = useState([])
  const [empImages, setEmpImages] = useState({});

  useEffect(() => {
    fetchDataFromApi('/att/').then((res) => {
      setattendance(res)

       res.forEach((att) => {
                      if (att.name) {
                          fetchDataFromApi(`/emp/${att.name}`).then((emp) => {
                              setEmpImages((prev) => ({
                                  ...prev,
                                  [att.name]: emp.profileImage
                              }));
                          }).catch(() => {
                              setEmpImages((prev) => ({
                                  ...prev,
                                  [att.name]: userimg
                              }));
                          });
                      }
                  });
    })
    window.scrollTo(0, 0);
  }, [])

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const deletedataattendance = (_id) => {
    deletedata(`/att/${_id}`).then((res) => {
      toast.success("Attendance Deleted successfully !");
      fetchDataFromApi('/att/').then((res) => {
        setattendance(res)
      })
    })
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="attendance mt-5">
        <div className="attendance-container mt-5">
          <h2 className="table-title">Today Attendance</h2>
          <div className="table-wrapper">
            <div className="table-header">
              <span>Attendance</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Employee Name</th>
                  <th>Data</th>
                  <th>First In</th>
                  <th>Break In</th>
                  <th>Break Out</th>
                  <th>Last Out</th>
                  <th>Total Hours</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendance .sort((a, b) => new Date(b.date) - new Date(a.date)) .map((item, index) => (
                  <tr key={index}>
                    <td><input type="checkbox" /></td>
                    <td className="emp-name">
                       <img
                    src={empImages[item.name] || userimg}
                    alt={item.name}
                />
                      {item.name}
                    </td>
                    <td>{item.date}</td>
                    <td>{item.firstIn}</td>
                    <td>{item.break}</td>
                    <td>{item.breakOut}</td>
                    <td>{item.lastOut}</td>
                    <td>{item.totalHours}</td>
                    <td>
                      <DeleteIcon className="action-icon2" onClick={() => deletedataattendance(item._id)} />
                    </td>
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

export default Attendance;
