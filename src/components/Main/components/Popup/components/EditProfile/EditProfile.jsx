import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext.js";

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext); // Obtém o objeto de usuário atual

  const [name, setName] = useState(currentUser?.name); // Adicione variável de estado para nome
  const [description, setDescription] = useState(currentUser?.about); // Adicione variável de estado para descrição

  const handleNameChange = (event) => {
    setName(event.target.value); // Atualiza o nome (name) quando a entrada for alterada
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Atualiza a descrição (description) quando a entrada for alterada
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Impede o comportamento padrão de envio do formulário

    handleUpdateUser({ name, about: description }); // Atualiza as informações do usuário
  };

  return (
    <form id="user-form" className="form" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <div className="form__display">
          <input
            type="text"
            className="form__input form__input-name"
            id="name"
            name="name"
            placeholder="Nome"
            minLength="2"
            maxLength="40"
            required
            onChange={handleNameChange}
            value={name}
          />
          <p className="error-message"></p>
        </div>
        <div className="form__display">
          <input
            type="text"
            className="form__input form__input-description"
            id="description"
            name="description"
            placeholder="Sobre mim"
            minLength="2"
            maxLength="200"
            required
            onChange={handleDescriptionChange}
            value={description}
          />
          <p className="error-message"></p>
        </div>
        <button id="button-save" className="form__button" type="submit">
          Salvar
        </button>
      </fieldset>
    </form>
  );
}
