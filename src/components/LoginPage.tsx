
import React, { useState } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { Redirect, Switch, Route } from 'react-router'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import UpdatePasswordForm from './UpdatePasswordForm'
import { RootState } from '../reducers'
import RecoveryPasswordForm from './RecoveryPasswordForm'



const LoginPage = () => {
  const { token } = useSelector((state: RootState) => state.user)
  if (token) return <Redirect to="/" />
  return (
    <Grid textAlign='center' style={{ height: '100vh', backgroundColor: '#112d4e' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <h1 style={{ color: '#f9f7f7' }}>

          ProduLabs
            </h1>
        <Switch>
          <Route path="/login" exact>
            <LoginForm />
          </Route>
          <Route path="/login/trocarSenha" exact>
            <UpdatePasswordForm />
          </Route>
          <Route path="/login/esqueciMinhaSenha" exact>
            <RecoveryPasswordForm />
          </Route>
          
        </Switch>
      </Grid.Column>
    </Grid>
  )
}

export default LoginPage
