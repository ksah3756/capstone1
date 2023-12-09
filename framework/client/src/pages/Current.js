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
    <>
      {/* Header */}
      <header>
        <div className="currentpage">
          <img src="/smoothie.png" alt="" />
        </div>
        <div className="headings">
          <h2>Current</h2>
          <h3>Improve your sitting posture.</h3>
          { /* 여기서 로그인이 안되어 있으면 LoginForm으로 이동하도록  */ }
          <button onClick={handleLinkClick} className="btn">자세 측정 시작</button>
        </div>
      </header>

      {/* Footer */}
      <footer>
        {/* Content for footer */}
      </footer>
    </>
  );
};

export default Current;
