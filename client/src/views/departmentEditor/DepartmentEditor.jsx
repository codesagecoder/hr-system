import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { useState, useEffect } from 'react'
import { userRequest, } from '../../requestMethods'
import Dropdown from '../../components/dropdown/Dropdown'
import './department-editor.css'

export default function DepartmentEditor() {

  const path = useLocation().pathname.split("/")[3];
  const history = useHistory();

  const [department, setDepartment] = useState({
    status: null,
    manager: {
      _id: null,
      firstName: '',
      lastName: '',
    },
    name: ''
  })
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    async function getDepartment() {
      try {
        const res = await userRequest().get(`/department/by-id/${path}`);
        setEmployees(res.data.employees)
        setDepartment(res.data.department)
      } catch { }
    }

    async function getOnlyEmployees() {
      try {
        const res = await userRequest().get(`/employee/all`);
        setEmployees(res.data.employees)
      } catch { }
    }
    if (path) {
      getDepartment()
    } else {
      getOnlyEmployees()
    }
  }, [path])

  async function onSave() {
    if (path) {
      try {
        const res = await userRequest().put(`/department?departmentId=${path}`, department);
        window.location.reload(false);
      } catch { }
    } else {
      try {
        const res = await userRequest().post(`/department`, department);
        history.push("/departments")
      } catch { }

    }
  }

  function mapEmployees() {
    let arr = [];
    employees.forEach((emp) => arr.push({
      name: `${emp.firstName} ${emp.lastName}`,
      value: emp
    }))
    return arr
  }

  function setName(e) {
    setDepartment({ ...department, name: e.target.value })
  }

  return (
    <>
      <h1>{path ? 'Edit' : 'Create'}</h1>
      <div className="editor">
        <span className="editor__fields">
          <label className="editor__label">*Name</label>
          <input className="editor__input" type="text" value={department.name} onChange={setName} />
        </span>
        <span className="editor__fields">
          <label className="editor__label">*Manager</label>
          <Dropdown
            handleSelection={(val) => setDepartment({ ...department, manager: val })}
            width='16rem'
            options={mapEmployees()}
            placeholder={department._id ? `${department.manager.firstName} ${department.manager.lastName}` : '-select-'}
          />
        </span>
        <span className="editor__fields">
          <label className="editor__label">*Status</label>
          <Dropdown
            handleSelection={(val) => setDepartment({ ...department, status: val })}
            width='16rem'
            options={[
              { name: 'Active', value: true },
              { name: 'Inactive', value: false }
            ]}
            placeholder={department.status === null ? '- select -' : department?.status ? 'Active' : 'Inactive'}
          />
        </span>
        <span className="editor__buttons">
          <button className="editor__btn" onClick={onSave}>Save</button>
          <button className="editor__btn" onClick={() => history.push("/departments")}>Cancel</button>
        </span>
      </div>
    </>
  )
}