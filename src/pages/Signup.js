import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FirebaseContext from '../context/Firebase';
import * as ROUTES from '../constants/Routes';
import { doesUsernameExist, doesEmailExist } from '../services/Firbase';


function Signup() {

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState('');

    const isInvalid = email === '' || password === '' || confirmPass === '' || username === '' || fullName === '';

    const handleSignup = async (e) => {
        e.preventDefault();

        const usernameExist = await doesUsernameExist(username);
        const emailExist = await doesEmailExist(email);
        if (password !== confirmPass) {
            setError('Confirm Password does not matches with Password');
        } else {
            if (!usernameExist && !emailExist) {
                try {
                    const createdUserResult = await firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password);

                    await createdUserResult.user.updateProfile({
                        displayName: username
                    });
                    await firebase.firestore().collection('users').add({
                        userId: createdUserResult.user.uid,
                        username: username,
                        fullName: fullName,
                        email: email.toLowerCase(),
                        bio: "",
                        mobile: "",
                        gender: "",
                        profile: "",
                        following: [],
                        followers: [],
                        dateCreated: Date.now()
                    });
                    history.push(ROUTES.DASHBOARD);


                }
                catch (error) {
                    setEmail('');
                    setFullName('');
                    setUsername('');
                    setPassword('');
                    setConfirmPass('');
                    setError(error.message);
                }
            }
            else {
                if (emailExist) {
                    setError("This Email Address is already in use, please enter different Email Address")
                }
                else if (usernameExist) {
                    setError("This Username is already taken, Please choose a different username");
                }

            }
        }
    };


    useEffect(() => {
        document.title = 'Signup-Insta'

    }, []);

    return (
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

                    <form onSubmit={handleSignup} method="POST">
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
                            aria-label="Enter your Full Name"
                            type="text"
                            placeholder="Full Name"
                            className="text-xs text-center bg-gray-50 w-full mr-3 py-5 px-4 h-1.5 
                        border border-gray-500 rounded mb-2"
                            onChange={({ target }) => setFullName(target.value)}
                            value={fullName}
                        />
                        <input
                            aria-label="Enter your Username"
                            type="text"
                            placeholder="Userame"
                            className="text-xs text-center bg-gray-50 w-full mr-3 py-5 px-4 h-1.5 
                        border border-gray-500 rounded mb-2"
                            onChange={({ target }) => setUsername(target.value)}
                            value={username}
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
                        <input
                            aria-label="Confirm your Password"
                            type="password"
                            placeholder="Confirm Password"
                            className="text-xs text-center bg-gray-50 w-full mr-3 py-5 px-4 h-1.5
                        border border-gray-500 rounded mb-2"
                            onChange={({ target }) => setConfirmPass(target.value)}
                            value={confirmPass}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`mt-1 w-full py-1 font-bold rounded bg-blue-500 text-white borderborder-blue-900
                         ${isInvalid && 'opacity-50'}`
                            }>SIGN UP</button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-500 ">
                    <p className="text-sm">Already have an Account?{` `}
                        <Link to={ROUTES.LOGIN} className="font-semibold text-blue-400">
                            Login
                        </Link></p>
                </div>
            </div>
        </div >
    )
}

export default Signup;
