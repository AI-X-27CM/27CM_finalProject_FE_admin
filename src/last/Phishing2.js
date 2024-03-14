import React, { useState, useEffect } from 'react';

function Phishing() {
  const [phishingData, setPhishingData] = useState([]);

  useEffect(() => {
    async function fetchPhishingData() {
      try {
        const response = await fetch('http://127.0.0.1:8000/phishingData');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPhishingData(data);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    }

    fetchPhishingData();
  }, []);

  const handleDelete = (index) => {
    setPhishingData(prevData => {
      return prevData.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="table-container2">
    <div className="input-group input-group-sm" style={{ width: '200px', marginLeft: 'auto' }}>
      <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
      <div className="input-group-append">
        <button type="submit" className="btn btn-default">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
    
    <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>index</th>
              <th>유저정보</th>
              <th>날짜</th>
              <th>녹화본</th>
              <th>유형</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {phishingData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.Detect_pk}</td>
                <td>{entry.User_pk}</td>
                <td>{new Date(entry.Date).toLocaleString('ko-KR')}</td>
                <td>{entry.Record}</td>
                <td>{entry.Label}</td>
                <td><button type='button' className='delete' onClick={() => handleDelete(index)}>삭제</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
   </div>
  );
}

export default Phishing;
