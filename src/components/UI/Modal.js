import ReactDOM from "react-dom";
import React from "react";
import styles from "./Modal.module.css";

const Backdrop = ({onHideCard}) => {
  return <div className={styles.backdrop} onClick={() => onHideCard()}></div>;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const portalElement = document.querySelector("#overlay");

const Modal = ({ children, onHideCard }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onHideCard ={onHideCard}/>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
