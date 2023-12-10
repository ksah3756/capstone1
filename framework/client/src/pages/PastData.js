import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { fetchScores } from '../api/scores';
import { diagnosisResult } from '../poseNet/diagnosis';
import '../poseNet/diagnosis';
import '../styles/styles.css';

const PastData= () => {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  let currentDate = new Date(); // 현재 날짜와 시간

  let year = currentDate.getFullYear(); // 연도
  let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월을 가져오고 0을 추가
  let day = String(currentDate.getDate()).padStart(2, '0'); // 일을 가져오고 0을 추가
  
  let formattedDate = `${year}-${month}-${day}`; // YYYY-MM-DD 형식
  
  console.log('현재 날짜:', currentDate);

  // 3가지 부위의 score ratio의 평균에 따라 4가지 단계와 가장 심각한 부위의 진단
  const s = diagnosisResult(fetchScores(loggedInUser));
  console.log(s);



  const handleLinkClick = () => {
    if (loggedInUser) {
      navigate('/PastData'); // 로그인 되어 있으면 '/PastData' 페이지로 이동
    } else {
      navigate('/login'); // 로그인이 안되어 있으면 '/login' 페이지로 이동
    }
  };

  
  return (

    <div class="mx-auto max-w-7xl mt-10 px-6 lg:px-8">
      <h2 class="text-xl font-bold tracking-tight text-black sm:text-4xl">
        {loggedInUser}
      </h2>
      <h2 class="text-xl font-bold tracking-tight text-black sm:text-4xl">
        과거와 현재 상태를 비교해보아요
      </h2>

      <label for="selectedDate">날짜 검색 </label>
      <input type="date" id="selectedDate" name="selectedDate" class="mx-auto max-w-sm"/> 

    <div class="flex flex-row carousel carousel-center rounded-box w-200 overflow-x-auto">
      <a class="block max-w-[60%] p-6 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <img src="./img/심각.png" class="w-full" />
        <h5 class="mt-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {s} </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">목, 엉덩이 주의 + {s}</p>
      </a>

      <a class="block max-w-[60%] p-6 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <img src="./img/바름.png" class="w-full" />
        <h5 class="mt-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {s} </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">목, 엉덩이 주의 + {s}</p>
      </a>

      <a class="block max-w-[60%] p-6 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <img src="./img/위험.png" class="w-full" />
        <h5 class="mt-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {s} </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">목, 엉덩이 주의 + {s}</p>
      </a>

      <a class="block max-w-[60%] p-6 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <img src="./img/주의.png" class="w-full" />
        <h5 class="mt-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {s} </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">목, 엉덩이 주의 + {s}</p>
      </a>

      <a class="block max-w-[60%] p-6 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <img src="./img/주의.png" class="w-full" />
        <h5 class="mt-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {s} </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">목, 엉덩이 주의 + {s}</p>
      </a>
      
      <a class="block max-w-[60%] p-6 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <img src="./img/주의.png" class="w-full" />
        <h5 class="mt-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {s} </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">목, 엉덩이 주의 + {s}</p>
      </a>
    </div>

</div>


  );
};


export default PastData;