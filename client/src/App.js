import './App.css';
import socketIO from 'socket.io-client';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Main from './component/Main';
import Home from './component/Home';

const socket = socketIO.connect("http://localhost:4000");

function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/app' element={<Main socket={socket} />} />
            </Routes>
    </BrowserRouter>
  );
}

export default App;
