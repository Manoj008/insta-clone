import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

const User = ({ username, fullName, userProfilePic }) =>
    !username || !fullName ? (
        <Skeleton count={1} height={61} />
    )
        : (
            <Link to={`/profile/${username}`} className='hidden md:grid grid-cols-4 gap-4 mb-6 items-center '>
                <div className='flex items-center justify-between col-span-1 w-12 h-12   mr-3 '>
                    <img src={userProfilePic} alt="profile pic" className="rounded-full w-12 h-12" />
                </div>
                <div className="col-span-3">
                    <p className="font-bold text-sm">{username}</p>
                    <p className="text-sm">{fullName}</p>
                </div>
            </Link>
        )

User.prototype = {
    username: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
}

export default User
