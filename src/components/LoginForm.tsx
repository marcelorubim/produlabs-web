import React, { useState } from 'react'
import { Button, Form, InputOnChangeData, Message } from 'semantic-ui-react'
import { authenticate } from '../services/authentication'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../actions/users'

const LoginForm = () => {
    const dispatch = useDispatch<any>()
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState<string>(location.state && (location.state as any).email ? (location.state as any).email : "")
    const [loading, setLoading] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [message, setMessage] = useState(location.state && (location.state as any).message ? (location.state as any).message : undefined)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await authenticate({
                email,
                password
            })
            if (response.shouldUpdatePassword) {
                navigate('/login/trocarSenha', { state: { email } })
            } else {
                dispatch(setCurrentUser(response.user, response.token))
            }
        } catch (e) {
            setMessage({
                type: 'negative',
                title: 'Falha na autenticação!',
                text: (e as any).message
            })
        }
        setLoading(false)
    }
    return (
        <div>
            {message &&
                <Message floating positive={message.type === 'positive'} info={message.type === 'info'} negative={message.type === 'negative'} warning={message.type === 'warning'}>
                    <Message.Header>{message.title}</Message.Header>
                    <p>{message.text}</p>
                </Message>
            }
            <Form size='large' onSubmit={handleSubmit} className='attached'>
                <div>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail'
                        value={email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setEmail(data.value)}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Senha'
                        type='password'
                        value={password}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setPassword(data.value)}
                    />
                    <Button primary fluid size='large' loading={loading}>
                        Entrar
                    </Button>
                    <br />
                    <Link to='/login/esqueciMinhaSenha'>
                        Esqueci minha senha
                    </Link>
                </div>
            </Form>
        </div>
    )
}

export default LoginForm
