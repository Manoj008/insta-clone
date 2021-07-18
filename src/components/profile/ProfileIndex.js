import React, { useReducer, useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import ProfileHeader from './ProfileHeader';
import Photos from './Photos';
import { getUserByUsername, getUserPhotosByUserId } from '../../services/Firbase';
import Modal from './Modal';
import FollowerFollowing from './FollowerFollowing';
import UserContext from "./UserContext.js";
import FollowContext from "../../context/FollowContext";


function UserProfile() {

    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialState = {
        profile: {},
        photosCollection: [],
        followerCount: 0
    }


    const { userr } = useContext(FollowContext);

    const [{ profile, photosCollection, followerCount, followingCount }, dispatch] = useReducer(reducer, initialState);
    const [selectedImg, setSelectedImg] = useState(null);
    const [followers, setFollowers] = useState(null);
    const [followings, setFollowings] = useState(null);

    const dispatchUserEvent = (actionType, payload) => {
        switch (actionType) {
            case 'SHOW_FOLLOWERS':
                setFollowers(payload);
                return;
            case 'HIDE_FOLLOWERS':
                setFollowers(null);
                return;
            case 'SHOW_FOLLOWING':
                setFollowings(payload);
                return;
            case 'HIDE_FOLLOWING':
                setFollowings(null);
                return;
            case 'SHOW_PHOTO':
                setSelectedImg(payload);
                return;
            case 'HIDE_PHOTO':
                setSelectedImg(null);
                return;
            default:
                return;
        }
    };


    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const photos = await getUserPhotosByUserId(userr.userId);

            photos.sort((a, b) => b.dateCreated - a.dateCreated);

            dispatch({ profile: userr, photosCollection: photos, followerCount: userr.followers.length, followingCount: userr.following.length });


        }

        getProfileInfoAndPhotos();

    }, [userr, followers, followings]);

    return (
        <UserContext.Provider value={{ followers, followings, selectedImg, dispatchUserEvent }}>


            <ProfileHeader
                photosCount={photosCollection ? photosCollection.length : 0}
                followerCount={followerCount}
                followingCount={followingCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection} />
            {selectedImg && <Modal />}
            {followers &&
                <FollowerFollowing
                    isFollow={true}
                    setProfile={dispatch}
                />
            }
            {followings &&
                <FollowerFollowing
                    isFollow={false}
                    setProfile={dispatch}
                />
            }
        </UserContext.Provider>
    )
}

ProfileHeader.propTypes = {
    user: PropTypes.shape({
        dateCreated: PropTypes.number.isRequired,
        emailAddress: PropTypes.string.isRequired,
        followers: PropTypes.array.isRequired,
        following: PropTypes.array.isRequired,
        fullName: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
    }).isRequired
}

export default UserProfile
