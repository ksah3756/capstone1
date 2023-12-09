import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError('');
    setUserIdError('');
    setEmailError('');
    setPasswordError('');

    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        body: JSON.stringify({ name, user_id: userId, email, password }),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      console.log(data);
      if (data.errors) {
        setNameError(data.errors.name);
        setUserIdError(data.errors.user_id);
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
      }
      if (data.user) {
        // Handle successful signup
        // For example, redirect to home page
        window.location.assign('/');
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

                        <Link to="/login">
                        <p class="mt-6 text-lg font-bold leading-8 text-blue-500">
                            로그인하러 가기
                        </p>
                        </Link>

                    </div>
                    <div class="">
                        <img class=" " src="./img/main_sitting.png" alt="sit_img"/>
                    </div>

                    <div class=''>

                    <form onSubmit={handleSubmit}>
                    <h2>Welcome!</h2>

                    <label htmlFor="user_id">Id</label>
                    <input
                      type="text"
                      name="user_id"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      required
                    />
                    <div className="user_id error">{userIdError}</div>

                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <div className="name error">{nameError}</div>

                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="email error">{emailError}</div>

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
                    hover:border-blue-500">
                      등록하기</button>
                  </form>
                  
                    </div>
                </div>
            </div>
          </div>
          </div>
  );
};

export default SignupForm;
