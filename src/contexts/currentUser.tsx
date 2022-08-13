import React from "react";
import { createContext, useReducer } from "react";

type User = { username: string; bio: string; email: string };
type State = {
  isLoading: boolean;
  isLoggedIn?: boolean | null;
  currentUser: User | null;
};
enum ActionType {
  LOADING = "LOADING",
  SET_AUTHORIZED = "SET_AUTHORIZED",
  SET_UNAUTHORIZED = "SET_UNAUTHORIZED",
  LOGOUT = "LOGOUT",
}
type Action = { type: ActionType; payload: User };
const initialState: State = {
  isLoading: false,
  isLoggedIn: null,
  currentUser: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };

    case "SET_AUTHORIZED":
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        currentUser: action.payload,
      };

    case "SET_UNAUTHORIZED":
      return {
        ...state,
        isLoggedIn: false,
      };

    case "LOGOUT":
      return {
        ...initialState,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export const CurrentUserContext = createContext<any>({});

export const CurrentUserProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};

// export const CurrentUserContext = createContext([{}, () => {}])
// export const CurrentUserProvider = ({children}) => {
//   const [state, setState] = useState({
//     isLoading: false,
//     isLoggedIn: null,
//     currentUser: null
//   })
//   return (
//     <CurrentUserContext.Provider value={[state, setState]}>
//       {children}
//     </CurrentUserContext.Provider>
//   )
// }
