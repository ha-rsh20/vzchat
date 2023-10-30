import React from "react";
import img from "../../img.jpg";
import "./home.css";

function Home() {
  return (
    <div className="home">
      <div className="main-block">
        <content>
          Introducing VChat, the most convenient and easy-to-use video call web
          application on the market. With VChat, you can make high-quality video
          calls to anyone in the world, right from your web browser. No
          downloads or installations required.
        </content>
        <div className="space-block"></div>
      </div>
      <div className="main-block">
        <div className="space-block"></div>
        <content>
          VChat is packed with features, including: <br />
          <li>
            <b>High-quality video and audio:</b> Experience clear and crisp
            video and audio on all devices.
          </li>
          <li>
            <b>Screen sharing:</b> Share your screen with other participants to
            collaborate on projects or give presentations.{" "}
          </li>
          <li>
            <b>Chat:</b> Send and receive text messages during your video calls.
          </li>
        </content>
      </div>
      <div className="main-block">
        <content>
          VChat is perfect for: <br />
          <ul>
            <li>
              <b>Personal calls:</b> Stay in touch with friends and family
              members who live far away.
            </li>
            <li>
              <b>Business calls:</b> Have productive meetings with colleagues
              and clients without having to travel.
            </li>
            <li>
              <b>Online classes:</b> Learn from experts from all over the world
              without having to leave your home.
            </li>
            <li>
              <b>Virtual events:</b> Attend conferences, workshops, and other
              events without having to pay for travel and accommodation.
            </li>
          </ul>
        </content>
        <div className="space-block"></div>
      </div>
    </div>
  );
}

export default Home;
