import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validationEmail } from "../../redux/action";

interface State {
  citys: [];
  cityDetail: {};
  statusFavorites: {};
  statusLogin: { status: boolean | undefined; token?: string };
  statusRegister: { status: boolean | undefined };
  loading: { status: boolean; component: string };
  generalError: string;
}

function ValidationEmail() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [validation, setValidation] = useState(false);
  const { loading } = useSelector((state: State) => state);

  useEffect(() => {
    !error && email ? setValidation(false) : setValidation(true);
  }, [email, error]);

  const handleValidationEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const regexEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const value = e.target.value;
    setEmail(value.trim());

    regexEmail.test(value.trim()) ? setError(false) : setError(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(validationEmail({email}))
    setEmail("")
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className="text-start fs-6 text-black-50">
          A link will be sent to your email to change the password
        </h3>
        <div className="row mt-3">
          <label htmlFor="changeP" className="col form-label">
            Email:
          </label>
          {error ? (
            <label
              htmlFor="changeP"
              className="col form-label text-danger fw-bold text-end"
            >
              Invalid Email
            </label>
          ) : null}
        </div>
        <input
          type="text"
          value={email}
          autoFocus
          name="email"
          className="form-control"
          onChange={handleValidationEmail}
        />
        <div className="mt-4 d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            name="validation"
            disabled={validation}
          >
            {loading.status && loading.component === "validationEmail" ? (
              <span className="spinner-border text-info" role="status"></span>
            ) : (
              "Send validation"
            )}
          </button>
        </div>
      </form>
    </>
  );
}

export default ValidationEmail;
