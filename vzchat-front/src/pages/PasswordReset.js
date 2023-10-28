import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui_style";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams, useLocation } from "react-router";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  updateUserFirstName,
  updateUserEmail,
} from "../state/slice/userSlice.js";
import { updateUserLastName } from "../state/slice/userSlice.js";
import { updateUserId } from "../state/slice/userSlice.js";
import { updateUserLoggedIn } from "../state/slice/userSlice.js";

function Register(props) {
  const { at } = useParams();
  const [otp, setOTP] = useState();
  const [value, setValue] = useState(false);
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  let [user, setUser] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const initialValues = {
    uotp: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const dispatch = useDispatch();
  const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
  };

  const validationSchemaForEmail = Yup.object().shape({
    email: Yup.string()
      .required("Please type your email")
      .email("Enter valid email address"),
  });

  const validationSchemaForOTP = Yup.object().shape({
    uotp: Yup.string().required("Please enter OTP"),
  });

  const validationSchemaForPassword = Yup.object().shape({
    password: Yup.string()
      .required("You need to create password for your account!")
      .min(8, "Password must have at least 8 characters")
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    confirm_password: Yup.string()
      .required("You need to re-type your password")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  const onReset = (values) => {
    let reset = {
      email: values.email,
      password: values.password,
    };
    if (otp === undefined) {
      console.log("sending mail");
      axios
        .get(
          `https://vzchat-back-service.onrender.com/email/sendMail/${values.email}/reset`
        )
        .then((res) => {
          document.getElementById("email").disabled = true;
          setOTP(res.data);
        })
        .catch((err) => {
          toast.error("OTP not sent!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    } else if (value) {
      console.log("changing password");
      axios
        .put("https://vzchat-back-service.onrender.com/passwordreset", reset)
        .then((res) => {
          if (res.status === 201) {
            toast.success("Password reset successful!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            navigate("/login");
          }
        })
        .catch((err) => {
          toast.error("Error!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        });
    } else {
      console.log("verifying otp");
      if (otp === values.uotp) {
        document.getElementById("otp").disabled = true;
        setValue(true);
      } else {
        toast.error("OTP don't match!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
    console.log("out of everything");
  };

  return (
    <div
      style={{
        margin: "30px",
        padding: 10,
        rowGap: 20,
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: "5px",
          borderRadius: "10px",
          boxShadow: "0px 10px 30px -5px #000",
          minWidth: "300px",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={
            otp === undefined
              ? validationSchemaForEmail
              : value
              ? validationSchemaForPassword
              : validationSchemaForOTP
          }
          onSubmit={onReset}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <ThemeProvider theme={theme}>
                <div>
                  <div
                    style={{
                      padding: 10,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <TextField
                      id="email"
                      type="email"
                      variant="outlined"
                      label="Email"
                      name="email"
                      placeholder="enter email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && (
                      <span
                        style={{
                          padding: 5,
                          color: "red",
                          fontSize: 16,
                          fontWeight: 500,
                        }}
                      >
                        {formik.errors.email}
                      </span>
                    )}
                  </div>
                  {otp && (
                    <div
                      style={{
                        padding: 10,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <TextField
                        id="otp"
                        type="text"
                        variant="outlined"
                        name="uotp"
                        placeholder="enter OTP"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.uotp}
                      />
                      {formik.touched.uotp && (
                        <span
                          style={{
                            padding: 5,
                            color: "red",
                            fontSize: 16,
                            fontWeight: 500,
                          }}
                        >
                          {formik.errors.uotp}
                        </span>
                      )}
                    </div>
                  )}

                  {value && (
                    <div>
                      <div
                        style={{
                          padding: 10,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <TextField
                          type="password"
                          variant="outlined"
                          label="Password"
                          name="password"
                          placeholder="enter password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                        />
                        {formik.touched.password && (
                          <span
                            style={{
                              padding: 5,
                              color: "red",
                              fontSize: 16,
                              fontWeight: 500,
                            }}
                          >
                            {formik.errors.password}
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          padding: 10,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <TextField
                          type="password"
                          variant="outlined"
                          label="Confitm password"
                          name="confirm_password"
                          placeholder="confirm password"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.confirm_password}
                        />
                        {formik.touched.confirm_password && (
                          <span
                            style={{
                              padding: 5,
                              color: "red",
                              fontSize: 16,
                              fontWeight: 500,
                            }}
                          >
                            {formik.errors.confirm_password}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    style={{ margin: 10 }}
                  >
                    {otp === undefined
                      ? "send otp"
                      : value
                      ? "Change Password"
                      : "verify"}
                  </Button>
                </div>
              </ThemeProvider>
            </form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
