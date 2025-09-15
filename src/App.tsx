import { useEffect, useState } from 'react';
import './App.css';
import AuthButtons from './AuthButtons';
import PrivateRoute from './PrivateRoute';
import TodoList from './TodoList';
import { authFetch, registerLoadingCallback } from './api';
import { LoadingOverlay } from './LoadingOverlay';
import { registerFCMToken, listenFCMMessages } from './firebase';
import { useAuth0 } from '@auth0/auth0-react';
import { NotificationCenter, type ToastItem } from './NotificationCenter';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(false); 
  const [toasts, setToasts] = useState<ToastItem[]>([]);

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
      //new Notification(title ?? '', { body });
        const id = uuidv4();
      setToasts((prev) => [{ id, title, body }, ...prev]);
    }
    });
  }, []);

    function handleCloseToast(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <NotificationCenter toasts={toasts} onClose={handleCloseToast} />
      <LoadingOverlay loading={loading} />
      <AuthButtons />
      <PrivateRoute>
        <TodoList />
      </PrivateRoute>
    </div>
  );
}

export default App;
