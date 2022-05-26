import { userRequest } from '../../requestMethods'
import { getEmployeesFailure, getEmployeesStart, getEmployeesSuccess } from "./EmployeeActions";

export const getEmployees = async (queries, dispatch) => {
    dispatch(getEmployeesStart());
    try {
        const res = await userRequest().get(`/employee?page=${queries.page}&per_page=${queries.per_page}&status=${queries.status}&department_name=${queries.department_name}`);
        dispatch(getEmployeesSuccess(res.data));
    } catch {
        dispatch(getEmployeesFailure());
    }
};