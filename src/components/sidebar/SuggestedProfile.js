import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { updateLoggedInUserFollowing, updateFollowedUserFollowers } from '../../services/Firbase';

function SuggestedProfile({ profileDocId, username, profilePic, profileId, userId, loggedInUserDocId }) {

    const [followed, setFollowed] = useState(false);

    async function handleFollowUser() {
        setFollowed(true)
        await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
        await updateFollowedUserFollowers(profileDocId, userId, false);
    }

    return !followed ? (
        <div className="flex flex-row items-center align-items justify-between">
            <div className="flex items-center justify-between">
                <img
                    className="rounded-full w-8 flex mr-3"
                    src={profilePic ? profilePic : "/images/avatars/dali.jpg"}
                    alt="user profile pic"
                />
                <Link to={`/profile/${username}`}>
                    <p className="font-bold text-sm">{username}</p>
                </Link>
            </div>
            <div>
                <button
                    className="text-xs font-bold text-blue-500"
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
