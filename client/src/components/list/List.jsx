import './list.css'
import { Link } from "react-router-dom";
import { userRequest } from '../../requestMethods'

export default function List({ headers, body, type, isAdmin, setValues }) {

    async function setStatus(id, idx, status) {
        try {
            await userRequest().put(`/${type}?${type === 'department' ? 'departmentId' : 'userId'}=${id}`, { status })
            if (type === 'employee') {
                setValues((prev) => {
                    let emps = prev.employees
                    emps[idx].status = status
                    return { ...prev, employees: emps }
                })
            } else {
                setValues((prev) => {
                    let dpts = prev.departments
                    dpts[idx].status = status
                    return { ...prev, departments: dpts }
                })
            }
        } catch { }

    }

    return (
        <table className="list list--card">
            <thead>
                <tr>
                    {isAdmin &&
                        <th scope="col" className="list__header">
                            <p>Actions</p>
                        </th>
                    }
                    {headers.map((header) => <th key={header} scope="col" className="list__header">
                        <p>{header}</p>
                    </th>
                    )}
                    <th scope="col" className="list__header">
                        <p>Status</p>
                    </th>
                </tr>
            </thead>
            <tbody>

                {body.map((elem, i) => <tr className="table__row" key={i}>
                    {isAdmin &&
                        <td>
                            <Link className='list__edit-link' to={`/${type}/edit/${elem._id}`}><u>Edit</u></Link>
                            <button onClick={() => setStatus(elem._id, i, !elem.status)} className='list__btn'><u>{elem.status ? 'Deactivate' : 'Activate'}</u></button>
                        </td>
                    }
                    {type === 'employee' ? <>
                        <td>
                            <p>{elem.firstName}</p>
                        </td>
                        <td>
                            <p>{elem.lastName}</p>
                        </td>
                        <td>
                            <p>{elem.telNumber}</p>
                        </td>
                        <td>
                            <p>{elem.email}</p>
                        </td>
                        <td>
                            <p>{elem.departments[0] || 'N/A'}</p>
                        </td>
                    </> :
                        <>
                            <td>
                                <p>{elem.name}</p>
                            </td>
                            <td>
                                <p>{elem.manager.firstName + ' ' + elem.manager.lastName}</p>
                            </td>
                        </>}
                    <td>
                        <p>{elem.status ? 'Active' : 'Inactive'}</p>
                    </td>
                </tr>
                )}
            </tbody>
        </table >
    )
}