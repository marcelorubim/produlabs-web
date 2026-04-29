import React from 'react'
import { Table } from 'semantic-ui-react'
import ExamHistory from '../types/ExamHistory'
import { useSelector } from 'react-redux'
import { RootState } from '../reducers'

type ProductivityYearProps = {
    examsHistory: ExamHistory[];
    patientsValue: number;
}

const ProductivityYear = ({ examsHistory, patientsValue }: ProductivityYearProps) => {
    const { sectors, exams, activeExams } = useSelector((state: RootState) => state.exams)

    return (
        <Table selectable>
            <Table.Header>
                <Table.Row textAlign='center'>
                    <Table.HeaderCell width={2}>
                        Setor
                        </Table.HeaderCell>
                    <Table.HeaderCell width={4}>
                        Exame
                        </Table.HeaderCell>
                    <Table.HeaderCell width={2}>
                        Internação
                        </Table.HeaderCell>
                    <Table.HeaderCell width={2}>
                        Ambulatório
                        </Table.HeaderCell>
                    <Table.HeaderCell width={2}>
                        Emergência
                        </Table.HeaderCell>
                    <Table.HeaderCell width={2}>
                        Total
                        </Table.HeaderCell>
                    <Table.HeaderCell width={1}>
                        Pacientes
                            </Table.HeaderCell>
                </Table.Row>
                <Table.Row textAlign='center'>
                    <Table.HeaderCell>
                    </Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell>
                        {examsHistory.reduce((acc, curr) => acc + curr.hospitalizationValue, 0)}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        {examsHistory.reduce((acc, curr) => acc + curr.ambulatoryValue, 0)}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        {examsHistory.reduce((acc, curr) => acc + curr.emergencyValue, 0)}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        {examsHistory.reduce((acc, curr) => acc + curr.hospitalizationValue + curr.ambulatoryValue + curr.emergencyValue, 0)}
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        {patientsValue}
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {exams.map(exam => {
                    const history = examsHistory.filter(e => e.id.examID === exam.id)
                    const hospitalizationValue = history.reduce((acc,curr) => acc+curr.hospitalizationValue,0)
                    const ambulatoryValue = history.reduce((acc,curr) => acc+curr.ambulatoryValue,0)
                    const emergencyValue = history.reduce((acc,curr) => acc+curr.emergencyValue,0)
                    return (
                        <Table.Row textAlign='center' key={exam.id}>
                            <Table.Cell textAlign='left'>
                                {exam.sector.name}
                            </Table.Cell>
                            <Table.Cell textAlign='left'>
                                {exam.name}
                            </Table.Cell>
                            <Table.Cell>
                                {hospitalizationValue}
                            </Table.Cell>
                            <Table.Cell>
                                {ambulatoryValue}
                            </Table.Cell>
                            <Table.Cell>
                                {emergencyValue}
                            </Table.Cell>
                            <Table.Cell>
                                {hospitalizationValue+ambulatoryValue+emergencyValue}
                            </Table.Cell>
                            <Table.Cell>
                                
                            </Table.Cell>
                        </Table.Row>
                    )
                }

                )}
            </Table.Body>
        </Table>
    )
}
export default ProductivityYear