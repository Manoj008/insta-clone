import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/Firbase';

function SuggestedProfile({ profileDocId, username, suggestedUserPic, profileId, userId, loggedInUserDocId }) {

    const [followed, setFollowed] = useState(false);

    async function handleFollowUser() {
        setFollowed(true)
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
        await updateFollowedUserFollowers(profileDocId, userId, false);
    }

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="block md:flex items-center justify-between mr-3">
                <img
                    className="rounded-full w-10 h-10 mr-3"
                    src={suggestedUserPic ? suggestedUserPic : process.env.PUBLIC_URL + "/images/avatars/dali.jpg"}
                    alt="user profile pic"
                />
                <Link to={`/profile/${username}`}>
                    <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
            <div>
                <button
                    className="text-xs font-bold text-blue-500 hidden md:block"
                    type="button"
                    onClick={handleFollowUser}
                >
                    Follow
                </button>
            </div>
        </div>
    ) : (
        null
    )
}

SuggestedProfile.propTypes = {
    profileDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired,

}

export default SuggestedProfile
