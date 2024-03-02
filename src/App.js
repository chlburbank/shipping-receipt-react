import LoginForm from './Components/LoginForm/LoginForm';
import ForgotPasswordPage from './Components/ForgotPasswordPage/ForgotPasswordPage';
import FormShipping from "./Components/FormShipping/FormShipping";

import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={LoginForm}/>
        <Route exact path="/FormShipping" Component={FormShipping}/>
        <Route path="*" Component={LoginForm}/>
        <Route path="/forgot-password" Component={ForgotPasswordPage}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
