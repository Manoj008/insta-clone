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
        <div className="grid md:grid-cols-8 md:gap-4 items-center">
            <div className="block  md:flex md:col-span-6 items-center justify-between md:px-2">
                <Link to={`/profile/${username}`} className="md:flex md:items-center text-center w-10 md:w-full">
                    <img
                        className="rounded-full w-10 h-10  mx-4 md:mx-0 md:pd-0"
                        src={suggestedUserPic ? suggestedUserPic : process.env.PUBLIC_URL + "/images/avatars/dali.jpg"}
                        alt="user profile pic"
                    />
                    <p className="font-bold text-sm md:mx-3 hidden md:block">{username.length > 8 ? username.substring(0, 8) + '.' : username}</p>
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
