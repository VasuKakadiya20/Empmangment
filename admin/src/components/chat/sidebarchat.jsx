import React, { useState, useEffect } from "react";
import "./sidebarchat.css";
import userImg from "../../assets/images/user.png";
import { fetchDataFromApi } from "../../uttils/api";

function EmployeeList({ onSelectChat }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetchDataFromApi("/chat");

        const updatedEmployees = await Promise.all(
          res.map(async (emp) => {
            try {
              const empData = await fetchDataFromApi(`/emp/img/${emp.employeeName}`);
              return { ...emp, profileImage: empData.profileImage || userImg };
            } catch {
              return { ...emp, profileImage: userImg }; 
            }
          })
        );

        setEmployees(updatedEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="sidebars">
      {employees.map((emp) => (
        <div key={emp._id} className="name">
          <div
            className="employee-item"
            onClick={() => onSelectChat(emp._id, emp.employeeName)}
          >
            <img
              src={emp.profileImage}
              alt={emp.employeeName}
              className="employee-avatar"
            />
            <div>
              <b>{emp.employeeName}</b>
              <p className="latest-msg">
                {emp.latestMessage?.message
                  ? emp.latestMessage.message.substr(0, 25) + "..."
                  : "No messages yet"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EmployeeList;

