import { StrictMode } from 'react'
import { createRoot, BrowserRouter} from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/index'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
       <BrowserRouter>
        <App />
       </BrowserRouter>
    </Provider>
  </StrictMode>,
)
