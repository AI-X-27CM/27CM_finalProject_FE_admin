/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const url = 'http://192.168.0.165:8000'
function BarChart() {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url + '/labelData');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
  
        // label 값에 따라 변경될 이름을 정의한 객체
        const labelNames = {
          imp: '지인사칭',
          inst_imp: '기관사칭',
          None: '해당없음',
        };
  
        // 데이터의 키(라벨)를 우리가 원하는 문자열로 변경
        const labels = Object.keys(data).map(key => labelNames[key] || key); // 없는 키의 경우 기본값으로 key 사용
        const values = Object.values(data);
  
        if (chartInstance.current) {
          chartInstance.current.destroy(); // 이전 차트 파괴
        }
  
        const ctx = chartContainer.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            maintainAspectRatio: false,
            aspectRatio: 1.5,
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    }
  
    fetchData();
  }, []);
  

  return (
    <>
    <h2>피싱종류별 피싱 건수</h2>
    <div className="rowchart" >
      <div>
        <div className="card-body">
          <canvas ref={chartContainer} id="bar-chart" width="700" height="600" /> {/* 크기를 700px로 조정 */}
        </div>
      </div>
    </div></>
  );
}

export default BarChart;