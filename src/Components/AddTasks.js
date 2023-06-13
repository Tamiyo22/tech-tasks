import React, {useState} from 'react';
import { UserAuth } from '../context/AuthContext'
import {uid} from "uid";
import {set, ref} from "firebase/database";
import {db} from "../firebase";


const AddTasks = () => {
    const[todo,setTodo] = useState("");
    //add
    const writeToDatabase = ()=>{
        const uidd = uid();
        set(ref(db,'/${UserAuth.currentUser.uid}/${uid}'),{

            todo : todo,
            uidd : uidd,
        });
     setTodo("")
    };

  return (
    <div>
    <form>
        <ul>  
        Tasks
        <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)}/>
        
        </ul>

        <button onClick={writeToDatabase}>Add Task</button>
        
       </form>
      
    </div>
  )
}

export default AddTasks
