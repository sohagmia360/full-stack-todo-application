import React,{useState , useEffect} from 'react';
import axios from 'axios'
import ErrorAlert from '../components/ErrorAlert';
import {useRouter} from 'next/router'
const CreateNew = () => {
        const router = useRouter()
        const {pathname} = router
        
        // console.log(pathname)
        const [showErrorAlert , setShowErrorAlert] = useState(false)
        const [taskName , setTaskName] = useState("")
        const [taskDes , setTaskDes] = useState("")
        const currentDate = new Date().toLocaleDateString()  
        console.log(taskDes.length)
        const handleCreateNewTask = async (e)=>{
                e.preventDefault()
                const newTask = {
                        taskName,
                        taskDes,
                        date : currentDate
                }
                if(taskName.length > 26 || taskDes.length >= 120 || taskName.length <= 0 || taskDes.length <= 0){
                        setShowErrorAlert(true)
                }else{
                        await axios.post('/api/task',newTask) 
                        .then((res)=>  console.log(res))
                        .catch((error)=> console.log(error))
                        if(pathname == '/createNew' ){
                                router.push('/newTask')
                             }
                }
        }
        
        useEffect(()=>{
               setTimeout(()=>{
                setShowErrorAlert(false)
               }, 10000) 
        },[showErrorAlert])
    
        return (
                <>
                <div className="mt-10 ">
                      <form onSubmit={handleCreateNewTask} className="bg-light_white shadow-md w-[60%] mx-auto p-8 rounded-xl ">
                                <span className="font-medium  text-blue_dark pb-1 inline-block">{taskName.length}/26</span>
                                <input value={taskName} onChange={(e)=> setTaskName(e.target.value)} type="text" placeholder="Task Name" className={taskName.length > 26 ? 'input input-bordered w-full mb-4 border-2 border-[#F92672] text-[#F92672] font-bold' : 'input font-bold input-bordered w-full mb-4'} /> 
                                <span className="font-medium  text-blue_dark">{taskDes.length}/120</span>
                                <textarea value={taskDes} onChange={(e)=> setTaskDes(e.target.value)} className={taskDes.length >= 120 ? 'w-full border-2 border-[#F92672] rounded-xl p-3 outline-none h-[170px] mb-3 text-[#F92672] ' : ' w-full border-2 border-[#ebeaead7] rounded-xl p-3 outline-none h-[170px] mb-3'} placeholder="Task Description"></textarea>
                                <button className="btn-sm btn bg-dark_purple border-none">Create</button>
                       </form>  
                </div>
                {showErrorAlert ? 
                <ErrorAlert setShowErrorAlert={setShowErrorAlert}>
                Error ! TaskName maximum  26 latter and Description maximum 120 latter required Also ( emty Not Allaw ) !
                </ErrorAlert>
                :
                null
                }
                
                </>
        );
}


export default CreateNew;
('')