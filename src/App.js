import React, { useState } from 'react';
import './App.css';
import AppHeader from './Main/AppHeader.js';
import AppSidebar from './Main/AppSidebar.js';
import AppWindow from './Main/AppWindow.js';
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmAdRlCHF3n9ASVUR_8g9Zjjtg9PILcM8",
  authDomain: "should-cost.firebaseapp.com",
  databaseURL: "https://should-cost-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "should-cost",
  storageBucket: "should-cost.appspot.com",
  messagingSenderId: "603189364432",
  appId: "1:603189364432:web:cf52438ad20108260d80d5"
};

function App() {

  const [ selectedPage, setSelectedPage ] = useState('SETUP');

  function selectPage(page_button){
      setSelectedPage(page_button);
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  return (
    <div className="App">
      <AppHeader />
      <AppSidebar selectPage={selectPage} selectedPage={selectedPage}/>
      <AppWindow selectedPage={selectedPage}/>
    </div>
  );
}

export default App;
