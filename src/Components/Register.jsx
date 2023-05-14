import React, { useState } from "react";
import Classes from "./Register.module.scss";

const Register = () => {
  const [email, setEmail] = useState('');
  const [emailError,setEmailError] = useState(undefined);
  const [username, setUserName] = useState('');
  const [userNameError,setUserNameError] = useState(undefined);
  const [password, setPassword] = useState('');
  const [passwordError,setPasswordError] = useState(undefined);


    const emailChangeHandler = ({target}) =>{
        setEmail(target.value);
    };
    const validateEmail = () =>{
        //const enteredEmail = target.value;
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.trim()==="")
            setEmailError("Email cannot be empty");
    
        else if(!email.match(mailFormat))
            setEmailError("Please enter a valid email");

        else setEmailError(undefined);
    }
    const usernameChangeHandler = ({target}) =>{
        setUserName(target.value);
    };
    const validateUserName=()=>{
        if(username.trim()==="")
            setUserNameError("UserName cannot be empty");
        else if(username.length<2)
            setUserNameError("UserName cannot be less than 2 charecters");
        else setUserNameError(undefined);
    };
    const passwordChangeHandler = ({target}) =>{
        setPassword(target.value);
    };
    const validatePassword = () =>{
        if(password.trim()==="")
            setPasswordError("Password cannot be empty");
        else if(password.length<5)
            setPasswordError("Password needs to be more than 5");
        else setPasswordError(undefined);
    };

    const registerHandler = (submitEvent) =>{
        submitEvent.preventDefault();

        const enteredEmail = email;
        const enteredUserName = username;
        const enteredPassword = password;

        const userRegistrationData = {
            email: enteredEmail,
            username: enteredUserName,
            password: enteredPassword
        };
        
        try{
          const response = submitData(userRegistrationData);
          if(response.status === 201)
            alert("User Created!");
          if(response.status=== 400)  
            throw new Error();
        } catch (ex) {
            if(ex.response && ex.response.status === 400)
                setUserNameError("The user already exists");
        }                                            
    }
   const submitData = async (data) =>{
    console.log('Inside submit data');
    const response = await fetch('http://192.168.1.103:7068/api/User',{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Response Object',response);
     return response;
   } 

  return (
    <form onSubmit={registerHandler} className={Classes.mainContainer}>
      <div className={Classes.header}>
        <img
          className={Classes.imageHeader}
          src={require("/Users/koyena/Desktop/React/TaskManagementSystem/taskmanagementsystem/src/Components/Images/Register.png")}
          alt="hey welcome"
        />
        <div className={Classes.inputgroup}>
          <div className={Classes.email}>
            <label className={Classes.inputlabel} htmlFor="email">
              Email
            </label>
            <input
              className={Classes.textbox}
              value={email}
              onChange={emailChangeHandler}
              onBlur={validateEmail}
              placeholder="Your email id"
              type="email"
              name="email"
              id="email"
            />
            {emailError && <label className={Classes.mailError} id="emailError">{emailError}</label>}
          </div>
          <div>
            <label className={Classes.inputlabel} htmlFor="userName">
              Name
            </label>
            <input
              className={Classes.textbox}
              placeholder="A username of your choice"
              value={username}
              onChange={usernameChangeHandler}
              onBlur={validateUserName}
              type="text"
              name="userName"
              id="userName"
            />
            {userNameError && <label className={Classes.userNameError} id="userNameError">{userNameError}</label>}
          </div>
          <div className="password">
            <label className={Classes.inputlabel} htmlFor="password">
              Password
            </label>
            <input
              className={Classes.textbox}
              placeholder="Password"
              value={password}
              onChange={passwordChangeHandler}
              onBlur={validatePassword}
              type="password"
              name="password"
              id="password"
            />
            {passwordError && <label className={Classes.passwordError}>{passwordError}</label>}
          </div>
          <div className="buttons">
            <button className={Classes.buttonBlack} type="submit">
              Register
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Register;
