import React, { useEffect } from 'react'
import {
    Routes,
    Route,
    Link,
    useNavigate,
    useLocation,
} from "react-router-dom";
import {
    Button,
} from 'semantic-ui-react'
import LaboratoriesList from './LaboratoriesList';
import UserForm from './UserForm';
import UsersPage from './UsersPage';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, logoutUser, setCurrentUser } from '../actions/users';
import { getLaboratories } from '../actions/laboratories';
import ExamsPage from './ExamsPage';
import { getExams } from '../actions/exams';
import ExamForm from './ExamForm';
import ProductivityPage from './ProductivityPage';
import { RootState } from '../reducers';
import UserProfile from '../types/UserProfile';
import ConsolidatedPage from './ConsolidatedPage';

const MainPage = () => {
    const { currentUser } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const logout = () => {
        sessionStorage.removeItem("user")
        dispatch(logoutUser())
        navigate("/")
    }
    useEffect(() => {
        dispatch(getUsers())
        dispatch(getLaboratories())
        dispatch(getExams())
        const response = JSON.parse(sessionStorage.getItem("user") + "")
        dispatch(setCurrentUser(response.user, response.token))
    }, [])
    return (
        <div>
            <div style={{
                position: 'fixed',
                height: 50,
                background: '#112d4e',
                top: 0,
                left: 0,
                bottom: 'auto',
                width: '100%',
                borderBottom: '1px solid #3f72af',
                color: '#f9f7f7',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 5,
                zIndex: 1
            }}>
                <div style={{ flex: 1, color: '#f9f7f7', fontSize: 24, fontWeight: 'bold' }}>ProduLabs</div>
                <div style={{
                    flex: 4,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    {/* <Link to="/" style={{ color: location.pathname === '/' ? '3f72af' : '#f9f7f7', fontSize: 16, fontWeight: 'bold' }}>Início</Link> */}
                    <Link to="/produtividade" style={{ color: location.pathname === '/produtividade' ? '3f72af' : '#f9f7f7', fontSize: 16, fontWeight: 'bold' }}>Produtividade</Link>
                    {/* <Link to="/consolidado" style={{ color: location.pathname === '/consolidado' ? '3f72af' : '#f9f7f7', fontSize: 16, fontWeight: 'bold' }}>Consolidado</Link> */}
                    <Link to="/laboratorios" style={{ color: location.pathname === '/laboratorios' ? '3f72af' : '#f9f7f7', fontSize: 16, fontWeight: 'bold' }}>Laboratórios</Link>
                    <Link to="/exames" style={{ color: location.pathname === '/exames' ? '3f72af' : '#f9f7f7', fontSize: 16, fontWeight: 'bold' }}>Exames</Link>
                    {currentUser?.userProfile === UserProfile.ADMIN
                        && <Link to="/usuarios" style={{ color: location.pathname === '/usuarios' ? '3f72af' : '#f9f7f7', fontSize: 16, fontWeight: 'bold' }}>Usuários</Link>
                    }
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={logout} icon='log out' labelPosition='left' content='Sair' style={{ backgroundColor: '#3f72af', color: '#f9f7f7' }} />
                </div>
            </div>
            <div style={{ margin: 50, marginTop: 70 }}>
                <Routes>
                    <Route path="/usuarios" element={<UsersPage />} />
                    <Route path="/usuarios/adicionar" element={<UserForm />} />
                    <Route path="/usuarios/:id" element={<UserForm />} />
                    <Route path="/laboratorios" element={<LaboratoriesList />} />
                    <Route path="/exames/adicionar" element={<ExamForm />} />
                    <Route path="/exames/:id" element={<ExamForm />} />
                    <Route path="/exames" element={<ExamsPage />} />
                    <Route path="/produtividade" element={<ProductivityPage />} />
                    <Route path="/consolidado" element={<ConsolidatedPage />} />
                    <Route path="/" element={<ProductivityPage />} />
                </Routes>
            </div>
        </div>
    )
}
export default MainPage
