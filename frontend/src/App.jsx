import React from 'react'
import AppRoutes from './Routes/AppRoutes'
import { UserProvider } from './context/userContext'
function App() {
  return (
    <UserProvider>
      <AppRoutes/> 
    </UserProvider>
    
  )
}

export default App