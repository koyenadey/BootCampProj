import React from 'react';
import { Link } from 'react-router-dom';
import Classes from './NavBar.module.scss';
import { ImHome } from 'react-icons/im';
import { IoLogOutSharp } from "react-icons/io5";
import { RiAddCircleFill } from "react-icons/ri";

const NavBar = (props) =>{
  //console.log("NavBar",currUser);
  const username = props.currUser;

  return(
    <ul>
      <li>
        <ImHome size="1rem" color="#cccccc" />
        <Link to="/" className={Classes.link}>Dashboard</Link>
      </li>
      <li>
        <RiAddCircleFill size="1.3rem" color="#cccccc" />
        <Link className={Classes.link} to="/createtask">Add Tasks</Link>
      </li>
      <li>
        <ImHome size="1rem" color="#cccccc" />
        <Link to="/" className={Classes.link}>Expired Tasks</Link>
      </li>
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