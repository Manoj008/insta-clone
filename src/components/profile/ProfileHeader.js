import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import UseUser from '../../hooks/UseUser';
import { isUserFollowingProfile, updateFollowedUserFollowers, updateLoggedInUserFollowing } from '../../services/Firbase';
import Skeleton from 'react-loading-skeleton';
import * as ROUTES from '../../constants/Routes'

function ProfileHeader({ photosCount, profile, followerCount, setFollowerCount }) {

    const { user } = UseUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== profile.username;
    const history = useHistory();

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profile.userId);
            setIsFollowingProfile(isFollowing);
        }

        if (user.username && profile.userId) {
            isLoggedInUserFollowingProfile();
        }
    }, [user.username, profile.userId, profile.followers, profile.following]);

    const handleToggleFollow = async () => {
        setIsFollowingProfile(!isFollowingProfile);
        await updateLoggedInUserFollowing(user.docId, profile.userId, isFollowingProfile);
        await updateFollowedUserFollowers(profile.docId, user.userId, isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
        })

    }

    const handleEditProfile = () => {
        history.push(`/profile/edit/${user.username}`);
    }

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg mb-16 mt-16">
            <div className="container flex justify-center">
                {
                    (profile.username) && (
                        <img className="rounded-full h-40 w-40 flex"
                            alt={`${profile.username} profile pic`}
                            src={profile.profilePicture ? profile.profilePicture : "/images/avatars/dali.jpg"} />
                    )}
            </div>
            <div className="flex items-center justify-center  flex-col col-span-2">
                <div className="container flex items-center ">
                    <p className="text-2xl mr-4">{profile.username}</p>
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
                            className="bg-gray-50 font-bold text-sm rounded text-gray-700 w-20 h-8"
                            onClick={handleEditProfile}>
                            Edit Profile
                        </button>)}
                </div>
                <div className="container flex mt-4">
                    {profile.followers === undefined || profile.following === undefined ? (
                        <Skeleton count={1} width={677} height={24} />
                    ) : (
                        <>
                            <p className="mr-10">
                                <span className="font-bold">{photosCount}</span>
                                {`  ${photosCount === 1 ? 'post' : 'posts'}`}
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">{followerCount}</span>
                                {`  ${followerCount === 1 ? 'follower' : 'followers'}`}
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">{profile.following.length}</span>
                                {`  following`}
                            </p>
                        </>
                    )
                    }
                </div>
                <div className="container mt-4">
                    <p className="font-medium text-gray-700">
                        {!profile.fullName ? <Skeleton count={1} height={24} /> : profile.fullName}
                    </p>
                </div>
                <div className="container mt-1">
                    <p className="text-gray-700">
                        {!profile.bio ? <Skeleton count={1} height={48} /> : profile.bio}
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
    profile: PropTypes.shape({
        docId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        fullname: PropTypes.string.isRequired,
        following: PropTypes.array.isRequired,
        followers: PropTypes.array.isRequired,
    }).isRequired,
}

export default ProfileHeader
