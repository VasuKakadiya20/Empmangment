import "./addLeave.css";
import { mycontext } from "../../App";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { fetchDataFromApi, postData } from "../../uttils/api";
import React, { useContext, useEffect, useState } from "react";

const AddLeave = () => {
  const [employees, setEmployees] = useState([]);
  const context = useContext(mycontext);

  const [form, setForm] = useState({
    name: "",  // will be set from localStorage
    leavetype: "",
    leaveFrom: "",
    leaveTo: "",
    Numberofdays: "",
    Status: "",
    Reason: "",
    RequestedOn: "",
    ApprovedBy: "",
    ApprovedDate: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
  context.setIsHideSidebarAndHeader(false);

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const empname = storedUser.user?.name || ""; 

  if (empname) {
    setForm((prev) => ({ ...prev, name: empname }));
  } else {
    console.warn("⚠️ No name found in localStorage.user");
  }
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postData(`/leave/create`, form);
      toast.success("Leave added successfully!");
      console.log("Success:", res);
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const empname = storedUser.user?.name;  
      setForm({
        name: empname,
        leavetype: "",
        leaveFrom: "",
        leaveTo: "",
        Numberofdays: "",
        Status: "",
        Reason: "",
        RequestedOn: "",
        ApprovedBy: "",
        ApprovedDate: ""
      });
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="attendance mt-5">
        <div className="attendance-container mt-5">
          <div className="table-wrapper">
            <div className="table-header">
              <span>Leave</span>
            </div>

            <div className="add-employee-container">
              <h2 className="form-title">New Entry</h2>
              <form className="employee-form" onSubmit={handleSubmit}>
                <input type="hidden" name="name" value={form.name} />

                <div className="form-row">
                  <div className="form-group">
                    <label>Leave type*</label>
                    <select
                      name="leavetype"
                      value={form.leavetype}
                      onChange={handleChange}
                    >
                      <option value="">Select The Leave</option>
                      <option>Casual Leave</option>
                      <option>Medical Leave</option>
                      <option>Maternity Leave</option>
                      <option>Unpaid Leave</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Leave From*</label>
                    <input
                      type="date"
                      name="leaveFrom"
                      value={form.leaveFrom}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Leave To*</label>
                    <input
                      type="date"
                      name="leaveTo"
                      value={form.leaveTo}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Number of days*</label>
                    <input
                      type="number"
                      name="Numberofdays"
                      value={form.Numberofdays}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Reason*</label>
                    <input
                      type="text"
                      name="Reason"
                      value={form.Reason}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Requested On*</label>
                    <input
                      type="date"
                      name="RequestedOn"
                      value={form.RequestedOn}
                      onChange={handleChange}
                    />
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
