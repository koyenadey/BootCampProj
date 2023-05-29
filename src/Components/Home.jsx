import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./Commons/NavBar";
import ModalPopUp from "./Commons/ModalPopUp";
import Pagination from "./Commons/Pagination";
import ProgressBar from "./ProgressBar";
import UpcomingTask from "./UpcomingTask";
import { getToken } from "./Utils/Token";
import Classes from "./Home.module.scss";
import {BiAlarmAdd} from 'react-icons/bi'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {paginate} from './Utils/utils';
import {filterData} from './Utils/utils';
import {sortData} from './Utils/utils';
import {getFormattedTime} from './Utils/utils';
import {getUpcomingTask} from './Utils/utils';



const Home = () => {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [tasks, setTasks] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [deleteItem, setDeleteIem] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStatus, setCurrentStatus] = useState(undefined);
  const [currentSortColmn, setCurrentSortColmn] = useState('taskTargetDate');
  const navigate = useNavigate();
  let data;

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    let user;
    if (jwt) {
      user = getToken(jwt);
      console.log("In Home, user Id:",user.userId);
      setCurrentUser(user.name);
      setCurrentUserId(user.userId);
      getAllTasks(user.userId);
    } else navigate("/Login");
  }, [currentUser, tasks.TaskId, modalIsVisible, navigate,deleteItem]);

  const getAllTasks = async (currentUserId) => {
    const response = await fetch(
      "https://localhost:44341/api/Task/GetTasksByUser",
      {
        method: "POST",
        body: JSON.stringify(currentUserId),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      data = await response.json();
      setTasks(data);
    }
  };

  const deleteItemHandler =  (taskId) => {
    setModalIsVisible(true);
    setDeleteIem(taskId);
    console.log("The value of delete item",deleteItem)
  };

  const deleteItemPermanently = async() =>{
    const options = {
      method: "DELETE",
      body: JSON.stringify(deleteItem),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      "https://localhost:44341/api/Task/DeleteTask",
      options
    );
    console.log(response);
    setDeleteIem(0);
  }

  const editTaskHandler = (currentTaskId) => {
    console.log("Current task id", currentTaskId);
    navigate("/edittask", { state: {currentUser: currentUserId, currentTask:currentTaskId} });
  };

  const pageChangeHandler = (page) =>{
    setCurrentPage(page)
  };

  const handleStatusFilter = (status) =>{
    console.log(status);
    setCurrentStatus(status);
  };

  const handleSort = (columnName) =>{
   setCurrentSortColmn(columnName);
  };

  const setClassHandler = (taskStatus) =>{
    if(taskStatus==="InProgress")
      return Classes.tasks+" "+Classes.taskColorRed;
    if(taskStatus === "Started")
      return Classes.tasks+" "+Classes.taskColorYellow;
    if(taskStatus === "Completed")
      return Classes.tasks+" "+Classes.taskColorGreen;
    };

    //const upComingTask = getUpcomingTask(tasks);
  

    const taskSortedData = sortData(tasks,currentSortColmn);

    const taskFilterData = filterData(taskSortedData,currentStatus);
    
    const taskData = paginate(taskFilterData,currentPage,7);
   

    console.log("Inside Home Compo", currentUser);

  return (
    <div className={Classes.mainContainer}>
      {modalIsVisible && <ModalPopUp setModalIsVisible={setModalIsVisible} onDelete={deleteItemPermanently} />}
      <div className={Classes.NavBar}>
        <NavBar currUser={currentUser} currUserId={currentUserId} onStatusChange={handleStatusFilter} />
      </div>
      <div className={Classes.content}>
        <div className={Classes.header}>
          <div className={Classes.header23}>
            <h2>Hello {currentUser}</h2>
            <h3>Welcome back</h3>
          </div>
         
        </div>
        <div className={Classes.taskContent}>
          <table className={Classes.taskContainer}>
            <thead>
              <th>
                <tr className={Classes.tasks}>
                  <td onClick={()=>handleSort("taskTargetDate")} className={Classes.taskHeader}>Task Target Date</td>
                  <td style={{marginTop:"1rem"}}>Task Target Day</td>
                  <td onClick={()=>handleSort("taskName")} className={Classes.taskHeader}>TaskName</td>
                  <td onClick={()=>handleSort("taskStatus")} className={Classes.taskHeader}>Status</td>
                  <td onClick={()=>handleSort("taskCategory")} className={Classes.taskHeader}>Category</td>
                  <td style={{marginTop:"1rem"}}>Item Actions</td>
                </tr>
              </th>
            </thead>
            <tbody>
            {taskData.map((task) => {
              return (
                  <tr id={task.taskId} className={setClassHandler(task.taskStatus)}>
                    <td>
                      <p className={Classes.itemAlignLeftDate}>{getFormattedTime(task.taskTargetDate).finalDateTime}</p>
                    </td>
                    <td>
                      <p className={Classes.itemsAlignLeft}>{getFormattedTime(task.taskTargetDate).finalDayName}</p>
                    </td>
                    <td>
                      <p className={Classes.itemsAlignLeft}>{task.taskName}</p>
                    </td>
                    <td>
                      <p className={Classes.itemsAlignLeft}>{task.taskStatus}</p>
                    </td>
                    <td>
                      <p className={Classes.itemsAlignLeft}>{task.taskCategory}</p>
                    </td>
                    <td className={Classes.iconsEditDel}>
                      {task.taskStatus!=="Completed" && 
                      
                        <FaEdit size="30px" color="black" onClick={() => editTaskHandler(task.taskId)} />
                      }
                      <RiDeleteBin6Fill size="30px" margin="10px" color="black" onClick={() => deleteItemHandler(task.taskId)} />
                      <BiAlarmAdd size="30px" color="black" />
                    </td>
                  </tr>
              );
            })}
            </tbody>
          </table>
          <Pagination taskCount={taskFilterData.length} pageSize={7} onPageChange={pageChangeHandler} />
        </div>
      </div>
      <div className={Classes.ProgressBar}>
        <ProgressBar tasks={tasks} />
      </div>
    </div>
  );
};

export default Home;
