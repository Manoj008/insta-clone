import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

function PostHeader({ username, profilePic }) {
    return (
        <div className="flex border-b border-gray-500 h-3 p-3 py-7">
            <div className="flex items-center">
                <Link to={`/profile/${username}`} className="flex items-center">
                    <div className="rounded-full bg-gradient-to-t from-red-400 to-pink-800 
                        h-10 w-10 content-center flex flex-wrap mr-3">
                        <div className="rounded-full bg-white h-9 w-9 m-auto flex flex-wrap content-center items-center">
                            <img src={profilePic}
                                className="rounded-full h-8 w-8 m-auto"
                                alt={`${username} profile pic`} />
                        </div>
                    </div>
                    <p className="font-bold">{username}</p>
                </Link>
            </div>

        </div>
    )
}

PostHeader.propTypes = {
    username: PropTypes.string.isRequired,
    profilePic: PropTypes.string.isRequired,
}

export default PostHeader
