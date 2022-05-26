import DepartmentReducer from "./DepartmentReducer"
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    departments: [],
    isFetching: false,
    error: false,
}

export const DepartmentContext = createContext(INITIAL_STATE);

export const DepartmentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DepartmentReducer, INITIAL_STATE)

    return <DepartmentContext.Provider
        value={{ departments: state.deparments, isFetching: state.isFetching, error: state.error, dispatch }}>
        {children}
    </DepartmentContext.Provider>
}