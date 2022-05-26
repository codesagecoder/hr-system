import EmployeeReducer from "./EmployeeReducer"
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    employees: [],
    isFetching: false,
    error: false,
}

export const EmployeeContext = createContext(INITIAL_STATE);

export const EmployeeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EmployeeReducer, INITIAL_STATE)

    return <EmployeeContext.Provider
        value={{ employees: state.employees, isFetching: state.isFetching, error: state.error, dispatch }}>
        {children}
    </EmployeeContext.Provider>
}