import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../reducers'
import UserProfile from '../types/UserProfile'
import { Button } from 'semantic-ui-react'
import ExamList from './ExamList'

const ExamsPage = () => {
    const navigate = useNavigate()
    const { currentUser } = useSelector((state: RootState) => state.user)

    return (
        <div>
            {currentUser?.userProfile === UserProfile.ADMIN &&
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button primary onClick={() => navigate('/exames/adicionar')}>Adicionar Exame</Button>
                </div>
            }
            <ExamList />
        </div>
    )
}

export default ExamsPage