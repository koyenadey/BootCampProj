import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import {getToken} from './Components/Utils/Token';
import CreateTask from './Components/CreateTask';
import Register from './Components/Register';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Home from './Components/Home';
import ModalPopUp from './Components/Commons/ModalPopUp';
import './index.scss';



function App() {
  const [currentUser,setCurrentUser] = useState({});

  useEffect(()=>{
    console.log("In App.js");
    try {
      const jwt = localStorage.getItem('token');
      //console.log('Printing JWT: ',jwt);
      let user, currentUser;

      if(jwt){
        user = getToken(jwt);
        currentUser = {
          name: user.name,
          id: user.userId
        };
        setCurrentUser(currentUser);
      }  

      console.log("Current User",currentUser.name);
      
    } catch (error) {
      console.log(error);
    }
  },[currentUser.id]);

  return (
  <>
    <Routes>
      <Route path='/createtask' element={<CreateTask currentUser={currentUser} isEdit={false} />} />
      <Route path='/edittask' element={<CreateTask currentUser={currentUser} isEdit={true} />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/' element={<Home />} />
    </Routes>
  </>
  
  );
}

export default App;
