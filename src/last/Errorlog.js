/* eslint-disable */
import React, { useState, useEffect } from 'react';

const ErrorLog = () => {
  const [activeId, setActiveId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [logs, setLogs] = useState([
    { id: 1, severity: 'primary', title: 'Info Log', message: 'This is an info log.', createdAt: 1622492345678 },
    { id: 2, severity: 'warning', title: 'Warning Log', message: 'This is a warning log.', createdAt: 1622492345679 },
    { id: 3, severity: 'danger', title: 'Error Log', message: 'This is an error log.', createdAt: 1622492345680 },
    { id: 1, severity: 'primary', title: 'Info Log', message: 'This is an info log.', createdAt: 1622492345678 },
    { id: 2, severity: 'warning', title: 'Warning Log', message: 'This is a warning log.', createdAt: 1622492345679 },
    { id: 3, severity: 'danger', title: 'Error Log', message: 'This is an error log.', createdAt: 1622492345680 },
    { id: 1, severity: 'primary', title: 'Info Log', message: 'This is an info log.', createdAt: 1622492345678 },
    { id: 2, severity: 'warning', title: 'Warning Log', message: 'This is a warning log.', createdAt: 1622492345679 },
    { id: 3, severity: 'danger', title: 'Error Log', message: 'This is an error log.', createdAt: 1622492345680 },
    { id: 1, severity: 'primary', title: 'Info Log', message: 'This is an info log.', createdAt: 1622492345678 },
    { id: 2, severity: 'warning', title: 'Warning Log', message: 'This is a warning log.', createdAt: 1622492345679 },
    { id: 3, severity: 'danger', title: 'Error Log', message: 'This is an error log.', createdAt: 1622492345680 },
    { id: 1, severity: 'primary', title: 'Info Log', message: 'This is an info log.', createdAt: 1622492345678 },
    { id: 2, severity: 'warning', title: 'Warning Log', message: 'This is a warning log.', createdAt: 1622492345679 },
    { id: 3, severity: 'danger', title: 'Error Log', message: 'This is an error log.', createdAt: 1622492345680 },
    
    // ... 기타 로그들
  ]); 
    

  useEffect(() => {
    // 실제 애플리케이션에서는 여기서 API 호출 등을 통해 로그 데이터를 가져와 상태에 저장
    setLogs(logs.map((log, index) => ({
      ...log,
      id: index + 1,  // 고유한 ID 할당
      createdAt: Date.now() - (index * 1000),  // createdAt을 고유한 타임스탬프로 설정
    })));
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
               log.title.toLowerCase().includes(searchTerm.toLowerCase())
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
   타임스탬프 기능 적용되어 데이터가 들어오면 자동으로 맞는 색으로 순서대로 출력
   
   {finalLogs.map((log) => (
        <div key={log.displayId} className="row justify-content-center mb-2">
          <div className="col-md-8"> {/* 이 div에서 col-md-8 클래스를 사용해 너비를 설정합니다. */}
            <div className={`card card-${log.severity} card-outline`} style={{ width: '100%' }}> {/* width를 100%로 설정하여 col-md-8 너비만큼 카드가 차지하도록 합니다. */}
              <div className="card-header" onClick={() => toggleItem(log.displayId)} style={{ cursor: 'pointer' }}>
                <h4 className="card-title w-100">{log.title}</h4>
              </div>
              <div id={`collapse${log.displayId}`} className={`collapse ${activeId === log.displayId ? 'show' : ''}`} data-parent="#accordionExample">
                <div className="card-body">
                  {log.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ErrorLog;
