import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = "dev-vu1jkz4wuxvj1unq.us.auth0.com";
const clientId = "1XoBWYLS2zI4nEVjfoYi9LyBuu5kNOGp";

createRoot(document.getElementById('root')!).render(
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin, audience: "https://endreapija.san/" }}
    >
      <App />
    </Auth0Provider>
)
