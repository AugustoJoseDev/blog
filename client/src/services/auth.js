import { useContext } from 'react'
import api from './api'

export async function signIn({ email, password }) {

    const response = await api.post('/auth/authenticate', { email, password })

    if (response.status === 200) {
        return response.data
    }

    throw new Error(response.data.error)
}