import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { mycontext } from "../../App";
import "./login.css";
import { loginData, postData } from "../../uttils/api";
import { useNavigate } from "react-router-dom";

const LoginSignupForm = () => {
  const context = useContext(mycontext);
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    Email: "",
    password: "",
    cpassword: "",
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

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!form.Email || !form.password) {
  //     showSnackbar("Email and password are required!", "error");
  //     return;
  //   }

  //   if (!isLogin) {
  //     if (!form.name) {
  //       showSnackbar("Username is required!", "error");
  //       return;
  //     }

  //     if (form.password !== form.cpassword) {
  //       showSnackbar("Passwords do not match!", "error");
  //       return;
  //     }
  //   }

  //   try {
  //     if (isLogin) {
  //       const res = await loginData("/signup/login", {
  //         Email: form.Email,
  //         password: form.password,
  //       });
  //       localStorage.setItem("user", JSON.stringify(res.user));
  //       console.log("Logged in:", res);
  //       showSnackbar("Login successful!", "success");

  //       context.setislogin(true);

  //       setTimeout(() => {
  //         navigate("/Dashboard");
  //       }, 3000);
  //     } else {
  //       const res = await postData("/signup/create", {
  //         name: form.name,
  //         Email: form.Email,
  //         password: form.password,
  //         cpassword: form.cpassword,
  //       });
  //       console.log("Signed up:", res);
  //       showSnackbar("Signup successful!", "success");
  //       setIsLogin(true);
  //     }
  //   } catch (error) {
  //     showSnackbar(
  //       error?.response?.data?.message || "Something went wrong",
  //       "error"
  //     );
  //   }
  // };

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "logintype" && value === "Admin") {
    setForm({
      ...form,
      logintype: value,
      Email: "admin@example.com",
      password: "admin123",
    });
  } else if (name === "logintype" && value === "Employee") {
    setForm({
      ...form,
      logintype: value,
      Email: "",
      password: "",
    });
  } else {
    setForm({ ...form, [name]: value });
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.Email || !form.password) {
      showSnackbar("Email and password are required!", "error");
      return;
    }

    if (!isLogin) {
      if (!form.name) {
        showSnackbar("Username is required!", "error");
        return;
      }
      if (form.password !== form.cpassword) {
        showSnackbar("Passwords do not match!", "error");
        return;
      }
    }

    if (form.logintype === "Admin") {
      const adminUser = "admin@example.com";
      const adminPass = "admin123";

      if (form.Email === adminUser && form.password === adminPass) {
        showSnackbar("Admin login successful!", "success");
        localStorage.setItem(
          "user",
          JSON.stringify({ role: "Admin",  user: form.Email })
        );
        context.setislogin(true);
        setTimeout(() => {
          navigate("/Dashboard");
        }, 1000);
      } else {
        showSnackbar("Invalid Admin credentials!", "error");
      }
      return;
    }

    try {
      if (isLogin) {
        const res = await loginData("/signup/login", {
          Email: form.Email,
          password: form.password,
        });
        localStorage.setItem( "user",JSON.stringify({ role: "employee", user: res.user }));
        showSnackbar("Login successful!", "success");
        context.setislogin(true);
        setTimeout(() => {
          navigate("/attendence/add");
        }, 1000);
      } else {
        const res = await postData("/signup/create", {
          name: form.name,
          Email: form.Email,
          password: form.password,
          cpassword: form.cpassword,
        });
        showSnackbar("Signup successful!", "success");
        setIsLogin(true);
      }
    } catch (error) {
      showSnackbar(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };


  return (
    <>
      <div className="auth-page">
        <div className="auth-box">
          <div className="auth-toggle">
            <div
              className="auth-btn-slider"
              style={{ left: isLogin ? "0px" : "50%" }}
            />
            <button
              type="button"
              className={`auth-toggle-btn ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              type="button"
              className={`auth-toggle-btn ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Signup
            </button>
          </div>

          <h2 className="auth-title">
            {isLogin ? "Login Form" : "Signup Form"}
          </h2>


          <form className="auth-form" onSubmit={handleSubmit}>
            {isLogin && (
              <div className="auth-dropdown">
                <select
                  name="logintype"
                  onChange={handleChange}
                >
                  <option value="">Select the type</option>
                  <option value="Employee">Employee</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            )}

            {!isLogin && (
              <TextField
                name="name"
                label="Username"
                variant="outlined"
                fullWidth
                className="auth-input"
                value={form.name}
                onChange={handleChange}
              />
            )}
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
              className="auth-input"
              value={form.password}
              onChange={handleChange}
            />
            {!isLogin && (
              <TextField
                name="cpassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                className="auth-input mb-3"
                value={form.cpassword}
                onChange={handleChange}
              />
            )}

            {isLogin && (
              <div className="auth-link mt-3">
                <a href="#">Forgot password?</a>
              </div>
            )}

            <button type="submit" className="auth-submit">
              {isLogin ? "Login" : "Signup"}
            </button>

            <div className="auth-bottom-text">
              {isLogin ? (
                <>
                  Not a member?{" "}
                  <a onClick={() => setIsLogin(false)}>Signup now</a>
                </>
              ) : (
                <>
                  Already a member?{" "}
                  <a onClick={() => setIsLogin(true)}>Login here</a>
                </>
              )}
            </div>
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
