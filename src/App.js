import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Add from './pages/Add'
import Edit from './pages/Edit'
import {HomeLayout} from './components/HomeLayout'
import {ProtectedLayout} from "./components/ProtectedLayout";
import "./index.css"

export default function App() {
    return (
        <Routes>
            <Route element={<HomeLayout/>}>
                <Route path={'/'} element={<LoginPage/>}/>
            </Route>
            <Route path={'/admin'} element={<ProtectedLayout/>}>
                <Route path={''} element={<Dashboard/>}/>
                <Route path={'add'} element={<Add/>}/>
                <Route path={'edit/:id'} element={<Edit/>}/>
            </Route>
        </Routes>
    )
}
