import { useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { currentUser, handleUpdateAvatar } = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState(currentUser?.avatar);

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateAvatar({ avatar });
  };

  return (
    <form
      id="avatar-form"
      className="form form_edit-avatar"
      name="edit-avatar"
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          type="url"
          name="link"
          id="link-input"
          className="form__input form__input_el_link"
          placeholder="Link da imagem"
          required
          value={avatar}
          onChange={handleAvatarChange}
        />
        <button type="submit" className="form__button">
          Salvar
        </button>
      </fieldset>
    </form>
  );
}
