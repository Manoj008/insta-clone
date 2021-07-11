import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PostFooter({ caption, username, }) {
    return (
        <div className="px-4 pt-0 pb-0">
            <Link to={`/profile/${username}`}>
                <span className="mr-1 font-medium text-gray-800">{username}:</span>
            </Link>
            <span className="text-xs text-gray-800">{caption}</span>
        </div>
    )
}

PostFooter.propTypes = {
    caption: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
}


export default PostFooter
