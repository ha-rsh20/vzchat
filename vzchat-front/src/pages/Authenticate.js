import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui_style";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams, useLocation } from "react-router";

function Authenticate(props) {
  const [uotp, setUOTP] = useState();
  const [otp, setOTP] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const getOTP = () => {
    axios
      .get(
        "https://vzchat-back-service.onrender.com/email/sendMail/" +
          location.state.mail
      )
      .then((res) => {
        setOTP(res.data);
        toast.success("OTP sent!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
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
  };

  const onAuth = () => {
    if (otp === uotp) {
      navigate("/register", {
        state: {
          id: location.state.id,
          fname: location.state.fname,
          lname: location.state.lname,
          pass: location.state.pass,
          conf_pass: location.state.conf_pass,
          mail: location.state.mail,
        },
      });
    } else {
      toast.error("Incorrect OTP!", {
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
                id="otp"
                type="text"
                variant="outlined"
                name="otp"
                placeholder="enter OTP"
                value={uotp}
                onChange={(e) => {
                  setUOTP(e.target.value);
                }}
              />
            </div>
          </div>
          <Button
            onClick={otp === undefined ? getOTP : onAuth}
            type="submit"
            variant="contained"
            style={{ margin: 10 }}
          >
            {otp === undefined ? "Get otp" : "verify"}
          </Button>
        </ThemeProvider>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Authenticate;
