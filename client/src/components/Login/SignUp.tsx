import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
  useState
} from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { singUp } from "../../redux/actions";
import { regexEmail, regexPass } from "./RegexValidation";

interface Props {
  setSignUp: Dispatch<SetStateAction<boolean>>;
}
const SignUp: FC<Props> = ({ setSignUp }) => {
  const dispatch = useDispatch();
  const [viewPassword, setViewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    userName: ""
  });
  const [error, setError] = useState({
    email: false,
    password: false,
    userName: false
  });

  const handleValidation = (e: ChangeEvent<HTMLInputElement>) => {
    let validation = false;
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });

    if (name === "userName") {
      validation = value.trim().length <= 4;
    } else if (name === "password") {
      validation = !regexPass.test(value);
    } else {
      validation = !regexEmail.test(value);
    }
    setError({ ...error, [name]: validation });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(singUp({ ...inputs, email: inputs.email.trim() }))
      .then(({ payload }) => {
        if (payload.status) {
          Swal.fire({
            icon: "success",
            title: "You registered successfully!",
            text: "Now, you can login!"
          }).then(() => setSignUp(false));
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops an error occurred!",
            text: "This email already exists, please put another email or login"
          });
        }
      })
      .finally(() => {
        setLoading(false);
        setInputs({ email: "", password: "", userName: "" });
      });
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
          placeholder="User name..."
          className="form-control"
          onChange={handleValidation}
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
          placeholder="Insert Email..."
          className="form-control"
          onChange={handleValidation}
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
            placeholder="Insert Password..."
            onChange={handleValidation}
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
          disabled={
            error.email ||
            error.password ||
            error.userName ||
            !inputs.email ||
            !inputs.password ||
            !inputs.userName
          }
        >
          {loading ? (
            <span className="spinner-border text-info" role="status"></span>
          ) : (
            "Sign Up"
          )}
        </button>
      </div>
    </form>
  );
};

export default SignUp;
