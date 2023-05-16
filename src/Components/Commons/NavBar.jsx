import React from 'react';
import { Link } from 'react-router-dom';


const NavBar = ({currUser}) =>{
  const username = currUser;

  return(
    <ul>
      <li>
        <Link to="/">DashBoard</Link>
      </li>
      {!username && (<>
      <li>
        <Link to="/Login">Login</Link>
      </li>
      <li>
        <Link to="/Register">Register</Link>
      </li>
      </>)}
      {username && (
        <>
        <li>
          {username}
        </li>
        <li>
          <Link to="/Logout">Logout</Link>
        </li>
      </>)}
    </ul>
  );
}

export default NavBar;