import React, { useContext } from "react";
import "./Header.css";
import { Avatar } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { auth } from "../firebase";
import { StateContext, ACTION_TYPES } from "../context/StateProvider";

function Header() {
  const { state, dispatch } = useContext(StateContext);

  const { user } = state;

  const handleLogout = async () => {
    try {
      await auth.signOut();

      // Dispatch an action to reset the user in the state
      dispatch({ type: ACTION_TYPES.SET_USER_NULL });
    } catch (error) {
      alert("Error during logout");
    }
  };
  return (
    <div className="header">
      <div className="header__left">
        <Avatar
          className="header__avatar"
          src={user?.displayName}
          alt={user?.photoURL}
        />
        <AccessTimeIcon />
      </div>
      <div className="header__search">
        <SearchIcon />
        <input placeholder="Search Channels" />
      </div>
      <div className="header__right">
        <Button onClick={handleLogout} className="header__button">
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Header;
