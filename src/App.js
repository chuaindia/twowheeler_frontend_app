import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchTwowheelers } from './redux/twowheelers/twowheelers';
import './App.css';
import Nav from './modules/Nav';
import Home from './modules/Home';
import Error404 from './modules/Error404';
import Login from './modules/user-sessions/login';
import Signup from './modules/user-sessions/signup';
import AddTwowheeler from './modules/user-actions/AddTwowheeler';
import DeleteTwowheeler from './modules/user-actions/DeleteTwowheeler';
import SingleTwowheeler from './modules/SingleTwowheeler';
import Reserve from './modules/Reserve';
import { userSession } from './redux/user/session-redux';
import Reservations from './modules/Reservations';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTwowheelers());
    if (localStorage.getItem('user')) {
      const username = localStorage.getItem('user');
      dispatch(userSession({ username }, 'login'));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/add_twowheeler" element={<AddTwowheeler />} />
        <Route path="/delete_twowheeler" element={<DeleteTwowheeler />} />
        <Route path="/twowheeler/:id" element={<SingleTwowheeler />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
