import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { fetchScores } from '../api/scores';
import { diagnosisResult } from '../poseNet/diagnosis';
import styled from 'styled-components'; // 꺽은선 그레프, chart.js 사용
import { Line } from 'react-chartjs-2'; // 꺽은선 그레프, chart.js 사용
import '../poseNet/diagnosis';
import '../styles/styles.css';

//그래프 데이터
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      type: 'line',
      label: 'Dataset 1',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 2,
      fill: false,
      data: [1, 2, 3, 4, 5],
    },
    {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: 'rgb(255, 99, 132)',
      data: [1, 2, 3, 4, 5, 6],
      borderColor: 'red',
      borderWidth: 2,
    },
    {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: 'rgb(75, 192, 192)',
      data: [1, 2, 3, 4, 5, 6],
    },
  ],
};

const PastData= () => {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  let currentDate = new Date(); // 현재 날짜와 시간

  let year = currentDate.getFullYear(); // 연도
  let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월을 가져오고 0을 추가
  let day = String(currentDate.getDate()).padStart(2, '0'); // 일을 가져오고 0을 추가
  
  let formattedDate = `${year}-${month}-${day}`; // YYYY-MM-DD 형식
  
  console.log('현재 날짜:', currentDate);

  const s = diagnosisResult(fetchScores("test_id1", "2023-12-06"));
  console.log(s);

  const handleLinkClick = () => {
    if (loggedInUser) {
      navigate('/PastData'); // 로그인 되어 있으면 '/PastData' 페이지로 이동
    } else {
      navigate('/login'); // 로그인이 안되어 있으면 '/login' 페이지로 이동
    }
  };

  
  return (

    <div>
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
    <Container>
      <Line type="line" data={data} />
    </Container>
    

</div>


  );
};

export default PastData;

const Container = styled.div`
  width: 90vw;
  max-width: 900px;
`;