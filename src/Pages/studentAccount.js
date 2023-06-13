import React, {useEffect,useState} from 'react'
import { UserAuth } from '../context/AuthContext'
import {  useNavigate } from 'react-router-dom';
import {  collection, getDocs,doc,runTransaction, orderBy, query, serverTimestamp  } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore'
import EditTask from '../Components/EditTask';



const StudentAccount = () => {

  const {user,logout} = UserAuth();
  const navigate= useNavigate();  
  const db = getFirestore();
 

  const[tasks,setTasks]= useState([])
  const collectionRef=collection(db,'tasks')
  const [checked, setChecked] = useState([]);

  useEffect(()=>{
    const getTasks = async()=>{
      await getDocs(collectionRef).then((task)=>{
       let tasksData= task.docs.map((doc) => ({...doc.data(), id:doc.id}))
      
      setTasks(tasksData)
      setChecked(tasksData)
    }).catch((err)=>{
      console.log(err);
    })
  }
    getTasks()
  },[])

 


  const checkHandler = async (event, task) => {

    setChecked(state => {
      const indexToUpdate = state.findIndex(checkBox => checkBox.id.toString() === event.target.name);
      let newState = state.slice()
      newState.splice(indexToUpdate, 1, {
        ...state[indexToUpdate],
        isChecked: !state[indexToUpdate].isChecked,

      })
      setTasks(newState)
      return newState
    });


    // Persisting the checked value
    try {
      const docRef = doc(db, "tasks", event.target.name);
      await runTransaction(db, async (transaction) => {
        const taskDoc = await transaction.get(docRef);
        if (!taskDoc.exists()) {
          throw "Document does not exist!";
        }
        const newValue = !taskDoc.data().isChecked;
        transaction.update(docRef, { isChecked: newValue });
      });
      console.log("Transaction successfully committed!");
    } catch (error) {
      console.log("Transaction failed: ", error);
    }

  };

  const updateStudentProfile = async ()=>{
    
    navigate('/studentProfile')
 
};


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
      <div className="jumbotron jumbotron-fluid">
  <div className="container">
    <h1 className="display-4">Student Task Page</h1>
    <p>Welcome user {user && user.email}</p>
    <p className="lead">
      
    Would you like to update your student profile? <button
                        type="button"
                        className="btn btn-warning"
                        onClick={ updateStudentProfile}>Update Profile</button>
    
    </p>
    <p>Accept and update tasks below.</p>
    </div>
   
</div>

       <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-white">
              <div className="card-body">
              Note: Checked tasks means this task is in progress. Checking a task means that you have accepted it.

                {tasks.map(({ task, isChecked, id, timestamp }) =>
                  <div className="todo-list" key={id}>
                    <div className="todo-item">
                      <hr />
                      <span className={`${isChecked === true ? 'done' : ''}`}>
                        <div className="checker" >
                          <span className="" >
                            <input
                              type="checkbox"
                              defaultChecked={isChecked}
                              onChange={(event) => checkHandler(event, task)}
                              name={id}
                            />
                          </span>
                        </div>
                        &nbsp;{task}<br />
                        <i>{new Date(timestamp.seconds * 1000).toLocaleString()}</i>
                        {/* Note Can list current use */}
                      </span>
                      <span className=" float-end mx-3"><EditTask task={task} id={id} /></span>
                      
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          
        </div>
      </div>
      
       </>


       <div>
        Would you like to log out?
        </div>

        <button onClick={handleLogOut}>Logout</button>
       

    </div>
    
    
  )
}

export default StudentAccount