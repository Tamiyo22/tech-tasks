import React from 'react';
import './App.css';
import Navbar from './Components/header';
import { BrowserRouter as Router, Routes, Route }
	from 'react-router-dom';
import Home from './Pages';
import About from './Pages/about';
import SignUp from './Pages/signup';
import Contact from './Pages/contact';
import SignIn from './Pages/signin';
import Account from './Pages/account';
import Profiles from './Pages/profiles';
import StudentProfile from './Pages/studentProfile';
import FollowUp from './Pages/signInFollowup';
import StudentAccount from './Pages/studentAccount';
import StudentSignIn from './Pages/studentSignin';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
	return (
		<div className='app'> 
		<Router>
			<Navbar />
			<AuthContextProvider>
			<Routes>
				<Route exact path='/'  element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/sign-in' element={<SignIn />} />
				<Route path='/studentsignin' element={<StudentSignIn />} />
				<Route path='/followup' element={<FollowUp />} />
				

				<Route path='/studentProfile' element={
				
				<ProtectedRoute> <StudentProfile /></ProtectedRoute>
				
				} />

				
				<Route path='/account' element={
				<ProtectedRoute><Account /></ProtectedRoute>

				} />
				
				<Route path='/studentAccount' element={
				<ProtectedRoute><StudentAccount /></ProtectedRoute>

				} />

				<Route path='/profiles' element={
				<ProtectedRoute><Profiles /></ProtectedRoute>

				} />

				
			</Routes>

			</AuthContextProvider>
			
		</Router>
	</div>
	);
}

export default App;

