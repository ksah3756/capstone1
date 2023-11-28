import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PoseComponent= () => {
  // 15초마다 들어오는 pose 데이터들의 list이므로 빈 리스트로 초기화
  const [poses, setPoses] = useState([]);
  // userId는 로그인 한 계정 id로, date는 사용자로부터 입력받은 date로
  const userId = 'yourUserID'; // 사용자 ID
  const date = 'yourDate'; // 날짜

  // 컴포넌트의 state가 변화함에 따라 컴포넌트 내부에도 변경이 이루어져야 하는 경우
  useEffect(() => {
    // GET 요청 보내기
    const fetchPoses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${userId}/${date}`);
        setPoses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPoses(); // 컴포넌트가 마운트될 때 API GET 요청 보내기
  }, [userId, date]); // URI(http://localhost:5000/~) 가 바뀔때마다 get request 보냄

  const postData = async (inputPoseData) => {
    // poseData 예시, 실제로는 poseNet으로 계산한 결과 객체를 받아서 전달
    const poseData = {
      id: userId,
      kneck: inputPoseData.kneck,
      hip: inputPoseData.hip,
      knee: inputPoseData.knee,
    }
    try {
      // POST 요청 보내기
      const response = await axios.post(`http://localhost:5000/${userId}`, poseData);
      console.log(response.data); // POST 요청 응답 데이터 확인
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* 출력할 내용 */}
      <button onClick={postData}>Send POST Request</button>
      {/* POST 요청을 보내는 버튼 */}
    </div>
  );
};

export default PoseComponent;
