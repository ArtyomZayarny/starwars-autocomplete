import React, { useState } from 'react';
import HomePage from './pages/HomePage';


export default function App() {
  const [isAuth, setAuth] = useState(true)
  return (
    <>
      { isAuth ? <HomePage /> : ''}
    </>
  );
}
