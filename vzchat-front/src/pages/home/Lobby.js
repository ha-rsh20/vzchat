import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../../mui_style";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { updateUserId } from "../../state/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../index.css";
import { ElevatorSharp } from "@mui/icons-material";

function Lobby() {
  const [meets, setMeets] = useState();
  const [meetname, setMeetName] = useState("");
  const [roomid, setRoomId] = useState("");
  const [value, setValue] = useState("one");
  const [error, setError] = useState(false);
  let userSId = useSelector((state) => state.users.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if (value === "two") {
      let currentTime = new Date();
      let time = currentTime.toLocaleString();
      addMeetingData(time);
    } else {
      handleMeetData(userSId);
    }
  };

  const handleChange = () => {
    if (value === "one") setValue("two");
    else if (value === "two") setValue("one");
  };

  const addMeetingData = (currentTime) => {
    let id = meets[meets.length - 1].id + 1;
    let roomid = uuidV4();
    console.log(currentTime);
    axios
      .post("http://localhost:4000/app/addMeetData", {
        id,
        roomid,
        meetname,
        userSId,
        currentTime,
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Meet added to history!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate(`/room/${roomid}`);
        }
      })
      .catch((err) => {
        toast.error("Couldn't add this meet to history!", {
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

  const handleMeetData = (uid) => {
    let arr = {
      uid: uid.toString(),
    };
    axios
      .put(
        "http://localhost:4000/app/addMeetData/" + meetname + "/" + roomid,
        arr
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Joining Meeting!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate(`/room/${roomid}`);
        }
      })
      .catch((err) => {
        if (err.response.status === 501) {
          toast.error("Meeting doesn't exist!", {
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
          toast.error("Unexpected error!", {
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
      });
  };

  useEffect(() => {
    if (localStorage.getItem("id")) {
      userSId = localStorage.getItem("id");
      dispatch(updateUserId(localStorage.getItem("id")));
    }
    axios
      .get("http://localhost:4000/app/showAllMeetData")
      .then((res) => {
        setMeets(res.data);
      })
      .catch((err) => {
        console.log(err);
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
        setError(true);
      });
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Form onSubmit={handleJoinRoom}>
          <div
            style={{
              margin: "30px",
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
                minWidth: "250px",
              }}
            >
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="wrapped label tabs example"
                >
                  <Tab value="one" label="Join room" />
                  <Tab value="two" label="Create room" />
                </Tabs>
              </Box>
              <div style={{ margin: 10 }}>
                <TextField
                  id="outlined-basic"
                  label="Enter meeting name"
                  variant="outlined"
                  value={meetname}
                  onChange={(e) => {
                    setMeetName(e.target.value);
                  }}
                  required
                />
                <br />
                <br />
                {value === "one" && (
                  <>
                    <TextField
                      id="outlined-basic"
                      label="Enter RoomID"
                      variant="outlined"
                      value={roomid}
                      onChange={(e) => {
                        setRoomId(e.target.value);
                      }}
                      required
                    />
                    <br />
                    <br />
                  </>
                )}
                {error ? (
                  <Button variant="contained" type="submit" disabled>
                    {value === "one" ? <>join</> : <>create</>}
                  </Button>
                ) : (
                  <Button variant="contained" type="submit">
                    {value === "one" ? <>join</> : <>create</>}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Form>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default Lobby;
