/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Frequency() {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // 이전 차트 파괴
    }

    const ctx = chartContainer.current.getContext('2d');
    const data = {
      labels: ['0~4시', '4~8시', '8~12시', '12~16시', '16~20시', '20~24시'],
      datasets: [{
        label: 'My First Dataset',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)'
        ],
        hoverOffset: 4 
      }]
    };

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        layout: {
          padding: 20
        },
        aspectRatio: 1, // 가로:세로 비율을 1로 유지하여 도넛 차트를 원형으로 유지
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  return (
    <div className="rowchart" >
     
     
        <div className="card-body">
          <canvas ref={chartContainer} id="donut-chart"  width="700" height="600" />
        </div>
      </div>
   
  );
}
export default Frequency;
