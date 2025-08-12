import React, { useState } from "react";
import "./addAttendance.css";
import { postData } from "../../uttils/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAttendance = () => {
  const [form, setForm] = useState({
    name: "",
    firstIn: "",
    break: "",
    breakOut: "",
    lastOut: "",
    totalHours: "",
    status: "",
    shift: "",
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
      const res = await postData(`/att/create`, form);
      toast.success("Attendance added successfully!");
      console.log("Success:", res);
      setForm({
        name: "",
        firstIn: "",
        break: "",
        breakOut: "",
        lastOut: "",
        totalHours: "",
        status: "",
        shift: "",
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
              <span>Attendance</span>
            </div>

            <div className="add-employee-container">
              <h2 className="form-title">New Entry</h2>
              <form className="employee-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name*</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder="Enter The Name..." />
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="form-group">
                    <label>First In*</label>
                    <select name="firstIn" value={form.firstIn} onChange={handleChange}>
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
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Break In*</label>
                    <select name="break" value={form.break} onChange={handleChange}>
                      <option value="">Select the Break In Time</option>
                      <option value="01:00">01:00</option>
                      <option value="01:15">01:15</option>
                      <option value="01:30">01:30</option>
                      <option value="01:45">01:45</option>
                      <option value="02:00">02:00</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Break Out*</label>
                    <select name="breakOut" value={form.breakOut} onChange={handleChange}>
                      <option value="">Select the Break Out Time</option>
                      <option value="02:00">02:00</option>
                      <option value="02:15">02:15</option>
                      <option value="02:30">02:30</option>
                      <option value="02:45">02:45</option>
                      <option value="03:00">03:00</option>
                    </select>
                  </div>
                </div>


                <div className="form-row">
                  <div className="form-group">
                    <label>Last Out*</label>
                    <select name="lastOut" value={form.lastOut} onChange={handleChange}>
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
                  </div>


                  <div className="form-group">
                    <label>Total Hours*</label>
                    <select name="totalHours" value={form.totalHours} onChange={handleChange}>
                      <option value="">Select the Total Hours Time</option>
                      <option value="08:00">08:00</option>
                      <option value="08:15">08:15</option>
                      <option value="08:30">08:30</option>
                      <option value="08:45">08:45</option>
                      <option value="09:00">09:00</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Status*</label>
                    <select name="status" value={form.status} onChange={handleChange}>
                      <option value="">Select the Employee status</option>
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                    </select>
                    <i className="fas fa-chevron-down"></i>
                  </div>

                  <div className="form-group ">
                    <label>Shift*</label>
                    <select name="shift" value={form.shift} onChange={handleChange}>
                      <option value="">Select the Employee shift</option>
                      <option value="Night Shift">Night Shift</option>
                      <option value="Day Shift">Day Shift</option>
                    </select>
                    <i className="fas fa-chevron-down"></i>
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

export default AddAttendance;
