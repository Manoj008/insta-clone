import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/Firebase';
import UserContext from '../../context/User';


function PostAddComment({ docId, comments, setComments, commentInput }) {

    const [comment, setComment] = useState('');
    const { firebase, FieldValue } = useContext(FirebaseContext);
    const { user: { displayName } } = useContext(UserContext);

    const handleSubmitComment = (event) => {
        event.preventDefault();
        if (comment.length > 0) {
            setComments([{ displayName, comment }, ...comments]);
            setComment('');

            return firebase.firestore().collection('photos').doc(docId).update({
                comments: FieldValue.arrayUnion({ displayName, comment })
            });
        }
    }

    return (
        <div className="border-t border-gray-500">
            <form
                method="POST"
                onSubmit={handleSubmitComment}
                className="flex justify-between px-0">
                <input aria-label="Add a Comment" autocomplete="off" type="text" name="add-comment"
                    value={comment}
                    placeholder="Add a comment..."
                    onChange={({ target }) => setComment(target.value)}
                    ref={commentInput}
                    className="text-sm text-gray-800 w-full mr-1 py-2 px-4" />
                <button className={`px-2 cursor-pointer  text-blue-500 ${!comment && 'opacity-25'} `}
                    type="button"
                    disabled={comment.length < 1}
                    onClick={handleSubmitComment}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor"
                        className="w-6 transform rotate-90">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </form>

        </div>
    )
}

PostAddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComment: PropTypes.func.isRequired,
    commentInput: PropTypes.object.isRequired,
}

export default PostAddComment
