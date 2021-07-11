import { useContext, useEffect, useState } from 'react'
import UserContext from '../context/User';
import { getPhotos, getUSerByUserId } from '../services/Firbase';

function UsePhotos() {
    const [photos, setPhotos] = useState(null);
    const {
        user: { uid: userId = '' }
    } = useContext(UserContext)

    useEffect(() => {
        async function getTimelinePhotos() {
            let user = await getUSerByUserId(userId)
            let following;
            if (user) {
                [{ following }] = user;
            }
            let followedUserPhotos = [];

            if (following.length > 0) {
                followedUserPhotos = await getPhotos(userId, following);
            }
            followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
            setPhotos(followedUserPhotos);
        }

        getTimelinePhotos();
    }, [userId]);

    return { photos }
}

export default UsePhotos
