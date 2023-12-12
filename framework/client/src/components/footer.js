import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; // 스타일 시트를 가져옵니다.

const Footer = () => {
    return(

    <footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4 bg-fixed">
        <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
                <a class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <img src="/img/logo.png" class="h-8" alt="Flowbite Logo" />
                    <img src="/img/logo_HealthyMe.png" class="h-8" alt="Flowbite Logo" />
                </a>
                <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a class="hover:underline me-4 md:me-6"><Link to="/">홈</Link></a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6"><Link to="/Current">현재 상태</Link></a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline me-4 md:me-6"><Link to="/PastData">과거 DATA</Link></a>
                    </li>
                </ul>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 Sogang Capstone Project1. All Rights Reserved.</span>
        </div>
    </footer>
    )
}

export default Footer;