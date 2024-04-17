import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return   (
<div className='body bg-dark text-light'>
  <header>
      <h1>21 To Go</h1>
      <nav>
          <menu>
          <li><a href="index.html">Login</a></li>
          <li><a href="play.html">Play</a></li>
          <li><a href="scores.html">Scores</a></li>
          </menu>
      </nav>
      <span id="nameDisplay">Super cool user</span>
  </header>

  <main>

  </main>
  <footer>
  <span class="text-reset">Ryan Jensen</span>
  <a href="https://github.com/RM-Jensen/startup">GitHub</a>
  </footer>
  <script src="play.js"></script>
</div>)
  
  
  <div className='body bg-dark text-light'>App will display here</div>;
}