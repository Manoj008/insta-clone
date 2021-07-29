import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/Firebase';
import UserContext from '../../context/User';

function PostImage({ content }) {

    const [toggleLiked, setToggleLiked] = useState(content.likedPhoto);
    const [likes, setLikes] = useState(content.likes.length);
    const {
        user: { uid: userId = '' }
    } = useContext(UserContext);

    const { firebase, FieldValue } = useContext(FirebaseContext);


    const handleToggleLiked = async () => {

        console.log("double cliked");
        setToggleLiked(!toggleLiked);
        await firebase.firestore().collection('photos').doc(content.docId).update({
            likes: toggleLiked ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
        })

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1))
    }


    return (
        <img src={content.imageSrc} alt={content.caption}
        //  onDoubleClick={handleToggleLiked}
        />
    )
}

PostImage.propTypes = {
    src: PropTypes.string.isRequired,
    src: PropTypes.string
}

export default PostImage
