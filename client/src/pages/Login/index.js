import React from 'react'
import { Redirect } from 'react-router-dom'
import Field from '../../components/Form/Field'
import { useAuth } from '../../contexts/auth'

function Login({ next = "/" }) {
    const { signed, signIn, signOut } = useAuth()

    function handleSignIn(e) {
        e.preventDefault()

        const email = document.querySelector("#idemail").value
        const password = document.querySelector("#idpassword").value
        signIn({ email, password })
    }

    if (signed) {
        return (
            <Redirect to={ next } />
        )
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={ handleSignIn } id="form-login">
                <Field name="email" type="email" />
                <Field name="password" type="password" />
                <input type="submit" value="Login" />
            </form>
        </>
    )

}

export default Login