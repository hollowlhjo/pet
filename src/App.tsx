import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import Home from './home';
import RegistrationPage from './registration';
import LoginPage from './login';
import Results from './results';
import MovieDetails from './MovieDetail';
import Favourites from './favourites';
import "./App.css"

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token')

    return (
      <Router>
        <div >
          <div className='header'>
          <ul>
            <li className='reg'>
                <Link to="/"><h3>Реєстрація</h3></Link>
            </li>
            <li className='home'>
                <Link to="/home"><h3>На головну</h3></Link>
            </li>
            <li className='favourites'>
                <Link to="/favourite"><h3>Улюблені</h3></Link>
            </li>
          </ul>
          </div>
        <Routes>
          <Route path="/home" element={isAuthenticated ? <Navigate to="/home"/> : <Navigate to="/"/>} Component={Home} />
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Navigate to="/" />} Component={RegistrationPage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/results" Component={Results} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
          <Route path='/favourite' Component={Favourites}/>
        </Routes>
        </div>
      </Router>
    );
  };
  
  export default App;