import React, { useState, useEffect } from 'react';
import Classes from './UpcomingTask.module.scss';
import {getFormattedTime} from '../Components/Utils/utils';

const UpcomingTask = (props) =>{

  console.log(props.upComingTask)
  
  const [upcomingTask,setUpcomingTask] = useState({});
  
  useEffect(()=>{
    setUpcomingTask(props.upComingTask);
    //const interval = setInterval(()=>setUpcomingTask(upcomingTask),10000);
    //return clearInterval(interval);
  },[]);

  console.log(upcomingTask);
  
  let getFormatteddateTime="";
  if(upcomingTask.taskName!=="No Upcoming task in 30 minutes")
  {
    getFormatteddateTime = getFormattedTime(upcomingTask.taskTargetDate);
  }
   
  return (
    <div className={Classes.container}>
        <p style={{fontWeight:"bolder",fontSize:"20px"}}>Upcoming task</p>
        <p>{upcomingTask.taskName}</p>
        <p>{getFormatteddateTime.finalDayName || "N/A"}</p>
        <p>{getFormatteddateTime.finalDateTime || "N/A"}</p>
    </div>
  );
}

export default UpcomingTask