import { useEffect, useState } from 'react';
import './App.css'
import AuthButtons from './AuthButtons'
import PrivateRoute from './PrivateRoute';
import TodoList from './TodoList'
import { registerLoadingCallback } from './api';
import { LoadingOverlay } from './LoadingOverlay';

function App() {
  const [loading, setLoading] = useState(false);  

  useEffect(() => {
    registerLoadingCallback(setLoading);
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

export default App
