import { publicRequest } from '../../requestMethods'
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest().post("/user/login", user);
        dispatch(loginSuccess(res.data));
        console.log(res.data)
    } catch {
        dispatch(loginFailure());
    }
};