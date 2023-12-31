import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import useWindowDimensions from "../../context/useWindowDimensions";

function RoomPage() {
  const { height, width } = useWindowDimensions();
  const { roomId } = useParams();
  const userFName = localStorage.getItem("firstname");
  const userLName = localStorage.getItem("lastname");

  const myMeeting = async (element) => {
    const appID = "your app id";
    const serverSecret = "your server secret";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      `${userFName} ${userLName}`
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Roomid",
          url: `${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });
  };

  return (
    <div>
      <div ref={myMeeting} style={{ height: height - 72 }} />
    </div>
  );
}

export default RoomPage;
