import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
  const [login, setLogin] = useState(localStorage.getItem("loggedIn"));
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    setLogin(localStorage.getItem("loggedIn"));
    login !== "true" ? navToLogin() : console.log();
  }, [login]);

  const navToLogin = () => {
    console.log("navigating to login");
    navigate("/register");
  };

  return <div>{login === "true" ? <Component /> : console.log()}</div>;
}

export default Protected;
