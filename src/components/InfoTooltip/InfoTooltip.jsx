// import React from "react";
// Este componente exibirá uma mensagem de sucesso ou erro após o registro.

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        ></button>
        <div
          className={`popup__icon ${
            isSuccess ? "popup__icon_success" : "popup__icon_fail"
          }`}
        ></div>
        <h2 className="popup__title">
          {isSuccess
            ? "Success! You have been registered."
            : "Oops, something went wrong! Please try again."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
