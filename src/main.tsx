import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import App from './App.tsx';

createRoot(document.getElementById('root') ?? document.body).render(
    <StrictMode>
        <App />
    </StrictMode>
);
