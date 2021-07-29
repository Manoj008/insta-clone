import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/Firbase';
import SuggestedProfile from './SuggestedProfile';

function Suggestions({ userId, following, loggedInUserDocId }) {

    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId, following);
            setProfiles(response);
        }

        if (userId) {
            suggestedProfiles();
        }
    }, [userId]);
    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) :

        profiles.length > 0 ? (
            <div className="rounded absolute top-16  md:static md:flex md:flex-col  ">
                <div className="flex text-sm items-center align-items justify-between mb-2">
                    {profiles && <p className="font-bold text-gray-500 ml-3 md:ml-0">Suggestions for you</p>}
                </div>
                <div className=" rounded-md flex md:grid md:gap-5 overflow-x-auto max-w-full w-10/12 mx-3 px-1 py-2 bg-gray-300 md:px-2 md:mx-0 ">
                    {profiles.map((profile) => (
                        <SuggestedProfile
                            key={profile.docId}
                            profileDocId={profile.docId}
                            username={profile.username}
                            suggestedUserPic={profile.profilePicture}
                            profileId={profile.userId}
                            userId={userId}
                            loggedInUserDocId={loggedInUserDocId}
                        />
                    ))}
                </div>

            </div>
        ) : null

}

Suggestions.propTypes = {
    userId: PropTypes.string,
    following: PropTypes.array,
    loggedInUserDocId: PropTypes.string
}
export default Suggestions
