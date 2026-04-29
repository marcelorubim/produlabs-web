import React from 'react'
import UsersList from './UsersList'
import { Button } from 'semantic-ui-react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../reducers'
import UserProfile from '../types/UserProfile'

const UsersPage = () => {
    const history = useHistory()
    const { currentUser } = useSelector( (state: RootState) => state.user)   

    return (
        <div>
            {currentUser?.userProfile === UserProfile.ADMIN &&
                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Button primary onClick={() => history.push('/usuarios/adicionar')}>Adicionar Usuário</Button>
                </div>
            }
            
            
            <UsersList />
        </div>
    )
}
export default UsersPage