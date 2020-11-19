import React from 'react';
import { GoogleLogout } from 'react-google-login';

export default function Logout({ setToken }) {

    const logout = () => {
        setToken('')
    }
    return (
        <>
            <GoogleLogout
                clientId="958722558412-s7hqutfglj8iu7eqkfhkt9ae0d70g0kg.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
            >
            </GoogleLogout>
        </>
    )
}
