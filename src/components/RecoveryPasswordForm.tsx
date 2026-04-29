import React, { useState } from 'react'
import { Button, Form, InputOnChangeData, Message } from 'semantic-ui-react'
import { resetCredendials } from '../services/authentication'
import { useNavigate, useLocation } from 'react-router-dom'

const RecoveryPasswordForm = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState<string>(location.state && (location.state as any).email ? (location.state as any).email : "")
    const [loading, setLoading] = useState<boolean>(false)
    const [message, setMessage] = useState(location.state && (location.state as any).message ? (location.state as any).message : undefined)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            await resetCredendials({
                email,
            })
            navigate("/login", {
                state: {
                    message: {
                        type: 'positive',
                        title: 'Pronto!',
                        text: `Senha reiniciada com sucesso! Verifique seu e-mail!`
                    },
                    email
                }
            })
        } catch (e) {
            setMessage({
                type: 'negative',
                title: 'Falha na reiniciando a senha!',
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
                    <Button primary fluid size='large' loading={loading}>
                        Reiniciar senha
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default RecoveryPasswordForm
