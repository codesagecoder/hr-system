import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { logout } from "../../context/authContext/AuthActions";
import './sidebar.css';

export default function SideBar({ admin }) {
    const { dispatch } = useContext(AuthContext)

    return (
        <aside className="sidebar">
            <div className="sidebar__logo-container">
                <h2 className="sidebar__logo">HRS</h2>
                <h3>HR SYSTEM</h3>
                <p>{admin ? 'Admin' : 'User'}</p>
            </div>
            <div className="sidebar__links">
                <Link to="/employees" className="sidebar__link">
                    <i className="fa fa-users sidebar__link__icon" aria-hidden="true"></i>
                    <h2>Employees</h2>
                </Link>
                {!admin && <Link to='/employee/edit/self' className="sidebar__link">
                    <i className="fa fa-pencil-square-o sidebar__link__icon" aria-hidden="true"></i>
                    <h2>Edit Self</h2>
                </Link>}
                {admin &&
                    <>
                        <Link to="/departments" className="sidebar__link">
                            <i className="fa fa-tasks sidebar__link__icon" aria-hidden="true"></i>
                            <h2>Departments</h2>
                        </Link>
                        <Link to="/employee/create" className="sidebar__link">
                            <i className="fa fa-user-plus sidebar__link__icon" aria-hidden="true"></i>
                            <h2>Create Employee</h2>
                        </Link>
                        <Link to="/department/create" className="sidebar__link">
                            <i className="fa fa-plus-circle sidebar__link__icon" aria-hidden="true"></i>
                            <h2>Create Department</h2>
                        </Link>
                    </>
                }
            </div>
            <button onClick={() => dispatch(logout())} className="sidebar__logout__btn">Logout</button>
        </aside >
    )
}
