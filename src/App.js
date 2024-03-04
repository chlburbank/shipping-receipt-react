import LoginForm from './Components/LoginForm/LoginForm';
import AboutPage from './Components/AboutPage/AboutPage';
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
        <Route path="/about-us" Component={AboutPage}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
