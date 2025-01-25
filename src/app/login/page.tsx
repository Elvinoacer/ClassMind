import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

function Login() {
  return (
    <div className="body-login">
      <div className="wrapper">
        <div>
          <h1>Login</h1>
          <p className="text-center">You have been logged out</p>
          <button className="btn">
            <LoginLink
              style={{ display: "block" }}
              className="w-full flex items-center justify-center "
              postLoginRedirectURL="/dash"
            >
              Login
            </LoginLink>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
