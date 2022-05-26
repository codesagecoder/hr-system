const AuthReducer = (state, action) => {
    switch (action.type) {
        case "START":
            return {
                departments: [],
                isFetching: true,
                error: false
            };
        case "SUCCESS":
            return {
                departments: action.payload,
                isFetching: false,
                error: false
            };
        case "FAILURE":
            return {
                departments: [],
                isFetching: false,
                error: true
            };
        default:
            return { ...state }
    }
}

export default AuthReducer