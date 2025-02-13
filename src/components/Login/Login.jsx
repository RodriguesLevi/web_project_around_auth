import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form className="form__login" onSubmit={handleSubmit}>
      <h2 className="form__login-title">Login</h2>
      <input
        className=" form__input-login"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className=" form__input-login"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="form__button-login " type="submit">
        Entrar
      </button>
      <p className="form__button-message">
        Ainda não é membro?{" "}
        <a className="form__button-message-link" href="/register">
          Inscreva-se aqui!
        </a>
      </p>
    </form>
  );
}

export default Login;
