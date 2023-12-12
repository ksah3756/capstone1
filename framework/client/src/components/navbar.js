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

  // //로그인을 하면 바로 Home page 로 이동
  // if (loggedInUser != null) {
  //   return <Link to="/Home"></Link>;
  // }

  return (
    
    <div class='w-full top-0 z-50 grid grid-cols-3'>
      <div class="lg:flex-2 top-2">
        <ul class="p-2 ">
          <li className='list-none inline-block'><img src="/img/logo.png" alt="Logo_img" style={{ width: 'auto', height: '50px', marginRight: '10px' }} /></li>
          <li className='list-none inline-block'><img src="/img/logo_HealthyMe.png" alt="Logo_text" style={{ width: 'auto', height: '50px' }}/> </li>
        </ul>
      </div>

      <ul tabIndex={0} className="text-center menu menu-m z-[1] p-2 bg-fixed ">
        <li className='font-bold list-none inline-block hover:border-b-4 border-blue-600 cursor-pointer p-4 transition-all'><Link to="/">홈</Link></li>
        <li className='font-bold list-none inline-block hover:border-b-4 border-blue-600 cursor-pointer p-4 transition-all'><Link to="/Current">현재 상태</Link></li>
        <li className='font-bold list-none inline-block hover:border-b-4 border-blue-600 cursor-pointer p-4 transition-all'><Link to="/PastData">과거 Data</Link></li>
      </ul>

      <ul className="text-right p-2 bg-fixed mt-2">
        {loggedInUser ? ( // 사용자가 있으면(로그인 상태면) 아이디 표시
          <>
            <li className='list-none inline-block p-2 font-normal'>
              <Link to="/" onClick={handleLogout}> <a class='hover:text-blue-500 hover:font-bold'>로그아웃 </a></Link>
            </li>
            <li className='list-none inline-block p-2'><Link to="/Home"><a className="btn rounded-full">{loggedInUser}님, 환영합니다</a></Link></li> {/* 사용자 아이디를 화면에 출력합니다. */}
            
          </>
        ) : ( // 사용자가 없으면(로그아웃 상태면)
          <>
            <li className='list-none inline-block p-2 font-normal'><Link to="/login">
              <a class='hover:text-blue-500 hover:font-bold'>로그인</a></Link ></li>
            <li className='list-none inline-block p-2'> <Link to="/signup">
              <a className="btn 
              hover:bg-white
              hover:text-blue-500
              hover:font-extrabold
              hover: border-solid
              hover:border-blue-500
                
              ">
               가입하기 </a> </Link></li>
          </>
        )}
      </ul>

    </div>
  );
};

export default NavBar;