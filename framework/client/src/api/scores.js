import React from 'react';
import axios from 'axios';

export async function fetchScores(user_id, date){
  try {
    const response = await axios.get(`http://localhost:5000/scores/${user_id}/${date}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const ScoreComponent = (props) => {

  const postScoresData = async () => {
    try {
      // POST 요청 보내기
      const response = await axios.post(`http://localhost:5000/scores/`, {user_id: props.user_id, date: props.date});
      console.log(response.data); // POST 요청 응답 데이터 확인
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* 출력할 내용 */}
      <button onClick={postScoresData}>Create scores data</button>
      {/* POST 요청을 보내는 버튼 */}
    </div>
  );
};