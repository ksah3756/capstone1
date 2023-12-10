import axios from 'axios';

/*
사실상 pose데이터를 fetch하는 api를 사용할 일이 없음 (score data post response 에서도 사용 X)
export const fetchPoses = async (userId, date) => {
  try {
    const response = await axios.get(`http://localhost:5000/poses/${userId}/${date}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
*/

// 15초마다 자동으로 호출되는 함수
export const postPoseData = async (userId, poseData) => {
  try {
    // 백엔드 서버의 엔드포인트 주소랑 일치해야 하는데 
    const response = await axios.post(`http://localhost:5000/poses/`, poseData);

    
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

