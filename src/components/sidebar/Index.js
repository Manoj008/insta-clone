import React from 'react'
import UseUser from '../../hooks/UseUser'
import Suggestions from './Suggestions';
import User from './User';


function Sidebar() {

    const { user } = UseUser();


    return (
        <div className="p-4 pt-0 max-h-40">
            <User username={user && user.username} fullName={user && user.fullName} userProfilePic={user.profilePicture ? user.profilePicture : process.env.PUBLIC_URL + "/images/avatars/dali.jpg"} />
            <Suggestions userId={user && user.userId} following={user && user.following} loggedInUserDocId={user && user.docId} />
        </div>
    )
}

export default Sidebar
