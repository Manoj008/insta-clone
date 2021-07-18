import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import PostAddComment from './PostAddComment';


function PostComments({ docId, comments: allComments, posted, commentInput }) {

    const [comments, setComments] = useState(allComments);
    const [showAllComments, setShowAllComments] = useState(false);

    return (
        <>
            <div className="px-4 py-2">
                {comments.length >= 3 && (
                    <p className="text-sm text-gray-800 mb-0 cursor-pointer" onClick={() => setShowAllComments(!showAllComments)}>
                        {showAllComments ? (`show less comments`) : (`View all ${comments.length} comments`)}
                    </p>
                )}
                {showAllComments ? (
                    comments.slice(0, 10).map((item) =>
                        <Comment key={`${item.comment}-${item.displayName}`} item={item} />
                    )) : (comments.slice(0, 2).map((item) =>
                        <Comment key={`${item.comment}-${item.displayName}`} item={item} />
                    ))}
                <p className="text-gray-800 text-xs mt-1">{formatDistance(posted, new Date())} ago</p>
            </div>
            <PostAddComment className="bottom-0"
                docId={docId}
                comments={comments}
                setComments={setComments}
                commentInput={commentInput}
            />
        </>
    )
}

function Comment({ item }) {
    return (
        <p className="mb-0" >
            <Link to={`/profile/${item.displayName}`}>
                <span className="mr-1 font-medium text-gray-800">
                    {item.displayName}:
                            </span>
            </Link>
            <span className="text-xs">{item.comment}</span>
        </p>
    )
}

PostComments.propTypes = {
    doc: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    commentInput: PropTypes.object.isRequired,
}

export default PostComments
