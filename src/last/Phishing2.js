/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Phishing() {
  const [phishingData, setPhishingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('User'); // 검색 필터 상태

  useEffect(() => {
    async function fetchPhishingData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/phishingData');
        setPhishingData(response.data);
      } catch (error) {
        console.error('There was a problem fetching the data:', error.message);
        // 오류를 사용자에게 알릴 수 있습니다.
        alert(`Data fetching error: ${error.message}`);
      }
    }

    fetchPhishingData();
  }, []);

  const handleDelete = async (detectPk) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/phishingData/${detectPk}`);
      setPhishingData(phishingData.filter(item => item.Detect_pk !== detectPk));
      alert('Item successfully deleted');
    } catch (error) {
      console.error('Error deleting the item:', error);
      alert('Failed to delete. Please try again.');
    }
  };

  // 검색과 필터 변경 핸들러는 이전과 동일합니다.
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterByChange = (event) => {
    setFilterBy(event.target.value);
  };

  // 데이터 필터링 로직은 이전과 동일합니다.
  const filteredData = phishingData.filter(entry => {
    return filterBy === 'User'
      ? entry.User_pk.toString().toLowerCase().includes(searchTerm.toLowerCase())
      : new Date(entry.Date).toLocaleString('ko-KR').includes(searchTerm);
  });


  return (
    <div className="table-container2">
      <div className="d-flex mb-5">
        <div className="input-group input-group-sm w-auto">
          <select className="custom-select" style={{ paddingRight: '0rem', width: '100px', border: 'none' }} onChange={handleFilterByChange}>
            <option value="User">유저정보</option>
            <option value="Date">날짜</option>
          </select>
          <input
            type="text"
            name="table_search"
            className="form-control"
            placeholder="Search"
            onChange={handleSearchChange}  
            style={{ width: '200px', border: 'none' }}
          />
          <div className="input-group-append">
            <button type="button" className="btn btn-default" onClick={() => {}}>
              <i className="fas fa-search"></i>
            </button>
          </div>
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
                {filteredData.map((entry, index) => (
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
       </div>
    );
}

export default Phishing;
