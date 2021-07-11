import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { getUserByUsername } from '../services/Firbase';
import * as ROUTES from '../constants/Routes';
import Header from '../components/Header';
import UserProfile from '../components/profile/ProfileIndex';

function Profile() {

    const { username } = useParams();
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {

        async function checkUserExist() {
            const returnedUser = await getUserByUsername(username);

            if (returnedUser.length > 0) {
                setUser(returnedUser[0]);
                document.title = `${returnedUser[0].fullName} (@${username})`;
            } else {
                history.push(ROUTES.NOT_FOUND)
            }
        }
        checkUserExist();
    }, [username, history])

    return user?.username ? (
        <>
            <Header />
            <div className=" mx-auto max-w-screen-lg">
                <div className="mx-auto mx-w-screen-lg">
                    <UserProfile user={user} />
                </div>
            </div>
        </>
    ) : null;
}

export default Profile
