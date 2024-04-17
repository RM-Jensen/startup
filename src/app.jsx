import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';


export default function App() {
  return   (
<BrowserRouter>
  <div className='body bg-dark text-light'>
    <header className='container-fluid'>
        <nav className='navbar fixed-top navbar-dark'>
            <h1>21 To Go</h1>
            <menu className='navbar-nav'>
            <li className='nav-item'>
              <NavLink className='nav-link' to=''>Login</NavLink>
              </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='play'>Play</NavLink>
              </li>
            <li className='nav-item'>
              <NavLink className='nav-link' to='scores'>Scores</NavLink>
              </li>
            </menu>
        </nav>
        
    </header>
    
    <Routes>
      <Route path='/' element={<Login />} exact />
      <Route path='/play' element={<Play />} />
      <Route path='/scores' element={<Scores />} />
      <Route path='*' element={<NotFound />} />
    </Routes>

    <footer>
      <div className='container-fluid'>
          <span className="text-reset">Ryan Jensen</span>
          <a className='text-reset' href="https://github.com/RM-Jensen/startup">GitHub</a>
      </div>
    </footer>

  </div>
</BrowserRouter>)
}

//remember 'function' means 'react component'
function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}