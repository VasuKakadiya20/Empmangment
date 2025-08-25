import "./login.css";
import { mycontext } from "../../App";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import React, { useState, useEffect, useContext } from "react";

const LoginSignupForm = () => {
 const context = useContext(mycontext);
  const [form, setForm] = useState({
    Email: "admin@example.com",  
    password: "admin123",      
  });
  const navigate = useNavigate();
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    context.setIsHideSidebarAndHeader(true);
  }, []);

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnack({ ...snack, open: false });
  };

  const showSnackbar = (message, severity = "success") => {
    setSnack({ open: true, message, severity });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.Email || !form.password) {
      showSnackbar("Email and password are required!", "error");
      return;
    }

    const adminUser = "admin@example.com";
    const adminPass = "admin123";

    if (form.Email === adminUser && form.password === adminPass) {
      showSnackbar("Admin login successful!", "success");
      localStorage.setItem(
        "user",
        JSON.stringify({ role: "Admin", user: form.Email })
      );
      context.setislogin(true);
      setTimeout(() => {
        navigate("/Dashboard");
      }, 1000);
    } else {
      showSnackbar("Invalid Admin credentials!", "error");
    }
  };
  return (
    <>
      <div className="auth-page">
        <div className="auth-box">
          <h2 className="auth-title">
            Login Form
          </h2>


          <form className="auth-form" onSubmit={handleSubmit}>
  
            <TextField
              name="Email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              className="auth-input"
              value={form.Email}
              onChange={handleChange}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              className="auth-input mb-5"
              value={form.password}
              onChange={handleChange}
            />

            <button type="submit" className="auth-submit">
              Login
            </button>
          </form>
        </div>
      </div>

      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackClose}
          severity={snack.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginSignupForm;
