import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { ACTION_TYPES, StateContext } from "./context/StateProvider";
import { useContext, useEffect } from "react";
import { auth } from "./firebase";

function App() {
  const { state, dispatch } = useContext(StateContext);

  const { user } = state;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch({ type: ACTION_TYPES.SET_USER, user: userAuth });
      } else {
        dispatch({ type: ACTION_TYPES.SET_USER_NULL });
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <div className="app__body">
              <Sidebar />
              <Routes>
                <Route path="/room/:roomId" element={<Chat />} />

                <Route
                  path="/"
                  element={
                    <>
                      <h1 className="app__home">Welcome to the Chat Box!</h1>
                      <h2 className="app__home2">
                        Select from the Channel on bottom right to chat.
                      </h2>
                    </>
                  }
                />
              </Routes>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
