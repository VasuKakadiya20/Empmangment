import "./addAttendance.css";
import { mycontext } from "../../App";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { fetchDataFromApi, postData } from "../../uttils/api";
import React, { useContext, useEffect, useState } from "react";

const AddAttendance = () => {
  const context = useContext(mycontext);
  const [form, setForm] = useState({
    name: "",
    firstIn: "",
    break: "",
    breakOut: "",
    lastOut: "",
    totalHours: "",
  });

  useEffect(() => {
    context.setIsHideSidebarAndHeader(false);
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    const empname = storedUser.user?.name || "";
    if (empname) {
      setForm((prev) => ({ ...prev, name: empname }));
    }

    const fetchTodayAttendance = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const data = await fetchDataFromApi(`/att/today?name=${empname}&date=${today}`);
        if (data.success && data.record) {
          setForm(data.record);
        }
      } catch (err) {
        console.error("Error fetching today's attendance:", err);
      }
    };

    if (empname) fetchTodayAttendance();
  }, []);

  const formatTime = (date) => {
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  const toMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [hh, mm] = timeStr.split(":").map(Number);
    return hh * 60 + mm;
  };

  const captureTime = (field) => {
    const now = new Date();
    const currentTime = formatTime(now);

    setForm((prev) => {
      const updated = { ...prev, [field]: currentTime };

      if (field === "lastOut" && updated.firstIn) {
        const firstInMin = toMinutes(updated.firstIn);
        const lastOutMin = toMinutes(currentTime);
        const breakInMin = toMinutes(updated.break);
        const breakOutMin = toMinutes(updated.breakOut);

        let workedMinutes = lastOutMin - firstInMin;

        if (breakInMin && breakOutMin) {
          workedMinutes -= (breakOutMin - breakInMin);
        }

        const hh = String(Math.floor(workedMinutes / 60)).padStart(2, "0");
        const mm = String(workedMinutes % 60).padStart(2, "0");
        updated.totalHours = `${hh}:${mm}`;
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postData(`/att/mark`, form);
      toast.success("Attendance Added successfully!");
      console.log("Success:", res);
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const empname = storedUser.user?.name;
      setForm({
        name: empname,
        firstIn: "",
        break: "",
        breakOut: "",
        lastOut: "",
        totalHours: "",
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
              <span>Attendance</span>
            </div>

            <div className="add-employee-container">
              <h2 className="form-title">New Entry</h2>
              <form className="employee-form" onSubmit={handleSubmit}>
                <input type="hidden" name="name" value={form.name} />

                <div className="form-row mt-5">
                  <div className="form-groups">
                    <label>Clock In*</label>
                    <button type="button" className="time-btn"
                      onClick={() => captureTime("firstIn")}>
                      Set Current Time
                    </button>
                    <span className="time-display">{form.firstIn}</span>
                  </div>

                  <div className="form-groups">
                    <label>Break In*</label>
                    <button type="button" className="time-btn"
                      onClick={() => captureTime("break")}>
                      Set Current Time
                    </button>
                    <span className="time-display">{form.break}</span>
                  </div>

                </div>

                <div className="form-row">
                  <div className="form-groups">
                    <label>Break Out*</label>
                    <button type="button" className="time-btn"
                      onClick={() => captureTime("breakOut")}>
                      Set Current Time
                    </button>
                    <span className="time-display">{form.breakOut}</span>
                  </div>

                  <div className="form-groups">
                    <label>Clock Out*</label>
                    <button type="button" className="time-btn"
                      onClick={() => captureTime("lastOut")}>
                      Set Current Time
                    </button>
                    <span className="time-display">{form.lastOut}</span>
                  </div>
                </div>

                <div className="form-main">
                  <label>Total Hours :</label>
                  <span className="time-display">{form.totalHours}</span>
                </div>

                <div className="submit-container">
                  <button type="submit" className="submit-btn mt-3">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAttendance;
