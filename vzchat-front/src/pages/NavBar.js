import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Avatar, Popover, Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserId,
  updateUserFirstName,
  updateUserLastName,
  updateUserLoggedIn,
  updateUserEmail,
  removeUserEmail,
  removeUserFirstName,
  removeUserLastName,
  removeUserId,
  removeUserLoggedIn,
} from "../state/slice/userSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

function NavBar() {
  const [log, setLog] = useState();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const userFName = useSelector((state) => state.users.firstname);
  const userLName = useSelector((state) => state.users.lastname);
  const userEmail = useSelector((state) => state.users.email);
  const userSId = useSelector((state) => state.users.id);
  const dispatch = useDispatch();

  const removeSetup = () => {
    dispatch(removeUserFirstName);
    dispatch(removeUserLastName);
    dispatch(removeUserId);
    dispatch(removeUserLoggedIn);
    dispatch(removeUserEmail);
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
  };
  const logOut = () => {
    removeSetup();
    setOpen(false);
    dispatch(updateUserFirstName("user"));
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    let login = localStorage.getItem("loggedIn");
    if (login === "false") {
      setLog("false");
    } else if (login === "true") {
      setLog("true");
      if (localStorage.getItem("firstname")) {
        dispatch(updateUserFirstName(localStorage.getItem("firstname")));
      }
      if (localStorage.getItem("lastname")) {
        dispatch(updateUserLastName(localStorage.getItem("lastname")));
      }
      if (localStorage.getItem("email")) {
        dispatch(updateUserEmail(localStorage.getItem("email")));
      }
    }
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(false);
  };

  const handleUpdateProfile = () => {
    navigate("/updateprofile");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">VChat</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/lobby">
              Join room | Create room
            </Nav.Link>
            <Nav.Link as={Link} to="/history">
              History
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/chat">
              Chat
            </Nav.Link> */}
          </Nav>
          <Nav className="d-flex">
            {log === "false" || log === undefined ? (
              <Nav.Link as={Link} to="/register">
                Register/Login
              </Nav.Link>
            ) : (
              <Nav
                onClick={handleClick}
                style={{
                  cursor: "pointer",
                }}
              >
                <Avatar sx={{ bgcolor: "#ffffff", color: "#202020" }}>
                  {userFName[0].toUpperCase()}
                  {userLName[0].toUpperCase()}
                </Avatar>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>

      <Popover
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <div style={{ padding: 10, display: "flex", flexDirection: "column" }}>
          <span>
            {userFName} {userLName}
          </span>
          <span>{userEmail}</span>
          <div
            style={{
              borderBottom: "2px solid black",
              margin: 5,
            }}
          ></div>

          <Button onClick={logOut} variant="contained">
            <ExitToAppIcon />
          </Button>
          <hr />
          <Button onClick={handleUpdateProfile} variant="contained">
            Update Profile
          </Button>
        </div>
      </Popover>
    </Navbar>
  );
}

export default NavBar;
