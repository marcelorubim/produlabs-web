import React, { ReactNode, useEffect } from 'react'
import {
    Switch,
    Route,
    Link,
    useHistory,
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
    const history = useHistory()
    const location = useLocation()
    const logout = () => {
        sessionStorage.removeItem("user")
        dispatch(logoutUser())
        history.push("/")
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
                    <Button onClick={logout} icon='log out' labelPosition='left' content='Sair' style={{ backgroundColor: '#3f72af', color: '#f9f7f7'}} />
                </div>

            </div>
            <div style={{ margin: 50, marginTop: 70 }}>
                <Switch>
                    <Route path="/usuarios" exact>
                        <UsersPage />
                    </Route>
                    <Route path="/usuarios/adicionar" exact>
                        <UserForm />
                    </Route>
                    <Route path="/usuarios/:id" exact>
                        <UserForm />
                    </Route>
                    <Route path="/laboratorios" exact>
                        <LaboratoriesList />
                    </Route>
                    <Route path="/exames/adicionar" exact>
                        <ExamForm />
                    </Route>
                    <Route path="/exames/:id" exact>
                        <ExamForm />
                    </Route>
                    <Route path="/exames" exact>
                        <ExamsPage />
                    </Route>
                    <Route path="/produtividade" exact>
                        <ProductivityPage />
                    </Route>
                    <Route path="/consolidado" exact>
                        <ConsolidatedPage />
                    </Route>
                    <Route path="/" exact>
                        <ProductivityPage />
                    </Route>
                </Switch>
            </div>

        </div>
    )
}
export default MainPage

interface IProps {
    children: ReactNode;
    path: string;
    // any other props that come into the component
}
