const AuthReducer = (state, action) => {
    switch (action.type) {
        case "START":
            return {
                employees: [],
                isFetching: true,
                error: false
            };
        case "SUCCESS":
            return {
                employees: action.payload,
                isFetching: false,
                error: false
            };
        case "FAILURE":
            return {
                employees: [],
                isFetching: false,
                error: true
            };
        default:
            return { ...state }
    }
}

export default AuthReducer