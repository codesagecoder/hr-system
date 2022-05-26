import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { useState, useEffect } from 'react'
import { userRequest, } from '../../requestMethods'
import Dropdown from '../../components/dropdown/Dropdown'
import { Link } from "react-router-dom";
import './employee-editor.css'

export default function EmployeeEditor({ isAdmin }) {
  const path = useLocation().pathname.split("/")[3];
  const history = useHistory();
  const [managers, setManagers] = useState([])
  const [employee, setEmployee] = useState({
    status: null,
    firstName: '',
    lastName: '',
    telNumber: '',
    email: '',
    departments: []
  })

  useEffect(() => {
    async function getEmployee() {
      try {
        const res = await userRequest().get(`/employee/by-id/${path}`);
        setEmployee(res.data.employee)
        const res2nd = await userRequest().get(`/department/all`);
        setManagers(res2nd.data.managers)
        console.log({ res, res2nd })
      } catch { }
    }

    async function getOnlyManagers() {
      try {
        const res2nd = await userRequest().get(`/department/all`);
        setManagers(res2nd.data.managers)
      } catch { }
    }
    if (path) {
      getEmployee()
    } else {
      getOnlyManagers()
    }
  }, [path])

  async function onSave() {
    if (path) {
      try {
        const res = await userRequest().put(`/employee?userId=${path}`, employee);
        window.location.reload(false);
      } catch { }
    } else {
      try {
        const res = await userRequest().post(`/employee`, employee);
        history.push("/employees")
      } catch { }
    }
  }

  function mapManagers() {
    let arr = [{
      name: 'none',
      value: null
    }];
    managers.forEach((mgr) => arr.push({
      name: `${mgr.manager.firstName} ${mgr.manager.lastName}`,
      value: mgr.name
    }))
    return arr
  }
  function findManager(department) {

    let manager;
    for (let mgr in managers) {
      if (managers[mgr].name === department)
        manager = `${managers[mgr].manager.firstName} ${managers[mgr].manager.lastName}`
    }
    return manager
  }

  function setVal(e) {
    setEmployee({ ...employee, [e.target.name]: e.target.value })
  }

  return (
    <>
      <h1>{path ? 'Edit' : 'Create'}</h1>
      <div className="editor">
        <span className="editor__fields">
          <label className="editor__label">*Name</label>
          <input name="firstName" className="editor__input" type="text" onChange={setVal} value={employee.firstName} />
        </span>
        <span className="editor__fields">
          <label className="editor__label">*Surname</label>
          <input name="lastName" className="editor__input" type="text" onChange={setVal} value={employee.lastName} />
        </span>
        <span className="editor__fields">
          <label className="editor__label">*Telephone Number</label>
          <input name="telNumber" className="editor__input" type="tel" onChange={setVal} value={employee.telNumber} />
        </span>
        <span className="editor__fields">
          <label className="editor__label">*Email Address</label>
          <input name="email" className="editor__input" type="email" onChange={setVal} value={employee.email} />
        </span>
        {isAdmin && <>
          <span className="editor__fields">
            <label className="editor__label">*Manager</label>
            <Dropdown
              handleSelection={(val) => setEmployee({ ...employee, departments: val === null ? [] : [val] })}
              width='16rem'
              options={mapManagers()}
              placeholder={employee.departments.length > 0 ?
                `${findManager(employee.departments[0])}` : '-select-'}
            />
          </span>
          <span className="editor__fields">
            <label className="editor__label">*Status</label>
            <Dropdown
              handleSelection={(val) => setEmployee({ ...employee, status: val })}
              width='16rem'
              options={[
                { name: 'Active', value: true },
                { name: 'Inactive', value: false }
              ]}
              placeholder={employee.status === null ? '- select -' : employee?.status ? 'Active' : 'Inactive'}
            />
          </span>
        </>
        }


        <span className="editor__buttons">
          <button className="editor__btn" onClick={onSave}>Save</button>
          <button onClick={() => history.push("/employees")} className="editor__btn">Cancel</button>
        </span>
      </div>
    </>
  )
}
