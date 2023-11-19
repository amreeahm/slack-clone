import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCRrafSGsyltFkVSIxgCMk-_SAu7n9c_00",
  authDomain: "slack-clone-6edb3.firebaseapp.com",
  projectId: "slack-clone-6edb3",
  storageBucket: "slack-clone-6edb3.appspot.com",
  messagingSenderId: "511323252529",
  appId: "1:511323252529:web:3c8aab773075b43fd0f210",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
