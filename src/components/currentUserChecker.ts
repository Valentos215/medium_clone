import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/currentUser";
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrentUserChecker = ({ children }) => {
  const { response, doFetch } = useFetch("/user");
  const [, dispatch] = useContext(CurrentUserContext);
  const [token] = useLocalStorage("token");

  useEffect(() => {
    if (!token) {
      dispatch({ type: "SET_UNAUTHORIZED" });
      return;
    }
    doFetch();
    dispatch({ type: "LOADING" });
  }, [token, doFetch, dispatch]);

  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({ type: "SET_AUTHORIZED", payload: response.user });
  }, [response, dispatch]);

  return children;
};

export default CurrentUserChecker;
