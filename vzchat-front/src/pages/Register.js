import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui_style";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
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
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  let [user, setUser] = useState();
  const [value, setValue] = useState(
    props.login === "true" ? "login" : "register"
  );
  const navigate = useNavigate();
  const initialValues = {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const dispatch = useDispatch();
  const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
  };

  const validationSchemaForRegister = Yup.object().shape({
    firstname: Yup.string()
      .required("Please type your firstname")
      .min(3, "Enter more than 3 characters"),
    lastname: Yup.string()
      .required("Please type your lastname")
      .min(3, "Enter more than 3 characters"),
    email: Yup.string()
      .required("Please type your email")
      .email("Enter valid email address"),
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

  const validationSchemaForLogin = Yup.object().shape({
    email: Yup.string()
      .required("Please type your email")
      .email("Enter valid email address"),
    password: Yup.string().required("Please type your password"),
  });

  const handleChange = () => {
    if (value === "register") setValue("login");
    else if (value === "login") setValue("register");
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/app/showAllUsers")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        toast.error("Netowrk error!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setError(true);
      });
  }, [value]);

  const setUp = (fname, lname, id, email) => {
    dispatch(updateUserEmail(email));
    dispatch(updateUserFirstName(fname));
    dispatch(updateUserLastName(lname));
    dispatch(updateUserId(id));
    dispatch(updateUserLoggedIn(true));
    localStorage.setItem("email", email);
    localStorage.setItem("loggedIn", true);
    localStorage.setItem("firstname", fname);
    localStorage.setItem("lastname", lname);
    localStorage.setItem("id", id);
  };

  const onRegister = (values, { resetForm }) => {
    values.id = users[users.length - 1].id + 1;

    axios
      .post("http://localhost:4000/app/addUser", values)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Registered successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setValue("login");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error occured to register!", {
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
    resetForm({ values: "" });
  };

  const onLogin = (values) => {
    user = users.filter((u) => u.email.includes(values.email));
    if (user.length === 0) {
      toast.error("Email not registered!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (
      user[0].email === values.email &&
      user[0].password === values.password
    ) {
      setUp(user[0].firstname, user[0].lastname, user[0].id, user[0].email);
      navigate("/");
    } else if (user[0].password !== values.password) {
      toast.error("Invalid Password!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Network Error!", {
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
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab value="register" label="Register" />
            <Tab value="login" label="Login" />
          </Tabs>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={
            value === "register"
              ? validationSchemaForRegister
              : validationSchemaForLogin
          }
          onSubmit={value === "register" ? onRegister : onLogin}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <ThemeProvider theme={theme}>
                <>
                  {value === "register" && (
                    <div>
                      <div
                        style={{
                          padding: 10,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <TextField
                          type="text"
                          variant="outlined"
                          label="First Name"
                          name="firstname"
                          placeholder="enter first-name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.firstname}
                        />
                        {formik.touched.firstname && (
                          <span
                            style={{
                              padding: 5,
                              color: "red",
                              fontSize: 16,
                              fontWeight: 500,
                            }}
                          >
                            {formik.errors.firstname}
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
                          type="text"
                          variant="outlined"
                          label="Last name"
                          name="lastname"
                          placeholder="enter last-name"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.lastname}
                        />
                        {formik.touched.lastname && (
                          <span
                            style={{
                              padding: 5,
                              color: "red",
                              fontSize: 16,
                              fontWeight: 500,
                            }}
                          >
                            {formik.errors.lastname}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <div
                    style={{
                      padding: 10,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <TextField
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
                  {value === "register" && (
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
                  )}
                  {error ? (
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ margin: 10 }}
                      disabled
                    >
                      {value === "register" ? "register" : "login"}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      style={{ margin: 10 }}
                    >
                      {value === "register" ? "register" : "login"}
                    </Button>
                  )}
                </>
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
