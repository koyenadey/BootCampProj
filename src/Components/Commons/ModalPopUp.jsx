import React from "react";
import Classes from "./ModalPopUp.module.scss";
import { RiCloseLine } from "react-icons/ri";

const ModalPopUp = (props) => {

  const deleteItemHandler = () =>{
    //console.log("In Modal popup");
    props.onDelete();
    props.setModalIsVisible(false);
  };

  return (
    <>
      <div
        className={Classes.darkBG}
        onClick={() => props.setModalIsVisible(false)}
      />
      <div className={Classes.centered}>
        <div className={Classes.modal}>
          <div className={Classes.modalHeader}>
            <h5 className={Classes.heading}>Delete?</h5>
          </div>
          <button
            className={Classes.closeBtn}
            onClick={() => props.setModalIsVisible(false)}
          >
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={Classes.modalContent}>
            Are you sure you want to delete the item?
          </div>
          <div className={Classes.modalActions}>
            <div className={Classes.actionsContainer}>
              <button
                className={Classes.deleteBtn}
                onClick={deleteItemHandler}
              >
                Delete
              </button>
              <button
                className={Classes.cancelBtn}
                onClick={() => props.setModalIsVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalPopUp;
