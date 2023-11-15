import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/FakeAuthContext";

function ProtectedRoute({ children }) {
  const { isAuth } = useAuthContext();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuth) navigate("/");
    },
    [isAuth, navigate]
  );

  // console.log("isAuth: ", isAuth);
  return isAuth ? children : null;
}

export default ProtectedRoute;
