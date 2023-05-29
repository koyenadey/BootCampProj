import React , {useEffect,useState} from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import {filterDataByDate, getDate} from '../Components/Utils/utils';
import 'react-circular-progressbar/dist/styles.css';
import Classes from './ProgressBar.module.scss';

const ProgressBar = (props) =>{
  const [percentage,setPercentage] = useState(0);
  const [todaysTasks,setTodaysTasks] = useState([]);
  const {tasks} = props; 
  
    useEffect(() => {
      let completedTasks;
      let percentage;
      tasks?setTodaysTasks(filterDataByDate(tasks)):setTodaysTasks(0);
      const todayTasksCount = todaysTasks.length;

      //console.log("Todays Tasks",todayTasksCount);
     
      tasks?completedTasks = todaysTasks.filter(task=>task.taskStatus === "Completed").length:completedTasks=0;

      //console.log("CompletedTasks",completedTasks); 
      
      if(todayTasksCount)
        percentage = Math.round((completedTasks / todayTasksCount) * 100);
      else percentage = 0;
  
      setPercentage(percentage);
    }, [percentage,tasks,todaysTasks.taskId]);

    const onGoingTasks = todaysTasks.filter(t=>t.taskStatus === "InProgress" || t.taskStatus==="Started");
    const onGoingThreeTasks = onGoingTasks.slice(-3);

    //console.log(onGoingThreeTasks);

  return(
    <div style={{textAlign:"center"}}>
      <h2 style={{margin:"2rem"}}>Task Progress</h2>
      <h3 style={{marginBottom:"2rem"}}>for {getDate(new Date())}</h3>
      <div style={{ width: 280, marginLeft: 8}}>
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
      </div>
      <table className={Classes.taskContainer}>
        {onGoingThreeTasks.map(task=>{
          return(
            <tr className={Classes.tasksToday}>
              <td className={Classes.contentStyle}>{task.taskName}</td>
              <td className={Classes.contentStyle}>{new Date(task.taskTargetDate).toLocaleTimeString()}</td>
            </tr>
          )
        })}
      </table>
    </div>
  );
}

export default ProgressBar;