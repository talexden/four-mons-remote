import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/app'
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


// @ts-ignore
import('./eruda').then(({ default: eruda }) => {console.log(eruda)});