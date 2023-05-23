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

  const [taskTargetDate, setTaskTargetDate] = useState(new Date());
  const [targetDateError, setTargetDateError] = useState(undefined);

  const [taskModifiedDate, setTaskModifiedDate] = useState(new Date().toJSON());

  const [taskCreatedDate, setTaskCreatedDate] = useState(new Date().toJSON());

  const currentUserId = props.currentUser.id;
  const isEdit = props.isEdit;
 
  const currentTaskId = location.state;
  console.log(currentTaskId);

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
    console.log(isEdit);

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

    console.log(task);
    
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

    if(response.status == 200)
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

  const categoryChangeHandler = ({ target }) => {
    setCategory(target.value);
  };

  const nameChangeHandler = ({ target }) => {
    setTaskName(target.value);
  };

  const descChangeHandler = ({ target }) => {
    setDesc(target.value);
  };

  const statusChangeHandler = ({ target }) => {
    setTaskStatus(target.value);
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
            <span className={Classes.spanPriority} id="spanPriority">
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
          <label id="priorityError" className={Classes.priorityError}>
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
        >
          <option disabled hidden>
            Choose a category
          </option>
          <option value="personal">Personal</option>
          <option value="medical">Medical</option>
          <option value="work">Work</option>
          <option value="official">Official</option>
        </select>
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
          minLength={10}
          name="taskName"
          id="taskName"
          value={taskName}
          onChange={nameChangeHandler}
        />
      </div>
      <div className={Classes.taskDesc}>
        <label className={Classes.labels} htmlFor="taskDesc">
          Description
        </label>
        <textarea
          className={Classes.Desc}
          rows={4}
          cols={10}
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
        >
          <option disabled hidden>
            Choose the status
          </option>
          <option value="InProgress">In Progress</option>
          <option value="Started">Started</option>
        </select>
      </div>
      <div className={Classes.deadline}>
        <label className={Classes.labels} htmlFor="targetDate">
          DeadLine
        </label>
        <input
          className={Classes.targetDate}
          type="datetime-local"
          name="targetDate"
          id="targetDate"
          value={taskTargetDate}
          onChange={targetDateChangeHandler}
        />
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
