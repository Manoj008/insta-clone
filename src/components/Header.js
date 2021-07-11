import React, { useContext, useEffect } from 'react'
import FirebaseContext from '../context/Firebase';
import UserContext from '../context/User';
import * as ROUTES from '../constants/Routes';
import { Link } from 'react-router-dom';
import UseUser from '../hooks/UseUser';

function Header() {
    const { firebase } = useContext(FirebaseContext);
    const { user } = UseUser();

    useEffect(() => {

    }, [user])


    return (
        <div className="py-2">
            <header className="h-16 bg-white border-b border-gray-500 mb-8 fixed top-0 w-full">
                <div className="container mx-auto max-w-screen-lg h-full ">
                    <div className="flex justify-between h-full">
                        <div className="text-gray-700 text-center flex items-center alignItems cursor-pointer">
                            <h1 className="flex justify-center w-full">
                                <Link to={ROUTES.DASHBOARD} aria-label="Instagram-logo">
                                    <img src={"/images/logo.png"} alt="Instagram-logo" className="mt-2 w-6/12" />
                                </Link>
                            </h1>
                        </div>
                        <div className="text-gray-700 text-center gap-4 flex items-center align-items">
                            {user ? (
                                <>
                                    <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </Link>
                                    <Link to={ROUTES.LOGIN}>
                                        <button type="button"
                                            title="Sign Out"
                                            onClick={() => {
                                                firebase.auth().signOut()

                                            }}
                                            onKeyDown={(event) => {
                                                if (event.key === 'Enter') {
                                                    console.log(firebase.auth().signOut());
                                                }
                                            }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </button>
                                    </Link>
                                    <Link to={`/profile/${user.username}`}>
                                        <div className="flex items-center cursor-pointer">

                                            <img className="rounded-full h-8 w-8"
                                                alt={`${user.displayName} profile `}
                                                src={user.profilePicture ? user.profilePicture : "/images/avatars/dali.jpg"}
                                            />

                                        </div>
                                    </Link>
                                </>
                            )
                                : (
                                    <>
                                        <Link to={ROUTES.LOGIN}>
                                            <button type="button" className="m-2 bg-blue-500 text-white font-bold text-sm rounded w-20 h-8">
                                                Login
                                        </button>
                                        </Link>
                                        <Link to={ROUTES.SIGNUP}>
                                            <button type="button" className="m-2 bg-white text-blue-500 border border-blue-500 font-bold text-sm rounded w-20 h-8 ">
                                                SignUp
                                        </button></Link>
                                    </>
                                )
                            }
                        </div>
                    </div>

                </div>
            </header>
        </div>
    )
}

export default Header
