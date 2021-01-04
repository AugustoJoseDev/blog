import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../services/api'
import * as auth from '../services/auth'

const AuthContext = createContext({ signed: false })

export default function AuthProvider({ children }) {
    const { user, setUser } = useState(null)

    useEffect(() => {
        const storageToken = localStorage.getItem('token', token)
        const storageUser = localStorage.getItem('user', JSON.stringify(user))

        if (storageToken && storageUser) {
            api.defaults.headers.Authorization = `Bearer ${ storageToken }`
            setUser(JSON.parse(storageUser))
        }

    }, [])

    async function signIn({ email, password }) {
        try {

            const { user, token } = await auth.signIn({ email, password })

            api.defaults.headers.Authorization = `Bearer ${ token }`
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUser(user)
        } catch (error) {
            console.error(error)
        }
    }

    function signOut() {
        api.defaults.headers.Authorization = undefined
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
    }

    return (
        <AuthContext.Provider value={ { signed: !!user, user, signIn, signOut } }>
            {children }
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}