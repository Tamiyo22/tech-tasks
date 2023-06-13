import React, {useEffect,useState} from 'react'
import { UserAuth } from '../context/AuthContext'
import {  useNavigate } from 'react-router-dom';
import { getFirestore } from 'firebase/firestore'

const Profiles = () => {

	const {user,logout} = UserAuth();
	const navigate= useNavigate();  
	const db = getFirestore();
   
	const goBack = async ()=>{
	  try{
		navigate('/studentAccount')
	  }catch(e){
		console.log(e.message);
	  }
	}
  
  
	const handleLogOut = async ()=>{
	  try{
		await logout()
		navigate('/')
	  }catch(e){
		console.log(e.message);
	  }
	}
  
	return (
	 
		  <div>
	  
		   
		 <div>
		  Would you like to go back?
		  </div>
  
		  <button onClick={goBack}>Go Back</button>
  
		 <div>
		  Would you like to log out?
		  </div>
  
		  <button onClick={handleLogOut}>Logout</button>
		 
  
	  </div>
	  
	  
	)
  }
  
  export default Profiles