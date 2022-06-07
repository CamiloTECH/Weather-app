import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singUp } from "../../redux/action"

interface State {
  citys: [];
  cityDetail: {};
  statusFavorites: {};
  statusLogin: { status: boolean | undefined; token?: string };
  statusRegister: { status: boolean | undefined };
  loading: { status: boolean; component: string };
  generalError: boolean;
}

function SignUp() {
  const dispatch = useDispatch()
  const [validation, setValidation] = useState(true);
  const [viewPassword, setViewPassword] = useState(false);
  const loading = useSelector((state: State) => state.loading);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
    userName: false,
  });

  useEffect(() => {
    if (
      !error.email &&
      !error.password &&
      !error.userName &&
      inputs.email &&
      inputs.password &&
      inputs.userName
    ) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  }, [error, inputs]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(singUp(inputs))
    setInputs({ email: "", password: "", userName: "" })
  };

  const handleValidationInputs = (e: ChangeEvent<HTMLInputElement>) => {
    const regexEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const value = e.target.value;
    const name = e.target.name;

    switch (name) {
      case "userName":
        setInputs({
          ...inputs,
          userName: value,
        });
        if (value.trim().length > 4) {
          setError({
            ...error,
            userName: false,
          });
        } else {
          setError({
            ...error,
            userName: true,
          });
        }
        break;
      case "password":
        const regexPass = /^(?=\w*[a-z])\S{5,15}$/;
        setInputs({
          ...inputs,
          password: value,
        });
        if (regexPass.test(value)) {
          setError({
            ...error,
            password: false,
          });
        } else {
          setError({
            ...error,
            password: true,
          });
        }
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
          <label htmlFor="userName" className="col form-label">
            UserName:
          </label>
          {error.userName ? (
            <label
              htmlFor="userName"
              className="col form-label text-danger fw-bold text-end"
            >
              Invalid UserName
            </label>
          ) : null}
        </div>
        <input
          type="text"
          value={inputs.userName}
          name="userName"
          autoFocus
          className="form-control"
          onChange={handleValidationInputs}
        />
      </div>

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
          className="form-control"
          onChange={handleValidationInputs}
        />
      </div>

      <div className="mb-2">
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
        <div className="row ms-0 gap-0">
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
        <label
          htmlFor="register"
          className="col form-label text-secondary fw-bold text-start"
        >
          The password must have a minimum of 5 characters and a maximum of 15
          characters and at least one lowercase.
        </label>
      </div>

      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary"
          name="SignUp"
          disabled={validation}
        >
          {loading.status && loading.component==="SignUp" ? (
            <span className="spinner-border text-info" role="status"></span>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
    </form>
  );
}

export default SignUp;
