import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // disable strict mode or else beautiful dnd fails
  // <React.StrictMode>
  <App />
  // </React.StrictMode> 
);
