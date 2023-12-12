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
          const loggedInUserData = await diagnosisResult(loggedInUser);
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

function status_hip_score_to_txt(score) {
    let txt = '';
    
    if (score.hip_score_ratio < 25)
      txt = '바름';
    else if (25 <= score.hip_score_ratio && score.hip_score_ratio < 50)
      txt = '주의';
    else if (50 <= score.hip_score_ratio && score.hip_score_ratio < 75)
      txt = '심각';
    else if (75 <= score.hip_score_ratio && score.hip_score_ratio < 100)
      txt = '매우 심각';

    return txt;
  };

  function status_knee_score_to_txt(score) {
    let txt = '';
    
    if (score.knee_score_ratio < 25)
      txt = '바름';
    else if (25 <= score.knee_score_ratio && score.knee_score_ratio < 50)
      txt = '주의';
    else if (50 <= score.knee_score_ratio && score.knee_score_ratio < 75)
      txt = '심각';
    else if (75 <= score.knee_score_ratio && score.knee_score_ratio < 100)
      txt = '매우 심각';

    return txt;
  };

  function status_neck_score_to_txt(score) {
    let txt = '';
    
    if (score.neck_score_ratio < 25)
      txt = '바름';
    else if (25 <= score.neck_score_ratio && score.neck_score_ratio < 50)
      txt = '주의';
    else if (50 <= score.neck_score_ratio && score.neck_score_ratio < 75)
      txt = '심각';
    else if (75 <= score.neck_score_ratio && score.neck_score_ratio < 100)
      txt = '매우 심각';

    return txt;
  };
  
  // 각 상태에 맞는 font color 클래스 생성
function getStatusFontColor(status) {
  let colorClass = '';
  switch (status) {
    case '바름':
      colorClass = 'text-blue-200';
      break;
    case '주의':
      colorClass = 'text-blue-400';
      break;
    case '심각':
      colorClass = 'text-blue-600';
      break;
    case '매우 심각':
      colorClass = 'text-blue-800';
      break;
    default:
      colorClass = 'text-black'; // 기본 색상
      break;
  }
  return colorClass;
}

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
          <a key={index} className="block p-6" style={{width: 300}}>
            <img src={status_info_pic(score)} className="w-full" />
            <h5 className="mt-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{score.date}</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{diagnosisResult(score)['content']}</p>
          </a>
        ))}
      </div>


      {/* 모든 날짜 무릎, 허리, 엉덩이 점수 표로 추출 */}
      <h2 className="mt-10 text-xl font-bold tracking-tight text-black sm:text-4xl">
        부위별 나의 자세 점수는?
      </h2>

      <p class="mt-2 mb-5 text-lg font-bold leading-8 text-gray-500">
        <a class='text-blue-200'>바름(0 ~ 25 점) /</a> 
        <a class='text-blue-400'>주의(25 ~ 50 점) /</a>
        <a class='text-blue-600'>심각(50 ~ 75 점) /</a>
        <a class='text-blue-800'>매우심각(75 ~ 100 점)</a>
      </p>

      <table className="w-full text-center border-collapse border border-gray-400">
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
      <tr key={index}>
        <td>{score.date}</td>
        <td className={`${getStatusFontColor(status_hip_score_to_txt(score))} font-semibold`}>
          {status_hip_score_to_txt(score)} ({score.hip_score_ratio} 점)
        </td>
        <td className={`${getStatusFontColor(status_knee_score_to_txt(score))} font-semibold`}>
          {status_knee_score_to_txt(score)} ({score.knee_score_ratio} 점)
        </td>
        <td className={`${getStatusFontColor(status_neck_score_to_txt(score))} font-semibold`}>
          {status_neck_score_to_txt(score)} ({score.neck_score_ratio} 점)
        </td>
      </tr>
    ))}
        </tbody>
      </table>

    
    </div>
  );
};

export default PastData;
