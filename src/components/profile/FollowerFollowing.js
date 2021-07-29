import React, { useContext, useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import FollowContext from '../../context/FollowContext';
import { getFollowers, getFollowings } from '../../services/Firbase';
import Loader from '../Loader';
import FollowerFollowingProfile from './FollowerFollowingProfile';
import UserContext from './UserContext'

function FollowerFollowing({ isFollow, setProfile, postSet }) {

    const [profiles, setProfiles] = useState(null);
    const { followers, followings, dispatchUserEvent } = useContext(UserContext);

    const { userr } = useContext(FollowContext);


    useEffect(() => {
        async function followerList() {

            const response = await getFollowers(userr.userId, followers);
            setProfiles(response);
        }

        async function followingList() {

            const response = await getFollowings(userr.userId, followings);

            setProfiles(response);

        }


        if (isFollow) {
            followerList();
        } else {
            followingList();
        }
    }, [followers, followings, userr.followers]);


    const handleClick = (e) => {
        if (e.target.classList.contains("backdrop-filter")) {
            followers && dispatchUserEvent('HIDE_FOLLOWERS', {});
            followings && dispatchUserEvent('HIDE_FOLLOWING', {});

        }
    }

    return !profiles ? (
        <Loader />
    ) :

        profiles.length > 0 ? (
            <div className="fixed flex w-full h-full justify-center items-center inset-0 start-0 top-0 backdrop-filter backdrop-blur-lg"
                onClick={handleClick}>
                <div className="w-10/12 sm:w-2/5 md:w-3/12 rounded-md flex flex-col bg-gray-100 ">
                    <div className=" text-sm text-center grid-3 relative justify-end my-2 ">
                        <p className="font-bold text-gray-600 object-center">{isFollow ? 'Followers' : 'Following'}</p>
                        <div className="absolute right-0 top-0 " onClick={() => (dispatchUserEvent('HIDE_FOLLOWERS', {}), dispatchUserEvent('HIDE_FOLLOWING', {}))}>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 m-4">
                        {profiles.map((profile) => (
                            <FollowerFollowingProfile
                                key={profile.docId}
                                profileDocId={profile.docId}
                                username={profile.username}
                                suggestedUserPic={profile.profilePicture}
                                profileId={profile.userId}
                                userId={userr.userId}
                                loggedInUserDocId={userr.docId}
                                isFollow={userr.following.includes(profile.userId)}
                                setProfile={setProfile}
                                postSet={postSet}

                            />
                        ))}
                    </div>
                </div>
            </div>
        ) : null
}

export default FollowerFollowing
