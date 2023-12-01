import React, { useContext } from 'react';
// import { useState } from 'react'; // 사용자 상태를 관리하기 위해 useState를 가져옵니다.
import '../styles/styles.css'; // 스타일 시트를 가져옵니다.
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const NavBar = () => {
  
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  // 로그아웃 핸들러
  const handleLogout = () => {
    setLoggedInUser(null); // loggedInUser 상태를 null로 초기화
  };

  return (
    <nav>
      <h1><Link to="/">Improve your sitting posture</Link></h1>  
      <ul>
        {loggedInUser ? ( // 사용자가 있으면(로그인 상태면) 이걸 어떻게 하지?
          <>
            <li>Welcome, {loggedInUser}</li> {/* 사용자 아이디를 화면에 출력합니다. */}
            <li><Link to="/" onClick={handleLogout}>Log out</Link></li>
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
