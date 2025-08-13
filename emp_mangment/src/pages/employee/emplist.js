import "./emplist.css";
import Box from '@mui/material/Box';
import { mycontext } from "../../App";
import { FaEdit } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FaChevronLeft } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronRight } from "react-icons/fa";
import userimg from "../../assets/images/user.png"
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { toast, ToastContainer } from "react-toastify";
import DialogContent from "@mui/material/DialogContent";
import { deletedata, editdata, fetchDataFromApi } from "../../uttils/api";
import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

const AllEmployees = () => {
  const [emp, setemp] = useState([])
  const [page, setpage] = React.useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [updatedata, setupdatedate] = useState([])
  const context = useContext(mycontext)

  const handleChange = (event) => {
    setpage(event.target.value);
  };

  useEffect(() => {
    context.setIsHideSidebarAndHeader(false);
    fetchDataFromApi('/emp/').then((res) => {
      setemp(res)
      // console.log(res)
    })
    window.scrollTo(0, 0);
  }, [])
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const updateemp = (_id) => {
    setOpenDialog(true)
    fetchDataFromApi(`/emp/${_id}`).then((res) => {
      setupdatedate(res)
      // console.log(res)
    })
  }
  const deletedataemp =(_id) =>{
    deletedata(`/emp/${_id}`).then((res)=>{
    toast.success("Employee Data Delete successfully!");
     fetchDataFromApi('/emp/').then((res) => {
      setemp(res)
    })
    })
  }
const handleSaveUpdate = async (e) => {
  e.preventDefault(); 
  try {
    await editdata(`/emp/${updatedata._id}`, updatedata);

    setemp((prev) =>
      prev.map((item) => (item._id === updatedata._id ? updatedata : item))
    );
    toast.success("Employee Data update successfully!");
    setOpenDialog(false);
  } catch (error) {
    toast.error("Failed to update employee");
    console.error(error);
  }
};

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
          <h2 className="table-title">All Employee</h2>
          <div className="table-wrapper">
            <div className="table-header">
              <span>Employee</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Employee Name</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Mobile</th>
                  <th>Joining Date</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Address</th>
                  <th>Employee Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {emp.map((item, index) => (
                  <tr key={index}>
                    <td><input type="checkbox" /></td>
                    <td className="emp-name">
                      <img src={userimg} alt={item.name} />
                      {item.name}
                    </td>
                    <td>{item.Role}</td>
                    <td>{item.Department}</td>
                    <td>{item.Mobile}</td>
                    <td>{item.JoiningDate}</td>
                    <td>{item.Email}</td>
                    <td>
                      <span className={`status ${item.Gender}`}>{item.Gender}</span>
                    </td>
                    <td>{item.Address}</td>
                    <td>{item.EmployeeStatus}</td>
                    <td>
                      <div className="action">
                      <FaEdit className="action-icon" onClick={() => updateemp(item._id)} />
                      <DeleteIcon className="action-icon2" onClick = {() => deletedataemp(item._id)}/>
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
                          <div className="attendan">
                            <div className="attendance-contain">
                              <h2 className="text-align-center">Update the Employee Data</h2>
                              <form className="employee-form">
                                <div className="form-row">
                                  <div className="form-group">
                                    <label>Name*</label>
                                    <input type="text" name="name"
                                      value={updatedata.name}
                                      onChange={(e) => setupdatedate({ ...updatedata, name: e.target.value })}
                                      placeholder="Enter The Name..." />
                                  </div>
                                  <div className="form-group">
                                    <label>Role*</label>
                                    <input type="text" name="Role"
                                      value={updatedata.Role}
                                      onChange={(e) => setupdatedate({ ...updatedata, Role: e.target.value })}
                                      placeholder="Enter The Role..." />
                                  </div>
                                </div>

                                <div className="form-row">
                                  <div className="form-group">
                                    <label>Department*</label>
                                    <input type="text" name="Department"
                                      value={updatedata.Department}
                                      onChange={(e) => setupdatedate({ ...updatedata, Department: e.target.value })}
                                      placeholder="Enter The Department..." />
                                  </div>
                                  <div className="form-group">
                                    <label>Mobile*</label>
                                    <input type="text" name="Mobile"
                                      value={updatedata.Mobile}
                                      onChange={(e) => setupdatedate({ ...updatedata, Mobile: e.target.value })}
                                      placeholder="Enter The Mobile..." />
                                  </div>
                                </div>

                                <div className="form-row">
                                  <div className="form-group">
                                    <label>Joining Date*</label>
                                    <input type="Date" name="JoiningDate"
                                      value={updatedata.JoiningDate}
                                      onChange={(e) => setupdatedate({ ...updatedata, JoiningDate: e.target.value })} />
                                  </div>
                                  <div className="form-group">
                                    <label>Email*</label>
                                    <input type="Email" name="Email"
                                      value={updatedata.Email}
                                      onChange={(e) => setupdatedate({ ...updatedata, Email: e.target.value })}
                                      placeholder="Enter The Email..." required />
                                  </div>
                                </div>

                                <div className="form-row">
                                  <div className="form-group">
                                    <label>Gender*</label>
                                    <select name="Gender"
                                      value={updatedata.Gender}
                                      onChange={(e) => setupdatedate({ ...updatedata, Gender: e.target.value })}>
                                      <option value="">Select Gender</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                    </select>
                                  </div>


                                  <div className="form-group ">
                                    <label>Employee Status*</label>
                                    <select name="EmployeeStatus"
                                      value={updatedata.EmployeeStatus}
                                      onChange={(e) => setupdatedate({ ...updatedata, EmployeeStatus: e.target.value })}>
                                      <option value="">Select Employee Status</option>
                                      <option value="On Leave">On Leave</option>
                                      <option value="Active">Active</option>
                                      <option value="Inactive">Inactive</option>
                                    </select>
                                  </div>
                                </div>

                                <div className='form-group full-width'>
                                  <label>Address</label>
                                  <textarea placeholder='enter the Address' name='Address'
                                    value={updatedata.Address}
                                    onChange={(e) => setupdatedate({ ...updatedata, Address: e.target.value })} />
                                </div>

                                <div class="button-group">
                                  <button onClick={handleSaveUpdate} class="save-btn" type="submit">Save</button>
                                  <button onClick={handleCloseDialog} class="cancel-btn">Cancel</button>
                                </div>
                              </form>

                            </div>
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
                      value={page}
                      label="page"
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

export default AllEmployees;

