import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Current = () => {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  // const location = useLocation();

  const handleLinkClick = () => {
    if (loggedInUser) {
      navigate('/poses'); // 로그인 되어 있으면 '/poses' 페이지로 이동
    } else {
      navigate('/login'); // 로그인이 안되어 있으면 '/login' 페이지로 이동
    }
  };

  return (

    <div class="h-screen">
    <img src="./img/Home_bg.png" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover"/>

    <div class='flex items-center h-center'>
      
    <div class="mx-auto mt-10 px-6 lg:px-8 text-center">
      <h2 class="text-xl font-bold tracking-tight text-black sm:text-4xl">
        카메라로 상태를 보아요!
      </h2>

      <p class="mt-6 text-lg font-bold leading-8 text-gray-500">
      아래와 같은 자세로 카메라를 설치해주세요.
      </p>
    

      <div class='flex content-center'>
          { /* 여기서 로그인이 안되어 있으면 LoginForm으로 이동하도록  */ }
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button onClick={handleLinkClick} 
          className="btn
            hover:bg-white
              hover:text-blue-500
              hover:font-extrabold
              hover: border-solid
              hover:border-blue-500">자세 측정 시작</button>
      </div>

      <div class=" h-screen">
        <img src="./img/main_sitting.png" style={{height: 500}}  />
      </div>

      </div>
      </div>
      </div>
  );
};

export default Current;
