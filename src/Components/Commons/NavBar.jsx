import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Classes from './NavBar.module.scss';
import { ImHome } from 'react-icons/im';
import { IoLogOutSharp } from "react-icons/io5";
import { RiAddCircleFill } from "react-icons/ri";
import {BsBookmarkCheckFill} from 'react-icons/bs';
import {BsThreeDots} from 'react-icons/bs';
import {MdNotStarted} from 'react-icons/md';

const NavBar = (props) =>{
  const navigate = useNavigate();
  const status = ["Started","InProgress","Completed"];
  const username = props.currUser;
  const userId = props.currUserId;
  console.log("In Nav Bar Current User", userId);

  return(
    <ul className={Classes.navBarUL}>
      <li>
          <ImHome size="1rem" color="#cccccc" />
          <button className={Classes.buttonStatus} onClick={()=>props.onStatusChange(undefined)}>All Tasks</button>
      </li>
      <li>
        <RiAddCircleFill size="1.3rem" color="#cccccc" />
        <button className={Classes.link} onClick={()=>navigate("/createtask",{state: {currentUser: userId}})}>Add Tasks</button>
      </li>
      {status.map(s=>{return(
        <li key={s}>
          {s==="Started"?<MdNotStarted size="1rem" color="#cccccc" />:s==="In Progress"?<BsThreeDots size="1rem" color="#cccccc" />:<BsBookmarkCheckFill  size="1rem" color="#cccccc" />}
          <button className={Classes.buttonStatus} onClick={()=>props.onStatusChange(s)}>{s}</button>
        </li>
      )})}
      
      {!username && (<>
      <li>
        <Link className={Classes.link} to="/Login">Login</Link>
      </li>
      <li>
        <Link className={Classes.link} to="/Register">Register</Link>
      </li>
      </>)}
      {username && (
        <li className={Classes.logout}>
          <IoLogOutSharp size="1.3rem" color="#cccccc" />
          <Link className={Classes.link} to="/Logout">Logout</Link>
        </li>
      )}
   </ul>
  );
}

export default NavBar;