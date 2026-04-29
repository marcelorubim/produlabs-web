import React from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../reducers'
import UserProfile from '../types/UserProfile'
import { Button } from 'semantic-ui-react'
import ExamList from './ExamList'

const ExamsPage = () => {
    const history = useHistory()
    const { currentUser } = useSelector( (state: RootState) => state.user)   

    return (
        <div>
            {currentUser?.userProfile === UserProfile.ADMIN &&
                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Button primary onClick={() => history.push('/exames/adicionar')}>Adicionar Exame</Button>
                </div>
            }
            <ExamList />
        </div>
    )
}

export default ExamsPage