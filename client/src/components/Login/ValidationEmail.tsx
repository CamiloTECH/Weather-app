import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState
} from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { validationEmail } from "../../redux/actions";
import { regexEmail } from "./RegexValidation";

interface Props {
  setForgotPassword: Dispatch<SetStateAction<boolean>>;
  setSignUp: Dispatch<SetStateAction<boolean>>;
}

const ValidationEmail: FC<Props> = ({ setForgotPassword, setSignUp }) => {
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
    dispatch(validationEmail({ email }))
      .then(({ payload }) => {
        if (payload.status) {
          Swal.fire({
            icon: "success",
            title: "The mail was sent!",
            text: "Please check your e-mail"
          }).then(() => {
            setForgotPassword(false);
            setSignUp(false);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops an error occurred!",
            text: "This email doesn't exist, please enter another email or register"
          });
        }
      })
      .finally(() => {
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
};

export default ValidationEmail;
