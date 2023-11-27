import React, { useState } from "react";
import { useRouter } from 'next/router';
import Cookies from "js-cookie";
import styles from '../styles/login.module.css'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalidCredentials, setInvalidCredentials] = useState(false)
    const router = useRouter()

    console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
  
    const handleSubmit = async(event: { preventDefault: () => void; }) => {
      event.preventDefault();
      
      //@ts-expect-error
      const data = new URLSearchParams(new FormData(event.target))

      let formUsername = "";
      let formPassword = "";

      if (username === "") {
        formUsername = data.get("username")!
      } else {
        formUsername = username
      }
      if (password === "") {
        formPassword = data.get("password")!
      } else {
        formPassword = password
      }

      try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/login`, {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  username: formUsername,
                  password: formPassword
              })
          })
          if(res.ok){
              const token = await res.json()
              Cookies.set('token', token, {expires: 1})
              router.push("/")
          }else if(res.status === 401){
              setInvalidCredentials(true)
          }
          
      } catch (error) {
          console.log(error)
      }
    };
  
    return (
        <div className={styles.loginContainer}>
          <h2>Login</h2>
          {invalidCredentials && <div className={styles.errorMessage}>Invalid Credentials</div>}
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username</label>
              <input 
                type="text" 
                id="username" 
                name="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      );
    };

  
  export default Login;