import React, {useState, useContext} from 'react';
import classes from './Login.module.css';
import { useNavigate } from "react-router-dom";
import LoginContext from '../../store/login-context';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginError, setIsLoginError] = useState(false);
    const loginCtx = useContext(LoginContext);

    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();
        if(userName === 'Karthi' && password === 'Vino'){
            loginCtx.addUser({Uid: 1, UserName: 'Karthi'});
            navigate('/home');
        } else {
            setIsLoginError(true);
        }
    }

    const resetHandler = () => {
        setUserName('');
        setPassword('');
        setIsLoginError(false);
    }

    return <>
            <div className={classes['login-container']}>
                <h1>Login to FoodFactory</h1>
                <form onSubmit={submitHandler}>
                <div>
                    <label>Username</label>
                    <input type="text" value={userName} onChange={(event)=>setUserName(event.target.value)}></input>
                </div>
                <div className={classes.password}>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)}></input>
                </div>
                <div>
                    <button type='button' onClick={resetHandler}>Reset</button>
                    <button type='submit'>Login</button>
                </div>
                </form>
                {isLoginError && <span className={classes.error}>Username or Password is Incorrect</span>}
            </div>    
    </>
}

export default Login;