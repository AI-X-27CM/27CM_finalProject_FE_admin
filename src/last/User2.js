import React, { useState, useEffect } from 'react';

function User() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('User'); // 검색 필터 상태

  useEffect(() => {
    fetch('http://127.0.0.1:8000/userData')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // JSON 형식으로 파싱된 응답을 반환
      })
      .then(data => {
        setUserData(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterByChange = (event) => {
    setFilterBy(event.target.value);
  };

  // 필터링된 데이터를 계산하는 로직
  const filteredData = userData.filter((entry) => {
    switch (filterBy) {
      case 'User':
        return entry.User_pk.toString().toLowerCase().includes(searchTerm.toLowerCase());
      case 'Id':
        return entry.ID.toLowerCase().includes(searchTerm.toLowerCase());
      case 'Phone':
        return entry.Phone.includes(searchTerm);
      case 'Date':
        return new Date(entry.Date).toLocaleString('ko-KR').includes(searchTerm);
      default:
        return true;
    }
  });

  return (
    <div className="table-container2">
      <div className="d-flex mb-5">
        <div className="input-group input-group-sm w-auto">
          <select className="custom-select" style={{ paddingRight: '0rem', width: '100px', border: 'none' }} onChange={handleFilterByChange}>
            <option value="User">유저정보</option>
            <option value="Id">아이디</option>
            <option value="Phone">전화번호</option>
            <option value="Date">가입날짜</option>
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
              <th>User_index</th>
              <th>ID</th>
              <th>전화번호</th>
              <th>가입날짜</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.User_pk}</td>
                <td>{entry.ID}</td>
                <td>{entry.Phone}</td>
                <td>{new Date(entry.Date).toLocaleString('ko-KR')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
