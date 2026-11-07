import React, { useState, useEffect } from 'react'
import { format, toDate, sub, isAfter } from 'date-fns'
import { getExamsHistory, saveExamHistory, getLaboratoryExamsHistory, getPatientsHistory, getLaboratoryPatientsHistory, savePatientHistory, closeExamHistory, getLaboratorySummary } from '../services/productivity'
import { Table, Button, Input, Segment, Dimmer, Loader, Select, InputOnChangeData, Message, Icon, SemanticICONS, Popup, DropdownProps, Confirm } from 'semantic-ui-react'
import ExamHistory from '../types/ExamHistory'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../reducers'
import Sector from '../types/Sector'
import Exam from '../types/Exam'
import MessageData from '../types/MessageData'
import { logoutUser } from '../actions/users'
import Laboratory from '../types/Laboratory'
import { ptBR } from 'date-fns/locale'
import PatientsHistory from '../types/PatientsHistory'
import UserProfile from '../types/UserProfile'
import ExamHistoryState from '../types/ExamHistoryState'
import { UPDATE_EXAM_HISTORY } from '../types/ProductivityActionTypes'
import ProductivityBySector from './ProductivityBySector'
import months from '../utils/months'
import ProductivityYear from './ProductivityYear'
import NumberFormatted from './NumberFormatted'
import LaboratorySummary from '../types/LaboratorySummary'
import UserLaboratorySelect from './UserLaboratorySelect'

type ProductivityLineProps = {
    exam: Exam;
    period: string;
    examHistory?: any;
    laboratory?: Laboratory;
    readOnly: boolean;
}

type IconStatusData = {
    icon: SemanticICONS;
    text: string;
}
const ProductivityLine = ({ exam, examHistory, period, laboratory, readOnly }: ProductivityLineProps) => {
    const dispatch = useDispatch<any>();
    const [history, setHistory] = useState<ExamHistory>({} as ExamHistory)
    const [iconStatus, setIconStatus] = useState<IconStatusData>()
    const { loadingExamID, error, errorExamID } = useSelector((state: RootState) => state.productivity)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        setIconStatus({ icon: 'wait', text: 'Salvando dados...' })
        const value = data.value.replace(/[^0-9]+/g, "")
        const newHistory: ExamHistory = {
            ...history,
            [data.name]: parseInt(value ? value : "0")
        }
        setHistory(newHistory)
        dispatch({
            type: UPDATE_EXAM_HISTORY,
            payload: newHistory
        })
        // saveExamHistory(newHistory).then(() => {
        //     setIconStatus({ icon: 'check circle', text: 'Dados salvados com sucesso!' })
        // }).catch(e => {
        //     setIconStatus({ icon: 'remove circle', text: 'Erro ao salvar. Tente novamente!' })
        // })
    }
    useEffect(() => {
        setHistory(examHistory[exam.id] ? examHistory[exam.id] : { hospitalizationValue: 0, ambulatoryValue: 0, emergencyValue: 0, id: { period, laboratoryID: laboratory?.id, examID: exam.id } } as ExamHistory)
    }, [examHistory])
    return (
        <Table.Row textAlign='center' error={error !== undefined && errorExamID === exam.id}>
            <Table.Cell>{exam.sector.name}</Table.Cell>
            <Table.Cell textAlign='left'>{exam.name}</Table.Cell>
            <Table.Cell>
                {
                    laboratory && !readOnly ?
                        <Input value={history.hospitalizationValue} size='mini' onChange={handleChange} name='hospitalizationValue' />
                        :
                        <NumberFormatted>{history.hospitalizationValue}</NumberFormatted>
                }
            </Table.Cell>
            <Table.Cell>
                {
                    laboratory && !readOnly ?
                        <Input value={history.ambulatoryValue} size='mini' onChange={handleChange} name='ambulatoryValue' />
                        :
                        <NumberFormatted>{history.ambulatoryValue}</NumberFormatted>
                }
            </Table.Cell>
            <Table.Cell>
                {
                    laboratory && !readOnly ?
                        <Input value={history.emergencyValue} size='mini' onChange={handleChange} name='emergencyValue' />
                        :
                        <NumberFormatted>{history.emergencyValue}</NumberFormatted>
                }
            </Table.Cell>
            <Table.Cell>
                <NumberFormatted>
                    {history.hospitalizationValue + history.ambulatoryValue + history.emergencyValue}
                </NumberFormatted>
            </Table.Cell>
            <Table.Cell>
                {loadingExamID === exam.id && <Icon loading name='spinner' />}
            </Table.Cell>
        </Table.Row >
    )
}

const ProductivityPage = () => {
    const [patientsValue, setPatientsValue] = useState(0)
    const [iconStatus, setIconStatus] = useState<IconStatusData>()
    const dispatch = useDispatch<any>()
    const limitDate = sub(new Date(), { months: 1 })
    const [year, setYear] = useState<number>(parseInt(format(limitDate, 'yyyy')))
    const [month, setMonth] = useState<number>(parseInt(format(limitDate, 'MM')))
    const [examsHistory, setExamsHistory] = useState<ExamHistory[]>([])
    const [patientsHistory, setPatientsHistory] = useState<PatientsHistory>()
    const [examsHistoryMap, setExamsHistoryMap] = useState<any>({})
    const [sector, setSector] = useState<Sector>()
    const [exam, setExam] = useState<Exam>()
    const { currentUser } = useSelector((state: RootState) => state.user)
    const isAdmin = currentUser?.userProfile === UserProfile.ADMIN;
    const [laboratory, setLaboratory] = useState<Laboratory | null>(currentUser && !isAdmin ? currentUser.userLaboratories[0] : null)
    const { sectors, exams, activeExams, examsMap } = useSelector((state: RootState) => state.exams)
    const [examsID, setExamsID] = useState<number[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const { laboratories } = useSelector((state: RootState) => state.laboratories)
    const [message, setMessage] = useState<MessageData | null>(null)
    const [showTable, setShowTable] = useState(true)
    const [period, setPeriod] = useState<string>(format(limitDate, 'MM'))
    const [sectorID, setSectorID] = useState(-1)
    const [showSendConfirmation, setShowSendConfirmation] = useState(false)
    const [readOnly, setReadOnly] = useState(currentUser?.userProfile !== UserProfile.MANAGER)
    const [laboratorySummary, setLaboratorySummary] = useState<LaboratorySummary[] | undefined>()

    const handleChangePatient = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        setIconStatus({ icon: 'wait', text: 'Salvando dados...' })

        const value = data.value.replace(/[^0-9]+/g, "")
        setPatientsValue(parseInt(value ? value : "0"))
        savePatientHistory({
            ...patientsHistory,
            laboratory: laboratory as Laboratory,
            period,
            patientsValue: parseInt(value ? value : "0")
        } as PatientsHistory).then(() => {
            setIconStatus({ icon: 'check circle', text: 'Dados salvados com sucesso!' })
        }).catch(e => {
            setIconStatus({ icon: 'remove circle', text: 'Erro ao salvar. Tente novamente!' })
        })
    }
    useEffect(() => {
        if (!isAdmin && currentUser) setLaboratory(current => currentUser.userLaboratories.find(l => l.id === current?.id) ?? currentUser.userLaboratories[0])
    }, [currentUser])
    useEffect(() => {
        if (!currentUser) return;
        const monthF: string = month <= 9 ? '0' + month : month + ''
        setPeriod(`${year}${monthF}01`);
        (async function () {
            setLoading(true);
            setMessage(null)
            try {
                setLaboratorySummary(isAdmin && !laboratory && month>0 ? await getLaboratorySummary(month, year) : undefined);
                const patientsResult = !isAdmin || laboratory ? await getLaboratoryPatientsHistory(laboratory ? laboratory.id : currentUser.userLaboratories[0].id, month, year) : await getPatientsHistory(month, year)
                setPatientsValue(patientsResult.patientsValue ? patientsResult.patientsValue : 0);
                setPatientsHistory(patientsResult)
                console.log(laboratory)
                const result = !isAdmin || laboratory ? await getLaboratoryExamsHistory(laboratory ? laboratory.id : currentUser.userLaboratories[0].id, month, year) : await getExamsHistory(month, year)
                if (currentUser.userProfile !== UserProfile.USER && laboratory) {
                    console.log(result)
                    setReadOnly(result.reduce<boolean>(
                        (acc, curr) => acc ? acc : curr.state === ExamHistoryState.SENT
                        , false
                    )
                    )
                } else {
                    setReadOnly(true)
                }

                setExamsHistory(result);
                setExamsHistoryMap(result.reduce((acc, curr) => ({
                    ...acc,
                    [curr.id.examID]: curr
                }), {}))
                setExamsID(result.map(r => r.id.examID))
                setShowTable(true)
            } catch (e) {
                if ((e as any).response && (e as any).response.status === 401) {
                    dispatch(logoutUser())
                }
                setMessage({
                    title: 'Erro ao obter dados de produtividade!',
                    text: (e as any).response && (e as any).response.status === 500 ? 'Tente novamente mais tarde!' : (e as any).message,
                    type: 'negative'
                })
                setExamsHistory([])
                setShowTable(false)
            }
            setLoading(false)

        })()
    }, [month, laboratory, currentUser, year])
    const handleSend = () => {
        if (laboratory) {
            setLoading(true)
            closeExamHistory(laboratory.id, period)
                .then(r => {
                    setReadOnly(true)
                })
                .catch(e => {
                    setMessage({
                        title: 'Erro ao enviar dados!',
                        text: (e as any).response && (e as any).response.status === 500 ? 'Tente novamente mais tarde!' : (e as any).message,
                        type: 'negative'
                    })
                })
            setLoading(false)
        }

        setShowSendConfirmation(false)
    }
    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 10,
            }}>
                <h3>Produtividade</h3>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Button basic color='black' circular icon='arrow left' size='tiny' onClick={() => setYear(year - 1)} disabled={year - 1 < 2019} />
                    <span style={{
                        fontWeight: "bold",
                        fontSize: 16
                    }}>{year}</span>
                    <Button basic color='black' circular icon='arrow right' size='tiny' onClick={() => setYear(year + 1)} disabled={year + 1 > limitDate.getFullYear()} />
                </div>
                {
                    isAdmin ?
                        <Select placeholder='Selecione'
                            style={{
                                width: 300
                            }}
                            onChange={(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
                                const labs = laboratories.filter(lab => lab.id === parseInt(data.value + ''))
                                if (labs.length > 0) {
                                    setLaboratory(labs[0])
                                } else {
                                    setLaboratory(null)
                                }
                            }}

                            value={laboratory ? laboratory.id : -1}
                            options={[
                                {
                                    key: -1,
                                    value: -1,
                                    text: 'Consolidado'
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
            <div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    border: '1px solid #112d4e',
                    height: 50,
                    fontSize: 12,
                }}>
                    {months(year).map(m => (
                        <div
                            key={m.value}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                flex: 1,
                                backgroundColor: m.value === month ? '#112d4e' : 'white',
                                alignItems: 'center'
                            }}>
                            {!isAfter(m.date, limitDate) ?
                                <button style={{
                                    background: 'none',
                                    border: 'none',
                                    width: '100%',
                                    height: '100%',
                                    color: m.value === month ? 'white' : '#112d4e',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                }}
                                    onClick={() => setMonth(m.value)}
                                >{format(m.date, 'MMM/yyyy', { locale: ptBR })}</button>
                                :
                                <span style={{
                                    fontWeight: 'bold',
                                    color: 'gray'
                                }}>{format(m.date, 'MMM/yyyy', { locale: ptBR })}</span>
                            }
                        </div>
                    ))}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flex: 1,
                            backgroundColor: !month ? '#112d4e' : 'white',
                            alignItems: 'center'
                        }}>

                        <button style={{
                            background: 'none',
                            border: 'none',
                            width: '100%',
                            height: '100%',
                            color: !month ? 'white' : '#112d4e',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}

                            onClick={() => setMonth(0)}
                        >{`Consolidado ${year}`}</button>
                    </div>
                </div>
                {message &&
                    <Message floating positive={message.type === 'positive'} info={message.type === 'info'} negative={message.type === 'negative'} warning={message.type === 'warning'}>
                        <Message.Header>{message.title}</Message.Header>
                        <p>{message.text}</p>
                    </Message>
                }
            </div>
            {loading &&
                <Dimmer active inverted>
                    <Loader inverted>Carregando...</Loader>
                </Dimmer>

            }
            {!loading && showTable &&
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, fontSize: 12 }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                        {
                            (!laboratory || readOnly) &&
                                <ProductivityBySector
                                    examsHistory={examsHistory}
                                />
                        }
                        
                    </div>
                    {laboratorySummary && laboratorySummary.length > 0 && 
                            <div style={{ flex: 1, height: "100%"}}>
                                <div style={{ width: 400 }}>
                                <Table compact size='small'>
                                    <Table.Header>
                                        <Table.Row textAlign='center'>
                                            <Table.HeaderCell textAlign='left'>
                                                Laboratório
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
                                        {laboratorySummary.map(l => (
                                            <Table.Row textAlign='center'>
                                                <Table.Cell textAlign='left'>
                                                    {l.laboratory.name}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <NumberFormatted>
                                                        {l.hospitalizationValue}
                                                    </NumberFormatted>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <NumberFormatted>
                                                        {l.ambulatoryValue}
                                                    </NumberFormatted>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <NumberFormatted>
                                                        {l.emergencyValue}
                                                    </NumberFormatted>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                                    </div>
                            </div>
                        }
                    <div style={{ flex: 0.5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'end' }}>
                        <Confirm
                            open={showSendConfirmation}
                            content={`Atenção! Após enviar os dados para a administração não será mais possível a edição. Deseja continuar?`}
                            onCancel={() => setShowSendConfirmation(false)}
                            cancelButton='Cancelar'
                            confirmButton='Enviar'
                            onConfirm={handleSend}
                            size='tiny'
                        />
                        <div>
                            {
                                currentUser?.userProfile === UserProfile.MANAGER && !readOnly && month > 0 &&
                                <Button
                                    primary
                                    icon='play'
                                    labelPosition='right'
                                    content='Enviar'
                                    disabled={patientsValue === 0}
                                    onClick={() => setShowSendConfirmation(true)}
                                />
                            }
                            {laboratory && readOnly &&
                                <a href={`/v1/history/download/laboratory/${laboratory.id}?month=${month}&year=${year}`} download>
                                    <Button
                                        primary
                                        icon='download'
                                        labelPosition='right'
                                        content='Download'
                                        disabled={patientsValue === 0}
                                    />
                                </a>
                            }

                        </div>

                    </div>

                </div>

            }
            {!month &&
                <ProductivityYear
                    examsHistory={examsHistory}
                    patientsValue={patientsValue}
                />
            }
            {month > 0 && !loading && showTable &&
                <Table selectable>
                    <Table.Header>
                        <Table.Row textAlign='center' style={{
                            backgroundColor: '#3f72af'
                        }}>
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
                                <Select placeholder='Selecione'
                                    value={sectorID}
                                    name='sector'
                                    onChange={(e, data) => setSectorID(data.value ? parseInt(data.value + '') : -1)}
                                    options={[
                                        {
                                            key: -1,
                                            value: -1,
                                            text: 'Todos'
                                        },
                                        ...sectors.map(l => ({
                                            key: l.id,
                                            value: l.id,
                                            text: l.name
                                        }))
                                    ]}

                                />
                            </Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>
                                <NumberFormatted>
                                    {examsHistory.filter(e => !examsMap.get(e.id.examID)?.deletedAt && (sectorID === -1 || examsMap.get(e.id.examID)?.sector.id === sectorID)).reduce((acc, curr) => acc + curr.hospitalizationValue, 0)}
                                </NumberFormatted>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <NumberFormatted>
                                    {examsHistory.filter(e => !examsMap.get(e.id.examID)?.deletedAt && (sectorID === -1 || examsMap.get(e.id.examID)?.sector.id === sectorID)).reduce((acc, curr) => acc + curr.ambulatoryValue, 0)}
                                </NumberFormatted>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <NumberFormatted>
                                    {examsHistory.filter(e => !examsMap.get(e.id.examID)?.deletedAt && (sectorID === -1 || examsMap.get(e.id.examID)?.sector.id === sectorID)).reduce((acc, curr) => acc + curr.emergencyValue, 0)}
                                </NumberFormatted>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <NumberFormatted>
                                    {examsHistory.filter(e => !examsMap.get(e.id.examID)?.deletedAt && (sectorID === -1 || examsMap.get(e.id.examID)?.sector.id === sectorID)).reduce((acc, curr) => acc + curr.hospitalizationValue + curr.ambulatoryValue + curr.emergencyValue, 0)}
                                </NumberFormatted>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                {readOnly ?
                                    <span>{patientsValue}</span>
                                    :
                                    <Input
                                        size='mini'
                                        name='patientsValue'
                                        value={patientsValue}
                                        onChange={handleChangePatient}
                                    />
                                }

                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {activeExams.filter(e => !laboratory || !e.deletedAt).filter(e => sectorID === -1 || e.sector.id === sectorID).map(exam => (
                            <ProductivityLine
                                readOnly={readOnly}
                                key={exam.id}
                                exam={exam}
                                examHistory={examsHistoryMap}
                                period={period}
                                laboratory={laboratory ? laboratory : undefined}
                            />

                        ))}
                    </Table.Body>
                </Table>
            }


        </div>
    )
}

export default ProductivityPage