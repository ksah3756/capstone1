import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { fetchScores } from '../api/scores';
import '../poseNet/diagnosis';
import '../styles/styles.css';

const PastData = () => {
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
    

    <div class="carousel rounded-box w-96 overflow-x-auto">
      <a class="block max-w-[60%] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img src="./img/심각.png" class="w-full" />
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        <button onClick={()=>fetchScores("test_id1", "2023-12-06")} className="btn">get score data</button>
      </a>
      <div class="carousel-item w-1/2">
    <img src="./img/심각.png" class="w-full" />
  </div> 
  <div class="carousel-item w-1/2">
    <img src="./img/바름.png" class="w-full" />
  </div> 
  <div class="carousel-item w-1/2">
    <img src="./img/위험.png" class="w-full" />
  </div> 
  <div class="carousel-item w-1/2">
    <img src="./img/주의.png" class="w-full" />
  </div> 
  <div class="carousel-item w-1/2">
    <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" class="w-full" />
  </div> 
  <div class="carousel-item w-1/2">
    <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" class="w-full" />
  </div> 
  <div class="carousel-item w-1/2">
    <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" class="w-full" />
  </div>
</div>
    
  );
};

export default PastData;
