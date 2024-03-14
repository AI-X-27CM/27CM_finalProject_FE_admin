import React from 'react';
import Error from './Error';
import Day from './Day';
import Phishing from './Phishing';
import User from './User';
import '../App.css'; // Home 컴포넌트 전용 스타일을 위한 CSS 파일

function Home() {
  return (
    <div className="home-container"> {/* 스타일시트에서 home-container 클래스를 정의하세요 */}
    <div className="home-section"> {/* 각 섹션을 위한 클래스 */}
    <div class="home-section-content">
    <Error />
    </div></div>
    <div className="home-section">
    <div class="home-section-content">
    <Day />
    </div></div>
    <div className="home-section">
    <div class="home-section-content">
    <Phishing />
    </div></div>
    <div className="home-section">
    <div class="home-section-content">
    <User /> 
    </div></div>
  </div>
   
  );
}

export default Home;