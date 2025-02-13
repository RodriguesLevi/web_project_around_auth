// Este componente será responsável pelo registro de novos usuários.
import { useState } from "react";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
  };

  return (
    <form className="form__register" onSubmit={handleSubmit}>
      <h2 className="form__register-title">Register</h2>
      <input
        className="form__input-register"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="form__input-register"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="form__button-register" type="submit">
        Inscrever-se
      </button>
      <p className="form__button-message">
        Já é um membro?{" "}
        <a className="form__button-message-link" href="/login">
          Faça login aqui!
        </a>
      </p>
    </form>
  );
}

export default Register;
