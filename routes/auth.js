import {useRef, useState, useEffect, useContext} from 'react';
import {AuthContext} from './context/AuthProvider';

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.handleLogin);


const LOGIN_URL = '../routes/auth';

const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }),
            { headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
        );
        console.log(JSON.stringify(response?.data));
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({user, pwd, roles, accessToken});
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No server response. Please try again later.');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing username/password.');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized.');
            } else {
                setErrMsg('Login Failed. Please try again.');
            }
            errRef.current.focus();
    }
}

    return (
        <>
        {sucess ? (
            <section>
                <h1>Success!</h1>
                <p>LoggedIn</p>
                <br />
                <p>
                    <a href="/reservation">Reservation</a>
                    <a href="/logout">Log Out</a>
                </p>
            </section>
        ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Log In</button>
                </form>
                <p>
                    Need an Account? <br />
                    <a href="/register">Register</a>
                </p>
        </section>
        )}
        </>
    )
}

export default Login
module.exports = router;

