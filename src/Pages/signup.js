
import {useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import {UserAuth} from '../context/AuthContext';

const SignUp = () => {

    const [email,setEmail]= useState('')
	const [password,setPassword]= useState('')
	const [error,setError]= useState('')


	const navigate = useNavigate()

	const {createUser}= UserAuth();

	const handleSubmit= async(e)=>{
      e.preventDefault();
	  setError('')

	  try{
           await createUser(email,password)
		   navigate('/followup')

	  } catch(e){
		setError(e.message);
		console.log(e.message);
	  }
	}

	return (

		<form class="form-signin about" onSubmit={handleSubmit}>
		 <div>
          <div>
       		 <h1> Sign up </h1>
				</div>
            		<div className='about'>
            		<label> email  </label><input onChange={(e)=> setEmail(e.target.value)} type="email"/>
            		<label> password  </label><input onChange={(e)=> setPassword(e.target.value)} type="password"/>
            		<button>Sign Up </button>
            	</div> 

    	</div>
		</form>
	);
};

export default SignUp;
