import "./leave.css";
import { useEffect } from "react";
import Box from '@mui/material/Box';
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FaChevronLeft } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronRight } from "react-icons/fa";
import InputLabel from '@mui/material/InputLabel';
import userimg from "../../assets/images/user.png"
import FormControl from '@mui/material/FormControl';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from "react-toastify";
import DialogContent from "@mui/material/DialogContent";
import { deletedata, editdata, fetchDataFromApi } from "../../uttils/api";


const LeaveRequests = () => {
  const [age, setAge] = React.useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [updatedate, setupdatedate] = useState([])
  const [leaveData, setleaveData] = useState([])
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    fetchDataFromApi('/leave/').then((res) => {
      setleaveData(res)
    })

    fetchDataFromApi(`/emp/`).then((res) => {
      setEmployees(res);
    })

    window.scrollTo(0, 0);
  }, [])

  const updateattendance = (_id) => {
    setOpenDialog(true);
    fetchDataFromApi(`/leave/${_id}`).then((res) => {
      setupdatedate(res)
      console.log(res)
    })
  }

  const handleSaveUpdate = async (e) => {
    e.preventDefault();
    try {
      await editdata(`/leave/${updatedate._id}`, updatedate);
      console.log(updatedate)
      setleaveData((prev) =>
        prev.map((item) => (item._id === updatedate._id ? updatedate : item))
      );
      toast.success("Leave update successfully !");
      setOpenDialog(false);
    } catch (error) {
      toast.error("Failed to update Attendance");
      console.error(error);
    }
  };

  const deletedataemp = (_id) => {
    deletedata(`/leave/${_id}`).then((res) => {
      toast.success("Leave Data Delete successfully!");
      fetchDataFromApi('/leave/').then((res) => {
        setleaveData(res)
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
          <h2 className="table-title">Leave Requests</h2>
          <div className="table-wrapper">
            <div className="table-header">
              <span>Leave Requests</span>
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
                  <th>Approved By</th>
                  <th>Approval Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveData.map((item, index) => (
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
                    <td>{item.ApprovedBy}</td>
                    <td>{item.ApprovedDate}</td>
                    <td>
                      <div className="action">
                        <FaEdit className="action-icon" onClick={() => updateattendance(item._id)} />
                        <DeleteIcon className="action-icon2" onClick={() => deletedataemp(item._id)} />
                      </div>
                      <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        maxWidth="md"
                        fullWidth
                        BackdropProps={{
                          sx: {
                            backgroundColor: 'transparent',
                            backdropFilter: 'blur(2px)',
                          },
                        }}
                        PaperProps={{
                          sx: {
                            boxShadow: 'none',
                            backgroundColor: '#fff',
                            borderRadius: 2,
                          },
                        }}
                      >
                        <DialogContent className="dialog-form-container">
                          <h2 className="text-align-center">Update the Leave Data</h2>
                          {updatedate && (
                            <form class="form-container">
                              <div className="form-row">
                                <div class="form-group">
                                  <label>Name*</label>
                                  <input
                                    type="text"
                                    value={updatedate?.name|| ""}
                                    readOnly
                                  />
                                </div>

                                  <div class="form-group">
                                  <label>leave type*</label>
                                  <select
                                    value={updatedate?.leavetype}
                                    onChange={(e) => setupdatedate({ ...updatedate, leavetype: e.target.value })}
                                    disabled
                                  >
                                    <option value="">Select The Leave</option>
                                    <option >Casual Leave </option>
                                    <option >Medical Leave</option>
                                    <option>Maternity Leave</option>
                                    <option>Unpaid Leave</option>
                                  </select>
                                </div>

                              </div>
                              <div className="form-row">
                                <div class="form-group">
                                  <label>leave From*</label>
                                  <input type="Date"
                                    value={updatedate?.leaveFrom}
                                    onChange={(e) => setupdatedate({ ...updatedate, leaveFrom: e.target.value })} 
                                    readOnly
                                    />
                                </div>

                                  <div class="form-group">
                                  <label>leave To*</label>
                                  <input type="Date"
                                    value={updatedate?.leaveTo}
                                    onChange={(e) => setupdatedate({ ...updatedate, leaveTo: e.target.value })} 
                                    readOnly
                                    />
                                </div>
                              </div>

                              <div className="form-row">
                                <div class="form-group">
                                  <label>Number of days*</label>
                                  <input type="number"
                                    value={updatedate?.Numberofdays}
                                    onChange={(e) => setupdatedate({ ...updatedate, Numberofdays: e.target.value })} 
                                    readOnly
                                    />
                                </div>
                                
                    
                       <div class="form-group ">
                                    <label>Reason*</label>
                                    <input type="text"
                                      value={updatedate?.Reason}
                                      onChange={(e) => setupdatedate({ ...updatedate, Reason: e.target.value })} 
                                      readOnly
                                      />
                                  </div>

                               

                              </div>

                              <div className="form-row">
                                 <div class="form-group">
                                  <label>Requested On*</label>
                                  <input type="Date"
                                    value={updatedate?.RequestedOn}
                                    onChange={(e) => setupdatedate({ ...updatedate, RequestedOn: e.target.value })} 
                                    readOnly
                                    />
                                </div>

                                 <div class="form-group">
                                  <label>Status*</label>
                                  <select
                                    value={updatedate.Status || "pending"}
                                    onChange={(e) => setupdatedate({ ...updatedate, Status: e.target.value })}
                                  >
                                    <option value="">Select The Status</option>
                                    <option>Approved</option>
                                    <option>Rejected</option>
                                    <option>pending</option>
                                  </select>
                                  <i class="fas fa-chevron-down"></i>
                                </div>

                                 
                              </div>

                              <div className="form-row">
                              
                                <div class="form-group ">
                                  <label>Approved By*</label>
                                  <input type="text"
                                    value={updatedate?.ApprovedBy}
                                    onChange={(e) => setupdatedate({ ...updatedate, ApprovedBy: e.target.value })} />
                                </div>
                             

                              <div className="form-group">
                                <label>Approved Date*</label>
                                <input type="date"
                                  value={updatedate?.ApprovedDate}
                                  onChange={(e) => setupdatedate({ ...updatedate, ApprovedDate: e.target.value })} />
                              </div>
                               </div>

                              <div class="button-group">
                                <button onClick={handleSaveUpdate} class="save-btn">Save</button>
                                <button onClick={handleCloseDialog} class="cancel-btn">Cancel</button>
                              </div>
                            </form>
                          )}
                        </DialogContent>
                      </Dialog>
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

export default LeaveRequests;
