import { ChangeEvent, SyntheticEvent, useState } from "react"

function SignUp() {
  const [loading, setLoading] = useState(false)
  const [validation, setValidation] = useState(false)
  const [viewPassword, setViewPassword] = useState(false)
  const [inputs, setInputs] = useState({ email:"", password:"", userName:"" })
  const [error, setError] = useState({ email:false, password:false, userName:false })

  const handleSubmit = (e:SyntheticEvent) => {};
  const handleValidationInputs=(e:ChangeEvent<HTMLInputElement>)=>{}

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <div className="row">
          <label htmlFor="userName" className="col form-label">
            UserName:
          </label>
          {error.userName 
            ? (
            <label htmlFor="userName" className="col form-label text-danger fw-bold text-end">
              Invalid UserName
            </label>
          ) : null
          }
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
          {error.email 
            ? (
            <label htmlFor="email" className="col form-label text-danger fw-bold text-end">
              Invalid Email
            </label>
          ) : null
          }
        </div>
        <input
          type="email"
          value={inputs.email}
          name="email"
          className="form-control"
          onChange={handleValidationInputs}
        />
      </div>

      <div className={error.password ? "mb-2" : "mb-4"}>
        <div className="row">
          <label htmlFor="password" className="col form-label">
            Password:
          </label>
          {error.password 
            ? (
            <label htmlFor="email" className="col form-label text-danger fw-bold text-end">
              Invalid Password
            </label>
          ) : null
          }
        </div>
        <div className="row ms-1 gap-2">
          <input
            type={viewPassword ? "text" : "password"}
            name="password"
            value={inputs.password}
            className="col form-control"
            onChange={handleValidationInputs}
          />
          {viewPassword 
            ? (
            <i
              className="col col-2 bi bi-eye-fill fs-2 p-0"
              style={{ cursor: "pointer" }}
              onClick={() => setViewPassword(!viewPassword)}
            ></i>
          ) : (
            <i
              className="col col-2 bi bi-eye-slash-fill fs-2 p-0"
              style={{ cursor: "pointer" }}
              onClick={() => setViewPassword(!viewPassword)}
            ></i>
          )}
        </div>
      </div>

      {error.password 
        ? (
        <div className="mb-2">
          <label
            htmlFor="register"
            className="col form-label text-danger fw-bold text-start"
          >
            The password must have a minimum of 5 characters and a maximum of 15
            characters and at least one lowercase.
          </label>
        </div>
      ) : null
      }

      <div className="mb-2">
        {error.userName
          ? <label htmlFor="register" className="col form-label text-danger fw-bold text-start fs-5">This email already exists, please put another email or login</label>
          : null
        }       
      </div>

      <div className="d-grid">
          <button type="submit" className="btn btn-primary" name="login" disabled={validation}>
            {loading 
              ? (<span className="spinner-border text-info" role="status"></span>) 
              : ("Login")
            }
          </button>
      </div>
    </form>
  );
}


export default SignUp;