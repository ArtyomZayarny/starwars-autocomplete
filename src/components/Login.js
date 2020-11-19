import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';

export default function Login({ setToken }) {
    const responseGoogle = (response) => {
        if (response.hasOwnProperty('accessToken')) {
            setToken(response.accessToken)
        }
    }

    return (
        <>
            <GoogleLogin
                clientId="958722558412-s7hqutfglj8iu7eqkfhkt9ae0d70g0kg.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </>
    )
}
