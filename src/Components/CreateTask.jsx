import React, { useEffect, useState } from "react";
import Classes from "./CreateTask.module.scss";
import { useNavigate, useLocation } from "react-router-dom";

const CreateTask = (props) => {

  const navigate = useNavigate();

  const location = useLocation();

  const [priority, setPriority] = useState("Choose the priority");
  const [priorityError, setPriorityError] = useState(undefined);
  const [priorityIsMandatory, setPriorityIsMandatory] = useState(true);

  const [category, setCategory] = useState("Choose a category");
  const [categoryError, setCategoryError] = useState(undefined);

  const [taskName, setTaskName] = useState("");
  const [taskNameError, setTaskNameError] = useState(undefined);

  const [taskDesc, setDesc] = useState("");

  const [taskStatus, setTaskStatus] = useState("Choose the status");
  const [statusError, setStatusError] = useState(undefined);

  const [taskTargetDate, setTaskTargetDate] = useState('');
  const [targetDateError, setTargetDateError] = useState(undefined);

  const [taskModifiedDate, setTaskModifiedDate] = useState(new Date().toJSON());

  const [taskCreatedDate, setTaskCreatedDate] = useState(new Date().toJSON());

  let currentUserId;
  //console.log("Current User In Create Task", currentUserId);

  const isEdit = props.isEdit;
  let currentTaskId;
  if(isEdit)
  {
    currentTaskId = location.state.currentTask;
    currentUserId = location.state.currentUser;
    console.log("Task Current",currentTaskId);
  }
   else{
     currentUserId = location.state.currentUser;
     console.log("Inside use effect of create task",currentUserId);
   }

  useEffect(()=>{
    //console.log("In Create Task",data);
    if(currentTaskId)
    {
      loadForm(currentTaskId);
    }
  },[currentTaskId])


  const loadForm = async(currentTaskId) =>{
      const response = await fetch(`https://localhost:44341/api/Task/GetTaskById/${currentTaskId}`);
    
      if(response.status === 200)
      {
        const taskData = await response.json();
        //console.log(taskData);
        setPriority(taskData.taskPriority);
        setCategory(taskData.taskCategory);
        setTaskName(taskData.taskName);
        setDesc(taskData.taskDescription);
        setTaskStatus(taskData.taskStatus);
        setTaskCreatedDate(taskData.taskCreatedDate);
        setTaskModifiedDate(taskData.taskModifiedDate);
        setTaskTargetDate(taskData.taskTargetDate);
      }
  };


  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("Value of is Edit",isEdit);

    var endPoint = isEdit?"UpdateTask":"CreateTask";

    const task = {
      UserId: currentUserId,
      TaskId: isEdit?currentTaskId:0,
      TaskPriority: priority,
      TaskCategory: category,
      TaskName: taskName,
      TaskDescription: taskDesc,
      TaskStatus: taskStatus,
      TaskTargetDate: taskTargetDate,
      TaskCreatedDate: taskCreatedDate,
      TaskModifiedDate: taskTargetDate, 
    };

    console.log("Task CreateTask in Create Task",task);
    
    const options = {
      method: isEdit?"PUT":"POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `https://localhost:44341/api/Task/${endPoint}`,
      options
    );

    if(response.status === 200)
    {
      //const data = await response.json();
      navigate("/");
    }
  };

  const validatePriority = () => {
    if (priority === "Choose the priority") {
      setPriorityError("Please choose a valid option from the dropdown");
    } else {
      setPriorityError(undefined);
      setPriorityIsMandatory(false);
    }
  };

  const priorityChangeHandler = ({ target }) => {
    setPriority(target.value);
  };

  const validateCategory = () =>{
    if(category === "Choose a category")
      setCategoryError("Please choose a valid option from the dropdown")
    else{
      setCategoryError(undefined);
    }
  };
  const categoryChangeHandler = ({ target }) => {
    setCategory(target.value);
  };

  const validateName = () =>{
    if(taskName.trim() ==="")
      setTaskNameError("Please type a taskname");
    else if(taskName.length < 3)
      setTaskNameError("The task name must be atleast 3 charecters long");
    else{
      setTaskNameError(undefined);
    }
  };
  const nameChangeHandler = ({ target }) => {
    setTaskName(target.value);
  };

  const descChangeHandler = ({ target }) => {
    setDesc(target.value);
  };

  const validateStatus = () =>{
    if(taskStatus === "Choose the status")
      setStatusError("Please choose a valid option from the dropdown")
    else{
      setStatusError(undefined);
    }
  };
  const statusChangeHandler = ({ target }) => {
    setTaskStatus(target.value);
  };

  const validateTargetgetDate = () =>{
    if(taskTargetDate === ''){
      setTargetDateError("Please select a valid date");
    }
    else setTargetDateError(undefined);
  };
  const targetDateChangeHandler = ({ target }) => {
    setTaskTargetDate(target.value);
  };

  return (
    <form className={Classes.mainContainer} onSubmit={submitHandler}>
      <h1>{isEdit?"EDIT":"CREATE"} TASKS</h1>
      <div className={Classes.priority}>
        <label className={Classes.labels} htmlFor="priority">
          Priority{" "}
          {priorityIsMandatory && (
            <span className={Classes.spanError} id="spanPriority">
              *
            </span>
          )}
        </label>
        <select
          className={Classes.priorityDdl}
          id="priority"
          value={priority}
          onChange={priorityChangeHandler}
          onBlur={validatePriority}
        >
          <option disabled hidden>
            Choose the priority
          </option>
          <option value="p1">P1</option>
          <option value="p2">P2</option>
          <option value="p3">P3</option>
        </select>
        {priorityError && (
          <label id="priorityError" className={Classes.Error}>
            {priorityError}
          </label>
        )}
      </div>
      <div className={Classes.category}>
        <label className={Classes.labels} htmlFor="category">
          Category
        </label>
        <select
          className={Classes.categoryDdl}
          id="category"
          value={category}
          onChange={categoryChangeHandler}
          onBlur={validateCategory}
        >
          <option disabled hidden>
            Choose a category
          </option>
          <option value="personal">Personal</option>
          <option value="medical">Medical</option>
          <option value="work">Work</option>
          <option value="official">Official</option>
        </select>
        {categoryError && <label className={Classes.Error}>{categoryError}</label>}
      </div>
      <div className={Classes.taskname}>
        <label className={Classes.labels} htmlFor="taskName">
          Name
        </label>
        <input
          className={Classes.Name}
          placeholder="Task title"
          type="text"
          maxLength={30}
          name="taskName"
          id="taskName"
          value={taskName}
          onChange={nameChangeHandler}
          onBlur={validateName}
        />
        {taskNameError && <label className={Classes.Error}>{taskNameError}</label>}
      </div>
      <div className={Classes.taskDesc}>
        <label className={Classes.labels} htmlFor="taskDesc">
          Description
        </label>
        <textarea
          className={Classes.Desc}
          rows={4}
          cols={4}
          name="taskDesc"
          id="taskDesc"
          value={taskDesc}
          onChange={descChangeHandler}
        />
      </div>
      <div className={Classes.status}>
        <label className={Classes.labels} htmlFor="status">Status</label>
        <select
          className={Classes.statusDdl}
          id="status"
          value={taskStatus}
          onChange={statusChangeHandler}
          onBlur={validateStatus}
        >
          <option disabled hidden>
            Choose the status
          </option>
          <option value="InProgress">In Progress</option>
          <option value="Started">Started</option>
          {isEdit && <option value="Completed">Completed</option>}
        </select>
        {statusError && <label className={Classes.Error}>{statusError}</label>}
      </div>
      <div className={Classes.deadline}>
        <label className={Classes.labels} htmlFor="targetDate">
          Reminder For
        </label>
        <input
          className={Classes.targetDate}
          type="datetime-local"
          name="targetDate"
          id="targetDate"
          value={taskTargetDate}
          onChange={targetDateChangeHandler}
          onBlur={validateTargetgetDate}
        />
        {targetDateError && <label className={Classes.Error}>{targetDateError}</label>}
      </div>
      <div>
        <button className={Classes.create} type="submit">
          {isEdit?"Update":"Create"}
        </button>
      </div>
    </form>
  );
};
export default CreateTask;
