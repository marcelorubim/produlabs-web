import React, { useState } from 'react'
import { Table, Dimmer, Loader, Button, Confirm } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../reducers'
import UserProfile from '../types/UserProfile'
import { Link } from 'react-router-dom'
import Exam from '../types/Exam'
import { deleteExam } from '../services/exams'
import { getExams } from '../actions/exams'


const ExamList = () => {
    const dispatch = useDispatch<any>()
    const { activeExams, loading } = useSelector((state: RootState) => state.exams)
    const { currentUser } = useSelector((state: RootState) => state.user)
    const [examToDelete, setExamToDelete] = useState<Exam>()

    if (loading) {
        return (
            <Dimmer active inverted>
                <Loader />
            </Dimmer>
        )
    }
    const handleDelete = () => {
        if(examToDelete){
            deleteExam(examToDelete)
                .then(r => {
                    setExamToDelete(undefined)
                    dispatch(getExams())
                    
                })
                .catch(e => console.error(e))
        }
        
    }
    return (
        <div>
            <Confirm
                open={examToDelete !== undefined}
                content={`Tem certeza que deseja excluir o exame ${examToDelete?.name}?`}
                onConfirm={handleDelete}
                onCancel={() => setExamToDelete(undefined)}
                cancelButton='Cancelar'
                confirmButton='Excluir'
                size='tiny'
            />
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width={6}>Exame</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Setor</Table.HeaderCell>
                        <Table.HeaderCell width={2}>Código SUS</Table.HeaderCell>
                        <Table.HeaderCell width={1}></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {activeExams.map((l, idx) => (
                        <Table.Row key={idx}>
                            <Table.Cell>{l.name}</Table.Cell>
                            <Table.Cell>{l.sector.name}</Table.Cell>
                            <Table.Cell>{l.codeSUS}</Table.Cell>
                            <Table.Cell textAlign='right'>
                                {
                                    currentUser?.userProfile === UserProfile.ADMIN &&
                                    <div>
                                        <Link to={`/exames/${l.id}`}>
                                            <Button icon='edit' basic color='blue' />
                                        </Link>
                                        <Button icon='trash' basic color='blue' onClick={() => setExamToDelete(l)} />
                                    </div>

                                }
                            </Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>

                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colspan="4">{activeExams.length} exames cadastrados!</Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>

    )
}
export default ExamList