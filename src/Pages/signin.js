import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";


const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();


  const handleSubmit= async(e)=>{
    e.preventDefault();
    setError('')

    try{
        await signIn(email,password)
        navigate('/account')

    }catch(e){
        setError(e.message)
        console.log(e.message)
    }
  };


	return (
        <form className='about' onSubmit={handleSubmit}>
        <div>
         <div>
               <h1> Company Sign in!</h1>
               </div>
               <div className='about'>
                   <label> email </label><input onChange={(e) => setEmail(e.target.value)} type="email"/>
                   <label> password </label><input onChange={(e) => setPassword(e.target.value)} type="password"/>
                   <button>Sign In</button>
               </div> 

       </div>
       </form>
	);
};

export default Signin;