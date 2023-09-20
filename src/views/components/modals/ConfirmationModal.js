import React from "react";
import { Modal } from "react-bootstrap";
import SmallRoundedButton from "../button/SmallRoundedButton";
import GrayModalBtn from "../button/GrayModalBtn";

const ConfirmationModal = ({
  show,
  title,
  message,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onCancel,
}) => {
  return (
    <Modal className="confirmationModal" show={show} size="md" animation={false} onHide={onCancel} centered>
      <Modal.Header className="border-0"
          // closeButton
      >
        <Modal.Title id="contained-modal-title-vcenter" className="bold-font font-20">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="bold-font font-15">{message}</p>
      </Modal.Body>
      <Modal.Footer  className="border-0 d-flex justify-content-center" >
          <GrayModalBtn title={cancelText} onClick={onCancel}/>
          <SmallRoundedButton title= {confirmText} onClick={onConfirm}/>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
