import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevents unintended background data fetching 
      refetchOnWindowFocus: false, 
    },
  },
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
<QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
