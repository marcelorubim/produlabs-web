import React from 'react'
import { Select } from 'semantic-ui-react'
import Laboratory from '../types/Laboratory'

type UserLaboratorySelectProps = {
    laboratories: Laboratory[];
    value: Laboratory | null;
    onChange: (laboratory: Laboratory) => void;
}

const UserLaboratorySelect = ({ laboratories, value, onChange }: UserLaboratorySelectProps) => {
    if (laboratories.length <= 1) {
        return <h3>{value?.name}</h3>
    }
    return (
        <Select placeholder='Selecione'
            style={{
                width: 300
            }}
            onChange={(event, data) => {
                const selected = laboratories.find(l => l.id === data.value)
                if (selected) onChange(selected)
            }}
            value={value?.id}
            options={laboratories.map(l => ({
                key: l.id,
                value: l.id,
                text: l.name
            }))}
        />
    )
}

export default UserLaboratorySelect
