import { useAuth0 } from "@auth0/auth0-react";

export default function AuthButtons() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()} className="btn btn-primary">
          Login
        </button>
      ) : (
        <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin} })} className="btn btn-secondary">
          Logout
        </button>
      )}
    </div>
  );
}
