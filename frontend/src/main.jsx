import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from "./AuthProvider/AuthContext.jsx"
createRoot(document.getElementById('root')).render(
  
   <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
   </AuthProvider>
)
/* import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) */