import React from "react";
// We use Route in order to define the different routes of our application
import { BrowserRouter, Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import PoseNet from "./poseNet/pose";
import { UserProvider } from './contexts/UserContext';
import NavBar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/Home';
import Current from './pages/Current';
import PastData from './pages/PastData';
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";

 const App = () => {
 return (
   <div>
     <BrowserRouter>
		<UserProvider>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/current" element={<Current />} />
				<Route path="/pastdata" element={<PastData />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/signup" element={<SignupForm />} />
				<Route path="/poses" element={<PoseNet />} />
			</Routes>
			<Footer />
		</UserProvider>
	</BrowserRouter>
   </div>
 );
};
 export default App;