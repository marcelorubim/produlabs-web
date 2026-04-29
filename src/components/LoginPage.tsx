import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import UpdatePasswordForm from './UpdatePasswordForm'
import { RootState } from '../reducers'
import RecoveryPasswordForm from './RecoveryPasswordForm'

const LoginPage = () => {
    const { token } = useSelector((state: RootState) => state.user)
    if (token) return <Navigate to="/" replace />
    return (
        <Grid textAlign='center' style={{ height: '100vh', backgroundColor: '#112d4e' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <h1 style={{ color: '#f9f7f7' }}>
                    ProduLabs
                </h1>
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/trocarSenha" element={<UpdatePasswordForm />} />
                    <Route path="/esqueciMinhaSenha" element={<RecoveryPasswordForm />} />
                </Routes>
            </Grid.Column>
        </Grid>
    )
}

export default LoginPage
