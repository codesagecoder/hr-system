import React from 'react'
import { useState, useEffect } from 'react'
import Dropdown from '../dropdown/Dropdown'
import './filter.css'

export default function Filter({ type, onFilter, departments, setDepartment, setStatus, isAdmin, managers }) {
    const [showFilters, setShowFilters] = useState(false)
    const [overflow, setOverflow] = useState(false)
    const statusOptions = [
        { name: 'All', value: '' },
        { name: 'Active', value: true },
        { name: 'Inactive', value: false }
    ]

    useEffect(() => {
        if (showFilters !== overflow) {
            if (overflow) {
                setOverflow(false)
            } else {
                setTimeout(() => { setOverflow(true) }, 400)
            }
        }
    }, [showFilters, overflow])
    return (
        <div className="filter filter--card" style={{ maxHeight: !showFilters ? '1rem' : '30rem', overflow: overflow ? 'visible' : 'hidden' }}>
            <i className="fa fa-chevron-down filter__dropdown-icon" aria-hidden="true" onClick={() => setShowFilters(!showFilters)}></i>
            <br />
            {type === 'employees' &&
                <span className="filter__option">
                    <label className="filter__label">Department</label>
                    <Dropdown
                        handleSelection={setDepartment}
                        width='20rem'
                        options={departments}
                        placeholder='-select-'
                    />
                </span>
            }
            {type === 'employees' && isAdmin &&
                <span className="filter__option">
                    <label className="filter__label">Manager</label>
                    <Dropdown
                        handleSelection={setDepartment}
                        width='20rem'
                        options={managers}
                        placeholder='-select-'
                    />
                </span>
            }
            <span className="filter__option">
                <label className="filter__label">Status</label>
                <Dropdown
                    handleSelection={setStatus}
                    width='20rem'
                    options={statusOptions}
                    placeholder='Active / Inactive'
                />
            </span>
            <button className="filter__btn" onClick={onFilter}>
                <i className="fa fa-filter" aria-hidden="true"></i>
                filter
            </button>
        </div>
    )
}