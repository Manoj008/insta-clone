import { useContext, useEffect, useState } from 'react'
import UserContext from '../context/User';
import { getUSerByUserId } from '../services/Firbase';

function UseUser() {
    const [activeUser, setActiveUser] = useState({});
    const { user } = useContext(UserContext);

    useEffect(() => {
        async function getUSerObjectByUserId() {
            const [response] = await getUSerByUserId(user.uid);
            setActiveUser(response);
        }
        if (user?.uid) {
            getUSerObjectByUserId();
        }
    }, [user])

    return { user: activeUser };

}

export default UseUser;


