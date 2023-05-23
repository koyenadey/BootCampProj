import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { getToken } from './Utils/Token';
import Classes from './Login.module.scss';


const Login = (props) => {

  const [email, setEmail] = useState('');
  const [emailError,setEmailError] = useState(undefined);
  const [password, setPassword] = useState('');
  const [passwordError,setPasswordError] = useState(undefined);
  const navigate = useNavigate();

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

  const loginHandler = (submitEvent) =>{
    submitEvent.preventDefault();

    const enteredEmail = email;
    const enteredPassword = password;

    const userLoginData = {
        email: enteredEmail,
        password: enteredPassword
    };
    
    submitData(userLoginData);                                           
}
  const submitData = async (data) =>{
  
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      "Content-Type":"application/json"
    }
  };
  const response = await fetch('https://localhost:44341/api/Login',options);
  const jwt = await response.text();
  console.log("Inside Login");

  if(jwt === undefined || jwt ==="User Does Not Exist")
    setEmailError("The User does not exist");
  else
  {
    //const userName =  getToken(jwt);
    localStorage.setItem('token',jwt);
    navigate("/");
  } 
} 

  return (
    <form onSubmit={loginHandler} className={Classes.mainContainer}>
      <div className={Classes.header}>
        <img
          className={Classes.imageHeader}
          src={require("./Images/Login.png")}
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
              Login
            </button>
            <Link className={Classes.registerHereLink} to="/register">Register here</Link>
          </div>
        </div>
      </div>
    </form>
  );

}

export default Login;