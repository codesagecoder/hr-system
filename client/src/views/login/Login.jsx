import { useContext, useState } from "react";
import "./login.css";
import { login } from "../../context/authContext/apiCalls"
import { AuthContext } from "../../context/authContext/AuthContext";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = useContext(AuthContext)

    async function handleLogin(e) {
        e.preventDefault()
        login({ username, password }, dispatch)
    }
    return (
        <form className='login__form' onSubmit={handleLogin}>
            <h1 className='login__header'>Login</h1>

            <div className="login__input-fields">
                <h2 className='login__label'>Username</h2>
                <input type="email" onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div className="login__input-fields">
                <h2 className='login__label'>Password</h2>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className='login__btn'>Login</button>
        </form>
    )

}
