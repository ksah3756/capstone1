import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 여기에 인자로 user_id, date를 넘겨야겠는데
const ScoreComponent = (userId, date) => {
    // 근데 이건 scores 리스트가 만들어질 필요가 있나?
  const [scores, setScores] = useState(); // undefined로 해도 되나

  useEffect(() => {
    // GET 요청 보내기
    const fetchScores = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/scores/${userId}/${date}`);
        setScores(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchScores(); // 컴포넌트가 마운트될 때 API GET 요청 보내기
  }, [userId, date]);

  const postScoresData = async () => {
    try {
      // POST 요청 보내기
      const response = await axios.post(`http://localhost:5000/scores/${userId}/${date}`);
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

export default ScoreComponent;
