import "../Css/Landing.css";
import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  SyntheticEvent,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ValidationEmail from "./Login/ValidationEmail";
import LoginGoogle from "./LoginGoogle";
import SignUp from "./Login/SignUp";
import Login from "./Login/Login";

function Landing() {
  //const { registerUser, loginUser, role } = useSelector(store => store)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [validation, setValidation] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState({
    login: false,
    register: false,
  });
  const [SigInUp, setSignInUp] = useState({
    login: false,
    register: false,
    forgotPass: false,
  });
  const [state, setState] = useState({
    email: "",
    password: "",
    user: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
    user: false,
  });

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
    if (signUp) {
      if (
        !error.email &&
        !error.password &&
        !error.user &&
        state.email &&
        state.password &&
        state.user
      ) {
        setValidation(false);
      } else {
        setValidation(true);
      }
    } else {
      if (!error.email && !error.password && state.email && state.password) {
        setValidation(false);
      } else {
        setValidation(true);
      }
    }

    //return () => dispatch(clearUser())
  }, [error, state]);

  // useEffect(() => {
  //   if (window.localStorage.getItem("token")) {
  //     const token = window.localStorage.getItem("token")
  //     dispatch(roleUser(token))
  //     if (role.admin) {
  //       navigate("/home/admin/dashboard")
  //     }
  //     else if (role.admin === false) {
  //       navigate("/home")
  //     }
  //   }
  //   else {
  //     if (loginUser.error) {
  //       setSignInUp({
  //         ...SigInUp,
  //         login: true
  //       })
  //       setLoading({
  //         ...loading,
  //         login: false
  //       })
  //       setValidation(true)
  //     }
  //     else if (loginUser.token) {
  //       window.localStorage.setItem("token", loginUser.token)
  //       setLoading({
  //         ...loading,
  //         login: false
  //       })
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'success',
  //         title: 'Successfully logged-in',
  //         showConfirmButton: false,
  //         timer: 1200
  //       })
  //       if (loginUser.admin) {
  //         navigate("/home/admin/dashboard")
  //       }
  //       else {
  //         navigate("/home")
  //       }
  //     }
  //     else if (registerUser.status) {
  //       setLoading({
  //         ...loading,
  //         register: false
  //       })
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'success',
  //         title: 'You have successfully registered Now Login',
  //         showConfirmButton: false,
  //         timer: 1800
  //       })
  //       handleSignUp()
  //     }
  //     else if (registerUser.status === false) {
  //       setLoading({
  //         ...loading,
  //         register: false
  //       })
  //       setSignInUp({
  //         ...SigInUp,
  //         register: true
  //       })
  //       setState({
  //         email: "",
  //         password: "",
  //         user: ""
  //       })
  //     }
  //   }
  // }, [registerUser, loginUser, role])

  const handleSignUp = () => {
    signUp ? setSignUp(false) : setSignUp(true);
    setViewPassword(false);
    setForgotPassword(false)
    setState({
      email: "",
      password: "",
      user: "",
    });
    setError({
      email: false,
      password: false,
      user: false,
    });
    setSignInUp({
      ...SigInUp,
      login: false,
      register: false,
    });
    setValidation(true);
  };

  const handleValidationInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const regexEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const value = e.target.value;
    const name = e.target.name;

    switch (name) {
      case "user":
        setState({
          ...state,
          [name]: value,
        });
        if (value.trim().length > 4) {
          setError({
            ...error,
            [name]: false,
          });
        } else {
          setError({
            ...error,
            [name]: true,
          });
        }
        break;
      case "password":
        const regexPass = /^(?=\w*[a-z])\S{5,15}$/;
        setState({
          ...state,
          [name]: value,
        });
        setSignInUp({
          ...SigInUp,
          login: false,
          register: false,
        });
        if (signUp) {
          if (regexPass.test(value)) {
            setError({
              ...error,
              [name]: false,
            });
          } else {
            setError({
              ...error,
              [name]: true,
            });
          }
        }
        break;

      case "email":
        setState({
          ...state,
          [name]: value.trim(),
        });
        setSignInUp({
          ...SigInUp,
          login: false,
          register: false,
        });

        if (regexEmail.test(value.trim())) {
          setError({
            ...error,
            [name]: false,
          });
        } else {
          setError({
            ...error,
            [name]: true,
          });
        }
        break;
      default:
        break;
    }
  };

  const hanldeSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (e.currentTarget.id === "login") {
      // dispatch(loginUsers({
      //   email: state.email,
      //   password: state.password,
      // }))
      setLoading({
        ...loading,
        login: true,
      });
    } else if (e.currentTarget.id === "signUp") {
      // dispatch(registerUsers({
      //   email: state.email,
      //   password: state.password,
      //   userName: state.user.trim()
      // }))
      setLoading({
        ...loading,
        register: true,
      });
    }
  };

  return (
    <div className="container d-flex justify-content-center" style={{ marginTop: "7rem", marginBottom: "3rem" }}>
      <div className="row shadow-lg rounded rounded-3 align-items-stretch contenido">
        <div className="col bg d-none d-lg-block rounded-start shadow-lg"></div>

        <div className="col bg-light p-5 rounded-end">
          <div className="text-end">
            <img src="" alt="logo" width="50" />
          </div>
          <h2 className="fw-bold text-center pt-3 mb-5">Welcome</h2>

          {forgotPassword ? (
            <ValidationEmail signIn={setForgotPassword} register={setSignUp} />
          ) : signUp 
              ? ( <SignUp /> ) 
              : ( <Login /> )
          }

          <div className="mt-4">
            {!signUp 
              ? (
              <span>
                You don't have an account?{" "}
                <button onClick={handleSignUp} className="bg-transparent border-0 mb-3 text-primary text-decoration-underline">
                  Sign up
                </button>
              </span>
                ) 
              : (
              <span>
                You have an account?{" "}
                <button onClick={handleSignUp} className="bg-transparent border-0 text-primary text-decoration-underline">
                  Login
                </button>
              </span>
            )}

            <br />
            {!signUp && !forgotPassword ? (
              <span>
                Forgot your password?{" "}
                <button className="bg-transparent border-0 text-primary text-decoration-underline" onClick={() => setForgotPassword(true)}>
                  Recover password
                </button>
              </span>
            ) : null}
          </div>

          <LoginGoogle />
        </div>
      </div>
    </div>
  );
}

export default Landing;
