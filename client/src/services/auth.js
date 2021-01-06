import api from './api'

export async function signIn({ email, password }) {

    const response = await api.post('/auth/authenticate', { email, password })

    if (response.status === 200) {
        return response.data
    }

    const { status, data: { error = 'N/A' } } = response

    throw new Error(`[${ status }] ${ error }`)
}