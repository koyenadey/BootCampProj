import React, { useEffect, useState } from "react";
import { getToken } from "./Utils/Token";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import {BiAlarmAdd} from 'react-icons/bi'
import NavBar from "./Commons/NavBar";
import Classes from "./Home.module.scss";
import ModalPopUp from "./Commons/ModalPopUp";

function getFormattedTime(dateStr) {
  var dateTime = new Date(dateStr);
  var formattedDate = dateTime.toLocaleDateString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  var formattedDay = dateTime.toLocaleDateString([], { weekday: "long" });
  var formattedTime = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  var finalDate = {
    finalDateTime: `${formattedDate} ${formattedTime}`,
    finalDayName: formattedDay,
  };

  return finalDate;
}

const Home = () => {
  const [currentUser, setCurrentUser] = useState();
  const [tasks, setTasks] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const navigate = useNavigate();
  //const location = useLocation();
  let data; //= location.state;

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    let user;
    if (jwt) {
      user = getToken(jwt);
      getAllTasks(user.userId);
      setCurrentUser(user.name);
    } else navigate("/Login");
  }, [currentUser, tasks.TaskId, modalIsVisible, navigate]);

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

  const deleteItemHandler = async (taskId) => {
    setModalIsVisible(true);
    const options = {
      method: "DELETE",
      body: JSON.stringify(taskId),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      "https://localhost:44341/api/Task/DeleteTask",
      options
    );
    console.log(response);
    if (response.ok) {
      setModalIsVisible(false);
    }
  };

  const editTaskHandler = (currentTaskId) => {
    navigate("/edittask", { state: currentTaskId });
  };

  console.log("Inside Home Compo", currentUser);

  return (
    <div className={Classes.mainContainer}>
      <div className={Classes.NavBar}>
        <NavBar currUser={currentUser} />
      </div>
      <div className={Classes.content}>
        <div className={Classes.header}>
          <h2>Hello {currentUser}</h2>
          <h3>Welcome back</h3>
        </div>
        <div className={Classes.taskContent}>
          <table className={Classes.taskContainer}>
            {tasks.map((task) => {
              return (
                  <tr id={task.taskId} className={Classes.tasks}>
                    <td>
                      <p>{getFormattedTime(task.taskTargetDate).finalDateTime}</p>
                    </td>
                    <td>
                      <p>{getFormattedTime(task.taskTargetDate).finalDayName}</p>
                    </td>
                    <td>
                      <p>{task.taskName}</p>
                    </td>
                    <td>
                      <p>{task.taskStatus}</p>
                    </td>
                    <td>
                      <p>{task.taskCategory}</p>
                    </td>
                    <td className={Classes.iconsEditDel}>
                      <button
                        className={Classes.iconDel}
                        onClick={() => editTaskHandler(task.taskId)}
                      >
                        <FaEdit size="20px" color="#5e5e5e" />
                      </button>
                      <button
                        className={Classes.iconEdit}
                        onClick={() => deleteItemHandler(task.taskId)}
                      >
                        <RiDeleteBin6Fill size="20px" color="#5e5e5e" />
                      </button>
                    </td>
                    <td>
                      <button className={Classes.iconEdit}>
                          <BiAlarmAdd size="30px" color="#5e5e5e" />
                      </button>
                    </td>
                  </tr>
              );
            })}
          </table>
        </div>
      </div>
      <div className={Classes.rightBar}></div>
    </div>
  );
};

export default Home;
