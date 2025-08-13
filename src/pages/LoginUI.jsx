import React from 'react'
import { LoginForm } from '../components/login/LoginForm'

const LoginUI = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
            <div className="w-full max-w-md">

                <LoginForm />
            </div>
        </div>
    )
}

export default LoginUI