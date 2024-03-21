import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const url = 'http://192.168.0.165:8000';

function Frequency() {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null); // 차트 인스턴스를 저장할 ref 추가
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
      try {
        const response = await fetch(url+'/phishingData');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        processChartData(data); // 데이터 처리 함수 호출
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // 시간대별로 데이터를 그룹화하고 차트 데이터를 설정하는 함수
  const processChartData = (data) => {
    const timeRanges = ['0~4시', '4~8시', '8~12시', '12~16시', '16~20시', '20~24시'];
    const counts = new Array(timeRanges.length).fill(0); // 각 시간대별 카운트를 저장할 배열

    for (const item of data) {
      const hour = new Date(item.Date).getHours(); // 날짜에서 시간을 추출
      const index = Math.floor(hour / 4); // 시간을 4시간 단위로 나누어 해당하는 인덱스를 찾음
      counts[index]++; // 해당 시간대의 카운트를 증가
    }

    setChartData(counts); // 차트 데이터 상태 업데이트
  };

  useEffect(() => {
    if (chartData.length > 0 && chartContainer.current) {
      // 이전 차트 인스턴스가 있으면 파괴합니다.
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartContainer.current.getContext('2d');
      // 새 차트 인스턴스를 생성하고, 차트 인스턴스 ref에 할당합니다.
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['0~4시', '4~8시', '8~12시', '12~16시', '16~20시', '20~24시'],
          datasets: [{
            label: 'Phishing Frequency',
            data: chartData, // 처리된 차트 데이터 사용
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
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
    // 차트가 언마운트될 때, 차트 인스턴스를 정리합니다.
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]); // chartData 상태가 변경될 때마다 실행됩니다.

  return (
    <div className="rowchart">
      <div className="card-body">
        <canvas ref={chartContainer} width="700" height="600"></canvas>
      </div>
    </div>
  );
}

export default Frequency;
