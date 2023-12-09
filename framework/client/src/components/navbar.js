import React, { useContext } from 'react';
// import { useState } from 'react'; // 사용자 상태를 관리하기 위해 useState를 가져옵니다.
import '../styles/styles.css'; // 스타일 시트를 가져옵니다.
import { UserContext } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
  
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      /*
      const response = await axios.get(`http://localhost:5000/logout`);
      console.log(response);
      */
      setLoggedInUser(null); // loggedInUser 상태를 null로 초기화
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // //로그인을 하면 바로 Home page 로 이동
  // if (loggedInUser != null) {
  //   return <Link to="/Home"></Link>;
  // }

  return (
    
    <nav>
      <div class="flex lg:flex-2">
        <ul class="menu menu-m mt-3 z-[1] p-2 ">
          
          <li><img src="/img/logo.png" alt="Logo_img" style={{ width: 'auto', height: '50px', marginRight: '10px' }} /></li>
          <li><img src="/img/logo_HealthyMe.png" alt="Logo_text" style={{ width: 'auto', height: '50px' }}/> </li>
        </ul>
        
      </div>

      <ul tabIndex={0} className="menu menu-m mt-3 z-[1] p-2 ">
        <li className='list-none inline-block hover:border-b-4 border-blue-600 cursor-pointer p-2 transition-all'><Link to="/Home">홈</Link></li>
        <li className='list-none inline-block hover:border-b-4 border-blue-600 cursor-pointer p-2 transition-all'><Link to="/Current">현재 상태</Link></li>
        <li className='list-none inline-block hover:border-b-4 border-blue-600 cursor-pointer p-2 transition-all'><Link to="/PastData">과거 Data</Link></li>
      </ul>

      <ul className="menu menu-m mt-3 z-[1] p-2 ">
        {loggedInUser ? ( // 사용자가 있으면(로그인 상태면) 아이디 표시
          <>
            <li><Link to="/" onClick={handleLogout}>Log out</Link></li>
            <li><Link to="/Home"><a className="btn">{loggedInUser}님, 환영합니다</a></Link></li> {/* 사용자 아이디를 화면에 출력합니다. */}
            
          </>
        ) : ( // 사용자가 없으면(로그아웃 상태면)
          <>
            <li><Link to="/login">로그인</Link ></li>
            <li><Link to="/signup" className="btn">가입하기</Link></li>
          </>
        )}
      </ul>

    </nav>
  );
};

export default NavBar;
