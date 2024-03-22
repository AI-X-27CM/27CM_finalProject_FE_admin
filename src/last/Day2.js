/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const url = 'http://192.168.0.165:8000'
const Day = () => {
  const [activeTab, setActiveTab] = useState('day');
  const [dataDay, setDataDay] = useState(null);
  const [dataMonth, setDataMonth] = useState(null);

  // 옵션은 한 번만 선언합니다.
  const options = {
    scales: {
      y: {
        beginAtZero: true
      } 
    },
    maintainAspectRatio: false
  };

  useEffect(() => {
    // 일별 데이터를 가져옵니다.
    fetch(url + '/getDailyData/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const labels = Object.keys(data);
        const values = Object.values(data);

        const newDataDay = {
          labels: labels,
          datasets: [{
            label: '일별 건수',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
           
          }]
        };

        setDataDay(newDataDay);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []); // 첫 번째 useEffect 끝

  useEffect(() => {
    // 월별 데이터를 가져옵니다.
    fetch(url + '/getMonthlyData/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const labels = Object.keys(data);
        const values = Object.values(data);

        const newDataMonth = {
          labels: labels,
          datasets: [{
            label: '월별 건수',
            data: values,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            
          }]
        };

        setDataMonth(newDataMonth);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []); // 두 번째 useEffect 끝
  return (
    <>
    <h2>일별, 월별 피싱 건수</h2>
      <div className="component-container2">  
        <div className="nav-container2">
          <ul className="nav nav-pills2">
            <li className="nav-item2">
              <button
                className={`nav-links ${activeTab === 'day' ? 'active' : ''}`}
                onClick={() => setActiveTab('day')}
              >
                DAY
              </button>
            </li>
            <li className="nav-item2">
              <button
                className={`nav-links ${activeTab === 'month' ? 'active' : ''}`}
                onClick={() => setActiveTab('month')}
              >
                MONTH
              </button>
            </li>
          </ul>
        </div>
        <div className="chart-container2" >
          {activeTab === 'day' && dataDay && (
            <Bar data={dataDay} options={options} />
          )}
          {activeTab === 'month' && dataMonth && (
            <Bar data={dataMonth} options={options} />
          )}
        </div>
      </div></>
    );
  };

export default Day;

