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


const Tasklist = () => {
    const [age, setAge] = React.useState('');
    const [taskdata, settaskdata] = useState([])
    const [openDialog, setOpenDialog] = useState(false);
    const [updatedate, setupdatedate] = useState([])
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        fetchDataFromApi('/task/').then((res) => {
            settaskdata(res)
        })

        window.scrollTo(0, 0);
    }, [])

    const updatetask = (_id) => {
        setOpenDialog(true);
        fetchDataFromApi(`/task/${_id}`).then((res) => {
            setupdatedate(res)
            console.log(res)
        })
    }

    const handleSaveUpdate = async (e) => {
        e.preventDefault();
        try {
            await editdata(`/task/${updatedate._id}`, updatedate);
            console.log(updatedate)
            settaskdata((prev) =>
                prev.map((item) => (item._id === updatedate._id ? updatedate : item))
            );
            toast.success("Task update successfully !");
            setOpenDialog(false);
        } catch (error) {
            toast.error("Failed to update Attendance");
            console.error(error);
        }
    };

    const deletedataemp = (_id) => {
        deletedata(`/task/${_id}`).then((res) => {
            toast.success("Task Delete successfully!");
            fetchDataFromApi('/task/').then((res) => {
                settaskdata(res)
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
                    <h2 className="table-title">Task Assigned</h2>
                    <div className="table-wrapper">
                        <div className="table-header">
                            <span>Task</span>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Employee Name</th>
                                    <th>Title</th>
                                    <th>Due Date</th>
                                    <th>Details</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taskdata.sort((a, b) => new Date(b.duedate) - new Date(a.duedate)).map((item, index) => (
                                    <tr key={item.id}>
                                        <td><input type="checkbox" /></td>
                                        <td className="emp-name">
                                            <img src={userimg} alt={item.name?.name} />
                                            {item.name?.name}
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.duedate}</td>
                                        <td>{item.details.substr(0, 150) + "..."}</td>
                                        <td>
                                            <span className={`status ${item.status || "pending"}`}>
                                                {item.status || "pending"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action">
                                                <FaEdit className="action-icon" onClick={() => updatetask(item._id)} />
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
                                                    <h2 className="text-align-center">Update the Task Data</h2>
                                                    {updatedate && (
                                                        <form class="form-container">
                                                            <div className="form-row">
                                                                <div class="form-group">
                                                                    <label>Name*</label>
                                                                    <input
                                                                        type="text"
                                                                        value={updatedate?.name?.name || ""}
                                                                        readOnly
                                                                    />
                                                                </div>

                                                                <div class="form-group">
                                                                    <label>Title*</label>                                                                              <input type="text"
                                                                        value={updatedate?.title}
                                                                        onChange={(e) => setupdatedate({ ...updatedate, title: e.target.value })} />
                                                                </div>

                                                            </div>
                                                            <div className="form-row">
                                                                <div class="form-group">
                                                                    <label>Due Date*</label>
                                                                    <input type="Date" name="duedate" value={updatedate?.duedate}
                                                                        onChange={(e) => setupdatedate({ ...updatedate, duedate: e.target.value })} />
                                                                </div>

                                                                <div class="form-group">
                                                                    <label>Status*</label>
                                                                    <select name="status"
                                                                        value={updatedate.status || "pending"}
                                                                        onChange={(e) => setupdatedate({ ...updatedate, status: e.target.value })}
                                                                    >
                                                                        <option value="">Select The Status</option>
                                                                        <option >pending</option>
                                                                        <option value="In_Progress">In Progress</option>
                                                                        <option >Completed</option>
                                                                        <option >Error</option>
                                                                    </select>
                                                                    <i class="fas fa-chevron-down"></i>
                                                                </div>
                                                            </div>

                                                            <div className="form-group">
                                                                <label>Details*</label>
                                                                <textarea name="details"
                                                                    value={updatedate?.details}
                                                                    onChange={(e) => setupdatedate({ ...updatedate, details: e.target.value })} />
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

export default Tasklist;
