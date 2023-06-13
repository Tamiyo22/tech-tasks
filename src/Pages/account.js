import React, {useEffect,useState} from 'react'
import { UserAuth } from '../context/AuthContext'
import {  useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs, deleteDoc,doc,runTransaction, orderBy, query, serverTimestamp  } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore'
import EditTask from '../Components/EditTask';


const Account = () => {

  const {user,logout} = UserAuth();
  const navigate= useNavigate();  
  const db = getFirestore();

  const[tasks,setTasks]= useState([])
  const collectionRef=collection(db,'tasks')
  const[createTask,setCreateTask]= useState("")
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

  //add Task Handler
  const submitTask = async (e)=> {
    e.preventDefault();
    try{
       await addDoc(collectionRef,{
        task:createTask,
        inProgress:false,
        timestamp: serverTimestamp()
      
       })
       window.location.reload()
    }catch(err){
      console.log(err)
    }
    
  }

  const deleteTask = async(id)=>{
    try{
       window.confirm('Are you sure you would like to delete this task?')
       const documentRef= doc(db,"tasks",id)
       await deleteDoc(documentRef)
       window.location.reload();
      }catch(err){
      console.log(err)
      }
   
  }

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

  }

  
  const handleLogOut = async ()=>{
    try{
      await logout()
      navigate('/')
    }catch(e){
      console.log(e.message);
    }
  };
  

  const goToStudentProfiles = async ()=>{
    
      navigate('/profiles')
   
  };

  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
  <div className="container">
    <h1 className="display-4">Company Task Page</h1>
    <p>Welcome user {user && user.email}</p>
    <p className="lead">
      
    Would you like to see student profiles? <button
                        type="button"
                        className="btn btn-warning"
                        onClick={ goToStudentProfiles}>Student Profiles</button>
    
    </p>
    <p>Add, delete, and update tasks below.</p>
    </div>
   
</div>

      
       <>
      <div className="container">
    
        <div className="row">
          <div className="col-md-12">
            <div className="card card-white">
              <div className="card-body">
              <p>Note: Checked tasks means this task is in progress.</p>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                  type="button"
                  className="btn btn-info">Add Task
                </button>

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
                       
                      </span>
                      <span className=" float-end mx-3"><EditTask task={task} id={id} /></span>
                      <button
                        type="button"
                        className="btn btn-danger float-end"
                        onClick={() => deleteTask(id)}
                      >Delete</button>
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
          <form className="d-flex" onSubmit={submitTask}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">Add Task</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">


                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a Task"
                  onChange={(e) => setCreateTask(e.target.value)}
                />

              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                <button className="btn btn-primary">Create Task</button>
              </div>
            </div>
          </form>
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

export default Account
