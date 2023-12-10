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
    <div class="mx-auto max-w-7xl mt-10 px-6 lg:px-8">
      <h2 class="text-xl font-bold tracking-tight text-black sm:text-4xl">
        카메라로 상태를 보아요!
      </h2>

        <div className="flex flex-row">
          <div>
          <img src="./img/main_sitting.png" style={{height: 500}} />
          </div>

          <div>
          { /* 여기서 로그인이 안되어 있으면 LoginForm으로 이동하도록  */ }
          <button onClick={handleLinkClick} 
          className="btn
            hover:bg-white
              hover:text-blue-500
              hover:font-extrabold
              hover: border-solid
              hover:border-blue-500">자세 측정 시작</button>
              </div>
        </div>
      </div>
  );
};

export default Current;
