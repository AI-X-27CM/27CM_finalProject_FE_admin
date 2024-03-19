import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Phishing() {
  const [phishingData, setPhishingData] = useState([]);

  useEffect(() => {
    const fetchPhishingData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/phishingData');
        setPhishingData(response.data);
      } catch (error) {
        console.error('There was a problem fetching the data:', error);
      }
    };

    fetchPhishingData(); 
  }, []);

  const handleDelete = async (detectPk) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/phishingData/${detectPk}`);
      setPhishingData(phishingData.filter(item => item.Detect_pk !== detectPk));
      alert('삭제되었습니다');
    } catch (error) {
      console.error('Error deleting the item:', error);
      alert('Failed to delete. Please try again.');
    }
  };
  

  return (
    <div style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>유저 정보</th>
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
           <td>
              <button type='button' className='delete' onClick={() => handleDelete(entry.Detect_pk)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Phishing;
