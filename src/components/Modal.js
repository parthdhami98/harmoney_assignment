import React from "react";

import "../App.css";

const Modal = ({ onCancel, onOk }) => {
  return (
    <div className="modalContainer">
      <div className="modalBox">
        <p className="modalText">
          Are you sure you want to delete All Messages?
        </p>

        <div className="detailsActions">
          <button onClick={onCancel} className="cancelCta">
            Cancel
          </button>
          <button onClick={onOk} className="deleteCta">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
