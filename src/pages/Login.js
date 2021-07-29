import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/Firebase';
import * as ROUTES from '../constants/Routes';
import Loader from '../components/Loader';


function Login() {

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [handleClick, setHandleClick] = useState(false);

    const isInvalid = email === '' || password === '';

    const handleLogin = async (e) => {
        e.preventDefault();
        setHandleClick(true);

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            history.push(ROUTES.DASHBOARD);

        }
        catch (error) {
            setEmail('');
            setPassword('');
            setError(error.message);
        }
    };


    useEffect(() => {
        document.title = 'Login-Insta'

    }, []);

    return (
        handleClick ? <Loader /> :
            <div className="container flex mx-auto max-w-screen-md items-center h-screen">
                <div className="flex flex-col w-2/3">
                    <img src={process.env.PUBLIC_URL + "/images/iphone-with-profile.jpg"} alt="Instgram" />
                </div>
                <div className="flex flex-col w-1/2">
                    <div className="flex justify-center items-center flex-col w-full bg-white p-8 mb-4 border border-gray-500 ">
                        <h1 className="flex justify-center w-full">
                            <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Instagram" className="my-4 w-2/3" />
                        </h1>
                        {error && <p className="mb-4 p-2 text-xs bg-red-200 text-black rounded">{error}</p>}

                        <form onSubmit={handleLogin} method="POST">
                            <input
                                aria-label="Enter your Email Address"
                                type="email"
                                placeholder="Email Address"
                                className="text-xs text-center bg-gray-50 w-full mr-3 py-5 px-4 h-1.5 
                        border border-gray-500 rounded mb-2"
                                onChange={({ target }) => setEmail(target.value)}
                                value={email}
                            />
                            <input
                                aria-label="Enter your Password"
                                type="password"
                                placeholder="Password"
                                className="text-xs text-center bg-gray-50 w-full mr-3 py-5 px-4 h-1.5
                        border border-gray-500 rounded mb-2"
                                onChange={({ target }) => setPassword(target.value)}
                                value={password}
                            />
                            <button
                                disabled={isInvalid}
                                type="submit"
                                className={`mt-1 w-full py-1 font-bold rounded bg-blue-500 text-white borderborder-blue-900
                         ${isInvalid && 'opacity-50'}`
                                }>LOGIN</button>
                        </form>
                    </div>
                    <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-500 ">
                        <p className="text-sm">Don't have an Account?{` `}
                            <Link to={ROUTES.SIGNUP} className="font-semibold text-blue-400">
                                Sign up
                        </Link></p>
                    </div>
                </div>
            </div >
    )
}

export default Login
