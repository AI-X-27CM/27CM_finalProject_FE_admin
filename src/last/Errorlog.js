/* eslint-disable */
import React, { useState, useEffect } from 'react';

const ErrorLog = () => {
  const [activeId, setActiveId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [logs, setLogs] = useState([
    
    
    // ... 기타 로그들
  ]);  
  const url = 'http://192.168.0.165:8000'

  useEffect(() => {
    // API에서 로그 데이터를 가져오는 함수
    const fetchLogs = async () => {
      try {
        const response = await fetch(url + '/errorlog');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLogs(data.map(log => ({
          ...log,
          id: log.error_pk, // error_pk를 id로 사용
          title: log.error_pk, // error_pk를 title로 사용
          message: log.error, // error 컬럼을 message로 사용
         // severity: log.error_pk === 404 ? 'warning' : 'danger', // error_pk에 따라 severity 결정(색)
          createdAt: new Date(log.Date).getTime() // Date 문자열을 타임스탬프로 변환
        })));
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      }
    };
  
    fetchLogs(); // 함수 호출
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleItem = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  const sortedLogs = logs.sort((a, b) => b.createdAt - a.createdAt);

  const displayedLogs = sortedLogs.slice(0, 30);

  const filteredLogs = searchTerm
    ? logs.filter(
        log => log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
               log.title.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    : displayedLogs;

  const finalLogs = filteredLogs.map((log, index) => ({
    ...log,
    displayId: index + 1,  // 화면에 표시될 때의 고유 ID
  }));

  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6" style={{ marginBottom: '30px' }}>
        <div className="input-group mb-3 mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            onChange={handleSearchChange}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div> 

    {filteredLogs.map((log) => (
      <div key={log.displayId} className="row justify-content-center mb-2">
        <div className="col-md-8">
          <div className="card" style={{ width: '100%', backgroundColor: '#fff2f3', border: '1px solid rgb(239 193 198)' }}>
            <div className="card-body"style={{ width: '100%', backgroundColor: '#fff2f3', border: '1px solid #fae8ea' }}>
              <h4 className="card-title">{log.title}</h4>
              <p className="card-text">{log.message}</p>
              {/* 추가 정보를 표시하려면 여기에 코드를 추가하세요. */}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
};


export default ErrorLog;
