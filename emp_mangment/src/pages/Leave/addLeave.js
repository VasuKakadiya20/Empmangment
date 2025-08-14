import React, { useContext, useEffect, useState } from "react";
import "./addLeave.css";
import { fetchDataFromApi, postData } from "../../uttils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mycontext } from "../../App";

const AddLeave = () => {
  const [employees, setEmployees] = useState([]);
  const context = useContext(mycontext)
  const [form, setForm] = useState({
    name: "",
    Department:"",
    leavetype:"",
    leaveFrom:"",
    leaveTo:"",
    Numberofdays:"",
    Status:"",
    Reason:"",
    RequestedOn:"",
    ApprovedBy:"",
    ApprovedDate:""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() =>{
    context.setIsHideSidebarAndHeader(false); 
    fetchDataFromApi(`/emp/`).then((res)=>{
      setEmployees(res);
    })
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postData(`/leave/create`, form);
      toast.success("Attendance added successfully!");
      console.log("Success:", res);
      setForm({
      name: "",
    Department:"",
    leavetype:"",
    leaveFrom:"",
    leaveTo:"",
    Numberofdays:"",
    Status:"",
    Reason:"",
    RequestedOn:"",
    ApprovedBy:"",
    ApprovedDate:""
      })
    } catch (err) {
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
              <span>Leave</span>
            </div>

            <div className="add-employee-container">
              <h2 className="form-title">New Entry</h2>
              <form className="employee-form" onSubmit={handleSubmit}>
                <div className="form-row">
                   <div className="form-group">
                    <label>Employee Name*</label>
                    <select
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Employee</option>
                      {employees.map((emp) => (
                        <option key={emp._id} value={emp._id}>
                          {emp.name}
                        </option>
                      ))}
                    </select>
                  </div>

                       <div class="form-group">
                                   <label>Department*</label>
                                  <input type="text"   name="Department" value={form.Department} onChange={handleChange} />
                                </div>

                </div>

              <div className="form-row">
                                <div class="form-group">
                                  <label>Leave type*</label>
                                  <select name="leavetype"
                                    value={form.leavetype} onChange={handleChange} >
                                    <option value="">Select The Leave</option>
                                    <option >Casual Leave </option>
                                    <option >Medical Leave</option>
                                    <option>Maternity Leave</option>
                                    <option>Unpaid Leave</option>
                                  </select>
                                </div>

                                <div class="form-group">
                                  <label>Leave From*</label>
                                   <input type="Date" name="leaveFrom"
                                    value={form.leaveFrom}  onChange={handleChange}/>
                                </div>

                              </div>


                 <div className="form-row">
                                <div class="form-group">
                                  <label>Leave To*</label>
                                    <input type="Date"  name="leaveTo" value={form.leaveTo}  onChange={handleChange} />
                                </div>

                                <div class="form-group">
                                  <label>Number of days*</label>
                                    <input type="number" name="Numberofdays"  value={form.Numberofdays}  onChange={handleChange} />
                                </div>
                              </div>

                            <div className="form-row">

                                <div class="form-group ">
                                  <label>Reason*</label>
                                    <input type="text" name ="Reason" value={form.Reason} onChange={handleChange} />
                                </div>

                                 <div class="form-group">
                                  <label>Requested On*</label>
                                      <input type="Date" name="RequestedOn" value={form.RequestedOn}  onChange={handleChange} />
                                </div>
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

export default AddLeave;
