import "./Landing.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import getToken from "../../accessibility";
import { ChangePassword, Login, SignUp, ValidationEmail } from "../Login";

function Landing() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  useEffect(() => {
    if (getToken()) {
      navigate("/home");
    } else if (token && !changePassword) {
      setChangePassword(true);
    }
  }, []);

  const handleSignUp = (boolean: boolean) => {
    setSignUp(boolean);
    setForgotPassword(false);
  };

  return (
    <div className="container d-flex justify-content-center min-vh-100 align-items-center py-5 px-0">
      <div className="row shadow-lg rounded rounded-3 align-items-stretch contenido">
        <div className="col bg d-none d-lg-block rounded-start shadow-lg"></div>

        <div className="col bg-light p-5 rounded-end">
          <div className="text-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="currentColor"
              className="bi bi-brightness-high-fill text-warning logo"
              viewBox="0 0 16 16"
            >
              <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
            </svg>
          </div>
          <h2
            className={`fw-bold text-center pt-3 ${
              forgotPassword ? "mb-5" : "mb-2"
            }`}
          >
            Welcome
          </h2>
          {forgotPassword ? null : (
            <label
              htmlFor="register"
              className="col form-label text-secondary fs-5 text-center fw-bold mb-4"
            >
              Login or sign up so you can know the weather of the most
              incredible cities!
            </label>
          )}

          {changePassword && token ? (
            <ChangePassword token={token} />
          ) : forgotPassword ? (
            <ValidationEmail
              setForgotPassword={setForgotPassword}
              setSignUp={setSignUp}
            />
          ) : signUp ? (
            <SignUp setSignUp={setSignUp} />
          ) : (
            <Login />
          )}

          {!token && (
            <div className="mt-4">
              {forgotPassword ? (
                <>
                  <span>
                    You don`t have an account?
                    <button
                      onClick={() => handleSignUp(true)}
                      className="bg-transparent border-0 mb-3 text-primary text-decoration-underline"
                    >
                      Sign up
                    </button>
                  </span>
                  <br />
                  <span>
                    You have an account?{" "}
                    <button
                      onClick={() => handleSignUp(false)}
                      className="bg-transparent border-0 text-primary text-decoration-underline"
                    >
                      Login
                    </button>
                  </span>
                </>
              ) : !signUp ? (
                <span>
                  You don`t have an account?{" "}
                  <button
                    onClick={() => handleSignUp(true)}
                    className="bg-transparent border-0 mb-3 text-primary text-decoration-underline"
                  >
                    Sign up
                  </button>
                </span>
              ) : (
                <span>
                  You have an account?{" "}
                  <button
                    onClick={() => handleSignUp(false)}
                    className="bg-transparent border-0 text-primary text-decoration-underline"
                  >
                    Login
                  </button>
                </span>
              )}

              <br />
              {!signUp && !forgotPassword ? (
                <span>
                  Forgot your password?{" "}
                  <button
                    className="bg-transparent border-0 text-primary text-decoration-underline"
                    onClick={() => setForgotPassword(true)}
                  >
                    Recover password
                  </button>
                </span>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Landing;
