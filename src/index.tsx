
import './index.css';    
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'; 
import Router from './context/RouterProvider';
import { ThemeProvider } from './context/ThemeContext'; 
import { AppProvider } from './context/ContextProvider';
import reportWebVitals from './reportWebVitals';   

import { ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <AppProvider>  
      <ThemeProvider>
        <RouterProvider router={Router} /> 
        <ToastContainer />
      </ThemeProvider> 
  </AppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
