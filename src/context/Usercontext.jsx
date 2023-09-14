import axios from "axios";
import { createContext, useContext, useReducer } from "react";

const userContext = createContext();
const initialState = {
  signup: true,
  username: "",
  isAuthenticated: false,
  menu: [],
};
function reducer(state, action) {
  switch (action.type) {
    case "user/created":
      return {
        ...state,
        signup: false,
      };
    case "user/logged":
      return {
        ...state,
        username: action.payload,
        isAuthenticated: true,
      };
    case "user/logout":
      return {
        ...state,
        isAuthenticated: false,
      };
    case "menu/loading":
      return {
        ...state,
        menu: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}
function UserProvider({ children }) {
  const [{ signup, username, isAuthenticated, menu }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function createdUser() {
    dispatch({ type: "user/created" });
  }
  function loggedUser(name) {
    dispatch({ type: "user/logged", payload: name });
  }
  function logout() {
    dispatch({ type: "user/logout" });
  }
  async function getmenuCard() {
    const res = await axios.get('https://food-explorer-back-end-jz2q.onrender.com/menu');
    dispatch({ type: "menu/loading", payload: res.data.data });
  }
  return (
    <userContext.Provider
      value={{
        createdUser,
        signup,
        loggedUser,
        isAuthenticated,
        username,
        logout,
        menu,
        getmenuCard
      }}
    >
      {children}
    </userContext.Provider>
  );
}

function useUser() {
  const context = useContext(userContext);
  return context;
}

export { UserProvider, useUser };
