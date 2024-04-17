import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return   (
<div className='body bg-dark text-light'>
  <header className='container-fluid'>
      <nav className='navbar fixed-top navbar-dark'>
            <h1>21 To Go</h1>
          <menu className='navbar-nav'>
          <li className='nav-item'>
            <a className='nav-link' href="index.html">Login</a>
            </li>
          <li className='nav-item'>
            <a className='nav-link' href="play.html">Play</a>
            </li>
          <li className='nav-item'>
            <a className='nav-link' href="scores.html">Scores</a>
            </li>
          </menu>
      </nav>
      
  </header>

  <main>App components go here</main>


  <footer>
    <div className='container-fluid'>
        <span className="text-reset">Ryan Jensen</span>
        <a className='text-reset' href="https://github.com/RM-Jensen/startup">GitHub</a>
    </div>
  </footer>

</div>)
  
  
}