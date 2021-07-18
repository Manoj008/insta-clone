import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import FollowContext from '../../context/FollowContext';
import UseUser from '../../hooks/UseUser';
import { getUSerByUserId, updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/Firbase';
import UserContext from './UserContext';

function FollowerFollowingProfile({ profileDocId, username, suggestedUserPic, profileId, userId, loggedInUserDocId, isFollow, setProfile }) {
    const [followed, setFollowed] = useState(isFollow);
    const { followers, followings, dispatchUserEvent } = useContext(UserContext);

    const { user } = UseUser();

    const { userr, dispatchFollowEvent } = useContext(FollowContext);


    async function handleFollowUser() {
        setFollowed(!followed)
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, followed);
        await updateFollowedUserFollowers(profileDocId, userId, followed);
        let updatedUser = await getUSerByUserId(userId)
        setProfile({
            profile: updatedUser[0]
        })

        dispatchFollowEvent('UPDATE_FOLLOWER', updatedUser[0])





    }

    const handleClick = (e) => {
        dispatchUserEvent('HIDE_FOLLOWING', {});
        dispatchUserEvent('HIDE_FOLLOWERS', {});
    }

    return (

        <div className=" h-full flex  items-center  align-items justify-between z-20 border-black">
            <div className=" justify-between mr-3 flex" onClick={handleClick}>
                <Link to={`/profile/${username}`} className=" mr-3 flex items-center align-center" >
                    <img
                        className="rounded-full w-10 h-10 mr-3 "
                        src={suggestedUserPic ? suggestedUserPic : process.env.PUBLIC_URL + "/images/avatars/dali.jpg"}
                        alt="user profile pic"
                    />

                    <p className="font-bold  text-sm flex">{username}</p>
                </Link>
            </div>
            <div>
                <button
                    className="text-xs font-bold text-blue-500"
                    type="button"
                    onClick={handleFollowUser}
                >{profileDocId !== user.docId ? (followed ? 'Unfollow' : 'Follow') : null}
                </button>
            </div>
        </div >
    )
}

export default FollowerFollowingProfile
