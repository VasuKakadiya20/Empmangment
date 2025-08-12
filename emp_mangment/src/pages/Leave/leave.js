import React, { useState } from "react";
import "./leave.css";
import { FaEdit } from "react-icons/fa";
import userimg from "../../assets/images/user.png"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const leaveData = [
  {
    id: 1,
    name: "Brian Shelton",
    empId: "E132",
    department: "Finance",
    leaveType: "Medical Leave",
    from: "06/07/2025",
    to: "07/07/2025",
    days: 1,
    duration: "Full-day",
    status: "Approved",
    reason: "Shop 4, Shanti Nagar",
    requested: "05/07/2025",
    approvedBy: "Michael Green",
    approvalDate: "05/07/2025",
  },
  {
    id: 2,
    name: "Sarah Smith",
    empId: "E124",
    department: "Finance",
    leaveType: "Medical Leave",
    from: "20/06/2025",
    to: "24/06/2025",
    days: 4,
    duration: "Half-day",
    status: "Rejected",
    reason: "Shanti Nagar",      
    requested: "15/06/2025",
    approvedBy: "",
    approvalDate: "",
  },
  {
    id: 3,
    name: "Jeannie Ellis",
    empId: "E134",
    department: "Research",
    leaveType: "Maternity Leave",
    from: "02/08/2025",
    to: "04/08/2025",
    days: 3,
    duration: "Full-day",
    status: "pending",
    reason: "Plot 129, D 1",
    requested: "25/07/2025",
  },
  {
    id: 4,
    name: "Emily  Johnson",
    empId: "E105",
    department: "HR",
    leaveType: "Casual Leave",
    from: "12/08/2025",
    to: "13/08/2025",
    days: 2,
    duration: "Full-day",
    status: "Pending",
    reason: "Personal work",
    requested: "10/08/2025",
    approvedBy: "",
    approvalDate: ""
  },
  {
    id: 5,
    name: "David Lee",
    empId: "E119",
    department: "IT",
    leaveType: "Medical Leave",
    from: "01/08/2025",
    to: "03/08/2025",
    days: 3,
    duration: "Full-day",
    status: "Approved",
    reason: "Fever and rest",
    requested: "30/07/2025",
    approvedBy: "Anna Clark",
    approvalDate: "31/07/2025"
  },
  {
    id: 6,
    name: "Jessica Taylor",
    empId: "E108",
    department: "Marketing",
    leaveType: "Casual Leave",
    from: "15/07/2025",
    to: "16/07/2025",
    days: 2,
    duration: "Half-day",
    status: "Rejected",
    reason: "Family Event",
    requested: "13/07/2025",
    approvedBy: "Michael Green",
    approvalDate: "14/07/2025"
  },
  {
    id: 7,
    name: "Robert Brown",
    empId: "E140",
    department: "Logistics",
    leaveType: "Medical Leave",
    from: "10/08/2025",
    to: "11/08/2025",
    days: 2,
    duration: "Full-day",
    status: "Approved",
    reason: "Back pain",
    requested: "08/08/2025",
    approvedBy: "Samantha Reed",
    approvalDate: "09/08/2025"
  },
  {
    id: 8,
    name: "Olivia Davis",
    empId: "E122",
    department: "Sales",
    leaveType: "Casual Leave",
    from: "05/08/2025",
    to: "05/08/2025",
    days: 1,
    duration: "Half-day",
    status: "Pending",
    reason: "Urgent work",
    requested: "04/08/2025",
    approvedBy: "",
    approvalDate: ""
  },
  {
    id: 9,
    name: "Daniel Wilson",
    empId: "E155",
    department: "HR",
    leaveType: "Maternity Leave",
    from: "01/07/2025",
    to: "31/07/2025",
    days: 31,
    duration: "Full-day",
    status: "Approved",
    reason: "Maternity",
    requested: "15/06/2025",
    approvedBy: "Helen Moore",
    approvalDate: "16/06/2025"
  },
  {
    id: 10,
    name: "Sophia Martinez",
    empId: "E163",
    department: "Admin",
    leaveType: "Medical Leave",
    from: "09/08/2025",
    to: "10/08/2025",
    days: 2,
    duration: "Full-day",
    status: "Rejected",
    reason: "Cold and cough",
    requested: "08/08/2025",
    approvedBy: "Sarah White",
    approvalDate: "08/08/2025"
  },
];

const LeaveRequests = () => {
  const [age, setAge] = React.useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = (leave) => {
    setSelectedLeave(leave);
    setOpenDialog(true);
  };
  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  }

  return (
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
                <th>Employee ID</th>
                <th>Department</th>
                <th>Leave Type</th>
                <th>Leave From</th>
                <th>Leave To</th>
                <th>Number of Days</th>
                <th>Duration Type</th>
                <th>Status</th>
                <th>Reason</th>
                <th>Requested On</th>
                <th>Approved By</th>
                <th>Approval Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((leave) => (
                <tr key={leave.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className="emp-name">
                    <img src={userimg} alt={leave.name} />
                    {leave.name}
                  </td>
                  <td>{leave.empId}</td>
                  <td>{leave.department}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.from}</td>
                  <td>{leave.to}</td>
                  <td>{leave.days}</td>
                  <td>{leave.duration}</td>
                  <td>
                    <span className={`status ${leave.status.toLowerCase()}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td>{leave.reason}</td>
                  <td>{leave.requested}</td>
                  <td>{leave.approvedBy}</td>
                  <td>{leave.approvalDate}</td>
                  <td><FaEdit className="action-icon" onClick={() => handleOpenDialog(leave)} />
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
                        <div className="leave-form-container">
                          <form className="leave-form">
                            <div className="form-group">
                              <label>Name*</label>
                              <input type="text" value={selectedLeave?.name} />
                            </div>

                            <div className="form-group">
                              <label>Employee ID*</label>
                              <input type="text" placeholder="Enter The Employee ID" value={selectedLeave?.empId} />
                            </div>

                            <div className="form-group">
                              <label>Department*</label>
                              <input type="text" placeholder="Enter The Department Name" value={selectedLeave?.department} />
                            </div>

                            <div className="form-group">
                              <label>Leave Type*</label>
                              <select value={selectedLeave?.leaveType}>
                                <option>Medical Leave</option>
                                <option>Maternity Leave</option>
                                <option>Casual Leave</option>
                              </select>
                            </div>

                            <div className="form-group">
                              <label>Leave From*</label>
                              <input type="date" value={
                                selectedLeave?.from
                                  ? parseDate(selectedLeave.from).toISOString().split("T")[0]
                                  : ""
                              } />
                            </div>

                            <div className="form-group">
                              <label>Leave To*</label>
                              <input type="date" value={
                                selectedLeave?.to
                                  ? parseDate(selectedLeave.to).toISOString().split("T")[0]
                                  : ""
                              } />
                            </div>

                            <div className="form-group">
                              <label>No Of Days*</label>
                              <input type="number" value={selectedLeave?.days} /> {/* */}
                            </div>

                            <div className="form-group">
                              <label>Duration Type*</label>
                              <input type="text" value={selectedLeave?.duration} /> {/*  */}
                            </div>

                            <div className="form-group">
                              <label>Status*</label>
                              <select value={selectedLeave?.status}> {/*  */}
                                <option>Approved</option>
                                <option>Rejected</option>
                                <option>Pending</option>
                              </select>
                            </div>

                            <div className="form-group">
                              <label>Requested On*</label>
                              <input type="date" value={
                                selectedLeave?.requested
                                  ? parseDate(selectedLeave.requested).toISOString().split("T")[0]
                                  : ""
                              } />
                            </div>

                            <div className="form-group full-width">
                              <label>Reason*</label>
                              <textarea value={selectedLeave?.reason} /> {/*  */}
                            </div>


                            <div className="form-group">
                              <label>Approved By</label>
                              <input type="text" placeholder="Enter the Approved By Name" value={selectedLeave?.approvedBy} />  {/*   */}
                            </div>

                            <div className="form-group">
                              <label>Approval Date</label>
                              <input type="date" value={
                                selectedLeave?.approvalDate
                                  ? parseDate(selectedLeave.approvalDate).toISOString().split("T")[0]
                                  : ""
                              } />
                            </div>
                            <div class="button-group">
                              <button onClick={handleCloseDialog} class="save-btn">Save</button>
                              <button onClick={handleCloseDialog} class="cancel-btn">Cancel</button>
                            </div>
                          </form>
                        </div>
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
  );
};

export default LeaveRequests;
