import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getUserByUsername } from '../services/Firbase';
import * as ROUTES from '../constants/Routes';
import Header from '../components/Header';
import UserProfile from '../components/profile/ProfileIndex';
import UserContext from '../components/profile/UserContext';
import FollowContext from '../context/FollowContext';

function Profile() {

    const { username } = useParams();
    const [userr, setUserr] = useState(null);
    const history = useHistory();


    useEffect(() => {

        async function checkUserExist() {
            const returnedUser = await getUserByUsername(username);

            if (returnedUser.length > 0) {
                setUserr(returnedUser[0]);
                document.title = `${returnedUser[0].fullName} (@${username})`;
            } else {
                history.push(ROUTES.NOT_FOUND)
            }
        }
        checkUserExist();
    }, [username, history])

    const dispatchFollowEvent = (actionType, payload) => {
        switch (actionType) {
            case 'UPDATE_FOLLOWER':
                setUserr(payload);
                return;
            default:
                return;
        }
    };


    return userr?.username ? (
        <>
            <Header />
            <FollowContext.Provider value={{ userr: userr, dispatchFollowEvent: dispatchFollowEvent }}>
                <div className=" mx-auto max-w-screen-lg">
                    <div className="mx-auto mx-w-screen-lg">
                        <UserProfile />
                    </div>
                </div>
            </FollowContext.Provider>
        </>
    ) : null;
}

export default Profile
