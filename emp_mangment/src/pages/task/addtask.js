import { mycontext } from "../../App";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { fetchDataFromApi, postData } from "../../uttils/api";
import React, { useContext, useEffect, useState } from "react";

const Addtask = () => {
  const [employees, setEmployees] = useState([]);
  const context = useContext(mycontext)
  const [form, setForm] = useState({
    name: "",
    title:"",
    duedate:"",
    details:"",
    status:"",
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
      const res = await postData(`/task/create`, form);
      toast.success("Task added successfully!");
      console.log("Success:", res);
      setForm({
      name: "",
    title:"",
    duedate:"",
    details:"",
    status:"",
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
              <span>Task</span>
            </div>

            <div className="add-employee-container">
              {/* <h2 className="form-title">New Entry</h2> */}
              <form className="employee-form" onSubmit={handleSubmit}>
                <div className="form-row">
                   <div className="form-group">
                    <label>Employee Name*</label>
                    <select
                      name="name"
                      value={form.name}
                      onChange={handleChange}
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
                                   <label>Title*</label>
                                  <input type="text"   name="title" value={form.title} onChange={handleChange} />
                                </div>

                </div>

              <div className="form-row">
                            
                      <div class="form-group">
                                  <label>Due Date*</label>
                                    <input type="Date"  name="duedate" value={form.duedate}  onChange={handleChange} />
                                </div>

                                 <div class="form-group">
                                  <label>Status*</label>
                                  <select name="status"
                                    value={form.status} onChange={handleChange} >
                                    <option value="">Select The status</option>
                                    <option >pending</option>
                                    <option value="In_Progress">In Progress</option>
                                    <option >Completed</option>
                                  </select>
                                </div>

                              </div>

                            <div className="form-row">
                                 <div class="form-group">
                                 <label>Details*</label>
                                      <textarea name="details" value={form.details}  onChange={handleChange} />
                                 </div>
                                  <div class="form-group"></div>
                                 
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

export default Addtask;
