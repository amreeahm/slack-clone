import React, { useState, useContext } from "react";
import "./ChatInput.css";
import { Button } from "@mui/material";
import db from "../firebase";
import { StateContext } from "../context/StateProvider";
import firebase from "firebase";

function ChatInput({ channelName, channelId }) {
  const { state } = useContext(StateContext);

  const { user } = state;
  const [input, setInput] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      db.collection("rooms")
        .doc(channelId)
        .collection("messages")
        .add({
          message: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: user.displayName,
          userImage: user.photoURL,
        })
        .then(() => {
          setInput(""); // Clear the input field after sending the message
        })
        .catch((error) => {
          console.error("Error sending message: ", error);
        });
    }
  };
  return (
    <div className="chatInput">
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName?.toLowerCase()}`}
        />
        <Button type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </div>
  );
}

export default ChatInput;
