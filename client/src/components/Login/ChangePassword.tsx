import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { changePassword } from "../../redux/actions";
import { regexPass } from "./RegexValidation";

function ChangePassword({ token }: { token: string }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    password: false,
    confirmPassword: false
  });

  const handleValidationPassword = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === "password") {
      setPassword(value);
      setConfirmPassword("");
      setError({ ...error, password: !regexPass.test(value) });
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
      setError({ ...error, confirmPassword: !(value === password) });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(changePassword(password, token))
      .then(({ payload }) => {
        if (payload.status) {
          Swal.fire({
            icon: "success",
            title: "Password changed successfully!",
            text: "Now you can login successfully"
          }).then(() => navigate("/"));
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops an error occurred!",
            text: "An error occurred in the shipment"
          }).then(() => navigate("/"));
        }
      })
      .finally(() => {
        setLoading(false);
        setPassword("");
        setConfirmPassword("");
      });
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
              Don`t match
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
            disabled={
              error.password ||
              error.confirmPassword ||
              !password ||
              !confirmPassword
            }
          >
            {loading ? (
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
