import React from 'react';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import{UserProfile,Feeds} from 'views';
import Header from 'common/Header/Header';
import {Error} from "ui";
import ScrollButton from "common/ScrollBar/ScrollBar";


function App() {
  return (
    <>
      <Header />
      <ScrollButton />
      <Routes>
        <Route path="/" element={<Feeds />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="*" element={<Error msg=" We're sorry. The Web address you entered is not a functioning page on our site." />} />
      </Routes>
    </>
  );
  }

  export default App;
