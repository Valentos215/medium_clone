import { useEffect, useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import { CurrentUserContext } from "../../contexts/currentUser";
import BackendErrorMessages from "../../components/BackendErrorMessages";

const Authentication = (props) => {
  const isLogin = props.match.path === "/login";
  const pageTitle = isLogin ? "Sign in" : "Sign Up";
  const descriptionLink = isLogin ? "/register" : "/login";
  const descriptionText = isLogin ? "Need an account?" : "Have an account?";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const apiUrl = isLogin ? "users/login" : "/users";
  const { isLoading, response, error, doFetch } = useFetch(apiUrl);
  const [, setToken] = useLocalStorage("token");
  const [, dispatch] = useContext(CurrentUserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = isLogin ? { email, password } : { email, password, username };
    doFetch({
      method: "post",
      data: {
        user,
      },
    });
  };

  useEffect(() => {
    if (!response) return;
    setToken(response.user.token);
    setIsSuccessfullSubmit(true);
    dispatch({ type: "SET_AUTHORIZED", payload: response.user });
  }, [response, setToken, dispatch]);

  if (isSuccessfullSubmit) return <Redirect to="/" />;
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">{pageTitle}</h1>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            <form onSubmit={handleSubmit}>
              {error && <BackendErrorMessages backendErrors={error.errors} />}
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="form-control form-control-lg"
                      placeholder="Username"
                    />
                  </fieldset>
                )}
                <fieldset className="form-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control form-control-lg"
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(String(e.target.value))}
                    className="form-control form-control-lg"
                    placeholder="Password"
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
