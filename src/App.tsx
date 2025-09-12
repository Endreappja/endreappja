import './App.css'
import AuthButtons from './AuthButtons'
import PrivateRoute from './PrivateRoute';
import TodoList from './TodoList'

function App() {

  return (
    <div>
      <AuthButtons />
      <PrivateRoute>
        <TodoList />
      </PrivateRoute>
    </div>
  );
}

export default App
