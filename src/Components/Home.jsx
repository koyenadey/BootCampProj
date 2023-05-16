import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './Commons/NavBar';

const Home = () =>{
  const location = useLocation();
  const currentUser = location.state;
  console.log("Inside Home Compo", currentUser);

  return (
    <>
      <NavBar currUser={currentUser.name} />
      <h1>Home</h1>
    </>
  );
}
export default Home;