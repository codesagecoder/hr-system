import { userRequest } from '../../requestMethods'
import { getDepartmentsFailure, getDepartmentsStart, getDepartmentsSuccess } from "./DepartmentActions";

export const getDepartments = async (queries, dispatch) => {
    dispatch(getDepartmentsStart());
    try {
        const res = await userRequest().get(`/department?page=${queries.page}&per_page=${queries.per_page}&status=${queries.status}`);
        dispatch(getDepartmentsSuccess(res.data));
    } catch {
        dispatch(getDepartmentsFailure());
    }
};