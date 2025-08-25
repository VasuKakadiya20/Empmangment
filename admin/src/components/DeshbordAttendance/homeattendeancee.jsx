import React from "react";
import { FaEdit } from "react-icons/fa";
import { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import { editdata, fetchDataFromApi } from "../../uttils/api";
import userimg from "../../assets/images/user.png"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './attendance.css'

const HomeAttendance = () => {
  const [attendance, setattendance] = useState([])
  const [openDialog, setOpenDialog] = useState(false);
  const [updatedate, setupdatedate] = useState([])

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  // };

  useEffect(() => {
    fetchDataFromApi('/att/').then((res) => {
      setattendance(res)
    })
    window.scrollTo(0, 0);
  }, [])

  // const updateattendance = (_id) => {
  //   setOpenDialog(true);
  //   fetchDataFromApi(`/att/${_id}`).then((res) => {
  //     setupdatedate(res)
  //     console.log(res)
  //   })
  // }

  // const handleSaveUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await editdata(`/att/${updatedate._id}`, updatedate);
  //     console.log(updatedate)
  //     setattendance((prev) =>
  //       prev.map((item) => (item._id === updatedate._id ? updatedate : item))
  //     );
  //     toast.success("Attendance update successfully!");
  //     setOpenDialog(false);
  //   } catch (error) {
  //     toast.error("Failed to update Attendance");
  //     console.error(error);
  //   }
  // };

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
      <div className="attendance mb-5">
        <div className="attendance-container">

          <div className="table-wrapper">
            <div className="table-header">
              <span>Attendance</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Employee Name</th>
                  <th>Date</th>
                  <th>First In</th>
                  <th>Break In</th>
                  <th>Break Out</th>
                  <th>Last Out</th>
                  <th>Total Hours</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {attendance.map((item, index) => (
                  <tr key={index}>
                    <td><input type="checkbox" /></td>
                    <td className="emp-name">
                      <img src={userimg} alt={item.name} />
                      {item.name}
                    </td>
                    <td>{item.date}</td>
                    <td>{item.firstIn}</td>
                    <td>{item.break}</td>
                    <td>{item.breakOut}</td>
                    <td>{item.lastOut}</td>
                    <td>{item.totalHours}</td>
                    {/* <td>
                      <FaEdit className="action-icon" onClick={() => updateattendance(item._id)} />
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
                          <h2 className="text-align-center">Update the Attendance Data</h2>
                          {updatedate && (
                            <form class="form-container">
                              <div className="form-row">
                                <div class="form-group">
                                  <label>Name*</label>
                                  <input type="text"
                                    value={updatedate?.name || ""}
                                    readOnly
                                  />
                                </div>

                                <div class="form-group">
                                  <label>First In*</label>
                                  <select
                                    value={updatedate?.firstIn}
                                    onChange={(e) => setupdatedate({ ...updatedate, firstIn: e.target.value })}
                                  >
                                    <option value="">Select the first In Time</option>
                                    <option value="09:00">09:00</option>
                                    <option value="09:15">09:15</option>
                                    <option value="09:30" >09:30</option>
                                    <option value="09:45">09:45</option>
                                    <option value="10:00">10:00</option>
                                    <option value="10:15">10:15</option>
                                    <option value="10:30">10:30</option>
                                    <option value="10:45">10:45</option>
                                    <option value="11:00">11:00</option>
                                  </select>
                                  <i class="fas fa-clock"></i>
                                </div>

                              </div>


                              <div className="form-row">

                                <div class="form-group">
                                  <label>Break*</label>
                                  <select
                                    value={updatedate?.break}
                                    onChange={(e) => setupdatedate({ ...updatedate, break: e.target.value })}
                                  >
                                    <option value="">Select the Break In Time</option>
                                    <option value="01:00">01:00</option>
                                    <option value="01:15">01:15</option>
                                    <option value="01:30" >01:30</option>
                                    <option value="01:45">01:45</option>
                                    <option value="02:00">02:00</option>
                                  </select>
                                  <i class="fas fa-clock"></i>
                                </div>

                                <div class="form-group">
                                  <label>Break Out*</label>
                                  <select
                                    value={updatedate?.breakOut}
                                    onChange={(e) => setupdatedate({ ...updatedate, breakOut: e.target.value })}
                                  >
                                    <option value="">Select the Break Out Time</option>
                                    <option value="02:00">02:00</option>
                                    <option value="02:15">02:15</option>
                                    <option value="02:30">02:30</option>
                                    <option value="02:45">02:45</option>
                                    <option value="03:00">03:00</option>
                                  </select>
                                  <i class="fas fa-clock"></i>
                                </div>

                              </div>

                              <div className="form-row">
                                <div class="form-group">
                                  <label>Last Out*</label>
                                  <select
                                    value={updatedate?.lastOut || ""}
                                    onChange={(e) => setupdatedate({ ...updatedate, lastOut: e.target.value })}
                                  >
                                    <option value="">Select the Last Out Time</option>
                                    <option value="06:00">06:00</option>
                                    <option value="06:15">06:15</option>
                                    <option value="06:30" >06:30</option>
                                    <option value="06:45">06:45</option>
                                    <option value="07:00">07:00</option>
                                    <option value="07:15">07:15</option>
                                    <option value="07:30" >07:30</option>
                                    <option value="07:45">07:45</option>
                                    <option value="08:00">08:00</option>
                                  </select>
                                  <i class="fas fa-clock"></i>
                                </div>

                                <div class="form-group">
                                  <label>Total Hours*</label>
                                  <select
                                    value={updatedate?.totalHours || ""}
                                    onChange={(e) => setupdatedate({ ...updatedate, totalHours: e.target.value })}
                                  >
                                    <option value="">Select the Total Hours Time</option>
                                    <option value="08:00">08:00</option>
                                    <option value="08:15">08:15</option>
                                    <option value="08:30" >08:30</option>
                                    <option value="08:45">08:45</option>
                                    <option value="09:00">09:00</option>
                                  </select>
                                  <i class="fas fa-clock"></i>
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
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeAttendance;

