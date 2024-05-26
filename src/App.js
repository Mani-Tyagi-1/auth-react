import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';

import {BrowserRouter, Routes, Route} from 'react-router-dom';



function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
