import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import UseUser from '../../hooks/UseUser';
import { getUSerByUserId, isUserFollowingProfile, updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/Firbase';
import Skeleton from 'react-loading-skeleton';
import * as ROUTES from '../../constants/Routes'
import UserContext from './UserContext'
import FollowContext from '../../context/FollowContext';


function ProfileHeader({ photosCount, followerCount, followingCount, setFollowerCount }) {

    const { user } = UseUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);

    const { userr, dispatchFollowEvent } = useContext(FollowContext);

    const activeBtnFollow = user.username && user.username !== userr.username;
    const history = useHistory();

    const { dispatchUserEvent } = useContext(UserContext);

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, userr.userId);
            setIsFollowingProfile(isFollowing);
        }

        if (user.username && userr.userId) {
            isLoggedInUserFollowingProfile();
        }
    }, [user.username, userr.followers, userr.following, userr.userId]);

    const handleToggleFollow = async () => {
        setIsFollowingProfile(!isFollowingProfile);
        await updateLoggedInUserFollowing(user.docId, userr.userId, isFollowingProfile);
        await updateFollowedUserFollowers(userr.docId, user.userId, isFollowingProfile);
        let updatedUser = await getUSerByUserId(userr.userId)
        dispatchFollowEvent('UPDATE_FOLLOWER', updatedUser[0])
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
            profile: updatedUser
        })
        // dispatchFollowEvent('UPDATE_FOLLOWER', updatedUser);

    }

    const handleEditProfile = () => {
        history.push(`/profile/edit/${user.username}`);
    }

    return (
        <div className="md:grid md:grid-cols-3 md:gap-4 justify-between mx-4 md:mx-auto max-w-screen-lg mb-8 mt-16">
            <div className="container relative md:flex justify-center">
                {
                    (userr.username) && (
                        <img className="rounded-full h-40 w-40 z-0"
                            alt={`${userr.username} profile pic`}
                            src={userr.profilePicture ? userr.profilePicture : process.env.PUBLIC_URL + "/images/avatars/dali.jpg"} />
                    )}
            </div>
            <div className="flex items-center justify-center  flex-col col-span-2">
                <div className="container flex items-center mt-4">
                    <p className="text-2xl mr-4">{userr.username}</p>
                    {activeBtnFollow ? (
                        <button
                            type="button"
                            className="bg-blue-600 font-bold text-sm rounded text-white w-20 h-8"
                            onClick={handleToggleFollow}>
                            {isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </button>
                    ) :
                        (<button
                            type="button"
                            className="bg-gray-200 font-bold text-sm rounded text-gray-700 w-20 h-8"
                            onClick={handleEditProfile}>
                            Edit Profile
                        </button>)}
                </div>
                <div className="container flex mt-4">
                    {userr.followers === undefined || userr.following === undefined ? (
                        <Skeleton count={1} width={677} height={24} />
                    ) : (
                        <>
                            <p className="mr-10">
                                <span className="font-bold">{photosCount}</span>
                                {`  ${photosCount === 1 ? 'post' : 'posts'}`}
                            </p>
                            <p className="mr-10 cursor-pointer" onClick={() => { dispatchUserEvent('SHOW_FOLLOWERS', userr.followers) }}>
                                <span className="font-bold">{userr.followers.length}</span>
                                {`  ${userr.followers.length === 1 ? 'follower' : 'followers'}`}
                            </p>
                            <p className="mr-10 cursor-pointer" onClick={() => { dispatchUserEvent('SHOW_FOLLOWING', userr.following) }}>
                                <span className="font-bold">{userr.following.length}</span>
                                {`  following`}
                            </p>
                        </>
                    )
                    }
                </div>
                <div className="container mt-4">
                    <p className="font-medium text-gray-700">
                        {!userr.fullName ? <Skeleton count={1} height={24} /> : userr.fullName}
                    </p>
                </div>
                <div className="container mt-1">
                    <p className="text-gray-700">
                        {userr.bio}
                    </p>
                </div>
            </div>
        </div>
    )
}

ProfileHeader.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
}

export default ProfileHeader
