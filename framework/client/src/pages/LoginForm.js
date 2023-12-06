import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 로그인 성공 시 로그인 된 사용자 id 정보
  const { setLoggedInUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUserIdError('');
    setPasswordError('');

    try {
      const res = await axios.post('http://localhost:5000/login', { user_id: userId, password: password });
      const data = res.data;
      // console.log(data);
      if (data.errors) {
        setUserIdError(data.errors.user_id);
        setPasswordError(data.errors.password);
      }
      
      if (data.user) { // 로그인 성공 시
        
        // 로그인 context 설정
        setLoggedInUser(data.user);

        // 일단은 로그인 성공 시 원래 기본 페이지로 돌아가는데
        // 페이지를 더 추가해서 로그인 성공하면 http://localhost:3000/user_id 이런 페이지로 이동할 수 있도록?
        navigate('/', { state : {user_id: data.user_id } }); // '/'에 해당하는 페이지로 이동
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <label htmlFor="user_id">Id</label>
      <input
        type="text"
        name="user_id"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <div className="user_id error">{userIdError}</div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="password error">{passwordError}</div>
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
