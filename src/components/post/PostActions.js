import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../../context/User';
import FirebaseContext from '../../context/Firebase'

function PostActions({ docId, totalLikes, likedPhoto, handleFocus }) {

    const {
        user: { uid: userId = '' }
    } = useContext(UserContext);

    const [toggleLiked, setToggleLiked] = useState(likedPhoto);
    const [likes, setLikes] = useState(totalLikes);
    const { firebase, FieldValue } = useContext(FirebaseContext);

    const handleToggleLiked = async () => {

        setToggleLiked(!toggleLiked);
        await firebase.firestore().collection('photos').doc(docId).update({
            likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
        })

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1))
    }

    return (
        <>
            <div className="flex justify-between px-4 pt-2">
                <div className="flex">
                    <svg onClick={handleToggleLiked}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleToggleLiked();
                            }
                        }}
                        xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        className={`w-8 mr-4 select-none cursor-pointer ${toggleLiked ? 'fill-red text-red-600' : 'text-gray-800'}`}>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <svg onClick={handleFocus}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleFocus();
                            }
                        }}
                        xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        className={`w-8 mr-4 select-none text-gray-800 cursor-pointer`}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </div>
            </div>
            <div className="px-4 py-0 my-0">
                <p className="font-semibold">{likes === 1 ? `${likes} like` : `${likes} likes `}</p>
            </div>
        </>
    )
}

PostActions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired
}

export default PostActions
