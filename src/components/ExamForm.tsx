import React, { useState } from 'react'
import { Form, InputOnChangeData, Select, Button, Message, DropdownProps, FormProps } from 'semantic-ui-react'
import MessageData from '../types/MessageData'
import { useHistory, useParams } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../reducers'
import Exam from '../types/Exam'
import { saveExam } from '../services/exams'
import { getExams } from '../actions/exams'

const ExamForm = () => {
    const { id } = useParams()

    const dispatch = useDispatch()
    const history = useHistory()
    const { sectors,exams } = useSelector((state: RootState) => state.exams)
    const [message, setMessage] = useState<MessageData | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [ exam, setExam ] = useState<Exam>(id && exams ? exams.filter(e => e.id === parseInt(id))[0]  : {} as Exam)
    const goBack = () => history.goBack()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, { name, value }: InputOnChangeData) => {
        const newValue = name === 'codeSUS' ?  value.replace(/[^0-9]+/g, "") : value
        setExam({
            ...exam,
            [name]:newValue
        })
    }
    const handleSelect = (event: React.SyntheticEvent<HTMLElement>, { name, value }: DropdownProps) => {
        setExam({
            ...exam,
            [name]: sectors.filter(s => s.id === value)[0]
        })
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>, data: FormProps) => {
        setLoading(true)
        setMessage(null)
        saveExam({
            ...exam,
            name: exam.name.toUpperCase()
         }).then(r => {
            dispatch(getExams())
            setMessage({
                type: "positive",
                title: "Pronto!",
                text: id ? `Exame alterado com sucesso.` : `Exame incluído com sucesso.`
            })
            setLoading(false)
            setExam(r)
        }).catch(e => {
            setMessage({
                type: "negative",
                title: "Falha ao incluir exame",
                text: e.message
            })
            setLoading(false)
        })
    }
    return (
        <div>
            <Form loading={loading} onSubmit={handleSubmit}>
                <Form.Field required>
                    <label>Nome</label>
                    <Form.Input
                        value={exam.name}
                        onChange={handleChange}
                        name='name'
                    />
                </Form.Field>

                <Form.Field>
                    <label>Setor</label>
                    <Select placeholder='Selecione' 
                    value={exam.sector ? exam.sector.id : undefined}
                    name='sector'
                    onChange={handleSelect}
                    options={sectors.map(l => ({
                        key: l.id,
                        value: l.id,
                        text: l.name
                    }))}

                    />

                </Form.Field>
                <Form.Field>
                    <label>Código SUS</label>
                    <Form.Input
                        value={exam.codeSUS}
                        onChange={handleChange}
                        name='codeSUS'
                    />
                </Form.Field>
                <Button secondary onClick={goBack} type="button">Voltar</Button>
                <Button primary >Salvar</Button>
            </Form>
            {message &&
                <Message floating positive={message.type === 'positive'} info={message.type === 'info'} negative={message.type === 'negative'} warning={message.type === 'warning'}>
                    <Message.Header>{message.title}</Message.Header>
                    <p>{message.text}</p>
                </Message>
            }

        </div>
    )
}
export default ExamForm