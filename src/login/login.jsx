import React from 'react';
import {useState} from 'react';
import './login.css';


export function Login() {
    const [pass, setPass] = useState('');
    const [user, setUser] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newUser, setNewUser] = useState('');


    async function login() {
        localStorage.setItem("userName", user);
        await loginOrCreate(user, pass, `/api/auth/login`);
        window.location.href = "play.html";
    }
      
    async function register() {
        localStorage.setItem("userName", newUser);
        await loginOrCreate(newUser, newPass, `/api/auth/create`);
        window.location.href = "play.html";
    }
      
    async function loginOrCreate(userName, password, endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            credentials: 'include', // Don't forget to specify this if you need cookies
            body: JSON.stringify({ userName: userName, password: password }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
      
        if (response.ok) {
            localStorage.setItem('userName', userName);
        } /* else {
            const body = await response.json();
            const modalEl = document.querySelector('#msgModal');
            modalEl.querySelector('.modal-body').textContent = `⚠ Error: ${body.msg}`;
            const msgModal = new bootstrap.Modal(modalEl, {});
            msgModal.show();
        } */
   }

    return (
        <main className='container-fluid bg-secondary text-center'>
            <h1>Welcome</h1>
            <p>Login to play:</p>
            <div>
                <span id="loginUsername">
                <label for="username">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Your name here" 
                    onChange={(e) => setUser(e.target.value)}
                />
                </span>
                <span id="loginPwd" style={{marginLeft:'10px'}}>
                <label for="password">Password</label>
                <input 
                    type="text" 
                    id="password" 
                    placeholder="Your Password" 
                    onChange={(e) => setPass(e.target.value)}
                />
                </span>
                <button type="submit"  onclick="login()">Login</button>
            </div>
            <p>Or sign up:</p>
            <div>
                <label for="newUsername">Username</label>
                <input 
                    type="text" 
                    id="newUsername" 
                    placeholder="Your name here"
                    onChange={(e) => setNewUser(e.target.value)}
                />
                <label for="newPassword" style={{marginLeft:'10px'}}>Password</label>

                <input 
                    type="text" 
                    id="newPassword" 
                    placeholder="Your Password"
                    onChange={(e) => setNewPass(e.target.value)}
                />
                <button type="submit"  onclick="register()">Sign Up</button>
            </div>
        </main>
    );
}