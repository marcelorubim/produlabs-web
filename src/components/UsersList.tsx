import React from 'react'
import { Table, Dimmer, Loader, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../reducers'
import UserProfile from '../types/UserProfile'
import { parseISO } from 'date-fns/esm'
import { format } from 'date-fns'

const UsersList = () => {
    const { users, loading, currentUser } = useSelector((state: RootState) => state.user)
    if (loading) {
        return (
            <Dimmer active inverted>
                <Loader />
            </Dimmer>
        )
    }
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={2}>Nome</Table.HeaderCell>
                    <Table.HeaderCell width={4}>E-Mail</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Telefone</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Último Login</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Perfil</Table.HeaderCell>
                    <Table.HeaderCell width={1}></Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {users.filter(u => !u.deletedAt && u.id !== 1).map(user => (
                    <Table.Row key={user.id}>
                        <Table.Cell>
                            {user.fullName}
                        </Table.Cell>
                        <Table.Cell>
                            {user.email}
                        </Table.Cell>
                        <Table.Cell>
                            {user.telephone}
                        </Table.Cell>
                        <Table.Cell>
                            {user.lastLogin ? format(parseISO(user.lastLogin),'dd/MM/yyyy HH:mm') : ''}
                        </Table.Cell>
                        <Table.Cell>
                            {user.userProfile === UserProfile.MANAGER ?
                            <div >
                                <span>Chefe de Laboratório</span>
                                <br/>
                                <span style={{
                                fontSize: 10
                            }}><i>{user.userProfile && user.userLaboratories[0].name}</i></span>
                            </div>
                            :
                            <span>
                                {user.userProfile === UserProfile.ADMIN ? 'Administrador' : 'Usuário'}
                            </span>
                            }
                            
                        </Table.Cell>
                        <Table.Cell textAlign="right">
                            {currentUser?.userProfile === UserProfile.ADMIN &&
                                <Link to={`/usuarios/${user.id}`}>
                                    <Button icon>
                                        <Icon name='edit' />
                                    </Button>
                                </Link>
                            }

                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}
export default UsersList

