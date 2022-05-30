import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singIn } from "../../redux/action";

interface State {
  citys: [];
  cityDetail: {};
  user: {};
  statusFavorites: {};
  statusLogin: { status: boolean; token?: string };
  statusRegister: { status: boolean };
  loading: { status: boolean; component: string };
  generalError: boolean;
}

function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(true);
  const [viewPassword, setViewPassword] = useState(false);
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const statusLogin = useSelector((state: State) => state.statusLogin);
  const [error, setError] = useState({
    email: false,
    password: false,
    send: false,
  });

  useEffect(() => {
    if (!error.email && !error.password && inputs.email && inputs.password) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  }, [error, inputs]);

  useEffect(() => {
    if(statusLogin){
      console.log("bien")
    }
    else{
      console.log("mal")
    }
  }, [statusLogin]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(singIn(inputs));
    setLoading(true);
  };

  const handleValidationInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const regexEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const value = e.target.value;
    const name = e.target.name;

    switch (name) {
      case "password":
        setInputs({
          ...inputs,
          password: value,
        });
        break;
      case "email":
        setInputs({
          ...inputs,
          email: value.trim(),
        });

        if (regexEmail.test(value)) {
          setError({
            ...error,
            email: false,
          });
        } else {
          setError({
            ...error,
            email: true,
          });
        }
        break;
      default:
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="row">
          <label htmlFor="email" className="col form-label">
            Email:
          </label>
          {error.email ? (
            <label
              htmlFor="email"
              className="col form-label text-danger fw-bold text-end"
            >
              Invalid Email
            </label>
          ) : null}
        </div>
        <input
          type="email"
          value={inputs.email}
          name="email"
          autoFocus
          className="form-control"
          onChange={handleValidationInputs}
        />
      </div>

      <div className={error.password ? "mb-2" : "mb-4"}>
        <div className="row">
          <label htmlFor="password" className="col form-label">
            Password:
          </label>
          {error.password ? (
            <label
              htmlFor="email"
              className="col form-label text-danger fw-bold text-end"
            >
              Invalid Password
            </label>
          ) : null}
        </div>

        <div className="row ms-1 gap-0">
          <input
            type={viewPassword ? "text" : "password"}
            name="password"
            value={inputs.password}
            className="col form-control"
            onChange={handleValidationInputs}
          />
          {viewPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              className="bi bi-eye-fill col col-2 p-0"
              viewBox="0 0 16 16"
              style={{ cursor: "pointer" }}
              onClick={() => setViewPassword(!viewPassword)}
            >
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              className="bi bi-eye-slash-fill col col-2 p-0"
              viewBox="0 0 16 16"
              style={{ cursor: "pointer" }}
              onClick={() => setViewPassword(!viewPassword)}
            >
              <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
              <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
            </svg>
          )}
        </div>
      </div>

      <div className="mb-2">
        {error.send ? (
          <label
            htmlFor="login"
            className="col form-label text-danger fw-bold text-end fs-5"
          >
            Invalid email or password
          </label>
        ) : null}
      </div>

      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          name="login"
          disabled={validation}
        >
          {loading ? (
            <span className="spinner-border text-info" role="status"></span>
          ) : (
            "Login"
          )}
        </button>
      </div>
    </form>
  );
}

export default Login;
