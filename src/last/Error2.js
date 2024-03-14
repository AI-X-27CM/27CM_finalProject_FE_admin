import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


function Error() {
  const chartContainer = useRef(null);

  useEffect(() => {
    // 가상의 상세 에러 데이터
    const details = {
      '0시': { '400Error': 2, '401Error': 3, '403Error': 1, '404Error': 5, '408Error': 2 },
      '1시': { '400Error': 1, '401Error': 2, '403Error': 2, '404Error': 3, '408Error': 1 },
      '2시': { '400Error': 0, '401Error': 4, '403Error': 2, '404Error': 1, '408Error': 3 },
      '3시': { '400Error': 3, '401Error': 1, '403Error': 3, '404Error': 2, '408Error': 0 },
      '4시': { '400Error': 2, '401Error': 3, '403Error': 1, '404Error': 5, '408Error': 2 },
      '5시': { '400Error': 1, '401Error': 2, '403Error': 2, '404Error': 3, '408Error': 1 },
      '6시': { '400Error': 0, '401Error': 4, '403Error': 2, '404Error': 1, '408Error': 3 },
      '7시': { '400Error': 3, '401Error': 1, '403Error': 3, '404Error': 2, '408Error': 0 },
      '8시': { '400Error': 2, '401Error': 3, '403Error': 1, '404Error': 5, '408Error': 2 },
      '9시': { '400Error': 1, '401Error': 2, '403Error': 2, '404Error': 3, '408Error': 1 },
      '10시': { '400Error': 0, '401Error': 4, '403Error': 2, '404Error': 1, '408Error': 3 },
      '11시': { '400Error': 3, '401Error': 1, '403Error': 3, '404Error': 2, '408Error': 0 },
      '12시': { '400Error': 2, '401Error': 3, '403Error': 1, '404Error': 5, '408Error': 2 },
      '13시': { '400Error': 1, '401Error': 2, '403Error': 2, '404Error': 3, '408Error': 1 },
      '14시': { '400Error': 0, '401Error': 4, '403Error': 2, '404Error': 1, '408Error': 3 },
      '15시': { '400Error': 3, '401Error': 1, '403Error': 3, '404Error': 2, '408Error': 0 },
      '16시': { '400Error': 2, '401Error': 3, '403Error': 1, '404Error': 5, '408Error': 2 },
      '17시': { '400Error': 1, '401Error': 2, '403Error': 2, '404Error': 3, '408Error': 1 },
      '18시': { '400Error': 0, '401Error': 4, '403Error': 2, '404Error': 1, '408Error': 3 },
      '19시': { '400Error': 3, '401Error': 1, '403Error': 3, '404Error': 2, '408Error': 0 },
      '20시': { '400Error': 2, '401Error': 3, '403Error': 1, '404Error': 5, '408Error': 2 },
      '21시': { '400Error': 1, '401Error': 2, '403Error': 2, '404Error': 3, '408Error': 1 },
      '22시': { '400Error': 0, '401Error': 4, '403Error': 2, '404Error': 1, '408Error': 3 },
      '23시': { '400Error': 3, '401Error': 1, '403Error': 3, '404Error': 2, '408Error': 0 }
      // 시간대별 데이터를 계속 추가...
    };

    // chartData 정의
    const chartData = {
      labels: Object.keys(details),
      datasets: [{
        label: 'Error Count',
        data: Object.values(details).map(errorCounts =>
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
        maintainAspectRatio: false, 
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    const handleClick = (e) => {
      const activePoints = chartInstance.getElementsAtEventForMode(e, 'nearest', { intersect: true }, true);
      if (activePoints.length > 0) {
        const clickedIndex = activePoints[0].index;
        const label = chartData.labels[clickedIndex];
        const errorDetails = details[label];
        const errorMessages = Object.entries(errorDetails).map(([key, value]) => `${key}: ${value}건`).join('\n');
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
  }, []);

  return (
    <div className="component-container3">
    <div className="chart-wrapper3" >
      <div className="chart-container3" >
        <canvas ref={chartContainer} />
      </div>
    </div></div>
  );
}

export default Error;