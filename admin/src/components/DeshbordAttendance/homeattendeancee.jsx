import React from "react";
import { FaEdit } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import { editdata, fetchDataFromApi } from "../../uttils/api";
import userimg from "../../assets/images/user.png"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './attendance.css'

const HomeAttendance = () => {
  const [attendance, setattendance] = useState([])

  useEffect(() => {
    fetchDataFromApi('/att/').then((res) => {
      setattendance(res)
    })
    window.scrollTo(0, 0);
  }, [])

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

