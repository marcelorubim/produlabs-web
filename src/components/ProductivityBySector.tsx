import React, { useEffect, useState } from 'react'
import ExamHistory from '../types/ExamHistory'
import { useSelector } from 'react-redux'
import { RootState } from '../reducers'
import Sector from '../types/Sector'
import { Table } from 'semantic-ui-react'
import NumberFormatted from './NumberFormatted'


type ProductivityBySectorProps = {
    examsHistory: ExamHistory[];
}

type SectorData = {
    sector: Sector;
    hospitalizationValue: number;
    ambulatoryValue: number;
    emergencyValue: number;
}
const ProductivityBySector = ({ examsHistory }: ProductivityBySectorProps) => {
    const { sectors, exams, activeExams, examsMap } = useSelector((state: RootState) => state.exams)
    const [sectorsData, setSectorsData] = useState<SectorData[]>()
    useEffect(() => {
        const data: SectorData[] = [];
        sectors.forEach(sector => {
            data.push({
                sector,
                hospitalizationValue: examsHistory.filter(e => examsMap.get(e.id.examID)?.sector.id === sector.id).reduce<number>((acc, curr) => acc + curr.hospitalizationValue, 0),
                ambulatoryValue: examsHistory.filter(e => examsMap.get(e.id.examID)?.sector.id === sector.id).reduce<number>((acc, curr) => acc + curr.ambulatoryValue, 0),
                emergencyValue: examsHistory.filter(e => examsMap.get(e.id.examID)?.sector.id === sector.id).reduce<number>((acc, curr) => acc + curr.emergencyValue, 0),
            })

        })
        setSectorsData(data)

    }, [sectors, examsHistory])

    return (
        <div style={{
            width: 300,
        }}>
            <Table compact size='small'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            Setor
                    </Table.HeaderCell>
                        <Table.HeaderCell>
                            Internação
                    </Table.HeaderCell>
                        <Table.HeaderCell>
                            Ambulatório
                    </Table.HeaderCell>
                        <Table.HeaderCell>
                            Emergência
                    </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sectorsData?.map(sectorData =>
                        <Table.Row textAlign='center' key={sectorData.sector.id}>
                            <Table.Cell textAlign='left'>
                                {sectorData.sector.name}
                            </Table.Cell>
                            <Table.Cell>
                                <NumberFormatted>
                                    {sectorData.hospitalizationValue}
                                </NumberFormatted>
                            </Table.Cell>
                            <Table.Cell>
                                <NumberFormatted>
                                    {sectorData.ambulatoryValue}
                                </NumberFormatted>
                            </Table.Cell>
                            <Table.Cell>
                                <NumberFormatted>
                                    {sectorData.emergencyValue}
                                </NumberFormatted>
                            </Table.Cell>

                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    )
}

export default ProductivityBySector