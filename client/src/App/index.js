import React from 'react'
import AuthProvider from '../contexts/auth'
import Routes from '../routes'

const App = () => (
    <div className="app">
        <AuthProvider>
            <Routes />
        </AuthProvider>
    </div>
)

export default App