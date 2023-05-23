import React from 'react';
import Classes from './ModalPopUp.module.scss';

const ModalPopUp = (props) =>{

 const handleModalSubmit = (event) =>{
    event.preventDefault();
    console.log("Inside Submit Modal", event);
 }

  return (
    
      <div className={Classes.card}>
          <label className={Classes.message}>{props.message}</label>
          <button type="submit" onClick={handleModalSubmit}>Yes</button>
          <button type="submit">No</button>
      </div>
  );
}

export default ModalPopUp;