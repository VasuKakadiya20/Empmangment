import React, { useState } from 'react';
import './addemp.css';
import { postData } from '../../uttils/api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddEmployeeForm = () => {
    const [form, setForm] = useState({
        name: "",
        Role:"",
        Department:"",
        Mobile:'',
        JoiningDate:"",
        Email:"",
        Gender:"",
        Address:"",
        EmployeeStatus:"",
      });
      const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await postData(`/emp/create`, form); 
        // alert("Employees added successfully");
         toast.success("Employee added successfully!");
        console.log("Success:", res);
          setForm({
      name: "",
      Role: "",
      Department: "",
      Mobile: "",
      JoiningDate: "",
      Email: "",
      Gender: "",
      Address: "",
      EmployeeStatus: "",
    });
      } catch (err) {
        // alert("Something went wrong");
        toast.error("Something went wrong");
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
                    <div className="table-wrapper">
                        <div className="table-header">
                            <span>Employees</span>
                        </div>

                        <div className="add-employee-container">
                            <h2 className="form-title">New Entry</h2>
                            <form className="employee-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Name*</label>
                                        <input type="text" name="name" value={form.name} onChange={handleChange}
                                            placeholder="Enter The Name..." />
                                    </div>
                                    <div className="form-group">
                                        <label>Role*</label>
                                        <input type="text" name="Role" value={form.Role} onChange={handleChange}
                                            placeholder="Enter The Role..." />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Department*</label>
                                        <input type="text" name="Department" value={form.Department} onChange={handleChange} 
                                            placeholder="Enter The Department..." />
                                    </div>
                                    <div className="form-group">
                                        <label>Mobile*</label>
                                        <input type="text" name="Mobile"  value={form.Mobile} onChange={handleChange} 
                                            placeholder="Enter The Mobile..."  />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Joining Date*</label>
                                        <input type="Date" name="JoiningDate"  value={form.JoiningDate} onChange={handleChange}  />
                                    </div>
                                    <div className="form-group">
                                        <label>Email*</label>
                                        <input type="Email" name="Email"  value={form.Email} onChange={handleChange}
                                            placeholder="Enter The Email..." />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Gender*</label>
                                         <select name="Gender" value={form.Gender} onChange={handleChange} >
                                               <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>


                                    <div className="form-group ">
                                        <label>Employee Status *</label>
                                        <select name="EmployeeStatus" value={form.EmployeeStatus} onChange={handleChange} >
                                            <option value="">Select Employee Status</option>
                                            <option value="On Leave">On Leave</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='form-group full-width'>
                                    <label>Address</label>
                                    <textarea placeholder='enter the Address' name='Address' value={form.Address} onChange={handleChange} />
                                </div>

                                <button type="submit" className="submit-btn mt-3">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddEmployeeForm;
