import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import {getToken} from './Components/Utils/Token';
import Register from './Components/Register';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Home from './Components/Home';

import './index.scss';



function App() {
  const [currentUser,setCurrentUser] = useState(undefined);

  useEffect(()=>{
    //console.log("In App.js");
    try {
      const jwt = localStorage.getItem('token');
      //console.log('Printing JWT: ',jwt);
      let user;

      if(jwt){
        user = getToken(jwt);
        setCurrentUser(user.name);
      }  

      console.log("Current User",currentUser);
      
    } catch (error) {
      console.log(error);
    }
  },[currentUser]);

  return (
  <>
    <Routes>
      <Route path='/Register' element={<Register />} />
      <Route path='/Login' element={<Login changeCurrUser={setCurrentUser} />} />
      <Route path='/Logout' element={<Logout />} />
      <Route path='/' element={<Home />} />
    </Routes>
  </>
  
  );
}

export default App;
