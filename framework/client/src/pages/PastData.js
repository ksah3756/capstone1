import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { fetchScores } from '../api/scores';
import { diagnosisResult } from '../poseNet/diagnosis';
import '../poseNet/diagnosis';
import '../styles/styles.css';

const PastData = () => {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dateValue, setDateValue] = useState('');
  const [docValue, setDocValue] = useState('');
  
  const [availableDates, setAvailableDates] = useState([]);
  const [diagnosisData, setDiagnosisData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scores = await fetchScores(loggedInUser);
        setData(scores);
        if (scores.length > 0) {
          setDateValue(scores[0].date);
          const loggedInUserData = await diagnosisResult(loggedInUser[0]);
          setDocValue(loggedInUserData['content']);

          // 가능한 날짜를 추출하여 세팅
          const dates = scores.map(item => item.date);
          setAvailableDates([...new Set(dates)]);
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
      }
    };

    fetchData();
  }, [loggedInUser]);

  const status_info_pic = (result) => {
    let img_src = '';
    //console.log(result);
    //console.log(diagnosisResult(result)['poseScore']);
    if (diagnosisResult(result)['poseScore'] == 0)
      img_src = './img/바름.png';
    else if (diagnosisResult(result)['poseScore'] == 1)
      img_src = './img/주의.png';
    else if (diagnosisResult(result)['poseScore'] == 2)
      img_src = './img/심각.png';
    else if (diagnosisResult(result)['poseScore'] == 3)
      img_src = './img/위험.png';

    return img_src;
  };

  
  const handleDateChange = (event) => {
    
    const date = event.target.value;
    setSelectedDate(date);

    const selectedDiagnosisData = data.filter((item) => item.date === date);
    setDiagnosisData(selectedDiagnosisData);
    
    console.log(selectedDiagnosisData);
  };
  

  const handleLinkClick = () => {
    if (loggedInUser) {
      navigate('/PastData');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="mx-auto max-w-7xl mt-10 px-6 lg:px-8">
      <h2 className="text-xl font-bold tracking-tight text-black sm:text-4xl">
        과거와 현재 상태를 비교해보아요
      </h2>

      <label htmlFor="selectedDate"> 원하는 날짜를 검색해 보아요. </label>
      <select
        id="selectedDate"
        name="selectedDate"
        className="mx-auto max-w-sm"
        value={selectedDate}
        onChange={handleDateChange}
      >
        <option value="">날짜 선택</option>
        {availableDates.map((date, index) => (
          <option key={index} value={date}>{date}</option>
          
        ))}
      </select>
      

      {/* 날짜 선택 시, 해당 데이터 추출 */}
      <div className="flex rounded-box overflow-x-auto">
        {diagnosisData.map((data) => (
          <a className="block w-56 p-6" >
            <img src={status_info_pic(diagnosisResult(data)['poseScore'])} className="w-full" />
            <h5 className="mt-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.date}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{diagnosisResult(data)['content']}</p>
          </a>
        ))}
      </div>


      {/* 모든 날짜 진단 내용 추출 */}
      <div className="flex rounded-box overflow-x-auto">
        {data.map((score, index) => (
          <a key={index} className="block p-6 w-64" >
            <img src={status_info_pic(score)} className="w-full" />
            <h5 className="mt-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{score.date}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{docValue}</p>
          </a>
        ))}
      </div>


      {/* 모든 날짜 무릎, 허리, 엉덩이 점수 표로 추출 */}
      <h2 className="mt-10 text-xl font-bold tracking-tight text-black sm:text-4xl">
        부위별 나의 자세 점수는?
      </h2>

      <p class="mt-2 mb-5 text-lg font-bold leading-8 text-gray-500">
        바름(0 ~ 25 점) / 주의(25 ~ 50 점) / 심각(50 ~ 75 점) / 매우심각(75 ~ 100 점)
      </p>

      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400">날짜</th>
            <th className="border border-gray-400">엉덩이</th>
            <th className="border border-gray-400">무릎</th>
            <th className="border border-gray-400">목</th>
          </tr>
        </thead>
        <tbody>
          {data.map((score, index) => (
            <tr key={score.length}>
              <td>{score.date}</td>
              <td>{score.hip_score_ratio}</td>
              <td>{score.knee_score_ratio}</td>
              <td>{score.neck_score_ratio}</td>
            </tr>
          ))}
        </tbody>
      </table>

    
    </div>
  );
};

export default PastData;
