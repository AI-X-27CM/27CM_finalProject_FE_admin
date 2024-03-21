import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const url = 'http://192.168.0.165:8000'

function Error() {
  const chartContainer = useRef(null);
  const [errorDetails, setErrorDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + '/errorData');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setErrorDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (errorDetails) {
      const chartData = {
        labels: Object.keys(errorDetails),
        datasets: [{
          label: 'Error Count',
          data: Object.values(errorDetails).map(errorCounts =>
            Object.values(errorCounts).reduce((sum, count) => sum + count, 0)),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }],
      };

      const ctx = chartContainer.current.getContext('2d');
      const chartInstance = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          aspectRatio: 2, // 이 값을 유지하려면 부모 컨테이너의 크기가 적절해야 합니다.
          maintainAspectRatio: true, // 한 번만 선언해야 합니다.
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                // Only integer labels
                stepSize: 1,
                callback: function(value, index, ticks) {
                  if (value % 1 === 0) {
                    return value;
                  }
                }
              }
            }
          }
        }
      });

      const handleClick = (e) => {
        const activePoints = chartInstance.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
        if (activePoints.length > 0) {
          const clickedIndex = activePoints[0].index;
          const label = chartData.labels[clickedIndex];
          // 상태 변수와 이름이 동일한 'errorDetails'를 다시 선언하고 있어 문제가 발생합니다.
          // 아래의 변수명을 변경해야 합니다.
          const errorInfo = errorDetails[label]; // 'errorDetails'를 'errorInfo'로 변경
          const errorMessages = Object.entries(errorInfo).map(([key, value]) => `${key}: ${value}건`).join('\n');
          alert(`시간대: ${label}\n${errorMessages}`);
        }
      };

      // 차트의 캔버스 요소에 이벤트 리스너를 추가합니다.
      const canvas = chartContainer.current;
      canvas.onclick = handleClick;

      
      return () => {
        chartInstance.destroy();
        canvas.onclick = null; // 이벤트 리스너를 제거합니다.
      };
    }
  }, [errorDetails]);

  return (
    <div className="nav-container">
      <div className="chart-container" style={{ height: '100%' }}>
        <canvas ref={chartContainer} />
      </div>
    </div>
  );
}

export default Error;