import user from './users'
import laboratories from './laboratories'
import exams from './exams'
import productivity from './productivity'
import { combineReducers } from 'redux'
import UserStoreState from '../types/UserStoreState'
import LaboratoryStoreState from '../types/LaboratoryStoreState'
import ExamStoreState from '../types/ExamStoreState'
import ProductivityStoreState from '../types/ProductivityStoreState'

interface SystemState {
    user: UserStoreState
    laboratories: LaboratoryStoreState,
    exams: ExamStoreState,
    productivity: ProductivityStoreState,
}

const rootReducer = combineReducers({
    user,
    laboratories,
    exams,
    productivity,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer