import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router";
import ChatInput from "./ChatInput";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import InfoIcon from "@mui/icons-material/Info";
import db from "../firebase";
import Message from "./Message";

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessage, setRoomMessage] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomDetails(snapshot.data());
        });
    }

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setRoomMessage(
          snapshot.docs.map((doc) => {
            return doc.data();
          })
        );
      });
  }, [roomId]);

  console.log(roomDetails);
  console.log(roomMessage);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__headerLeft">
          <h4 className="chat__channelName">
            <strong># {roomDetails?.name}</strong>
            <StarBorderIcon className="chat__starIcon" />
          </h4>
        </div>
        <div className="chat__headerRight">
          <p>
            <InfoIcon /> Details
          </p>
        </div>
      </div>

      <div className="chat__messages">
        {roomMessage.map((onemessage) => (
          <Message
            message={onemessage.message}
            timestamp={onemessage.timestamp}
            user={onemessage.user}
            userImage={onemessage.userImage}
          />
        ))}
      </div>
      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
    </div>
  );
}

export default Chat;
