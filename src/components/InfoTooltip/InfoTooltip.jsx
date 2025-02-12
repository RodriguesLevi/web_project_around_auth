// import React from "react";
// Este componente exibirá uma mensagem de sucesso ou erro após o registro.
import attentiongreen from "../../images/uniongreen.png";
import attentionred from "../../images/unionred.png";
import close from "../../images/close__image.png";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="info_popup__container">
        <button
          type="button"
          className=" info_popup__close-button "
          onClick={onClose}
        >
          <img src={close} alt="fechar " onClick={onClose} />
        </button>
        <div
          className={`info_popup__icon ${
            isSuccess ? "info_popup__icon_success" : "info_popup__icon_fail"
          }`}
        ></div>
        <h2 className="info_popup__title">
          {isSuccess
            ? "Success! You have been registered."
            : "Ops, algo saiu deu errado! Por favor, tente novamente."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
