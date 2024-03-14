import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function BarChart() {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:8000/labelData');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (chartInstance.current) {
          chartInstance.current.destroy(); // 이전 차트 파괴
        }

        const ctx = chartContainer.current.getContext('2d');
        const labels = Object.keys(data);
        const values = Object.values(data);

        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
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
            maintainAspectRatio: false, // 크기를 고정하지 않음
            aspectRatio: 1.5, // 가로:세로 비율을 조절하여 크기 조정
            plugins: {
              legend: {
                display: false // 라벨 플러그인 비활성화
              }
            }
          }
        });
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    }

    fetchData();

  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  return (
    <div className="rowchart" >
      <div>
        <div className="card-body">
          <canvas ref={chartContainer} id="bar-chart" width="700" height="600" /> {/* 크기를 700px로 조정 */}
        </div>
      </div>
    </div>
  );
}

export default BarChart;