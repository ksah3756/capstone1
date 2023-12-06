import React, { useContext } from 'react';
// import { useState } from 'react'; // 사용자 상태를 관리하기 위해 useState를 가져옵니다.
import '../styles/styles.css'; // 스타일 시트를 가져옵니다.
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
//import axios from 'axios';

const NavBar = () => {
  
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      /*
      const response = await axios.get(`http://localhost:5000/logout`);
      console.log(response);
      */
      const res = await fetch('/logout', {
        method: 'GET',
        credentials: 'include', // 쿠키를 전송하기 위해 credentials 옵션을 추가
      });

      if (res) {
        console.log('logout success');
      } else {
        console.error('logout fail');
      }

      setLoggedInUser(null); // loggedInUser 상태를 null로 초기화
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <nav>
      <h1><Link to="/">Improve your sitting posture</Link></h1>  
      <ul>
        {loggedInUser ? ( // 사용자가 있으면(로그인 상태면) 이걸 어떻게 하지?
          <>
            <li>Welcome, {loggedInUser}</li> {/* 사용자 아이디를 화면에 출력합니다. */}
            <li><button onClick={handleLogout}>Log out</button></li>
          </>
        ) : ( // 사용자가 없으면(로그아웃 상태면)
          <>
            <li><Link to="/login">Log in</Link></li>
            <li><Link to="/signup" className="btn">Sign up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
