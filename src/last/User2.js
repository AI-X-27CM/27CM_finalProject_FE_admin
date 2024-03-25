import React, { useState, useEffect } from 'react';

const url = 'http://192.168.0.165:8000';

function User() {
  const [userData, setUserData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('ID'); // 초기 필터링 옵션을 'ID'로 설정

  useEffect(() => {
    fetch(url + '/userData')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const sortedData = data.sort((a, b) => new Date(b.Date) - new Date(a.Date));
        setUserData(sortedData);
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

  // 필터링 로직을 조건에 맞게 수정
  const filteredData = userData.filter(entry => {
    if (filterBy === 'ID') {
      return entry.ID.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterBy === 'Phone') {
      return entry.Phone.includes(searchTerm);
    } else if (filterBy === 'Date') {
      return new Date(entry.Date).toLocaleString('ko-KR').includes(searchTerm);
    }
    return false;
  });
  return (
    <div className="table-container2">
      <div className="d-flex mb-5">
        <div className="input-group input-group-sm w-auto">
          <select className="custom-select" style={{ paddingRight: '0rem', width: '100px', border: 'none' }} onChange={handleFilterByChange}>
            <option value="ID">ID</option>
            <option value="Phone">핸드폰번호</option>
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
              <th>index</th>
              <th>ID</th>
              <th>핸드폰번호</th>
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
