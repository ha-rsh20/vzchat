import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();
  const handleJoinRoom = () => {
    navigate(`/room/${value}`);
  };

  return (
    <div className="home-page">
      <form className="form">
        <div>
          <label>Enter room code</label>
          <input
            value={value}
            type="text"
            required
            placeholder="Enter room code"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleJoinRoom}>
          Enter Room
        </button>
      </form>
    </div>
  );
};

export default HomePage;
