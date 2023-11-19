import React, { createContext, useReducer } from "react";

export const StateContext = createContext();

export const ACTION_TYPES = {
  SET_USER: "SET_USER",
};

const initialState = {
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER:
      return { ...state, user: action.user };
    case ACTION_TYPES.SET_USER_NULL:
      return { ...state, user: null };
    default:
      return state;
  }
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
