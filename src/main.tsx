import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SnackbarProvider } from 'notistack'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}>
      <App />
    </SnackbarProvider>
  </StrictMode>,
)
