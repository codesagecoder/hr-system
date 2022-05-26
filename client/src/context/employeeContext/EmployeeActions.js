export const getEmployeesStart = () => ({
    type: "START",
});

export const getEmployeesSuccess = (employees) => ({
    type: "SUCCESS",
    payload: employees
});

export const getEmployeesFailure = () => ({
    type: "FAILURE",
});