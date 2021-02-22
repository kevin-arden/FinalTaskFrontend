import { createContext, useReducer } from "react";
export const AppContext = createContext();

const initialState = {
  isLogin: false,
  isAdmin: false,
  userLogin: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        isLogin: true,

        userLogin: {
          id: action.payload.id,
          email: action.payload.email,
          name: action.payload.fullName,
          bookOwned: action.payload.bookOwned,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        isLogin: false,
        isAdmin: false,
        userLogin: {},
      };
    case "LOGIN_ADMIN":
      return {
        ...state,
        isLogin: true,
        isAdmin: true,
      };
    default:
      throw new Error();
  }
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
