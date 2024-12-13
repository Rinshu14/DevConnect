
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Store/Store.ts'
import './index.css'



createRoot(document.getElementById('root')!).render(

  <Provider store={store}>
    <App />
  </Provider>

)
