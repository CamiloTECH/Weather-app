import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/action";

interface State {
  citys: [];
  cityDetail: {};
  statusFavorites: {};
  statusLogin: { status: boolean | undefined; token?: string };
  statusRegister: { status: boolean | undefined };
  loading: { status: boolean; component: string };
  generalError: string;
}

function ChangePassword({token}:{token:string}) {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    password: false,
    confirmPassword: false,
  });
  const [validation, setValidation] = useState(false);
  const { loading } = useSelector((state: State) => state);

  useEffect(() => {
    if (
      !error.password &&
      !error.confirmPassword &&
      password &&
      password === confirmPassword
    ) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  }, [error]);

  const handleValidationPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const regexPass = /^(?=\w*[a-z])\S{5,15}$/;
    const value = e.target.value;
    const name = e.target.name;
    if (name === "password") {
      setPassword(value);
      setConfirmPassword("");
      regexPass.test(value)
        ? setError({ ...error, password: false })
        : setError({ ...error, password: true });
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      value === password
        ? setError({ ...error, confirmPassword: false })
        : setError({ ...error, confirmPassword: true });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(changePassword({password},token))
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <div className="row">
            <label htmlFor="changeP" className="col form-label">
              New Password:
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
              autoFocus
              value={password}
              className="col form-control"
              onChange={handleValidationPassword}
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

        <div className="row mt-4">
          <label htmlFor="confirmPassword" className="col form-label pe-0">
            Confirm your password:
          </label>
          {error.confirmPassword ? (
            <label
              htmlFor="confirmPassword"
              className="col form-label text-danger fw-bold text-end ps-0"
            >
              Don't match
            </label>
          ) : null}
        </div>
        <input
          type="password"
          value={confirmPassword}
          name="confirmPassword"
          className="form-control"
          onChange={handleValidationPassword}
        />

        <label
          htmlFor="register"
          className="col form-label text-black-50 fw-bold text-start mt-4"
        >
          The password must have a minimum of 5 characters and a maximum of 15
          characters and at least one lowercase.
        </label>

        <div className="mt-3 d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            name="validation"
            disabled={validation}
          >
            {loading.status && loading.component === "changePassword" ? (
              <span className="spinner-border text-info" role="status"></span>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default ChangePassword;
