import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { singInGoogle } from "../../redux/action";

function LoginGoogle() {
  const dispatch = useDispatch();

  const onSuccess = (response: any): void => {
    dispatch(
      singInGoogle({
        email: response.profileObj.email,
        userName: response.profileObj.name,
      })
    );
  };

  const onFailure = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "We couldn't login!",
    });
  };

  return (
    <div className="mt-4">
      <GoogleLogin
        clientId="931352466233-7mhmtsa47dv0p2bpi59fsaakomg8fng0.apps.googleusercontent.com"
        disabled={false}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        theme={"dark"}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default LoginGoogle;
