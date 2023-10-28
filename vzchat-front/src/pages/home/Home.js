import React from "react";
import img from "../../img.jpg";

function Home() {
  return (
    <div style={{ padding: "30px" }}>
      <div>
        <div style={{ float: "left", width: "50%" }}>
          Introducing VChat, the most convenient and easy-to-use video call web
          application on the market. With VChat, you can make high-quality video
          calls to anyone in the world, right from your web browser. No
          downloads or installations required.
        </div>
        <div style={{ float: "right", width: "50%", visibility: "hidden" }}>
          a
        </div>
      </div>
      <div>
        <div style={{ float: "left", width: "50%", visibility: "hidden" }}>
          a
        </div>
        <div>
          <img
            src={img}
            alt="img"
            style={{
              width: "50%",
              height: "200px",
              maxWidth: "350px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
