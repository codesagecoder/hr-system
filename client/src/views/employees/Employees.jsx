import './employees.css'
import List from '../../components/list/List'
import Pagination from '../../components/pagination/Pagination'
import Filter from '../../components/filter/Filter'
import Search from '../../components/search/Search'
import { useState, useEffect } from 'react'
import { userRequest } from '../../requestMethods'

const tableHeaders = [
    'First Name',
    'Last Name',
    'Telephone Number',
    'Email Address',
    'Manager',
]
export default function Employees({ isAdmin }) {

    const [employees, setEmployees] = useState({ count: 0, employees: [], managers: [] })
    const [perPage, setPerPage] = useState(5)
    const [page, setPage] = useState(1)
    const [statusFilter, setStatusFilter] = useState('')
    const [departmentFilter, setDepartmentFilter] = useState('')

    function mappedManagers() {

        return [...employees.managers.map((mgr) => ({
            name: `${mgr.firstName} ${mgr.lastName}`,
            value: mgr.managingDepartments[0]
        })), { name: 'All', value: '' }]
    }

    function mappedDepartments() {
        let dpts = new Set();
        employees.employees.forEach((emp) => {
            emp.managingDepartments.forEach((dpt) => {
                dpts.add(dpt)
            })
            emp.departments.forEach((dpt) => {
                dpts.add(dpt)
            })
        })
        let dptsArr = [{ name: 'All', value: '' }];
        dpts.forEach((val) => {
            dptsArr.push({ name: val, value: val })
        })
        return dptsArr
    }

    async function getEmployees() {
        try {
            const res = await userRequest().get(`/employee?page=${page}&per_page=${perPage}&status=${statusFilter}&department_name=${departmentFilter}`);
            setEmployees(res.data)
        } catch { }
    }

    useEffect(() => { getEmployees() }, [page, perPage])

    return (
        <>
            <h1>Employees</h1>

            <Filter
                managers={mappedManagers()}
                isAdmin={isAdmin}
                onFilter={getEmployees}
                type='employees'
                departments={mappedDepartments()}
                setDepartment={setDepartmentFilter}
                setStatus={setStatusFilter}
            />
            <Search setPerPage={setPerPage} />
            <List setValues={setEmployees} isAdmin={isAdmin} type='employee' headers={tableHeaders} body={employees.employees} />
            <Pagination perPage={perPage} count={employees.count} setPage={setPage} />
        </>
    )
}