import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { fetchScores } from '../api/scores';
import Footer from '../components/footer';

const Home = () => {
  const { loggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  // const location = useLocation();

  const handleLinkClick = () => {
    if (loggedInUser) {
      navigate('/poses'); // 로그인 되어 있으면 '/poses' 페이지로 이동
    } else {
      navigate('/login'); // 로그인이 안되어 있으면 '/login' 페이지로 이동
    }
  };

  return (

    <div class="h-screen">
        <img src="./img/Home_bg.png" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover"/>

        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-none lg:mx-0">
                <div class="flex flex-row grid grid-cols-2">
                    <div class="basis-1/2">
                      <Link to="/Current">
                        <button class="flex flex-row 
                                bg-gray-100 
                                text-black 
                                font-bold 
                                mt-40 mb-8
                                py-2 px-4 
                                rounded-full 
                                border border-gray-600 border-solid
                                hover:bg-blue-500
                                hover:text-white
                                hover:border-blue-500">
                                앉은 상태 Check&nbsp;
                            <img class="max-h-5" src="./img/home_heart.png"/>
                        </button>
                        </Link>

                        <h2 class="text-4xl font-bold tracking-tight text-black sm:text-6xl">
                            <span class="text-blue-500">
                                실시간으로 자세
                            </span>를
                            
                        </h2>
                        <h2 class="text-4xl font-bold tracking-tight text-black sm:text-6xl">
                            바르게 고쳐보아요.
                        </h2>

                        <p class="mt-6 text-lg font-bold leading-8 text-gray-500">
                            미래의 허리를 위한 지금의 자세!
                        </p>
                        <p2 class="mt-6 text-lg font-bold leading-8 text-gray-500">
                            함께 조금씩 고쳐보아요.
                        </p2>

                    </div>
                    <div class="flex flex-end mt-20 mb-8">
                        <img class="max-w-[60%] ml-[15%]" src="./img/main_sitting.png" alt="sit_img"/>
                    </div>
                </div>
            </div>

                
            

            <div class="mx-auto mt-10 mb-10 max-w-2xl lg:mx-0 lg:max-w-none">
               
                <dl class="mt-16 grid grid-cols-1 sm:mt-20 sm:mb-20 sm:grid-cols-2 lg:grid-cols-4">

                    <div class="col-span-2 flex flex-col-reverse">
                        <dt class="text-base leading-7 text-gray-500">
                            <span class="text-xl font-bold text-blue-200">바름</span>  바른 자세를 유지해주세요.
                        </dt>
                        <dt class="text-base leading-7 text-gray-500">
                            <span class="text-xl font-bold text-blue-400">주의</span>  자세에 조금만 더 주의를 주세요.
                          </dt>
                          <dt class="text-base leading-7 text-gray-500">
                            <span class="text-xl font-bold text-blue-600">위험</span>  앉은 자세가 허리 건강에 위험합니다.
                          </dt>
                          <dt class="text-base leading-7 text-gray-500">
                            <span class="text-xl font-bold text-blue-800">심각</span>  앉은 자세를 당장 바꿔 주세요.
                          </dt>

                        <dd class="flex flex-row text-2xl font-bold leading-9 tracking-tight text-black">
                            자세 등급제&nbsp;
                            <img class="max-h-9" src="./img/Heartrate.png" alt="heart_rate"/>
                        </dd>


                        <dd class="flex flex-row text-m font-bold leading-9 tracking-tight text-blue-500">
                            제공 서비스
                            
                        </dd>
                    </div>

                    <div class="col-span-1 flex flex-col-reverse">
                        <dt class="text-base leading-7 text-gray-500">
                            진단해드려요.
                        </dt>
                        <dt class="text-base leading-7 text-gray-500">
                            현재 나의 허리 상태를
                        </dt>
                        <dt class="text-base leading-7 text-gray-500">
                            실시간 카메라를 통해
                        </dt>
                        <dd class="flex flex-row text-2xl font-bold leading-9 tracking-tight text-black">
                            현재 상태&nbsp;
                            <img class="max-h-9" src="./img/chatbot.png" alt="chatbot"/>
                        </dd>
                    </div>
                    <div class="col-span-1 flex  flex-col-reverse">
                        <dt class="text-base leading-7 text-white">
                            .
                        </dt>
                        <dt class="text-base leading-7 text-gray-500">
                            한 눈에 제공해 드립니다.
                        </dt>
                        <dt class="text-base leading-7 text-gray-500">
                            과거의 데이터를
                        </dt>
                        <dd class="flex flex-row text-2xl font-bold leading-9 tracking-tight text-black">
                            과거 Data&nbsp;
                            <img class="max-h-9" src="./img/stats.png" alt="stats"/>
                        </dd>
                    </div>
                </dl>
            </div>
            </div>
            <Footer />
    </div>
  );
};

export default Home;
