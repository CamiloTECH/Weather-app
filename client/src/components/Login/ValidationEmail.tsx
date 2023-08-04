import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { validationEmail } from "../../redux/actions";
import { regexEmail } from "./RegexValidation";

function ValidationEmail() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleValidationEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value.trim());
    setError(!regexEmail.test(value.trim()));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(validationEmail({ email })).finally(() => {
      setLoading(false);
      setEmail("");
    });
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
            disabled={error || !email}
          >
            {loading ? (
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
