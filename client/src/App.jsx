import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from './context/authContext/AuthContext'
import Employees from './views/employees/Employees';
import Departments from './views/departments/Departments';
import EmployeeEditor from './views/employeeEditor/EmployeeEditor';
import DepartmentEditor from './views/departmentEditor/DepartmentEditor';
import Login from './views/login/Login'
import Sidebar from './components/sidebar/SideBar'
import React from 'react'
import "./app.css";

export default function App() {
    const { user } = useContext(AuthContext);

    return (
        <main>
            <section className={`glass ${user ? '' : 'glass--login'}`}>

                <Router>
                    <Switch>
                        <Route path="/login">{!user ? <Login /> : <Redirect to="/employees" />}</Route>
                        {user ? (
                            <>
                                <Sidebar admin={user.isAdmin} />
                                <div className="view__container">
                                    <Route exact path="/"> <Redirect to="/employees" /></Route>
                                    <Route path="/employees"><Employees isAdmin={user.isAdmin} /></Route>
                                    <Route path="/departments"><Departments isAdmin={user.isAdmin} /></Route>
                                    <Route path="/employee/edit/:id"><EmployeeEditor isAdmin={user.isAdmin} /></Route>
                                    <Route path="/department/edit/:id">{user.isAdmin ? <DepartmentEditor isAdmin={user.isAdmin} /> : <Redirect to="/employees" />}</Route>
                                    <Route path="/employee/create">{user.isAdmin ? <EmployeeEditor isAdmin={user.isAdmin} /> : <Redirect to="/employees" />}</Route>
                                    <Route path="/department/create">{user.isAdmin ? <DepartmentEditor isAdmin={user.isAdmin} /> : <Redirect to="/employees" />}</Route>
                                </div>
                            </>)
                            :
                            <Redirect to="/login" />
                        }
                    </Switch>
                </Router>
            </section>
            <div className="circle1"></div>
            <div className="circle2"></div>
        </main>
    )
}
