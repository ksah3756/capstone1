import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [user_id, setUserId] = useState('');
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
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        body: JSON.stringify({ user_id, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      // console.log(data);
      if (data.errors) {
        setUserIdError(data.errors.user_id);
        setPasswordError(data.errors.password);
      }
      
      if (data.user) { // 로그인 성공 시
        
        // 로그인 context 설정
        setLoggedInUser(data.user_id);

        // 일단은 로그인 성공 시 원래 기본 페이지로 돌아가는데
        // 페이지를 더 추가해서 로그인 성공하면 http://localhost:3000/user_id 이런 페이지로 이동할 수 있도록?
        navigate('/', { state : {user_id: data.user_id} }); // '/'에 해당하는 페이지로 이동
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div class="h-screen mt-[10%]">
        <img src="./img/Home_bg.png" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover"/>

        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-none lg:mx-0">
                <div class="flex flex-row grid grid-cols-3 ">
                    <div class="mt-20">

                        <h2 class="text-4xl font-bold tracking-tight text-black sm:text-6xl">
                            당신의 허리는
                        </h2>
                        <h2 class="text-4xl font-bold tracking-tight text-black sm:text-6xl">
                          <span class="text-blue-500">
                                안녕
                            </span>하십니까
                        </h2>

                        <p class="mt-6 text-lg font-bold leading-8 text-gray-600">
                            거북목?
                        </p>
                        <p2 class="mt-6 text-lg font-bold leading-8 text-gray-600">
                            어깨 결림?
                        </p2>
                        <p class="mt-6 text-lg font-bold leading-8 text-gray-600">
                            평소 내 자세를 교정하세요!
                        </p>

                        <Link to="/signup">
                        <p class="mt-6 text-lg font-bold leading-8 text-blue-500">
                            회원가입하러 가기
                        </p>
                        </Link>

                    </div>
                    <div class="flex">
                        <img class="" src="./img/main_sitting.png" alt="sit_img"/>
                    </div>

                    <div class='mt-10'>
                    <form onSubmit={handleSubmit}>
                      <h2>Log in</h2>
                      <label htmlFor="user_id">Id</label>
                      <input
                        type="text"
                        name="user_id"
                        value={user_id}
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
                      <button type="submit"
                      class="flex flex-row 
                      bg-blue-500 
                      text-white 
                      font-bold 
                      py-2 px-4 
                      rounded-full 
                      border border-blue-500 border-solid
                      hover:bg-white
                      hover:text-blue-500
                      hover:border-blue-500">로그인 하기</button>
                    </form>
                    </div>
                </div>
            </div>
          </div>
          </div>


    
  );
};

export default LoginForm;
