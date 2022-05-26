export const getDepartmentsStart = () => ({
    type: "START",
});

export const getDepartmentsSuccess = (departments) => ({
    type: "SUCCESS",
    payload: departments
});

export const getDepartmentsFailure = () => ({
    type: "FAILURE",
});