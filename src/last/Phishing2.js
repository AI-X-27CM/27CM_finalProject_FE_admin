import React, { useState, useEffect } from 'react';

function Phishing() {
  const [phishingData, setPhishingData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('User'); // 검색 필터 상태

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

  const handleDelete = async (id) => {
    // DELETE 요청을 서버로 보냅니다.
    try {
      const response = await fetch(`http://127.0.0.1:8000/phishingData/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Delete operation failed.');

      // 클라이언트 상태 업데이트
      setPhishingData(phishingData.filter((item) => item.Detect_pk !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterByChange = (event) => {
    setFilterBy(event.target.value);
  };

  // 필터링된 데이터를 계산하는 로직
  const filteredData = phishingData.filter((entry) => {
    if (filterBy === 'User') {
      // 유저 정보를 기준으로 검색
      return entry.User_pk.toString().toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterBy === 'Date') {
      // 날짜를 기준으로 검색
      return new Date(entry.Date).toLocaleString('ko-KR').includes(searchTerm);
    }
    return true;
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
