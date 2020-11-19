import React, { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import Logout from './components/Logout';

const LS = localStorage;
export default function App() {
  const [token, setToken] = useState(false);
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {

    if (LS.getItem('token-key')) {
      let prevToken = JSON.parse(LS.getItem('token-key'));
      //set new Token
      if (prevToken !== token && token) {
        LS.setItem('token-key', JSON.stringify(token))
        setToken(token)
        setAuth(true)
      }

      if (prevToken && !token) {
        //Clear token
        if (token === '') {
          LS.setItem('token-key', JSON.stringify(false))
          setToken('')
          setAuth(false)
        } else {
          setToken(prevToken)
          setAuth(true)
        }

      }

    } else {
      LS.setItem('token-key', JSON.stringify(token))
    }

  }, [token])

  return (
    <>
      { token ? <Logout setToken={setToken} /> : <Login setToken={setToken} />}
      { isAuth ? <HomePage /> : ''}
    </>
  );
}
