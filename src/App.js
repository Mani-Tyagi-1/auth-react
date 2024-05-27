import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';

import {BrowserRouter, Routes, Route} from 'react-router-dom';



function App() {
  return (
    <div className="bg-hero bg-no-repeat min-h-screen bg-cover bg-center bg-fixed ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
