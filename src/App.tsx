import { useEffect, useState } from 'react';
import './App.css';
import AuthButtons from './AuthButtons';
import PrivateRoute from './PrivateRoute';
import TodoList from './TodoList';
import { authFetch, registerLoadingCallback } from './api';
import { LoadingOverlay } from './LoadingOverlay';
import { registerFCMToken, listenFCMMessages } from './firebase';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false);  

  useEffect(() => {
    registerLoadingCallback(setLoading);

    registerFCMToken(async (token) => {
      await authFetch(`${import.meta.env.VITE_API_URL}/register-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      },getAccessTokenSilently);
    });

    listenFCMMessages((payload) => {   
    if (payload.notification) {
      console.log('noti - App.ts ', payload)
      const { title, body } = payload.notification;
      new Notification(title ?? '', { body });
    }
    });
  }, []);

  return (
    <div>
      <LoadingOverlay loading={loading} />
      <AuthButtons />
      <PrivateRoute>
        <TodoList />
      </PrivateRoute>
    </div>
  );
}

export default App;
