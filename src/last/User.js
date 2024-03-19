/* eslint-disable */
import React, { useState, useEffect } from 'react';

function User() {
  const [userData, setUserData] = useState([]);

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
 
  return (
   <>
    

      <div style={{ overflowX: 'auto' }}>
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
 {userData.map((entry, index) => (
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
    </>
  );
}

export default User;

