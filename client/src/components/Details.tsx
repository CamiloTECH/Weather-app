import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { changeGeneralError, getCityDetails } from "../redux/action";
import Swal from "sweetalert2"

interface State {
  citys: any;
  cityDetail: {};
  user: {};
  statusFavorites: {};
  statusLogin: {};
  loading: boolean;
  generalError: boolean;
}

function Details() {
  const { cityDetail, loading, generalError } = useSelector(
    (state: State) => state
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const lat = query.get("lat");
  const lon = query.get("lon");

  useEffect(() => {
    if (lat && lon) dispatch(getCityDetails(lat, lon));
    else navigate("/home");  
  }, []);

  useEffect(()=>{
    if (generalError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The city was not found! Check that the coordinates are correct",
      }).then(() => {
        dispatch(changeGeneralError(false))
        navigate("/home")
      });
    }
  },[generalError])
  console.log(cityDetail)
  return (
    <div>
      {loading ? (
        <span
          className="spinner-border text-warning p-0 mx-3"
          style={{ height: "50px", width: "50px" }}
          role="status"
        ></span>
      ) : null}
    </div>
  );
}

export default Details;
