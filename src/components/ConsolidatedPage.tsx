import React, { useState, useEffect } from 'react'
import { Select, DropdownProps, Table, TableHeaderCell } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { RootState } from '../reducers'
import Laboratory from '../types/Laboratory'
import UserProfile from '../types/UserProfile'
import months from '../utils/months'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { getExamsYearHistory } from '../services/productivity'
import ExamHistory from '../types/ExamHistory'
import UserLaboratorySelect from './UserLaboratorySelect'

const ConsolidatedPage = () => {
    const [year, setYear] = useState<number>(parseInt(format(new Date(), 'yyyy')))

    const { laboratories } = useSelector((state: RootState) => state.laboratories)
    const { currentUser } = useSelector((state: RootState) => state.user)

    const isAdmin = currentUser?.userProfile === UserProfile.ADMIN
    const [laboratory, setLaboratory] = useState<Laboratory | null>(currentUser && !isAdmin ? currentUser.userLaboratories[0] : null)
    const [examsHistory, setExamsHistory] = useState<ExamHistory[]>([])

    const handleSelectLaboratory = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
        const labs = laboratories.filter(lab => lab.id === parseInt(data.value + ''))
        if (labs.length > 0) {
            setLaboratory(labs[0])
        } else {
            setLaboratory(null)
        }
    }

    useEffect(() => {
        if (!isAdmin && currentUser) setLaboratory(current => currentUser.userLaboratories.find(l => l.id === current?.id) ?? currentUser.userLaboratories[0])
    }, [currentUser])

    useEffect(() => {
        getExamsYearHistory(2020)
            .then(r => setExamsHistory(r))
            .catch(e => console.error(e))

    },[])

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 10,
            }}>
                <h3>Consolidado</h3>
                {
                    isAdmin ?
                        <Select placeholder='Selecione'
                            style={{
                                width: 300
                            }}
                            onChange={handleSelectLaboratory}

                            value={laboratory ? laboratory.id : -1}
                            options={[
                                {
                                    key: -1,
                                    value: -1,
                                    text: 'Todos'
                                },
                                ...laboratories.map(l => ({
                                    key: l.id,
                                    value: l.id,
                                    text: l.name
                                }))]}
                        />
                        :
                        <UserLaboratorySelect
                            laboratories={currentUser?.userLaboratories ?? []}
                            value={laboratory}
                            onChange={setLaboratory}
                        />
                }
            </div>
            <div style={{
                textAlign: 'center',
                margin: 20,
            }}>
                <h3>2020</h3>
            </div>
            <div>
                <Table>
                    <Table.Header>
                        <Table.Row textAlign='center'>
                            <TableHeaderCell textAlign='left'>
                                Mês
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Internação
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Ambulatório
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Emergência
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Total
                            </TableHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {months(year).map(month => (
                            <Table.Row textAlign='center' key={month.value}>
                                <Table.Cell textAlign='left'>
                                    {format(month.date,'MMMM',{
                                        locale: ptBR
                                    }).toUpperCase()}
                                </Table.Cell>
                                <Table.Cell>
                                    {examsHistory.filter(e => e.period===month.isoDate).reduce((acc, curr) => acc+curr.hospitalizationValue,0)}
                                </Table.Cell>
                                <Table.Cell>
                                    {examsHistory.filter(e => e.period===month.isoDate).reduce((acc, curr) => acc+curr.ambulatoryValue,0)}
                                </Table.Cell>
                                <Table.Cell>
                                    {examsHistory.filter(e => e.period===month.isoDate).reduce((acc, curr) => acc+curr.emergencyValue,0)}
                                </Table.Cell>
                                <Table.Cell>
                                    {examsHistory.filter(e => e.period===month.isoDate).reduce((acc, curr) => acc+curr.hospitalizationValue+curr.ambulatoryValue+curr.emergencyValue,0)}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </div>
    )
}

export default ConsolidatedPage