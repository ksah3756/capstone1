import axios from 'axios';

export const fetchPoses = async (userId, date) => {
  try {
    const response = await axios.get(`http://localhost:5000/poses/${userId}/${date}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 15초마다 자동으로 호출되는 함수
export const postPoseData = async (userId, poseData) => {
  try {
    const response = await axios.post(`http://localhost:5000/poses/${userId}`, poseData);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

