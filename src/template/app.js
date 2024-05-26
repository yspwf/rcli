import React from 'react';
import { createRoot } from 'react-dom/client';

const root = document.getElementById('root');

// import './comon';
// import w1 from './images/w1.png';

const App = () => {
  return (
    <>
     app webpack work
     <br/>
     {/* <img src={w1} /> */}
    </>
  )
}

createRoot(root).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)