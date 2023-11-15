import { useContext, createContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuth: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuth: true };
    case "logout":
      return { ...state, user: null, isAuth: false };
    default:
      throw new Error("Unkown action");
  }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      console.log("Wrong email or password");
    }
  }

  function logout() {
    dispatch({ type: "logout" });
    // console.log(user.name, "logged out");
  }

  const providerValue = {
    user,
    isAuth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("ERROR: Context was used outside Provider");
  return context;
}

export { AuthProvider, useAuthContext };
