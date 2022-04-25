import "../Css/Landing.css"

function Landing() {
  return (
    <div
      className="container d-flex justify-content-center"
      style={{ marginTop: "4rem", marginBottom: "3rem" }}
    >
      <div className="row shadow-lg rounded rounded-3 align-items-stretch contenido">
        <div className="col bg d-none d-lg-block rounded-start shadow-lg"></div>
        <div className="col bg-light p-5 rounded-end">
          <div className="text-end">
            <img
              src=""
              alt="logo"
              width="50"
            />
          </div>
          <h2 className="fw-bold text-center pt-3 mb-5">Welcome</h2>

          <form>
            <div className="mb-4">
              <div className="row">
                <label htmlFor="user" className="col form-label">
                  User name:
                </label>
              </div>
              <input
                type="text"
                autoFocus
                name="user"
                className="form-control"
              />
            </div>
            <div className="mb-4">
              <div className="row">
                <label htmlFor="email" className="col form-label">
                  Email:
                </label>
              </div>
              <input
                type="email"
                name="email"
                autoFocus
                className="form-control"
              />
            </div>
            <div className="mb-4">
              <div className="row">
                <label htmlFor="password" className="col form-label">
                  Password:
                </label>
              </div>
              <input type="password" name="password" className="form-control" />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                name="login" 
              >Login</button>
            </div>
            <div className="mt-4">
              <span>
                You don't have an account?{" "}
                <button className="bg-transparent border-0 mb-3 text-primary text-decoration-underline">
                  Sign up
                </button>
              </span>
              <br />
              <span>
                Forgot your password?{" "}
                <button className="bg-transparent border-0 text-primary text-decoration-underline">
                  Recover password
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Landing;
