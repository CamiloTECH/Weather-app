import "./SerchBar.css";

import { useEffect, useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import type {} from "redux-thunk/extend-redux";
import Swal from "sweetalert2";

import getToken from "../../accessibility";
import ReducerState from "../../models/ReduxTypes";
import { clearCityDetail, clearCitys, getCity } from "../../redux/actions";

function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const citys = useSelector((state: ReducerState) => state.citys);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/");
    }
  }, []);

  const logout = () => {
    dispatch(clearCitys());
    dispatch(clearCityDetail());
    navigate("/");
  };

  const handleSubmit = () => {
    const countryTrim = country.trim();
    if (countryTrim.length > 0) {
      const token = getToken();
      if (token) {
        if (window.location.pathname !== "/home") navigate("/home");

        setLoading(true);
        dispatch(getCity(countryTrim, token, false))
          .then(({ payload }) => {
            if (payload?.error) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid User"
              }).then(() => logout());
            } else if (payload.id) {
              const existCity = citys.find(({ id }) => {
                return payload.id === id;
              });
              if (existCity) {
                Swal.fire({
                  icon: "info",
                  title: "Oops...",
                  text: "This city already exists in the list!"
                }).then(() => setCountry(""));
              }
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "The city was not found! Check that the name is correct"
              });
            }
          })
          .finally(() => {
            setCountry("");
            setLoading(false);
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid User"
        }).then(() => logout());
      }
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-lg bg-black bg-opacity-75 py-2">
      <div className="container-fluid">
        <NavLink to={"/home"} className="nav-link active" aria-current="page">
          <div className="d-flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-brightness-high-fill text-warning logo"
              viewBox="0 0 16 16"
            >
              <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
            </svg>
            <h2 className="navbar-brand text-white fs-4">Weather app</h2>
          </div>
        </NavLink>

        <Button
          onClick={() => setExpanded(!expanded)}
          className="navbar-toggler bg-info"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-label="Toggle navigation"
          aria-expanded={expanded}
        >
          <span className="navbar-toggler-icon"></span>
        </Button>
        <Collapse in={expanded}>
          <div
            className="navbar-collapse text-center"
            id="example-collapse-text"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-4">
              <li className="nav-item hvr-underline-reveal">
                <NavLink
                  to={"/home"}
                  className="nav-link active fs-4 pt-0 text-light"
                  aria-current="page"
                >
                  Home
                </NavLink>
              </li>
            </ul>
            <div className="d-flex">
              <input
                className="form-control me-2 "
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={country}
                onChange={e => setCountry(e.target.value)}
              />
              <button
                className="btn btn-outline-info"
                disabled={loading || country.trim().length === 0}
                onClick={handleSubmit}
              >
                {loading ? (
                  <span
                    className="spinner-border text-warning p-0 mx-3"
                    style={{ height: "20px", width: "20px" }}
                    role="status"
                  ></span>
                ) : (
                  "Search"
                )}
              </button>
            </div>
            <button
              className="btn btn-info fw-bold ms-0 ms-lg-5 py-0 px-2 mt-3 mt-lg-0"
              title="Logout"
              onClick={logout}
            >
              <i className="bi bi-box-arrow-right fs-4 m"></i>
            </button>
          </div>
        </Collapse>
      </div>
    </nav>
  );
}

export default SearchBar;
