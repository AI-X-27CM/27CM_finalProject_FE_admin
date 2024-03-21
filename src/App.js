/* eslint-disable */
import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./last/Home";
import Header from "./last/Header";
import Side from "./last/Side";
import Phishing2 from "./last/Phishing2";
import User2 from "./last/User2";
import Label from "./last/Label";
import Error2 from "./last/Error2";
import Errorlog from "./last/Errorlog";

import Day2 from "./last/Day2";
import Frequency from "./last/Frequency";



function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 사이드바 상태 관리

  // 사이드바 토글 함수
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (  
    <Router>
      <div className={`wrapper ${isSidebarOpen ? '' : 'sidebar-closed'}`}>
        <Header />
        {/* Side 컴포넌트에 isSidebarOpen과 toggleSidebar 함수를 props로 전달 */}
        <Side isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="content-wrapper">
          <Routes>
         
            <Route path="/" element={<Home />} />
            <Route path="/error" element={<Error2 />} />
            <Route path="/errorlog" element={<Errorlog />} />
            <Route path="/label" element={<Label />} />
            <Route path="/phishing" element={<Phishing2 />} />
            <Route path="/user" element={<User2 />} />
            <Route path="/day" element={<Day2 />} />
            <Route path="/frequency" element={<Frequency />} />
           
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;