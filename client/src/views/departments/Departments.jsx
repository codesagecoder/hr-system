import './departments.css'
import List from '../../components/list/List'
import Pagination from '../../components/pagination/Pagination'
import Filter from '../../components/filter/Filter'
import Search from '../../components/search/Search'
import { useState, useEffect } from 'react'
import { userRequest } from '../../requestMethods'

const tableHeaders = [
    'Name',
    'Manager',
]

export default function Departments({ isAdmin }) {
    const [departments, setDepartments] = useState({ departments: [], count: 0 });
    const [perPage, setPerPage] = useState(5)
    const [page, setPage] = useState(1)
    const [statusFilter, setStatusFilter] = useState('')

    async function getDepartments() {
        try {
            const res = await userRequest().get(`/department?page=${page}&per_page=${perPage}&status=${statusFilter}`);
            setDepartments(res.data)
        } catch { }
    }

    useEffect(() => { getDepartments() }, [page, perPage])

    return (
        <>
            <h1>Departments</h1>

            <Filter
                type='departments'
                setStatus={setStatusFilter}
                isAdmin={isAdmin}
                onFilter={getDepartments}
            />
            <Search setPerPage={setPerPage} />
            <List setValues={setDepartments} type='department' headers={tableHeaders} body={departments.departments} isAdmin={isAdmin} />
            <Pagination setPage={setPage} perPage={perPage} count={departments.count} />
        </>
    )
}
