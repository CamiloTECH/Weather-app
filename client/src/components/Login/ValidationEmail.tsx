import {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
  Dispatch,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function ValidationEmail({
  signIn,
  register,
}: {
  signIn: React.Dispatch<SetStateAction<boolean>>;
  register: React.Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState(false);
  const [errorSendEmail, setErrorSendEmail] = useState(false);

  useEffect(() => {
    if (!error && email) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  }, [email, error]);

  useEffect(() => {
    //return () => dispatch(clearPassword())
  }, []);

  // useEffect(() => {
  //   if (changePasswort.status) {
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: 'Check your email',
  //       showConfirmButton: false,
  //       timer: 2000
  //     })
  //     signIn(false)
  //     register(false)
  //     setLoading(false)
  //   }
  //   else if (changePasswort.status === false) {
  //     setErrorSendEmail(true)
  //     setLoading(false)
  //     setValidation(true)
  //     setEmail("")
  //   }
  // }, [changePasswort])


  const handleValidationEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const regexEmail =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const value = e.target.value;
    setEmail(value.trim());
    setErrorSendEmail(false);

    regexEmail.test(value.trim()) ? setError(false) : setError(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    //dispatch(forgottenPassword(email))
    setLoading(true);
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
        {errorSendEmail ? (
          <label
            htmlFor="sendEmail"
            className="col form-label text-danger fw-bold text-start mt-3"
          >
            This email does not exist, please enter another email or register.
          </label>
        ) : null}
        <div className={errorSendEmail ? "mt-2 d-grid" : "mt-4 d-grid"}>
          <button
            type="submit"
            className="btn btn-primary"
            name="validation"
            disabled={validation}
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
