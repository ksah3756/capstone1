import React from 'react';
import axios from 'axios';

// user_id에 해당하는 모든 score 데이터를 가져오도록 변경
export async function fetchScores(user_id){
  try {
    const response = await axios.get(`http://localhost:5000/scores/${user_id}/`);
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