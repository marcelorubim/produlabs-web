import React from 'react'
import { Table, Dimmer, Loader} from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { RootState } from '../reducers'


const LaboratoriesList = () => {
    const { laboratories, loading } = useSelector( (state: RootState) => state.laboratories)   

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
                    <Table.HeaderCell width={2}>Sigla</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Nome</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Região</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {laboratories.map((l, idx) => (
                    <Table.Row key={idx}>
                        <Table.Cell>{l.initials}</Table.Cell>
                        <Table.Cell>{l.name}</Table.Cell>
                        <Table.Cell>{l.region}</Table.Cell>
                       
                    </Table.Row>
                ))}

            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colspan="4">{laboratories.length} unidades laboratoriais</Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}
export default LaboratoriesList