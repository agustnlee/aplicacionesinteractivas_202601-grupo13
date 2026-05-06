import { StrictMode } from 'react'
import { createRoot} from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import { ToastProvider } from './context/ToastContext'
import { store } from './store/index'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
       <BrowserRouter>
        <ToastProvider>
         <App />
        </ToastProvider>
       </BrowserRouter>
    </Provider>
  </StrictMode>,
)
