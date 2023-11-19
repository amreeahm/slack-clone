import React, { useContext } from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { auth, provider } from "../firebase";
import { StateContext, ACTION_TYPES } from "../context/StateProvider";

function Login() {
  const { dispatch } = useContext(StateContext);

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({ type: ACTION_TYPES.SET_USER, user: result.user });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png"
          alt="Icon"
        />
        <h1>Sign in to Slack and Enjoy!</h1>

        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
}

export default Login;
