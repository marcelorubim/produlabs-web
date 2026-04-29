import React, { useState } from 'react'
import { Button, Form, Segment, InputOnChangeData, Message } from 'semantic-ui-react'
import { updateCredentials } from '../services/authentication'
import { useLocation, useHistory } from 'react-router'
import MessageData from '../types/MessageData'

type State = {
    email: string
}

const UpdatePasswordForm = () => {
    const location = useLocation()
    const history = useHistory()
    const [email] = useState<string>(location.state ? (location.state as State).email : "")
    const [loading, setLoading] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmation, setConfirmation] = useState<string>("")
    const [message, setMessage] = useState<MessageData | null>({
        type: 'info',
        title: 'Senha Expirada',
        text: 'Você deve alterar sua senha antes de usar o sistema.'
    })
    const handleSubmit = async () => {
        setMessage(null)
        if (newPassword !== confirmation) {
            setMessage({
                type: 'negative',
                title: 'Senhas não conferem',
                text: 'Nova senha e confirmação devem ser iguais.'
            })
            return
        }
        setLoading(true)
        try {
            await updateCredentials({
                email,
                password,
                newPassword
            })
            history.push("/login",{
                message: {
                    type: 'positive',
                    title: 'Pronto!',
                    text: 'Senha alterada com sucesso!'
                },
                email
            })
        } catch (e) {
            if(e.response && e.response.status === 400){
                setMessage({
                    type: 'negative',
                    title: 'Nova senha inválida',
                    text: 'A senha deve ter no mínimo 8 caracteres.'
                })
            }else{
                setMessage({
                    type: 'negative',
                    title: 'Ops... algo deu errado!',
                    text: e.message
                })
            }
        }
        setLoading(false)

    }
    return (
        <div>
                {message &&
                    <Message floating info={message.type === 'info'} negative={message.type === 'negative'} warning={message.type === 'warning'}>
                        <Message.Header>{message.title}</Message.Header>
                        <p>{message.text}</p>
                    </Message>
                }


            <Form size='large' onSubmit={handleSubmit} className='attached'>
                <Segment stacked>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail'
                        value={email}
                        disabled
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Senha Atual'
                        type='password'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setPassword(data.value)}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Nova Senha'
                        type='password'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setNewPassword(data.value)}
                    />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Confirmação da Senha'
                        type='password'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => setConfirmation(data.value)}
                    />
                    <Button primary fluid size='large' loading={loading}>
                        Alterar Senha
              </Button>
                </Segment>
            </Form>
        </div>
    )
}
export default UpdatePasswordForm;