import React from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'

function Home() {
    const { signed, signOut } = useAuth()

    function handleSignOut() {
        signOut()
    }

    if (!signed) {
        return (
            <Redirect to="/login" />
        )
    }

    return (
        <>
            <h1>You're already signed!</h1>
            <button onClick={ handleSignOut }>Logout</button>
        </>
    )
}

export default Home