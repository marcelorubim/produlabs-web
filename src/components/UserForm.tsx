import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../reducers'
import User from '../types/User'
import { Form, Button, Select, InputOnChangeData, DropdownProps, Message } from 'semantic-ui-react'
import UserProfile from '../types/UserProfile'
import { addUser } from '../services/users'
import { getUsers } from '../actions/users'
import MessageData from '../types/MessageData'

const UserForm = () => {
    const reEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const reTelephone = /^([0-9]){8,11}$/
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { users } = useSelector((state: RootState) => state.user)
    const usersMap = users.reduce<any>((acc, curr) => ({ ...acc, [curr.id]: curr }), {})
    const { laboratories } = useSelector((state: RootState) => state.laboratories)
    const { id } = useParams<{ id: string }>()
    const [user, setUser] = useState<User>(id && usersMap[id] ? usersMap[id] : {
        email: "",
        fullName: "",
        telephone: "",
        userLaboratories: []
    })
    const [message, setMessage] = useState<MessageData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const goBack = () => navigate(-1)
    const saveUser = () => {
        setMessage(null)
        if (!reEmail.test(user.email)) {
            setMessage({
                type: "negative",
                title: "Dados incorretos",
                text: "Informe um e-mail válido"
            })
            return
        }
        if (!user.id && users.filter(u => u.email === user.email).length > 0) {
            setMessage({
                type: "negative",
                title: "Dados incorretos",
                text: `Já existe um usuário cadastrado com o e-mail ${user.email}`
            })
            return
        }
        if (!user.fullName && user.fullName.length < 3) {
            setMessage({
                type: "negative",
                title: "Dados incorretos",
                text: "Informe um nome válido"
            })
            return
        }
        if (!reTelephone.test(user.telephone)) {
            setMessage({
                type: "negative",
                title: "Dados incorretos",
                text: "Informe um telefone válido"
            })
            return
        }
        if (!user.userProfile) {
            setMessage({
                type: "negative",
                title: "Dados incorretos",
                text: "Selecione o perfil do usuário"
            })
            return
        }
        if (user.userProfile === UserProfile.ADMIN) {
            user.userLaboratories = []
        } else {
            if (user.userLaboratories.length === 0) {
                setMessage({
                    type: "negative",
                    title: "Dados incorretos",
                    text: "Selecione o laboratório vinculado ao usuário"
                })
                return
            }
        }
        setLoading(true)
        addUser(user).then(r => {
            dispatch(getUsers())
            setMessage({
                type: "positive",
                title: "Usuário incluído com sucesso!",
                text: `Em breve, ${user.fullName} receberá um e-mail com a senha para utilizar o sistema.`
            })
            setLoading(false)
            setUser({
                ...user,
                userProfile: undefined,
                email: "",
                fullName: "",
                telephone: "",
                userLaboratories: []
            })
        }).catch(e => {
            setMessage({
                type: "negative",
                title: "Falha ao incluir usuário",
                text: (e as any).message
            })
            setLoading(false)
        })
    }
    const handleTelephoneChange = (event: React.ChangeEvent<HTMLInputElement>, { name, value }: InputOnChangeData) => {
        setUser({
            ...user,
            [name]: value.replace(/[^0-9]+/g, "")
        })
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, { name, value }: InputOnChangeData) => {
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleSelect = (event: React.SyntheticEvent<HTMLElement>, { name, value }: DropdownProps) => {
        setUser({
            ...user,
            [name]: value
        })
    }
    const handleAddLaboratory = (event: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
        setUser({
            ...user,
            userLaboratories: laboratories.filter(l => l.id === value)
        })
    }
    return (
        <div>
            <Form loading={loading}>
                <Form.Field required>
                    <label>E-mail</label>
                    <Form.Input
                        onChange={handleChange}
                        value={user.email}
                        name='email'
                    />
                </Form.Field>
                <Form.Field required>
                    <label>Nome Completo</label>
                    <Form.Input
                        onChange={handleChange}
                        value={user.fullName}
                        name='fullName'
                    />
                </Form.Field>
                <Form.Field required>
                    <label>Telefone</label>
                    <Form.Input
                        name='telephone'
                        onChange={handleTelephoneChange}
                        value={user.telephone}
                    />
                </Form.Field>
                <Form.Field required>
                    <label>Perfil</label>
                    <Select placeholder='Selecione'
                        name='userProfile'
                        onChange={handleSelect}
                        value={user.userProfile}
                        options={[
                            { key: UserProfile.ADMIN, value: UserProfile.ADMIN, text: "Administração" },
                            { key: UserProfile.MANAGER, value: UserProfile.MANAGER, text: "Chefe de Laboratório" },
                            { key: UserProfile.USER, value: UserProfile.USER, text: "Usuário" },
                        ]} />
                </Form.Field>
                {
                    user.userProfile && user.userProfile !== UserProfile.ADMIN &&
                    <Form.Field>
                        <label>Laboratório</label>
                        <Select placeholder='Selecione' options={laboratories.map(l => ({
                            key: l.id,
                            value: l.id,
                            text: l.name
                        }))}
                            onChange={handleAddLaboratory}
                            value={user.userLaboratories.length > 0 ? user.userLaboratories[0].id : -1}
                        />
                    </Form.Field>
                }
                <Button secondary onClick={goBack} type="button">Cancelar</Button>
                <Button primary onClick={saveUser}>Salvar</Button>
            </Form>
            {message &&
                <Message floating positive={message.type === 'positive'} info={message.type === 'info'} negative={message.type === 'negative'} warning={message.type === 'warning'}>
                    <Message.Header>{message.title}</Message.Header>
                    <p>{message.text}</p>
                </Message>
            }
        </div>
    )
}
export default UserForm
