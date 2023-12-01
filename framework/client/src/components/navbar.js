import React, { useContext } from 'react';
// import { useState } from 'react'; // 사용자 상태를 관리하기 위해 useState를 가져옵니다.
import '../styles/styles.css'; // 스타일 시트를 가져옵니다.
import { UserContext } from '../contexts/UserContext';

const NavBar = () => {
  // 사용자 상태를 관리하는 useState 훅을 사용합니다.
  /*
  const [user, setUser] = useState(null); // 기본적으로는 사용자가 없는(null) 상태입니다.

  const handleLogin = () => {
    // 실제로는 로그인 프로세스를 처리하고, 로그인이 성공하면 setUser를 사용하여 user 상태를 업데이트합니다.
    // 예를 들어, 사용자가 로그인 성공 시 user 정보를 받아온다면 se tUser(userInfo)와 같이 사용합니다.
    const userInfo = { user_id: 'username' }; // 로그인 후 받아온 사용자 정보 예시
    setUser(userInfo); // user 상태를 업데이트합니다.
  };
  */
  const { loggedInUser } = useContext(UserContext);

  return (
    <nav>
      <h1><a href="/">Improve your sitting posture</a></h1>  
      <ul>
        {loggedInUser ? ( // 사용자가 있으면(로그인 상태면) 이걸 어떻게 하지?
          <>
            <li>Welcome, {loggedInUser}</li> {/* 사용자 아이디를 화면에 출력합니다. */}
            <li><a href="/logout">Log out</a></li>
          </>
        ) : ( // 사용자가 없으면(로그아웃 상태면)
          <>
            <li><a href="/login">Log in</a></li>
            <li><a href="/signup" className="btn">Sign up</a></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
