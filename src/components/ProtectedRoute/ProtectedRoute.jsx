// import React from "react";
// Este componente protegerá rotas que só devem ser acessadas por usuários autenticados.
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, loggedIn }) {
  return loggedIn ? element : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
